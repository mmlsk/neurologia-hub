import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import logic from '../js/logic.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const {
  esc, norm, b64EncodeUtf8, b64DecodeUtf8,
  calcAlteplaseDose, calcNIHSS, calcGCS, calcCHA2DS2VA, classifyPMR,
  parseQuestionsInput, diagnoseQuestionsInput, parseBackupCode, parseMarkdown, scoreExam
} = logic;

test('UTF-8 base64 round-trip preserves Polish diacritics and emoji', () => {
  const sample = JSON.stringify({ note: 'Zażółć gęślą jaźń 🧠', arr: [1, 2] });
  assert.deepEqual(JSON.parse(b64DecodeUtf8(b64EncodeUtf8(sample))), JSON.parse(sample));
});

test('calcAlteplaseDose computes 0.9 mg/kg (cap 90 mg) 10/90 split and TNK 0.25 mg/kg (cap 25 mg)', () => {
  const d70 = calcAlteplaseDose(70);
  assert.equal(d70.totalMg, 63);
  assert.equal(d70.bolusMg, 6.3);
  assert.equal(d70.infusionMg, 56.7);
  assert.equal(d70.rateMlPerHr, 56.7);
  assert.equal(d70.tnkMg, 17.5);

  const d120 = calcAlteplaseDose(120);
  assert.equal(d120.totalMg, 90);
  assert.equal(d120.bolusMg, 9);
  assert.equal(d120.infusionMg, 81);
  assert.equal(d120.tnkMg, 25);
});

test('calcNIHSS and calcGCS classify neurological severity and airway alerts', () => {
  assert.equal(calcNIHSS([0, 0]).severity, 'none');
  assert.equal(calcNIHSS({ a: 2, b: 1 }).severity, 'minor');
  assert.equal(calcNIHSS([5, 5]).severity, 'moderate');
  assert.equal(calcNIHSS([10, 8]).severity, 'moderate-severe');
  assert.equal(calcNIHSS([25, 30]).total, 42);
  assert.equal(calcNIHSS([25, 30]).severity, 'severe');

  const g8 = calcGCS(2, 2, 4);
  assert.equal(g8.total, 8);
  assert.equal(g8.airwayAlert, true);

  const g15 = calcGCS(4, 5, 6);
  assert.equal(g15.total, 15);
  assert.equal(g15.airwayAlert, false);
});

test('calcCHA2DS2VA omits sex category and scores stroke/age75 double', () => {
  assert.equal(calcCHA2DS2VA({}).total, 0);
  assert.equal(calcCHA2DS2VA({ htn: true, age65: true }).total, 2);
  assert.equal(calcCHA2DS2VA({ age75: true, age65: true, stroke: true }).total, 4);
});

test('classifyPMR separates bacterial, viral, tb, gbs, sah, ms, and normal profiles', () => {
  assert.equal(classifyPMR({ cells: 2, neutPct: 10, proteinMgDl: 32, glucoseRatio: 0.65 }).id, 'normal');
  assert.equal(classifyPMR({ cells: 1500, neutPct: 88, proteinMgDl: 220, glucoseRatio: 0.25 }).id, 'bacterial');
  assert.equal(classifyPMR({ cells: 95, neutPct: 15, proteinMgDl: 68, glucoseRatio: 0.62 }).id, 'viral');
  assert.equal(classifyPMR({ cells: 180, neutPct: 20, proteinMgDl: 240, glucoseRatio: 0.28 }).id, 'tb');
  assert.equal(classifyPMR({ cells: 3, neutPct: 0, proteinMgDl: 180, glucoseRatio: 0.6 }).id, 'gbs');
  assert.equal(classifyPMR({ cells: 12, neutPct: 10, proteinMgDl: 50, glucoseRatio: 0.6, xanthochromia: true }).id, 'sah');
  assert.equal(classifyPMR({ cells: 14, neutPct: 5, proteinMgDl: 48, glucoseRatio: 0.6, oligoclonal: true }).id, 'ms');
});

