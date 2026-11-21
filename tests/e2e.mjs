import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json; charset=utf-8'
};

function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium'
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  const pwDir = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  if (fs.existsSync(pwDir)) {
    for (const d of fs.readdirSync(pwDir)) {
      if (d.startsWith('chromium_headless_shell-')) {
        const bin = path.join(pwDir, d, 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
        if (fs.existsSync(bin)) return bin;
      }
    }
  }
  throw new Error('No Chrome/Chromium found; set CHROME_PATH');
}

function startServer() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      const urlPath = (req.url || '/').split('?')[0];
      let filePath = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
      if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    srv.listen(0, '127.0.0.1', () => resolve({ srv, port: srv.address().port }));
  });
}

async function run() {
  const chromeBin = findChrome();
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'neuro-e2e-'));
  const { srv, port } = await startServer();
  const baseUrl = `http://127.0.0.1:${port}`;
  const proc = spawn(chromeBin, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=0',
    `--user-data-dir=${profileDir}`,
    'about:blank'
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  try {
    const wsUrl = await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('CDP timeout')), 10000);
      proc.stderr.on('data', chunk => {
        const m = chunk.toString().match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (m) { clearTimeout(t); resolve(m[1]); }
      });
      proc.on('exit', c => { clearTimeout(t); reject(new Error(`Chrome exited ${c}`)); });
    });

    const browserWs = new WebSocket(wsUrl);
    await new Promise(r => browserWs.addEventListener('open', r, { once: true }));
    let msgId = 0;
    const pending = new Map();
    const events = [];
    browserWs.addEventListener('message', ev => {
      const d = JSON.parse(ev.data);
      if (d.id && pending.has(d.id)) {
        const { resolve, reject } = pending.get(d.id);
        pending.delete(d.id);
        d.error ? reject(new Error(d.error.message)) : resolve(d.result);
      } else if (d.method) {
        events.push(d);
      }
    });
    const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
      const id = ++msgId;
      pending.set(id, { resolve, reject });
      browserWs.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    });

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    await send('Page.enable', {}, sessionId);
    await send('Runtime.enable', {}, sessionId);
    await send('Network.enable', {}, sessionId);

    const evalJS = async expr => {
      const res = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }, sessionId);
      if (res.exceptionDetails) throw new Error(res.exceptionDetails.text || 'JS error');
      return res.result?.value;
    };
    const waitFor = async (fnExpr, timeoutMs = 6000) => {
      const t0 = Date.now();
      while (Date.now() - t0 < timeoutMs) {
        if (await evalJS(fnExpr)) return;
        await new Promise(r => setTimeout(r, 80));
      }
      throw new Error(`Timed out waiting for: ${fnExpr}`);
    };

    // 1. Start route (#/) — verify lazy modules are NOT loaded yet
    await send('Page.navigate', { url: `${baseUrl}/index.html#/` }, sessionId);
    await waitFor(`!!document.querySelector('section.hero h1')`);
    const initialHasOsce = await evalJS(`!!window.HUB_META?.OSCE_STATIONS`);
    const initialHasQ = await evalJS(`!!window.HUB_MODULOWA_Q`);
    assert.equal(initialHasOsce, false, 'OSCE_STATIONS should not load on #/');
    assert.equal(initialHasQ, false, 'questions.js should not load on #/');

    // 2. Question routes (#/pytania, #/trening, #/egzamin)
    for (const [hash, sel] of [
      ['#/pytania', '#qList, .qcard, .qtab'],
      ['#/trening', '.tsetup, #tStart, .seg'],
      ['#/egzamin', '#eStart, .exam-setup, .card']
    ]) {
      await evalJS(`location.hash = '${hash}'`);
      await waitFor(`!!document.querySelector('${sel}') && !!(window.HUB_Q && window.HUB_Q.length > 0)`);
    }

    // 3. Clinical routes (#/pacjent, #/kalkulator, #/badania)
    for (const [hash, sel] of [
      ['#/pacjent', '.conn-tabs, .sim-filter-bar, .card'],
      ['#/kalkulator', '.calc-tab-nav, .calc-card, .card'],
      ['#/badania', '.calc-tab-nav, .topo-module-wrap, .card']
    ]) {
      await evalJS(`location.hash = '${hash}'`);
      await waitFor(`!!document.querySelector('${sel}') && !!(window.HUB_META?.OSCE_STATIONS?.length > 0)`);
    }

    // 3b. Articles / blog module (#/wpisy and #/wpisy/<id>)
    await evalJS(`location.hash = '#/wpisy'`);
    await waitFor(`!!document.querySelector('.art-grid .art-card') && !!(window.HUB_ARTICLES?.length > 0)`);
    await evalJS(`location.hash = '#/wpisy/tromboliza-tnk-vs-rtpa'`);
    await waitFor(`!!document.querySelector('.art-reader .art-body')`);

    // 4. Service Worker offline check
    await waitFor(`navigator.serviceWorker.ready.then(() => true)`);
    await send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 }, sessionId);
    await send('Page.reload', {}, sessionId);
    await waitFor(`!!document.querySelector('main#view')`);
    await evalJS(`location.hash = '#/kalkulator'`);
    await waitFor(`!!document.querySelector('.calc-tab-nav, .card')`);

    const pageErrors = events.filter(e => e.method === 'Runtime.exceptionThrown');
    assert.equal(pageErrors.length, 0, `Unexpected runtime exceptions: ${JSON.stringify(pageErrors)}`);
    console.log('E2E PASS: lazy-load routes (#/pytania, #/trening, #/egzamin, #/pacjent, #/kalkulator, #/badania) + offline SW verified');
  } finally {
    proc.kill('SIGKILL');
    srv.close();
    fs.rmSync(profileDir, { recursive: true, force: true });
  }
}

run().catch(err => {
  console.error('E2E FAIL:', err);
  process.exit(1);
});
