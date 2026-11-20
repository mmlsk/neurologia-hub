/* Pure, DOM-free domain logic shared between browser Hub and Node tests. */
(function (root) {
  'use strict';

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const escB = s => esc(s).replace(/&lt;br\s*\/?&gt;/gi, '<br>');
  const norm = s => String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
  const pct = (a, b) => b ? Math.round(100 * a / b) : 0;

  const b64EncodeUtf8 = str => {
    const bytes = new TextEncoder().encode(String(str));
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  };

  const b64DecodeUtf8 = b64 => {
    const bin = atob(String(b64));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  };

  function calcAlteplaseDose(weightKg) {
    const w = Math.max(0, Number.isFinite(+weightKg) ? +weightKg : 0);
    const totalMg = Math.round(Math.min(90, w * 0.9) * 10) / 10;
    const bolusMg = Math.round(totalMg * 0.1 * 10) / 10;
    const infusionMg = Math.round((totalMg - bolusMg) * 10) / 10;
    const tnkMg = Math.round(Math.min(25, w * 0.25) * 10) / 10;
    return {
      weight: w,
      totalMg,
      bolusMg,
      bolusMl: bolusMg,
      infusionMg,
      infusionMl: infusionMg,
      rateMlPerHr: infusionMg,
      tnkMg
    };
  }

  function calcNIHSS(scores) {
    let list = [];
    if (Array.isArray(scores)) list = scores;
    else if (scores && typeof scores === 'object') list = Object.values(scores);
    const rawSum = list.reduce((acc, v) => acc + (Number.isFinite(+v) ? Math.max(0, +v) : 0), 0);
    const total = Math.max(0, Math.min(42, Math.round(rawSum)));
    if (total === 0) return { total, severity: 'none', label: '0 pkt — brak objawów ubytkowych' };
    if (total <= 4) return { total, severity: 'minor', label: 'Udar lekki (1–4 pkt)' };
    if (total <= 15) return { total, severity: 'moderate', label: 'Udar umiarkowany (5–15 pkt)' };
    if (total <= 20) return { total, severity: 'moderate-severe', label: 'Udar umiarkowanie ciężki (16–20 pkt)' };
    return { total, severity: 'severe', label: 'Udar ciężki (21–42 pkt)' };
  }

  function calcGCS(eyes, verbal, motor) {
    const e = Math.max(1, Math.min(4, Math.round(Number(eyes) || 1)));
    const v = Math.max(1, Math.min(5, Math.round(Number(verbal) || 1)));
    const m = Math.max(1, Math.min(6, Math.round(Number(motor) || 1)));
    const total = e + v + m;
    const airwayAlert = total <= 8;
    const category = total <= 8
      ? 'Ciężkie zaburzenia / śpiączka (≤8 pkt)'
      : total <= 12
        ? 'Umiarkowane zaburzenia świadomości (9–12 pkt)'
        : 'Stan łagodny / przytomny (13–15 pkt)';
    return { total, eyes: e, verbal: v, motor: m, category, airwayAlert };
  }

  function calcCHA2DS2VA(flags = {}) {
    const f = flags || {};
    const total =
      (f.chf ? 1 : 0) +
      (f.htn ? 1 : 0) +
      (f.age75 ? 2 : 0) +
      (f.dm ? 1 : 0) +
      (f.stroke ? 2 : 0) +
      (f.vasc ? 1 : 0) +
      (f.age65 && !f.age75 ? 1 : 0);
    let recommendation = 'Niskie ryzyko — bez rutynowego wskazania do antykoagulacji (0 pkt)';
    if (total === 1) recommendation = 'Umiarkowane ryzyko — rozważ doustną antykoagulację OAC/DOAC (1 pkt, klasa IIa ESC 2024)';
    else if (total >= 2) recommendation = 'Wysokie ryzyko — zalecana doustna antykoagulacja OAC/DOAC (≥2 pkt, klasa I ESC 2024)';
    return { total, recommendation };
  }

  function classifyPMR(input = {}) {
    const cells = Math.max(0, Number(input.cells) || 0);
    const neutPct = Math.max(0, Math.min(100, Number(input.neutPct) || 0));
    const proteinMgDl = Math.max(0, Number(input.proteinMgDl) || 0);
    const glucoseRatio = Math.max(0, Number(input.glucoseRatio) || 0);
    const xanthochromia = !!input.xanthochromia;
    const oligoclonal = !!input.oligoclonal;

    if (xanthochromia) {
      return {
        id: 'sah',
        label: 'Krwotok podpajęczynówkowy (SAH)',
        tone: 'red',
        summary: 'Ksantochromia PMR (rozkład hemoglobiny po >6–12 h od krwawienia) różnicuje SAH od artefaktu nakłucia (próba 3 probówek).'
      };
    }
    if ((cells >= 100 && neutPct >= 60) || (cells >= 20 && neutPct >= 70 && glucoseRatio < 0.45)) {
      return {
        id: 'bacterial',
        label: 'Bakteryjne (ropne) zapalenie opon mózgowo-rdzeniowych',
        tone: 'red',
        summary: 'Wysoka pleocytoza neutrofilowa, podwyższone białko oraz obniżony stosunek glukozy PMR/surowica (<0,4) wymagają pilnej antybiotykoterapii i deksametazonu.'
      };
    }
    if (cells >= 15 && neutPct < 55 && glucoseRatio < 0.45 && proteinMgDl >= 80) {
      return {
        id: 'tb',
        label: 'Gruźlicze / grzybicze zapalenie opon mózgowo-rdzeniowych',
        tone: 'amber',
        summary: 'Pleocytoza limfocytarna współistniejąca z bardzo wysokim białkiem i hipoglikorachią (<0,4) wymaga diagnostyki prątka gruźlicy (PCR/posiew) i kryptokoka.'
      };
    }
    if (cells <= 10 && proteinMgDl >= 60 && !oligoclonal) {
      return {
        id: 'gbs',
        label: 'Rozszczepienie białkowo-komórkowe (GBS / CIDP)',
        tone: 'blue',
        summary: 'Prawidłowa lub granicznie niska cytoza przy wyraźnie podwyższonym stężeniu białka jest klasyczna dla zespołu Guillaina-Barrégo (szczególnie od 2. tygodnia choroby) i CIDP.'
      };
    }
    if (oligoclonal && cells < 50 && glucoseRatio >= 0.45) {
      return {
        id: 'ms',
        label: 'Profil demielinizacyjny (SM — prążki oligoklonalne)',
        tone: 'violet',
        summary: 'Prążki oligoklonalne IgG obecne w PMR przy braku ich w surowicy (typ II) przy prawidłowej/niewielkiej pleocytozie limfocytarnej wspierają rozpoznanie stwardnienia rozsianego (DIT wg McDonalda).'
      };
    }
    if (cells > 5 && glucoseRatio >= 0.45) {
      return {
        id: 'viral',
        label: 'Wirusowe (limfocytarne) zapalenie opon mózgowo-rdzeniowych',
        tone: 'amber',
        summary: 'Umiarkowana pleocytoza z przewagą limfocytów i prawidłowym stężeniem glukozy w PMR; przy objawach mózgowych wyklucz opryszczkowe zapalenie mózgu (HSV PCR).'
      };
    }
    if (proteinMgDl > 45) {
      return {
        id: 'gbs',
        label: 'Izolowana hiperproteinorachia (rozważ poliradikuloneuropatię)',
        tone: 'blue',
        summary: 'Podwyższone białko bez pleocytozy sugeruje uszkodzenie bariery krew-korzeń (GBS, CIDP, blok kanału kręgowego).'
      };
    }
    return {
      id: 'normal',
      label: 'Prawidłowy płyn mózgowo-rdzeniowy',
      tone: 'green',
      summary: 'Cytoza ≤5 kom./µl, białko ≤45 mg/dl, stosunek glukozy PMR/surowica ≥0,5 bez ksantochromii i prążków oligoklonalnych.'
    };
  }

  function sanitizeKeys(rawKeys, optsLen, fallbackKey = 0) {
    if (!optsLen) return [];
    const valid = (Array.isArray(rawKeys) ? rawKeys : [])
      .map(k => (typeof k === 'number' ? k : -1))
      .filter(k => Number.isInteger(k) && k >= 0 && k < optsLen);
    if (valid.length) return [...new Set(valid)];
    return fallbackKey >= 0 && fallbackKey < optsLen ? [fallbackKey] : [0];
  }

  function parseQuestionsInput(input, defaultBank = 'zaklad', defaultMod = '1', ctx = {}) {
    const trimmed = String(input || '').trim();
    if (!trimmed) return [];
    const modById = ctx.modById || {};
    const banks = ctx.banks || {};
    const validConfs = new Set(['src', 'inf', 'unk', 'did', 'own']);
    const safeBank = b => (typeof b === 'string' && (!Object.keys(banks).length || banks[b])) ? b : defaultBank;
    const safeConf = c => validConfs.has(c) ? c : 'src';
    const cleanMod = m => String(m || '').replace(/[^a-z0-9_-]/gi, '');
    const safeMods = raw => {
      if (!Array.isArray(raw)) return [cleanMod(defaultMod) || '1'];
      const cleaned = raw.map(cleanMod).filter(m => m && (!Object.keys(modById).length || modById[m]));
      return cleaned.length ? cleaned : [cleanMod(defaultMod) || '1'];
    };

    if (trimmed.startsWith('[') || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
      try {
        const parsed = JSON.parse(trimmed);
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        return arr.map((item, idx) => {
          if (!item || typeof item !== 'object') return null;
          const rawId = typeof item.id === 'string' ? item.id.replace(/[^a-z0-9_-]/gi, '') : '';
          const id = rawId || ('cq-' + Date.now() + '-' + idx + '-' + Math.floor(Math.random() * 1000));
          const stem = String(item.stem || item.question || '').trim();
          const rawOpts = item.opts || item.answers || item.options;
          const opts = Array.isArray(rawOpts) ? rawOpts.map(o => String(o == null ? '' : o).trim()).filter(Boolean) : [];
          let keys = [];
          if (Array.isArray(item.keys)) {
            keys = item.keys.map(k => typeof k === 'string' ? 'ABCDEFGH'.indexOf(k.trim().toUpperCase()) : k);
          } else if (typeof item.key === 'number') {
            keys = [item.key];
          } else if (typeof item.key === 'string') {
            const idxL = 'ABCDEFGH'.indexOf(item.key.trim().toUpperCase());
            if (idxL !== -1) keys = [idxL];
          }
          const b = safeBank(item.bank);
          const m = safeMods(item.mods);
          const safeAt = (typeof item.at === 'string' && /^[a-z0-9_-]+$/i.test(item.at))
            ? item.at
            : (modById[m[0]]?.at || 'nagle');
          const type = opts.length ? 'mcq' : 'open';
          return {
            id,
            at: safeAt,
            type,
            mods: m,
            topic: String(item.topic || ''),
            stem,
            opts,
            keys: type === 'mcq' ? sanitizeKeys(keys, opts.length) : [],
            conf: safeConf(item.conf),
            adapt: !!item.adapt,
            gap: !!item.gap,
            src: String(item.src || (banks[b]?.n || 'Własne')),
            bank: b,
            why: String(item.why || item.explanation || ''),
            tip: String(item.tip || ''),
            zal: String(item.zal || ''),
            akt: String(item.akt || ''),
            ans: String(item.ans || ''),
            isCustom: true
          };
        }).filter(q => q && q.stem && (q.type === 'open' || q.opts.length >= 2));
      } catch (e) {
        /* Fallback to plain-text parser */
      }
    }

    const rawBlocks = trimmed.split(/(?=(?:^|\n)\s*(?:\d+[\.\)]|Pytanie\s*\d+[\.:]?)\s*)/i).filter(b => b.trim());
    const questions = [];

    rawBlocks.forEach((block, bIdx) => {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (!lines.length) return;

      const stemLines = [];
      const opts = [];
      let correctKey = -1;
      let why = '';
      let src = '';
      let inWhy = false;

      lines.forEach(line => {
        const keyMatch = line.match(/^(?:Prawid(?:ł|l)owa|Poprawna|Klucz|Odpowied(?:ź|z)|Odp|Odp\.)\s*[:=-]?\s*([A-H])/i);
        if (keyMatch) {
          correctKey = 'ABCDEFGH'.indexOf(keyMatch[1].toUpperCase());
          inWhy = false;
          return;
        }
        const whyMatch = line.match(/^(?:Om(?:ó|o)wienie|Wyja(?:ś|s)nienie|Komentarz)\s*[:=-]?\s*(.*)/i);
        if (whyMatch) {
          inWhy = true;
          if (whyMatch[1]) why += (why ? ' ' : '') + whyMatch[1];
          return;
        }
        const srcMatch = line.match(/^(?:(?:Ź|Z|z|ź)r(?:ó|o)d(?:ł|l)o|Pula|Egzamin)\s*[:=-]?\s*(.*)/i);
        if (srcMatch) {
          src = srcMatch[1];
          inWhy = false;
          return;
        }
        const optMatch = line.match(/^[\(\[]?([A-H])[\)\.\:]\s*(.*)/i);
        if (optMatch) {
          inWhy = false;
          const optIdx = 'ABCDEFGH'.indexOf(optMatch[1].toUpperCase());
          if (/\*|\[x\]|\(x\)|\(prawid(?:ł|l)owa\)/i.test(line)) correctKey = optIdx;
          const cleanText = optMatch[2].trim().replace(/\*|\[x\]|\(x\)|\(prawid(?:ł|l)owa\)/gi, '').trim();
          opts[optIdx] = cleanText;
          return;
        }
        if (inWhy) why += (why ? ' ' : '') + line;
        else if (!opts.length) stemLines.push(line.replace(/^\d+[\.\)]\s*/, ''));
      });

      const stem = stemLines.join(' ').trim();
      const compacted = [];
      let mappedKey = -1;
      for (let i = 0; i < opts.length; i++) {
        if (!opts[i]) continue;
        if (i === correctKey) mappedKey = compacted.length;
        compacted.push(opts[i]);
      }

      if (stem && compacted.length >= 2) {
        const b = safeBank(defaultBank);
        const mod = cleanMod(defaultMod) || '1';
        questions.push({
          id: 'cq-' + Date.now() + '-' + bIdx + '-' + Math.floor(Math.random() * 1000),
          at: modById[mod]?.at || 'nagle',
          type: 'mcq',
          mods: [mod],
          topic: '',
          stem,
          opts: compacted,
          keys: [mappedKey >= 0 ? mappedKey : 0],
          conf: 'src',
          adapt: false,
          gap: false,
          src: src || banks[b]?.n || 'Własne',
          bank: b,
          why,
          tip: '',
          zal: '',
          akt: '',
          ans: '',
          isCustom: true
        });
      }
    });

    return questions;
  }

  function diagnoseQuestionsInput(input) {
    const trimmed = String(input || '').trim();
    if (!trimmed) return 'Wklej najpierw treść pytań lub tablicę JSON w polu tekstowym powyżej.';
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      let parsed;
      try {
        parsed = JSON.parse(trimmed);
      } catch (e) {
        return `Niepoprawna składnia JSON (${e.message}). Sprawdź brakujące przecinki, cudzysłowy lub nawiasy zamykające.`;
      }
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      const objs = arr.filter(x => x && typeof x === 'object');
      if (!objs.length) return 'JSON nie zawiera obiektów pytań (oczekiwano np. [{ "stem": "...", "opts": ["...", "..."], "keys": [0] }]).';
      if (objs.some(x => !String(x.stem || x.question || '').trim())) {
        return 'W co najmniej jednym obiekcie JSON brakuje treści pytania (pole "stem" lub "question").';
      }
      const tooFewOpts = objs.some(x => {
        const rawOpts = x.opts || x.answers || x.options;
        const cleanOpts = Array.isArray(rawOpts) ? rawOpts.map(o => String(o == null ? '' : o).trim()).filter(Boolean) : [];
        return rawOpts !== undefined && cleanOpts.length < 2;
      });
      if (tooFewOpts) return 'W pytaniu JSON podano mniej niż 2 niepuste warianty w polu "opts" / "options".';
      return 'Rozpoznany JSON nie spełnia wymagań importu (sprawdź pola "stem" oraz co najmniej 2 warianty "opts").';
    }
    const optLines = trimmed.split('\n').filter(l => /^[\(\[]?([A-H])[\)\.\:]\s*\S+/i.test(l.trim()));
    if (optLines.length < 2) {
      return 'Nie znaleziono co najmniej 2 wariantów odpowiedzi (np. "A. ...", "B. ...") pod treścią pytania.';
    }
    return 'Znaleziono warianty odpowiedzi (A./B.), ale brakuje treści pytania przed pierwszym wariantem (np. "1. Treść pytania...").';
  }

  function parseBackupCode(raw, baseDefaults = {}) {
    const cleaned = String(raw || '').replace(/\s+/g, '');
    if (!cleaned) return { ok: false, error: 'Wklej kod kopii zapasowej w polu powyżej przed wczytaniem.' };
    let decoded;
    try {
      decoded = b64DecodeUtf8(cleaned);
    } catch (e) {
      return { ok: false, error: 'Niepoprawny format Base64 — upewnij się, że wklejono cały kod bez urwanych znaków.' };
    }
    let data;
    try {
      data = JSON.parse(decoded);
    } catch (e) {
      return { ok: false, error: 'Kod Base64 nie zawiera prawidłowych danych JSON kopii zapasowej.' };
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return { ok: false, error: 'Kopia zapasowa musi zawierać obiekt JSON ze stanem postępu.' };
    }
    const objKeys = ['visited', 'done', 'ans', 'bm', 'patientCases', 'osceCases'];
    const allKnown = [...objKeys, 'last', 'examHistory'];
    if (!allKnown.some(k => Object.prototype.hasOwnProperty.call(data, k))) {
      return { ok: false, error: 'Zdekodowany JSON nie pochodzi z Neurologia Hub (brak rozpoznanych pól postępu).' };
    }
    const safeObj = (val, fallback) => (val && typeof val === 'object' && !Array.isArray(val)) ? val : (fallback || {});
    const state = Object.assign({}, baseDefaults, data);
    objKeys.forEach(k => { state[k] = safeObj(data[k], baseDefaults[k]); });
    state.examHistory = Array.isArray(data.examHistory) ? data.examHistory : [];
    state.last = typeof data.last === 'string' ? data.last : null;
    return { ok: true, state };
  }

  function parseMarkdown(src) {
    if (!src) return '';
    const codeBlocks = [];
    let s = String(src).replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (_, lang, code) => {
      const idx = codeBlocks.length;
      codeBlocks.push(`<pre><code class="${lang ? 'lang-' + esc(lang) : ''}">${esc(code.trim())}</code></pre>`);
      return `\n\n@@CODEBLOCK${idx}@@\n\n`;
    });

    s = esc(s);

    s = s.replace(/(?:^|\n)(\|[^\n]+\|\n\|[\s:|-]+\|\n(?:\|[^\n]+\|(?:\n|$))+)/g, match => {
      const lines = match.trim().split('\n').map(l => l.trim());
      if (lines.length < 3) return match;
      const parseRow = row => row.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
      const headers = parseRow(lines[0]);
      const bodyRows = lines.slice(2).map(parseRow);
      const ths = headers.map(h => `<th>${h}</th>`).join('');
      const trs = bodyRows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
      return `\n<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>\n`;
    });

    s = s.replace(/^#### (.*?)$/gm, '<h4>$1</h4>')
         .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
         .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
         .replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    s = s.replace(/^(?:---|\*\*\*|___)$/gm, '<hr>');
    s = s.replace(/^(?:&gt;|>)\s?(.*?)$/gm, '<blockquote>$1</blockquote>');

    s = s.replace(/^[-*]\s+\[x\]\s+(.*?)$/gim, '<li class="task-item checked"><input type="checkbox" checked disabled> <span>$1</span></li>')
         .replace(/^[-*]\s+\[ \]\s+(.*?)$/gim, '<li class="task-item"><input type="checkbox" disabled> <span>$1</span></li>');

    s = s.replace(/^[-*]\s+(.*?)$/gm, '<li class="bullet-item">$1</li>');
    s = s.replace(/^\d+\.\s+(.*?)$/gm, '<li class="num-item">$1</li>');

    s = s.replace(/(?:<li class="task-item[^"]*"[^>]*>.*?<\/li>\s*)+/gs, m => `\n\n<ul class="task-list" style="list-style:none;padding-left:.3rem">\n${m.trim()}\n</ul>\n\n`);
    s = s.replace(/(?:<li class="bullet-item"[^>]*>.*?<\/li>\s*)+/gs, m => `\n\n<ul>\n${m.replace(/class="bullet-item"/g, '').trim()}\n</ul>\n\n`);
    s = s.replace(/(?:<li class="num-item"[^>]*>.*?<\/li>\s*)+/gs, m => `\n\n<ol>\n${m.replace(/class="num-item"/g, '').trim()}\n</ol>\n\n`);

    s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
         .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
         .replace(/__([^_]+)__/g, '<strong>$1</strong>')
         .replace(/\*([^*]+)\*/g, '<em>$1</em>')
         .replace(/_([^_]+)_/g, '<em>$1</em>')
         .replace(/~~([^~]+)~~/g, '<del>$1</del>')
         .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|#[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    const blocks = s.split(/\n{2,}/).map(b => {
      b = b.trim();
      if (!b) return '';
      if (/^(?:<(h[1-4]|table|ul|ol|pre|blockquote|hr)|@@CODEBLOCK\d+@@$)/i.test(b)) return b;
      return `<p>${b.replace(/\n/g, '<br>')}</p>`;
    });

    let html = blocks.filter(Boolean).join('\n');
    codeBlocks.forEach((codeHtml, idx) => {
      html = html.replace(`@@CODEBLOCK${idx}@@`, () => codeHtml);
    });
    return html;
  }

  function scoreExam(list, userAnswers) {
    let score = 0;
    const byMod = {};
    const wrongQIds = [];
    const safeList = (list || []).filter(Boolean);

    safeList.forEach(q => {
      const userSet = (userAnswers && userAnswers[q.id]) || new Set();
      const keys = q.keys || [];
      const isCorrect = keys.length > 0 && userSet.size === keys.length && keys.every(k => userSet.has(k));
      if (isCorrect) score++;
      else wrongQIds.push(q.id);

      const m = q.pm || (q.mods && q.mods[0]) || '1';
      byMod[m] = byMod[m] || { total: 0, correct: 0 };
      byMod[m].total++;
      if (isCorrect) byMod[m].correct++;
    });

    const total = safeList.length;
    const pctScore = pct(score, total);
    return { score, total, pct: pctScore, passed: pctScore >= 60, byMod, wrongQIds };
  }

  const api = {
    esc, escB, norm, pct, b64EncodeUtf8, b64DecodeUtf8,
    calcAlteplaseDose, calcNIHSS, calcGCS, calcCHA2DS2VA, classifyPMR,
    sanitizeKeys, parseQuestionsInput, diagnoseQuestionsInput, parseBackupCode, parseMarkdown, scoreExam
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.HUB_LOGIC = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