test('parseQuestionsInput remaps answer key when option letters are skipped', () => {
  const text = `
1. Która opcja jest poprawna?
A. Pierwsza
C. Druga (właściwa)
D. Trzecia
Klucz: C
`;
  const [q] = parseQuestionsInput(text, 'zaklad', '1', { banks: { zaklad: { n: 'Zakład' } } });
  assert.deepEqual(q.opts, ['Pierwsza', 'Druga (właściwa)', 'Trzecia']);
  assert.deepEqual(q.keys, [1]);
});

test('parseQuestionsInput sanitizes JSON mods, ids, and out-of-range keys', () => {
  const payload = JSON.stringify([{
    id: '<script>alert(1)</script>',
    stem: 'Pytanie testowe',
    opts: ['Tak', 'Nie'],
    keys: [99, 1],
    mods: ['<img src=x onerror=alert(1)>', '2'],
    bank: 'injected'
  }]);
  const [q] = parseQuestionsInput(payload, 'custom', '2', {
    banks: { custom: { n: 'Własne' } },
    modById: { '2': { at: 'udar' } }
  });
  assert.ok(!q.id.includes('<'));
  assert.deepEqual(q.mods, ['2']);
  assert.equal(q.at, 'udar');
  assert.deepEqual(q.keys, [1]);
  assert.equal(q.bank, 'custom');
  assert.equal(esc('<a&"b">'), '&lt;a&amp;&quot;b&quot;&gt;');
  assert.equal(norm('Żółć'), 'zolc');
});

test('parseMarkdown preserves blank lines inside fenced code blocks and escapes HTML', () => {
  const md = [
    '# Nagłówek <script>x</script>',
    '',
    '```js',
    'const a = 1;',
    '',
    'const b = 2;',
    '```',
    '',
    'Paragraf z **pogrubieniem**.'
  ].join('\n');
  const html = parseMarkdown(md);
  assert.ok(!html.includes('<script>'));
  assert.match(html, /<pre><code class="lang-js">const a = 1;\n\nconst b = 2;<\/code><\/pre>/);
  assert.ok(!html.includes('<pre><code class="lang-js">const a = 1;</p>'));
});

test('scoreExam handles multi-key answers, unanswered items, and 60% pass mark', () => {
  const list = [
    { id: 'q1', keys: [0], pm: '1' },
    { id: 'q2', keys: [1, 2], pm: '1' },
    { id: 'q3', keys: [0], pm: '2' },
    { id: 'q4', keys: [3], pm: '2' },
    { id: 'q5', keys: [0], pm: '5' }
  ];
  const ans = {
    q1: new Set([0]),
    q2: new Set([1, 2]),
    q3: new Set([0]),
    q4: new Set([1])
  };
  const res = scoreExam(list, ans);
  assert.equal(res.score, 3);
  assert.equal(res.total, 5);
  assert.equal(res.pct, 60);
  assert.equal(res.passed, true);
  assert.deepEqual(res.wrongQIds, ['q4', 'q5']);
});

test('diagnoseQuestionsInput reports empty input, invalid JSON, missing fields, and missing options', () => {
  assert.match(diagnoseQuestionsInput('   '), /Wklej/i);
  assert.match(diagnoseQuestionsInput('[{"stem": "x"'), /składnia JSON/i);
  assert.match(diagnoseQuestionsInput('[{"opts": ["A", "B"]}]'), /stem|question/);
  assert.match(diagnoseQuestionsInput('1. Brak opcji tutaj'), /co najmniej 2 wariantów/i);
  assert.match(diagnoseQuestionsInput('A. Opcja 1\nB. Opcja 2'), /brakuje treści pytania/i);
});

test('parseBackupCode distinguishes empty, bad base64, bad JSON, wrong schema, and restores valid backup', () => {
  const defaults = { visited: {}, last: null, done: {}, ans: {}, bm: {}, examHistory: [], patientCases: {}, osceCases: {} };
  assert.match(parseBackupCode('', defaults).error, /Wklej kod/i);
  assert.match(parseBackupCode('!!!nie-base64!!!', defaults).error, /Base64/i);
  assert.match(parseBackupCode(b64EncodeUtf8('{nie-json'), defaults).error, /JSON/i);
  assert.match(parseBackupCode(b64EncodeUtf8('{"foo":1}'), defaults).error, /Neurologia Hub/i);

  const valid = b64EncodeUtf8(JSON.stringify({ visited: { udar: 1 }, last: 'udar', examHistory: [{ pct: 80 }] }));
  const res = parseBackupCode(`  ${valid.slice(0, 12)}\n${valid.slice(12)}  `, defaults);
  assert.equal(res.ok, true);
  assert.deepEqual(res.state.visited, { udar: 1 });
  assert.equal(res.state.last, 'udar');
  assert.equal(res.state.examHistory.length, 1);
  assert.deepEqual(res.state.done, {});
});

test('Service Worker PRECACHE_ASSETS files all exist on disk', () => {
  const swText = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const m = swText.match(/const PRECACHE_ASSETS = \[([\s\S]*?)\];/);
  assert.ok(m, 'PRECACHE_ASSETS array should exist in sw.js');
  const entries = [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
  assert.ok(entries.length >= 50, `Expected at least 50 cached assets, got ${entries.length}`);
  for (const rel of entries) {
    if (rel === './') continue;
    const clean = rel.replace(/^\.\//, '');
    assert.ok(fs.existsSync(path.join(ROOT, clean)), `Missing precache asset on disk: ${clean}`);
  }
});

test('HUB_META, questions, and 10 atlases pass full referential and HTML section integrity', () => {
  const ctx = { window: {}, globalThis: {}, console, URLSearchParams, TextEncoder, TextDecoder, btoa, atob };
  ctx.window = ctx;
  ctx.globalThis = ctx;

  for (const file of ['js/meta.js', 'js/questions.js', 'js/questions_zaklad.js', 'js/logic.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
  }

  const M = ctx.HUB_META;
  assert.equal(Object.keys(M.GROUPS).length, 4);
  assert.equal(M.MODS.length, 16);
  assert.equal(M.ATLASES.length, 10);
  assert.equal(M.TRAPS.length, 16);
  assert.equal(M.SEMANTIC_GAPS.length, 8);
  assert.equal(M.SYMPTOM_CLUSTERS.length, 8);
  assert.equal(M.NEURO_EXAM_PROTOCOL.cranialNerves.length, 12);
  assert.ok(ctx.HUB_MODULOWA_Q.length >= 70);
  assert.ok(ctx.HUB_ZAKLAD_Q.length >= 40);

  for (const mod of M.MODS) {
    const at = M.atById[mod.at];
    assert.ok(at, `Module ${mod.id} references missing atlas ${mod.at}`);
    const html = fs.readFileSync(path.join(ROOT, 'atlasy', at.dir, 'index.html'), 'utf8');
    assert.ok(html.includes(`id="${mod.a}"`), `Atlas ${at.dir}/index.html missing anchor #${mod.a} for mod ${mod.id}`);
    for (const [secId] of at.secs) {
      assert.ok(html.includes(`id="${secId}"`), `Atlas ${at.dir}/index.html missing section #${secId}`);
    }
  }

  for (const [srcMod, links] of Object.entries(M.WIKILINKS)) {
    assert.ok(M.modById[srcMod], `WIKILINKS bad source module ${srcMod}`);
    for (const l of links) {
      assert.ok(M.modById[l.target], `WIKILINKS bad target module ${l.target}`);
      const at = M.atById[l.atlas];
      assert.ok(at, `WIKILINKS bad atlas ${l.atlas}`);
      assert.ok(at.secs.some(([sid]) => sid === l.sec), `WIKILINKS bad section ${l.atlas}#${l.sec}`);
    }
  }

  for (const trap of M.TRAPS) {
    for (const mid of trap.mods) assert.ok(M.modById[mid], `TRAP ${trap.id} bad mod ${mid}`);
  }
  for (const gap of M.SEMANTIC_GAPS) {
    for (const mid of gap.mods) assert.ok(M.modById[mid], `SEMANTIC_GAP ${gap.id} bad mod ${mid}`);
  }
  for (const cl of M.SYMPTOM_CLUSTERS) {
    for (const br of cl.branches || []) {
      const at = M.atById[br.atlas];
      assert.ok(at && at.secs.some(([sid]) => sid === br.sec), `Cluster ${cl.id} bad branch ${br.atlas}#${br.sec}`);
    }
  }
  for (const c of M.IMAGING_TRAINER_CASES) {
    const at = M.atById[c.atlas];
    assert.ok(at && at.secs.some(([sid]) => sid === c.sec), `Imaging case ${c.id} bad atlas/sec ${c.atlas}#${c.sec}`);
    assert.ok(c.clinicalQuestion.correct >= 0 && c.clinicalQuestion.correct < c.clinicalQuestion.opts.length);
  }
  for (const q of [...ctx.HUB_MODULOWA_Q, ...ctx.HUB_ZAKLAD_Q]) {
    assert.ok(M.atById[q.at], `Question ${q.id} bad atlas ${q.at}`);
    for (const mid of q.mods) assert.ok(M.modById[mid], `Question ${q.id} bad mod ${mid}`);
    assert.ok(Array.isArray(q.keys) && q.keys.length >= 1, `Question ${q.id} missing keys`);
    for (const k of q.keys) assert.ok(k >= 0 && k < q.opts.length, `Question ${q.id} key ${k} out of range`);
  }
});

test('Project contains zero pediatrics domain leftovers', () => {
  const badPattern = /pediatr|(?<!\p{L})(?:szczepion|szczepień|krup|PALS|DKA|HUS|IgAV)(?!\p{L})|Wilms|Kiedra|Holliday|osutk|niemowlę|pieluszk|ciemiączk|odźwiernik/iu;
  const exts = new Set(['.html', '.js', '.css', '.md', '.webmanifest', '.json']);
  const hits = [];
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name === '.git' || ent.name === 'node_modules') continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (exts.has(path.extname(ent.name)) && path.relative(ROOT, full) !== 'tests/hub.test.mjs') {
        const txt = fs.readFileSync(full, 'utf8');
        const m = txt.match(badPattern);
        if (m) hits.push(`${path.relative(ROOT, full)}: matched "${m[0]}"`);
      }
    }
  }
  walk(ROOT);
  assert.deepEqual(hits, [], `Found pediatrics leftovers:\n${hits.join('\n')}`);
});

function createClinicalCtx() {
  const storage = new Map();
  const baseEl = () => ({
    innerHTML: '',
    value: '',
    checked: false,
    dataset: {},
    style: {},
    classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } },
    setAttribute() {},
    addEventListener() {},
    querySelectorAll() { return []; },
    querySelector() { return null; }
  });
  const ctx = {
    window: null,
    globalThis: null,
    console,
    Math,
    Number,
    String,
    Array,
    Object,
    Set,
    Map,
    JSON,
    Date,
    URLSearchParams,
    TextEncoder,
    TextDecoder,
    btoa,
    atob,
    history: { replaceState() {} },
    scrollTo() {},
    confirm: () => true,
    localStorage: {
      getItem: k => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => { storage.set(k, String(v)); }
    },
    document: { activeElement: null, getElementById: () => baseEl() }
  };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  for (const file of ['js/meta.js', 'js/logic.js', 'js/clinical-calc.js', 'js/clinical-osce.js', 'js/clinical-diagnostics.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
  }
  return { ctx, baseEl };
}

test('clinical-diagnostics renders IMAGING_TRAINER_CASES hotspots, MCQs, pearls and TOPODIAGNOSIS fields', () => {
  const { ctx, baseEl } = createClinicalCtx();
  const M = ctx.HUB_META;
  const host = baseEl();
  const panel = baseEl();
  const quizHost = baseEl();
  const controls = new Map();
  let presetBtns = [];
  let puzOptBtns = [];

  const qSel = (sel) => {
    if (sel === '#diagPanel') return panel;
    if (sel === '#diagQuizHost') return quizHost;
    if (sel === '#imgHintBtn') { const b = baseEl(); controls.set('imgHintBtn', b); return b; }
    return null;
  };
  const qAll = (sel) => {
    if (sel === '[data-cmp-preset]') {
      presetBtns = [0, 1, 2, 3].map(i => Object.assign(baseEl(), { dataset: { cmpPreset: String(i) } }));
      return presetBtns;
    }
    if (sel === '[data-puz-opt]') {
      puzOptBtns = [0, 1, 2, 3].map(i => Object.assign(baseEl(), { dataset: { puzOpt: String(i) } }));
      return puzOptBtns;
    }
    return [];
  };

  const diag = ctx.HUB_CLINICAL.diagnostics({
    main: () => host,
    $: qSel,
    $$: qAll,
    esc: s => logic.esc(s),
    norm: s => logic.norm(s),
    classifyPMR: logic.classifyPMR,
    toast: () => {}
  });

  for (const imgCase of M.IMAGING_TRAINER_CASES) {
    controls.clear();
    diag.viewDiagnostics({ tab: 'imaging', case: imgCase.id });
    assert.ok(panel.innerHTML.includes(`cx="${imgCase.hotspot.targetX}" cy="${imgCase.hotspot.targetY}"`), `Imaging ${imgCase.id} must position hit target from hotspot`);
    assert.ok(panel.innerHTML.includes(logic.esc(imgCase.short)), `Imaging ${imgCase.id} must show short label`);
    if (imgCase.id === 'tk-udar-mca') {
      assert.ok(panel.innerHTML.includes('#131922') && !panel.innerHTML.includes('opacity="0.92"') && !panel.innerHTML.includes('fill="#f1f5f9"'), 'tk-udar-mca must not false-match MS on substring "pasma"');
    }
    const hintBtn = controls.get('imgHintBtn');
    assert.ok(hintBtn && typeof hintBtn.onclick === 'function', `Imaging ${imgCase.id} missing hint button handler`);
    hintBtn.onclick();
    assert.ok(panel.innerHTML.includes('Krok 2:'), `Imaging ${imgCase.id} must render Krok 2 MCQ after reveal`);
    assert.ok(panel.innerHTML.includes(logic.esc(imgCase.clinicalQuestion.q)), `Imaging ${imgCase.id} missing question stem`);
    assert.ok(panel.innerHTML.includes(logic.esc(imgCase.hotspot.name)), `Imaging ${imgCase.id} missing hotspot finding text`);
  }

  for (const topo of M.TOPODIAGNOSIS_DATABASE) {
    diag.viewDiagnostics({ tab: 'topo', topo: topo.id });
    assert.ok(panel.innerHTML.includes(logic.esc(topo.lesionSite)), `Topo ${topo.id} missing lesionSite`);
    assert.ok(panel.innerHTML.includes(logic.esc(topo.classicSign)), `Topo ${topo.id} missing classicSign`);
    assert.ok(panel.innerHTML.includes(logic.esc(topo.reflexPattern)), `Topo ${topo.id} missing reflexPattern`);
    assert.ok(panel.innerHTML.includes(logic.esc(topo.treatment)), `Topo ${topo.id} missing treatment`);
    assert.ok(!panel.innerHTML.includes('<div>—</div>'), `Topo ${topo.id} rendered empty fallback placeholder`);
  }

  // Matrix presets work with actual TOPODIAGNOSIS_DATABASE IDs
  const matrixModeBtn = Object.assign(baseEl(), { dataset: { tmode: 'matrix' } });
  const puzModeBtn = Object.assign(baseEl(), { dataset: { tmode: 'puzzles' } });
  const qAllWithModes = (sel) => {
    if (sel === '[data-tmode]') return [matrixModeBtn, puzModeBtn];
    return qAll(sel);
  };
  let toastMsg = '';
  const diag2 = ctx.HUB_CLINICAL.diagnostics({
    main: () => host, $: qSel, $$: qAllWithModes, esc: s => logic.esc(s), norm: s => logic.norm(s),
    classifyPMR: logic.classifyPMR, toast: m => { toastMsg = m; }
  });
  diag2.viewDiagnostics({ tab: 'topo' });
  matrixModeBtn.onclick();
  for (const btn of presetBtns) {
    toastMsg = '';
    btn.onclick();
    assert.equal(toastMsg, '', `Matrix preset ${btn.dataset.cmpPreset} failed to match entries`);
    assert.ok(!panel.innerHTML.includes('<td>—</td>'), `Matrix preset ${btn.dataset.cmpPreset} rendered empty cells`);
  }

  // Topo puzzles highlight the zone referenced by puz.topoId (wallenberg -> brainstem cy="122")
  diag2.viewDiagnostics({ tab: 'topo' });
  puzModeBtn.onclick();
  puzOptBtns[0].onclick();
  assert.ok(panel.innerHTML.includes('cx="140" cy="122"'), 'Wallenberg puzzle must highlight brainstem zone');
});

test('clinical-calc renders all NEURO_DRUG_DATABASE items with valid settings and zero undefined text', () => {
  const { ctx, baseEl } = createClinicalCtx();
  const M = ctx.HUB_META;
  const host = baseEl();
  const calc = ctx.HUB_CLINICAL.calc({
    main: () => host,
    $: (sel, r) => (r === host && sel === '#calcRoot') ? baseEl() : null,
    $$: () => [],
    esc: s => logic.esc(s),
    pct: (a, b) => (b ? Math.round((100 * a) / b) : 0),
    calcAlteplaseDose: logic.calcAlteplaseDose,
    calcNIHSS: logic.calcNIHSS,
    calcGCS: logic.calcGCS,
    calcCHA2DS2VA: logic.calcCHA2DS2VA,
    safeStorageSet: () => true,
    toast: () => {}
  });

  const expectedSettings = {
    alteplaza: { rx: false, hospital: true },
    ceftriakson: { rx: false, hospital: true },
    mannitol: { rx: false, hospital: true },
    metyloprednizolon: { rx: false, hospital: true },
    'kwas-acetylosalicylowy': { rx: true, hospital: false },
    lewetyracetam: { rx: true, hospital: true },
    'kwas-walproinowy': { rx: true, hospital: true },
    diazepam: { rx: true, hospital: true }
  };

  for (const drug of M.NEURO_DRUG_DATABASE) {
    calc.viewCalculator({ tab: 'recepty', lek: drug.id, w: 70 });
    assert.ok(!host.innerHTML.includes('undefined'), `Drug ${drug.id} rendered "undefined" in HTML`);
    assert.ok(host.innerHTML.includes(logic.esc(drug.categoryName)), `Drug ${drug.id} missing categoryName`);
    assert.ok(host.innerHTML.includes(logic.esc(drug.indications[0].name)), `Drug ${drug.id} missing indication name`);
    assert.ok(host.innerHTML.includes(logic.esc(drug.indications[0].doseScheme)), `Drug ${drug.id} missing doseScheme`);
    const exp = expectedSettings[drug.id];
    if (exp) {
      assert.equal(host.innerHTML.includes('e-Recepta · Wzór dydaktyczny'), exp.rx, `Drug ${drug.id} rx card mismatch`);
      assert.equal(host.innerHTML.includes('Karta zleceń · SOR / Oddział'), exp.hospital, `Drug ${drug.id} hospital card mismatch`);
      if (exp.rx) assert.ok(host.innerHTML.includes(logic.esc(drug.forms[0].packLabel)), `Drug ${drug.id} missing packLabel`);
    }
  }
});

test('clinical-osce handles uppercase gender and {type, text} maneuver reactions including fatal crisis', () => {
  const { ctx, baseEl } = createClinicalCtx();
  const M = ctx.HUB_META;
  const main = baseEl();
  let maneuverBtns = [];
  const osce = ctx.HUB_CLINICAL.osce({
    S: { osceCases: {} },
    $: () => null,
    $$: (sel) => {
      if (sel.includes('data-maneuver')) return maneuverBtns;
      return [];
    },
    main,
    toast: () => {},
    save: () => {},
    getNotes: () => [],
    saveNotes: () => {},
    esc: s => logic.esc(s)
  });

  osce.renderOsceStationList();
  for (const st of M.OSCE_STATIONS) {
    const label = st.patient.gender.toLowerCase() === 'm' ? 'Mężczyzna' : 'Kobieta';
    assert.ok(main.innerHTML.includes(label), `OSCE station ${st.id} must show ${label}`);
  }
  assert.ok(main.innerHTML.includes('Mężczyzna'), 'OSCE list must render Mężczyzna for gender: "M"');

  const st1 = M.OSCE_STATIONS[0];
  const painManeuver = st1.zones[0].maneuvers.find(m => m.reaction?.type === 'pain');
  const fatalManeuver = st1.zones[0].maneuvers.find(m => m.isFatal);
  maneuverBtns = [
    Object.assign(baseEl(), { dataset: { maneuver: painManeuver.id } }),
    Object.assign(baseEl(), { dataset: { maneuver: fatalManeuver.id } })
  ];
  osce.openStation(st1);
  maneuverBtns[0].onclick();
  assert.ok(main.innerHTML.includes('osce-reaction-badge pain'), 'OSCE pain object reaction must render pain badge');
  assert.ok(main.innerHTML.includes(logic.esc(painManeuver.reaction.text)), 'OSCE reaction must display reaction.text');

  maneuverBtns[1].onclick();
  assert.ok(main.innerHTML.includes('osce-reaction-badge crisis'), 'OSCE fatal maneuver must render crisis badge');
});

test('app.js dark theme iframe sync, viewQuestions browse tab switch, and viewConnections trap tab routing', () => {
  const appSrc = fs.readFileSync(path.join(ROOT, 'js/app.js'), 'utf8');

  const syncMatch = appSrc.match(/function syncIframeTheme\(eff\) \{[\s\S]*?\n\}/);
  assert.ok(syncMatch, 'syncIframeTheme should exist in js/app.js');
  const posted = [];
  const docEl = { classList: { add() {} }, dataset: {} };
  const rf = { contentDocument: { documentElement: docEl }, contentWindow: { postMessage: (msg) => posted.push(msg) } };
  const syncFn = vm.runInNewContext(`(${syncMatch[0]})`, { $: () => rf });

  for (const palette of ['dark', 'cyberpunk', 'aurora', 'midnight', 'sunset']) {
    syncFn(palette);
    assert.equal(docEl.dataset.theme, 'dark', `Palette ${palette} must set dark iframe dataset.theme`);
    assert.equal(posted.at(-1).theme, 'dark', `Palette ${palette} must postMessage theme="dark"`);
  }
  syncFn('light');
  assert.equal(docEl.dataset.theme, undefined, 'Light palette must clear dark dataset.theme');
  assert.equal(posted.at(-1).theme, 'light', 'Light palette must postMessage theme="light"');

  const connMatch = appSrc.match(/function viewConnections\(parts, params\) \{\s*\n\s*(let activeTab =[^;]+;)/);
  assert.ok(connMatch, 'viewConnections activeTab initializer should exist in js/app.js');
  const getActiveTab = params => vm.runInNewContext(`(() => { const params = ${JSON.stringify(params)}; ${connMatch[1]} return activeTab; })()`, {});
  assert.equal(getActiveTab({ trap: 't1' }), 'pytania');
  assert.equal(getActiveTab({ tab: 'pytania' }), 'pytania');
  assert.equal(getActiveTab({}), 'atlas');

  const qMatch = appSrc.match(/function viewQuestions\(parts, params\) \{\s*\n\s*(if \(Object\.keys\(params\)\.length\) \{[\s\S]*?\n\s*\})/);
  assert.ok(qMatch, 'viewQuestions query param handling should exist in js/app.js');
  const applyQParams = params => {
    const F = { tab: 'zaklad' };
    vm.runInNewContext(`(() => { const params = ${JSON.stringify(params)}; ${qMatch[1]} })()`, { F, Set });
    return F;
  };
  assert.equal(applyQParams({ gap: '1' }).tab, 'browse');
  assert.equal(applyQParams({ q: 'udar' }).tab, 'browse');
  assert.equal(applyQParams({ tab: 'zaklad', q: 'udar' }).tab, 'zaklad');
});
