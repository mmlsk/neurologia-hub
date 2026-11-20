/* Moduł kliniczny: Skale neurologiczne, kalkulatory dawek (rtPA/TNK/SE) oraz Generator ordynacji */
window.HUB_CLINICAL = window.HUB_CLINICAL || {};

window.HUB_CLINICAL.calc = function (ctx) {
  'use strict';

  const {
    $, $$, main, esc, pct,
    calcAlteplaseDose, calcNIHSS, calcGCS, calcCHA2DS2VA,
    safeStorageSet, toast, getNotes, saveNotes
  } = ctx || {};

  const q1 = $ || ((s, r = document) => r.querySelector(s));
  const qAll = $$ || ((s, r = document) => [...r.querySelectorAll(s)]);
  const safeEsc = esc || (s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])));
  const notify = toast || (() => {});
  const CALC_STORAGE_KEY = 'neurologia_hub_calc_v1';

  const TABS = [
    { id: 'nihss', icon: '🧠', label: 'NIHSS (0–42)' },
    { id: 'gcs', icon: '👁️', label: 'GCS & FOUR' },
    { id: 'udar', icon: '💉', label: 'Tromboliza (rtPA/TNK)' },
    { id: 'padaczka', icon: '⚡', label: 'Stan padaczkowy (SE)' },
    { id: 'skale', icon: '📊', label: 'CHA₂DS₂-VA · ABCD² · mRS · H-H' },
    { id: 'recepty', icon: '💊', label: 'Ordynacja & Trening' }
  ];
  const VALID_TABS = new Set(TABS.map(t => t.id));
  const QUICK_WEIGHTS = [50, 60, 70, 75, 80, 90, 105, 120];

  const NIHSS_DOMAINS = [
    { id: '1a', label: '1a. Poziom przytomności', opts: ['0 · Czujny', '1 · Senny (drobny bodziec)', '2 · Otępiały (silny bodziec)', '3 · Śpiączka (brak celowych reakcji)'] },
    { id: '1b', label: '1b. Pytania (miesiąc i wiek)', opts: ['0 · Obie poprawne', '1 · Jedna poprawna', '2 · Obie błędne / afazja / śpiączka'] },
    { id: '1c', label: '1c. Polecenia (oczy i dłoń)', opts: ['0 · Oba wykonane', '1 · Jedno wykonane', '2 · Żadne niewykonane'] },
    { id: '2', label: '2. Spojrzenie poziome', opts: ['0 · Prawidłowe', '1 · Częściowe porażenie', '2 · Przymusowe zbaczanie / całkowite'] },
    { id: '3', label: '3. Pole widzenia', opts: ['0 · Bez ubytków', '1 · Częściowe (kwadrantowe)', '2 · Pełne połowicze', '3 · Obustronne / ślepota korowa'] },
    { id: '4', label: '4. Porażenie twarzy (n. VII)', opts: ['0 · Prawidłowe', '1 · Drobne (fałd nos.-warg.)', '2 · Częściowe (dolna część)', '3 · Całkowite (góra i dół)'] },
    { id: '5a', label: '5a. Kończyna górna lewa (10 s)', opts: ['0 · Bez opadania', '1 · Opada <10 s (w powietrzu)', '2 · Opada na łóżko (opór)', '3 · Brak ruchu vs grawitacja', '4 · Porażenie (brak ruchu)'] },
    { id: '5b', label: '5b. Kończyna górna prawa (10 s)', opts: ['0 · Bez opadania', '1 · Opada <10 s (w powietrzu)', '2 · Opada na łóżko (opór)', '3 · Brak ruchu vs grawitacja', '4 · Porażenie (brak ruchu)'] },
    { id: '6a', label: '6a. Kończyna dolna lewa (5 s)', opts: ['0 · Bez opadania', '1 · Opada <5 s (w powietrzu)', '2 · Opada na łóżko (opór)', '3 · Brak ruchu vs grawitacja', '4 · Porażenie (brak ruchu)'] },
    { id: '6b', label: '6b. Kończyna dolna prawa (5 s)', opts: ['0 · Bez opadania', '1 · Opada <5 s (w powietrzu)', '2 · Opada na łóżko (opór)', '3 · Brak ruchu vs grawitacja', '4 · Porażenie (brak ruchu)'] },
    { id: '7', label: '7. Ataksja kończyn', opts: ['0 · Brak', '1 · W 1 kończynie', '2 · W 2 kończynach'] },
    { id: '8', label: '8. Czucie powierzchowne', opts: ['0 · Prawidłowe', '1 · Osłabienie lekkie/umiark.', '2 · Zniesione / brak reakcji'] },
    { id: '9', label: '9. Mowa / Afazja', opts: ['0 · Prawidłowa', '1 · Afazja lekka/umiarkowana', '2 · Afazja ciężka', '3 · Mutyzm / afazja globalna'] },
    { id: '10', label: '10. Dyzartria', opts: ['0 · Prawidłowa', '1 · Lekka/umiark. (zamazana)', '2 · Ciężka (niezrozumiała)'] },
    { id: '11', label: '11. Wygaszanie / Zaniedbywanie', opts: ['0 · Brak', '1 · W 1 modalności', '2 · Ciężkie (>1 modalność)'] }
  ];

  const NIHSS_PROFILES = [
    { id: 'zero', label: '0 pkt · Norma', scores: {} },
    { id: 'tia', label: '3 pkt · Udar lekki', scores: { '4': 1, '5b': 1, '10': 1 } },
    { id: 'mcal', label: '14 pkt · MCA lewa (afazja)', scores: { '1b': 1, '3': 2, '4': 2, '5b': 3, '6b': 2, '8': 1, '9': 2, '10': 1 } },
    { id: 'mcar', label: '15 pkt · MCA prawa (zaniedbywanie)', scores: { '2': 1, '3': 2, '4': 2, '5a': 3, '6a': 3, '8': 2, '11': 2 } },
    { id: 'ba', label: '24 pkt · Tętnica podstawna (BA)', scores: { '1a': 2, '1b': 2, '1c': 2, '2': 2, '4': 2, '5a': 3, '5b': 3, '6a': 3, '6b': 3, '10': 2 } }
  ];

  const GCS_DOMAINS = [
    { id: 'e', label: 'E · Otwieranie oczu (1–4)', opts: [{ v: 4, t: '4 · Spontaniczne' }, { v: 3, t: '3 · Na polecenie' }, { v: 2, t: '2 · Na ból' }, { v: 1, t: '1 · Brak' }] },
    { id: 'v', label: 'V · Reakcja słowna (1–5)', opts: [{ v: 5, t: '5 · Zorientowany' }, { v: 4, t: '4 · Splątany' }, { v: 3, t: '3 · Nieodpowiednie słowa' }, { v: 2, t: '2 · Dźwięki' }, { v: 1, t: '1 · Brak (lub T)' }] },
    { id: 'm', label: 'M · Reakcja ruchowa (1–6)', opts: [{ v: 6, t: '6 · Spełnia polecenia' }, { v: 5, t: '5 · Lokalizuje ból' }, { v: 4, t: '4 · Wycofuje' }, { v: 3, t: '3 · Dekortykacja' }, { v: 2, t: '2 · Decerebracja' }, { v: 1, t: '1 · Brak' }] }
  ];

  const FOUR_TABLE = [
    ['Składnik', 'GCS (3–15 pkt)', 'Skala FOUR (0–16 pkt)'],
    ['Oczy', 'E (1–4): spontan., głos, ból, brak', 'E (0–4): śledzenie/mruganie na polecenie (4–0) — wykrywa zespół zamknięcia'],
    ['Mowa', 'V (1–5): brak oceny u zaintubowanych', 'Brak domeny słownej — wiarygodna u zaintubowanych i w afazji'],
    ['Ruch', 'M (1–6): od poleceń do braku', 'M (0–4): gest OK/pięść (4), lokalizacja (3), zginanie (2), wyprost (1), brak (0)'],
    ['Pień i oddech', 'Nieoceniane bezpośrednio w GCS', 'B (0–4): odruch źreniczny, rogówkowy, kaszlowy · R (0–4): tor oddechowy / bezdech']
  ];

  const RTPA_CONTRA = [
    ['ich', 'Krwotok śródczaszkowy (ICH) lub wczesna hipodensja >1/3 MCA w TK'],
    ['sah', 'Podejrzenie krwotoku podpajęczynówkowego (SAH) mimo ujemnego TK'],
    ['time', 'Czas od początku objawów >4,5 h (bez kwalifikacji mismatch w CTP/MR)'],
    ['bp', 'Niekontrolowane nadciśnienie ≥185/110 mmHg oporne na leczenie i.v.'],
    ['recent', 'Udar niedokrwienny, ciężki uraz głowy lub zabieg neurochirurgiczny <3 mies.'],
    ['bleed', 'Aktywne krwawienie wewnętrzne lub krwawienie z p. pokarmowego/moczowego <21 d'],
    ['coag', 'Koagulopatia: INR >1,7, PLT <100 tys./µl, heparyna <48 h (↑APTT) lub DOAC <48 h'],
    ['aorta', 'Rozwarstwienie aorty lub bakteryjne zapalenie wsierdzia'],
    ['hypo', 'Hipoglikemia <50 mg/dl wyjaśniająca deficyt ogniskowy (stroke mimic)']
  ].map(([id, label]) => ({ id, label }));

  const CHA_FLAGS = [
    ['chf', 'C (+1)', 'Niewydolność serca / LVEF ≤40%'],
    ['htn', 'H (+1)', 'Nadciśnienie tętnicze'],
    ['age75', 'A₂ (+2)', 'Wiek ≥75 lat (wyklucza A +1)'],
    ['dm', 'D (+1)', 'Cukrzyca'],
    ['stroke', 'S₂ (+2)', 'Przebyty udar / TIA / zatorowość'],
    ['vasc', 'V (+1)', 'Choroba naczyniowa (zawał, PAD, blaszki aorty)'],
    ['age65', 'A (+1)', 'Wiek 65–74 lata']
  ].map(([k, badge, label]) => ({ k, badge, label }));

  const ABCD2_ITEMS = [
    { id: 'a', label: 'A · Wiek ≥60 lat', opts: [{ v: 0, t: '0 · <60 lat' }, { v: 1, t: '+1 · ≥60 lat' }] },
    { id: 'b', label: 'B · BP ≥140/90 mmHg', opts: [{ v: 0, t: '0 · <140/90' }, { v: 1, t: '+1 · ≥140/90' }] },
    { id: 'c', label: 'C · Obraz kliniczny', opts: [{ v: 0, t: '0 · Inne' }, { v: 1, t: '+1 · Mowa bez niedowładu' }, { v: 2, t: '+2 · Niedowład jednostronny' }] },
    { id: 'd1', label: 'D₁ · Czas trwania', opts: [{ v: 0, t: '0 · <10 min' }, { v: 1, t: '+1 · 10–59 min' }, { v: 2, t: '+2 · ≥60 min' }] },
    { id: 'd2', label: 'D₂ · Cukrzyca', opts: [{ v: 0, t: '0 · Brak' }, { v: 1, t: '+1 · Tak' }] }
  ];

  const MRS_LEVELS = [
    '0 · Brak objawów', '1 · Bez istotnej niepełnosprawności (pełna aktywność)',
    '2 · Lekka (samodzielny, bez części dawnych aktywności)', '3 · Umiarkowana (wymaga pomocy, chodzi samodzielnie)',
    '4 · Umiarkowanie ciężka (nie chodzi sam, wymaga opieki)', '5 · Ciężka (leżący, stała opieka pielęgniarska)', '6 · Zgon'
  ];

  const HUNT_HESS_LEVELS = [
    { v: 1, t: 'I° · Bezobjawowy / lekki ból głowy, dyskretna sztywność karku', note: 'Rokowanie najkorzystniejsze; pilne angio-TK i zaopatrzenie tętniaka (klips/coiling).' },
    { v: 2, t: 'II° · Silny ból głowy, sztywność karku, izolowane porażenie n. czaszkowego (np. n. III)', note: 'Porażenie n. III z mydriazą alarmuje o tętniaku tętnicy łączącej tylnej (PComA).' },
    { v: 3, t: 'III° · Senność, splątanie lub łagodny ubytek ogniskowy', note: 'Konieczny ścisły nadzór neurochirurgiczny/OIT i profilaktyka nimodypiną.' },
    { v: 4, t: 'IV° · Stupor, umiark./ciężki niedowład połowiczy, wczesna dekortykacja', note: 'Wysokie ryzyko skurczu naczyniowego, wodogłowia i wtórnego niedokrwienia (DCI).' },
    { v: 5, t: 'V° · Głęboka śpiączka, prężenia odmóżdżeniowe, stan krytyczny', note: 'Bezpośrednie zagrożenie życia — OIT, kontrola ICP i drenaż komorowy przy wodogłowiu.' }
  ];

  const clampW = v => Math.max(30, Math.min(160, Number.isFinite(+v) ? Math.round(+v * 10) / 10 : 75));
  const round1 = n => Math.round(n * 10) / 10;
  const getMeta = () => (typeof window !== 'undefined' && window.HUB_META) ? window.HUB_META : {};
  const getDrugs = () => Array.isArray(getMeta().NEURO_DRUG_DATABASE) ? getMeta().NEURO_DRUG_DATABASE : [];
  const getChallenges = () => Array.isArray(getMeta().PRESCRIPTION_CHALLENGES) ? getMeta().PRESCRIPTION_CHALLENGES : [];
  const calcRow = (k, v, hi) => `<div class="presc-calc-row"><span>${k}</span><strong class="mono"${hi ? ' style="color:var(--teal)"' : ''}>${safeEsc(v)}</strong></div>`;

  function defaultState() {
    const nihss = {};
    NIHSS_DOMAINS.forEach(d => { nihss[d.id] = 0; });
    return {
      tab: 'nihss', w: 75, nihss, gcs: { e: 4, v: 5, m: 6 }, rtpaContra: {},
      seAccess: 'iv', seStage: 'all',
      cha: { chf: false, htn: false, age75: false, dm: false, stroke: false, vasc: false, age65: false },
      abcd2: { a: 0, b: 0, c: 0, d1: 0, d2: 0 }, mrs: 2, hh: 2,
      presc: { mode: 'generator', cat: 'all', drugId: '', indIdx: 0, formIdx: 0 },
      chal: { activeId: '', stepIdx: 0, answers: {}, done: {} }
    };
  }

  function loadState() {
    const base = defaultState();
    try {
      const p = JSON.parse(localStorage.getItem(CALC_STORAGE_KEY) || 'null');
      if (!p || typeof p !== 'object') return base;
      if (VALID_TABS.has(p.tab)) base.tab = p.tab;
      if (p.w != null) base.w = clampW(p.w);
      if (p.nihss && typeof p.nihss === 'object') NIHSS_DOMAINS.forEach(d => {
        const val = Number(p.nihss[d.id]);
        if (Number.isFinite(val)) base.nihss[d.id] = Math.max(0, Math.min(d.opts.length - 1, Math.round(val)));
      });
      if (p.gcs) base.gcs = { e: Math.max(1, Math.min(4, +p.gcs.e || 4)), v: Math.max(1, Math.min(5, +p.gcs.v || 5)), m: Math.max(1, Math.min(6, +p.gcs.m || 6)) };
      if (p.rtpaContra && typeof p.rtpaContra === 'object') base.rtpaContra = p.rtpaContra;
      if (p.seAccess === 'iv' || p.seAccess === 'noiv') base.seAccess = p.seAccess;
      if (['all', '0', '1', '2', '3'].includes(p.seStage)) base.seStage = p.seStage;
      if (p.cha) Object.keys(base.cha).forEach(k => { base.cha[k] = !!p.cha[k]; });
      if (p.abcd2) Object.keys(base.abcd2).forEach(k => { base.abcd2[k] = Number(p.abcd2[k]) || 0; });
      if (Number.isFinite(+p.mrs)) base.mrs = Math.max(0, Math.min(6, Math.round(+p.mrs)));
      if (Number.isFinite(+p.hh)) base.hh = Math.max(1, Math.min(5, Math.round(+p.hh)));
      if (p.presc) Object.assign(base.presc, p.presc);
      if (p.chal) Object.assign(base.chal, { activeId: p.chal.activeId || '', stepIdx: +p.chal.stepIdx || 0, answers: p.chal.answers || {}, done: p.chal.done || {} });
    } catch (e) {}
    return base;
  }

  let state = loadState();

  function saveState() {
    const json = JSON.stringify(state);
    if (typeof safeStorageSet === 'function') safeStorageSet(CALC_STORAGE_KEY, json);
    else { try { localStorage.setItem(CALC_STORAGE_KEY, json); } catch (e) {} }
  }

  function copyToClipboard(text, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => notify(msg || 'Skopiowano'), () => fallbackCopy(text, msg));
    } else fallbackCopy(text, msg);
  }

  function fallbackCopy(text, msg) {
    try {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      notify(msg || 'Skopiowano');
    } catch (e) { notify('Nie udało się skopiować tekstu'); }
  }

  function renderScaleRow(label, opts, currentVal, attrName, itemKey) {
    return `<div class="scale-row"><div><strong>${safeEsc(label)}</strong></div><div class="scale-opt-group">${opts.map((opt, idx) => {
      const val = typeof opt === 'object' ? opt.v : idx;
      const txt = typeof opt === 'object' ? opt.t : opt;
      const on = Number(currentVal) === Number(val);
      return `<button type="button" class="scale-opt-btn${on ? ' active' : ''}" data-${attrName}="${safeEsc(itemKey)}" data-val="${val}" aria-pressed="${on}">${safeEsc(txt)}</button>`;
    }).join('')}</div></div>`;
  }

  function renderNIHSS() {
    const res = calcNIHSS(state.nihss);
    const tone = res.total === 0 ? 'green' : res.total <= 4 ? 'teal' : res.total <= 15 ? 'amber' : 'red';
    const dose = calcAlteplaseDose(state.w);
    return `<div class="scale-card">
      <div class="scale-header">
        <div><div class="eyebrow">11 domen (15 pozycji) · Ocena udaru mózgu</div><h3>Skala NIHSS (National Institutes of Health Stroke Scale)</h3><p class="muted" style="font-size:.9rem;margin-top:.2rem">${safeEsc(res.label)}</p></div>
        <div class="scale-score-badge" style="color:var(--${tone});background:var(--${tone}-l)">${res.total} / 42</div>
      </div>
      <div class="pillrow" style="margin-bottom:.9rem">
        ${NIHSS_PROFILES.map(p => `<button type="button" class="calc-pill" data-nihss-profile="${p.id}">${safeEsc(p.label)}</button>`).join('')}
        <button type="button" class="btn sec sm" id="btnResetNihss">Zeruj skalę</button>
      </div>
      <div class="why" style="margin-bottom:1rem">
        <h4>Kontekst kwalifikacji (PUM #6)</h4>
        <p>${res.total >= 6 ? '<strong>NIHSS ≥6 pkt</strong> + okluzja dużego naczynia (LVO) w angio-TK = rozważ <strong>trombektomię mechaniczną</strong> (≤6 h lub 6–24 h przy mismatch) równolegle z trombolizą i.v.' : '<strong>Niski NIHSS (1–5 pkt)</strong> nie wyklucza trombolizy i.v., jeśli deficyt powoduje istotną niesprawność (np. izolowana afazja lub niedowidzenie).'} Dla masy <strong>${state.w} kg</strong>: alteplaza <strong>${dose.totalMg} mg</strong>, TNK <strong>${dose.tnkMg} mg</strong>.</p>
      </div>
      ${NIHSS_DOMAINS.map(d => renderScaleRow(d.label, d.opts, state.nihss[d.id] || 0, 'nihss-item', d.id)).join('')}
      <div class="acts" style="margin-top:1.1rem;padding-top:.9rem;border-top:1px solid var(--line-2)">
        <button type="button" class="btn pri sm" id="btnExportNihss">📝 Eksportuj wynik do Notatnika</button>
        <button type="button" class="btn sec sm" id="btnCopyNihss">📋 Kopiuj podsumowanie</button>
        <a class="btn sec sm" href="#/kalkulator?tab=udar">Przejdź do dawki rtPA/TNK →</a>
      </div>
    </div>`;
  }

  function renderGCS() {
    const g = calcGCS(state.gcs.e, state.gcs.v, state.gcs.m);
    const tone = g.airwayAlert ? 'red' : g.total <= 12 ? 'amber' : 'green';
    const presets = [[15, '15 · Norma', 4, 5, 6], [12, '12 · Splątany', 4, 4, 4], [8, '8 · Próg intubacji', 2, 2, 4], [5, '5 · Śpiączka', 1, 1, 3], [3, '3 · Brak reakcji', 1, 1, 1]];
    return `<div class="scale-card">
      <div class="scale-header">
        <div><div class="eyebrow">Ocena przytomności dorosłego (E + V + M)</div><h3>Skala śpiączki Glasgow (GCS)</h3><p class="muted" style="font-size:.9rem;margin-top:.2rem">E${g.eyes} V${g.verbal} M${g.motor} · ${safeEsc(g.category)}</p></div>
        <div class="scale-score-badge" style="color:var(--${tone});background:var(--${tone}-l)">${g.total} / 15</div>
      </div>
      ${g.airwayAlert
        ? `<div class="presc-warning-box" style="margin-bottom:1rem"><strong>🚨 ALERT DRÓG ODDECHOWYCH (GCS ≤8 pkt):</strong> Pilne zabezpieczenie dróg oddechowych (intubacja dotchawicza), ocena odruchów pniowych, glikemia oraz pilne TK głowy bez kontrastu.</div>`
        : g.total <= 12
          ? `<div class="presc-alert-warning" style="margin-bottom:1rem"><strong>⚠️ Umiarkowane zaburzenia świadomości (9–12 pkt):</strong> Ścisły nadzór neurologiczny co 15–30 min pod kątem narastającego ICP i spadku GCS.</div>`
          : `<div class="why" style="margin-bottom:1rem"><h4>Stan łagodny / przytomny (${g.total} pkt)</h4><p>Niezależnie od sumy GCS zawsze badaj reaktywność źrenic oraz orientację auto- i allopsychiczną.</p></div>`}
      <div class="pillrow" style="margin-bottom:.8rem">${presets.map(([, l, e, v, m]) => `<button type="button" class="calc-pill" data-gcs-preset="1" data-e="${e}" data-v="${v}" data-m="${m}">${l}</button>`).join('')}</div>
      ${GCS_DOMAINS.map(d => renderScaleRow(d.label, d.opts, state.gcs[d.id], 'gcs-part', d.id)).join('')}
    </div>
    <div class="card">
      <div class="eyebrow">Porównanie kliniczno-egzaminacyjne</div>
      <h3 style="margin-bottom:.75rem">Skala GCS vs Skala FOUR (Full Outline of UnResponsiveness)</h3>
      <div class="matrix-wrap"><table style="width:100%;border-collapse:collapse;font-size:.88rem">
        <thead><tr style="border-bottom:2px solid var(--line);text-align:left">${FOUR_TABLE[0].map(h => `<th style="padding:.5rem .6rem;color:var(--muted);font-size:.78rem;text-transform:uppercase">${safeEsc(h)}</th>`).join('')}</tr></thead>
        <tbody>${FOUR_TABLE.slice(1).map(row => `<tr style="border-bottom:1px solid var(--line-2)">${row.map((c, i) => `<td style="padding:.55rem .6rem;vertical-align:top;${i === 0 ? 'font-weight:800;white-space:nowrap' : ''}">${safeEsc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
    </div>`;
  }

  function renderUdar() {
    const d = calcAlteplaseDose(state.w);
    const checked = RTPA_CONTRA.filter(c => state.rtpaContra[c.id]);
    return `<div class="drug-grid">
      <div class="drug-card">
        <div class="drug-header"><div><div class="eyebrow" style="color:var(--red)">Tromboliza i.v. · I rzut (≤4,5 h)</div><div class="drug-title">Alteplaza (rtPA · 1 mg/ml)</div></div><span class="chip m">0,9 mg/kg (max 90)</span></div>
        <div class="drug-result-box"><div><div class="drug-formula">Dawka całkowita (${d.weight} kg)</div><div class="drug-result-dose">${d.totalMg} mg</div></div><div class="drug-result-vol">${d.totalMg} ml</div></div>
        <div class="presc-calc-summary" style="margin-top:.2rem">
          ${calcRow('1. Bolus i.v. (10% w 1 min):', `${d.bolusMg} mg (${d.bolusMl} ml)`)}
          ${calcRow('2. Wlew i.v. (90% w 60 min):', `${d.infusionMg} mg (${d.infusionMl} ml)`)}
          ${calcRow('Prędkość pompy:', `${d.rateMlPerHr} ml/h`, true)}
        </div>
        <div class="drug-notes">Wyklucz krwawienie w TK głowy. BP przed bolusem &lt;185/110 mmHg (w trakcie i 24 h po: &lt;180/105 mmHg).</div>
        ${d.weight > 100 ? `<div class="drug-alert">Osiągnięto pułap maksymalnej dawki 90 mg (masa ≥100 kg).</div>` : ''}
      </div>
      <div class="drug-card">
        <div class="drug-header"><div><div class="eyebrow" style="color:var(--teal)">Alternatywa / Przed MT</div><div class="drug-title">Tenekteplaza (TNK)</div></div><span class="chip m">0,25 mg/kg (max 25)</span></div>
        <div class="drug-result-box"><div><div class="drug-formula">Pojedynczy bolus i.v. (5–10 s)</div><div class="drug-result-dose">${d.tnkMg} mg</div></div><span class="chip on">Bez pompy 60 min</span></div>
        <div class="drug-notes">Wytyczne ESO 2023/2024: pojedyncze wstrzyknięcie i.v. w oknie ≤4,5 h; korzystne logistycznie przed trombektomią mechaniczną w LVO.</div>
        ${d.weight > 100 ? `<div class="drug-alert">Maksymalna dawka TNK w udarze niedokrwiennym wynosi 25 mg.</div>` : ''}
      </div>
      <div class="drug-card">
        <div class="drug-header"><div><div class="eyebrow" style="color:var(--amber)">Kwalifikacja naczyniowa (PUM #6)</div><div class="drug-title">Trombektomia mechaniczna (MT)</div></div><span class="chip">LVO: ICA · M1 · BA</span></div>
        <div class="drug-notes"><p><strong>• Standard:</strong> ≤6 h (brak krwotoku w TK + LVO w angio-TK).</p><p style="margin-top:.3rem"><strong>• Okno rozszerzone:</strong> 6–24 h wg DAWN/DEFUSE-3 (mismatch w CTP/MR).</p><p style="margin-top:.3rem"><strong>• Cele SOR:</strong> glikemia 140–180 mg/dl; bez ASA/heparyny przez 24 h po rtPA.</p></div>
      </div>
    </div>
    <div class="card">
      <div class="scale-header"><div><div class="eyebrow">Bezpieczeństwo kwalifikacji</div><h3>Checklista przeciwwskazań do trombolizy i.v. (rtPA / TNK)</h3></div><button type="button" class="btn sec sm" id="btnResetRtpa">Wyczyść checklistę</button></div>
      ${checked.length
        ? `<div class="presc-warning-box" style="margin-bottom:1rem"><strong>⛔ Wykryto ${checked.length} przeciwwskazania/zastrzeżenia do rtPA:</strong> ${checked.map(c => safeEsc(c.label)).join('; ')}.<br><strong>Przeciwwskazanie do rtPA (np. krzepnięcie, DOAC, zabieg) NIE wyklucza trombektomii mechanicznej (MT) w LVO!</strong></div>`
        : `<div class="why" style="margin-bottom:1rem"><h4>✅ Brak zaznaczonych przeciwwskazań</h4><p>Po wykluczeniu krwotoku w TK pacjent kwalifikuje się do rozważenia rtPA (${d.totalMg} mg) lub TNK (${d.tnkMg} mg) w oknie czasowym.</p></div>`}
      <div style="display:grid;gap:.5rem">${RTPA_CONTRA.map(c => {
        const on = !!state.rtpaContra[c.id];
        return `<label class="chk" style="padding:.5rem .7rem;border-radius:10px;border:1px solid ${on ? 'var(--red)' : 'var(--line-2)'};background:${on ? 'var(--red-l)' : 'var(--bg)'}"><input type="checkbox" data-rtpa-contra="${c.id}" ${on ? 'checked' : ''}><span>${safeEsc(c.label)}</span></label>`;
      }).join('')}</div>
    </div>`;
  }

  function renderPadaczka() {
    const w = state.w;
    const isIV = state.seAccess === 'iv';
    const f = state.seStage;
    const lorMg = round1(Math.min(4, w * 0.1));
    const dzpMin = round1(Math.min(10, w * 0.15));
    const dzpMax = round1(Math.min(10, w * 0.2));
    const levMg = Math.min(4500, Math.round(w * 60));
    const vpaMg = Math.min(3000, Math.round(w * 40));
    const phtMg = Math.min(1500, Math.round(w * 20));
    const show = id => f === 'all' || f === id;

    return `<div class="card" style="margin-bottom:1.1rem">
      <div class="scale-header" style="margin-bottom:.75rem">
        <div><div class="eyebrow" style="color:var(--red)">Protokół ILAE / AES / PTN · Masa ${w} kg</div><h3>Stan padaczkowy (SE) — dawkowanie wg fazy</h3></div>
        <div class="seg" role="group" aria-label="Dostęp naczyniowy">
          <button type="button" data-se-access="iv" aria-pressed="${isIV}">Dostęp i.v. jest</button>
          <button type="button" data-se-access="noiv" aria-pressed="${!isIV}">Brak i.v. (i.m./i.n.)</button>
        </div>
      </div>
      <div class="pillrow">${[['all', 'Wszystkie fazy'], ['0', '0–5 min · ABCDE'], ['1', '5–20 min · I rzut BZD'], ['2', '20–40 min · II rzut'], ['3', '>40 min · OIT (RSE)']].map(([id, lbl]) =>
        `<button type="button" class="calc-pill${f === id ? ' active' : ''}" data-se-stage="${id}">${lbl}</button>`
      ).join('')}</div>
    </div>
    <div class="drug-grid">
      ${show('0') ? `<div class="drug-card">
        <div class="drug-header"><div><div class="eyebrow">Faza 0 · 0–5 min</div><div class="drug-title">Stabilizacja i diagnostyka</div></div><span class="chip">ABCDE · Bez BZD</span></div>
        <div class="drug-notes">
          <p>• Drogi oddechowe, O₂, EKG/SpO₂/BP, 2 wkłucia i.v.</p>
          <p style="margin-top:.3rem">• <strong>Glikemia włośniczkowa:</strong> przy hipoglikemii (&lt;60 mg/dl) podaj <strong>Tiaminę 100 mg i.v.</strong> przed <strong>glukozą 20–40% i.v.</strong> (ochrona przed encefalopatią Wernickego).</p>
          <p style="margin-top:.3rem">• Krew: Na⁺, Ca²⁺, Mg²⁺, gazometria, stężenie leków p/padaczkowych, toksykologia. Napad &gt;5 min (t₁) = lecz jak SE.</p>
        </div>
      </div>` : ''}
      ${show('1') ? `<div class="drug-card" style="border-color:var(--amber)">
        <div class="drug-header"><div><div class="eyebrow" style="color:var(--amber)">Faza I · 5–20 min (I rzut)</div><div class="drug-title">${isIV ? 'Benzodiazepiny i.v.' : 'Brak dostępu i.v. — Midazolam i.m.'}</div></div><span class="chip">Masa ${w} kg</span></div>
        ${isIV ? `<div class="drug-result-box"><div><div class="drug-formula">Lorazepam i.v. (0,1 mg/kg · max 4 mg)</div><div class="drug-result-dose">${lorMg} mg i.v.</div></div><span class="chip on">Wybór i.v.</span></div>
          <div class="presc-calc-summary" style="margin-top:.1rem">${calcRow('Alternatywa: Diazepam i.v. (0,15–0,2 mg/kg, max 10 mg):', `${dzpMin}–${dzpMax} mg`)}${calcRow('Powtórzenie:', 'maks. 1× po 5–10 min')}</div>`
          : `<div class="drug-result-box"><div><div class="drug-formula">Midazolam i.m. (RAMPART: ≥40 kg → 10 mg)</div><div class="drug-result-dose">${w >= 40 ? '10 mg' : '5 mg'} i.m.</div></div><span class="chip on">Natychmiast</span></div>
          <div class="drug-notes">Alternatywnie midazolam donosowo lub dopoliczkowo 10 mg bez czekania na wkłucie i.v.</div>`}
        <div class="drug-alert">Maks. 2 dawki BZD — większa liczba nasila depresję oddechową i opóźnia fazę II.</div>
      </div>` : ''}
      ${show('2') ? `<div class="drug-card" style="border-color:var(--red)">
        <div class="drug-header"><div><div class="eyebrow" style="color:var(--red)">Faza II · 20–40 min (ESETT)</div><div class="drug-title">Nasycenie nie-BZD i.v.</div></div><span class="chip m">LEV / VPA / PHT</span></div>
        <div class="presc-calc-summary" style="margin-top:0">
          ${calcRow('Lewetyracetam (60 mg/kg, max 4500 mg):', `${levMg} mg (${round1(levMg / 1000)} g)`, true)}
          ${calcRow('Walproinian sodu (40 mg/kg, max 3000 mg):', `${vpaMg} mg`)}
          ${calcRow('Fenytoina (20 mg/kg, max 1500 mg, ≤50 mg/min):', `${phtMg} mg`)}
        </div>
        <div class="drug-notes">ESETT: równorzędna skuteczność LEV, VPA i fPHT (~45–47%). <strong>LEV</strong> najbezpieczniejszy w interakcjach; <strong>VPA</strong> unikaj u kobiet w wieku rozrodczym i w hepatopatiach; <strong>PHT</strong> monitoruj EKG i BP.</div>
      </div>` : ''}
      ${show('3') ? `<div class="drug-card">
        <div class="drug-header"><div><div class="eyebrow" style="color:var(--violet)">Faza III · &gt;40 min (RSE)</div><div class="drug-title">OIT · Znieczulenie + cEEG</div></div><span class="chip">Intubacja + cEEG</span></div>
        <div class="presc-calc-summary" style="margin-top:0">
          ${calcRow('Midazolam (bolus 0,2 mg/kg):', `${round1(w * 0.2)} mg → ${round1(w * 0.05)}–${round1(w * 2)} mg/h`)}
          ${calcRow('Propofol (bolus 1–2 mg/kg):', `${Math.round(w)}–${Math.round(w * 2)} mg → ${Math.round(w * 2)}–${Math.round(w * 5)} mg/h`)}
          ${calcRow('Tiopental (bolus 2–5 mg/kg):', `${Math.round(w * 2)}–${Math.round(w * 5)} mg → ${Math.round(w)}–${Math.round(w * 5)} mg/h`)}
        </div>
        <div class="drug-notes">Ciągły zapis EEG (cel: wyciszenie wyładowań / <em>burst-suppression</em>) oraz diagnostyka przyczynowa (zapalenie mózgu, udar, odstawienie leków).</div>
      </div>` : ''}
    </div>`;
  }

  function renderSkale() {
    const chaRes = calcCHA2DS2VA(state.cha);
    const abcdSum = ['a', 'b', 'c', 'd1', 'd2'].reduce((s, k) => s + (Number(state.abcd2[k]) || 0), 0);
    const abcdTone = abcdSum <= 3 ? 'green' : abcdSum <= 5 ? 'amber' : 'red';
    const abcdTxt = abcdSum <= 3 ? 'Niskie ryzyko (~1,0% udaru w 2 dni)' : abcdSum <= 5 ? 'Umiarkowane (~4,1% w 2 dni · diagnostyka <24 h)' : 'Wysokie (~8,1% w 2 dni · pilna hospitalizacja + DAPT 21 d)';
    const hhObj = HUNT_HESS_LEVELS.find(x => x.v === state.hh) || HUNT_HESS_LEVELS[0];
    const mrsTone = state.mrs <= 2 ? 'green' : state.mrs <= 5 ? 'amber' : 'red';
    const mrsTxt = state.mrs <= 2 ? 'Dobry wynik funkcjonalny (niezależność)' : state.mrs <= 5 ? 'Zależność od opieki' : 'Zgon';

    return `<div class="calc-two-col">
      <div class="scale-card" style="margin-bottom:0">
        <div class="scale-header"><div><div class="eyebrow">Migotanie przedsionków (ESC 2024)</div><h3>CHA₂DS₂-VA</h3></div><div class="scale-score-badge">${chaRes.total} / 8</div></div>
        <div style="display:grid;gap:.45rem;margin-bottom:.85rem">${CHA_FLAGS.map(fl => {
          const on = !!state.cha[fl.k];
          return `<button type="button" class="presc-ind-btn${on ? ' active' : ''}" data-cha-flag="${fl.k}" aria-pressed="${on}" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem"><span>${safeEsc(fl.label)}</span><span class="chip${on ? ' on' : ''}">${fl.badge}</span></button>`;
        }).join('')}</div>
        <div class="why"><h4>Zalecenie</h4><p>${safeEsc(chaRes.recommendation)}</p></div>
        <div class="dual" style="margin-top:.7rem">
          <div class="dbox z"><h4>Pod zaliczenie</h4>Klasycznie pytano o CHA₂DS₂-VASc (+1 pkt za płeć żeńską).</div>
          <div class="dbox a"><h4>Aktualnie (ESC 2024)</h4><strong>CHA₂DS₂-VA</strong> bez kryterium płci (≥2 pkt = klasa I dla DOAC).</div>
        </div>
      </div>
      <div class="scale-card" style="margin-bottom:0">
        <div class="scale-header"><div><div class="eyebrow">Ryzyko udaru po TIA</div><h3>Skala ABCD²</h3></div><div class="scale-score-badge" style="color:var(--${abcdTone});background:var(--${abcdTone}-l)">${abcdSum} / 7</div></div>
        ${ABCD2_ITEMS.map(it => renderScaleRow(it.label, it.opts, state.abcd2[it.id] || 0, 'abcd-key', it.id)).join('')}
        <div class="presc-ind-note" style="margin-top:.85rem"><strong>Interpretacja:</strong> ${safeEsc(abcdTxt)}</div>
      </div>
      <div class="scale-card" style="margin-bottom:0">
        <div class="scale-header"><div><div class="eyebrow">Niesprawność poudarowa</div><h3>Zmodyfikowana Skala Rankina (mRS)</h3></div><div class="scale-score-badge" style="color:var(--${mrsTone});background:var(--${mrsTone}-l)">${state.mrs} / 6</div></div>
        <div style="display:grid;gap:.4rem;margin-bottom:.8rem">${MRS_LEVELS.map((t, v) => `<button type="button" class="scale-opt-btn${state.mrs === v ? ' active' : ''}" data-mrs-val="${v}">${safeEsc(t)}</button>`).join('')}</div>
        <div class="presc-ind-note"><strong>Ocena:</strong> ${safeEsc(mrsTxt)}. W kwalifikacji do MT ocenia się wyjściowy mRS sprzed udaru (standardowo 0–2).</div>
      </div>
      <div class="scale-card" style="margin-bottom:0">
        <div class="scale-header"><div><div class="eyebrow">Krwotok podpajęczynówkowy (SAH)</div><h3>Skala Hunta i Hessa (I–V)</h3></div><div class="scale-score-badge" style="color:var(--${state.hh >= 4 ? 'red' : 'amber'});background:var(--${state.hh >= 4 ? 'red' : 'amber'}-l)">${state.hh}°</div></div>
        <div style="display:grid;gap:.4rem;margin-bottom:.8rem">${HUNT_HESS_LEVELS.map(lv => `<button type="button" class="scale-opt-btn${state.hh === lv.v ? ' active' : ''}" data-hh-val="${lv.v}">${safeEsc(lv.t)}</button>`).join('')}</div>
        <div class="tip"><h4>Klinika SAH</h4><p>${safeEsc(hhObj.note)} Profilaktyka skurczu naczyniowego: <strong>nimodypina 60 mg p.o. co 4 h</strong> przez 21 dni.</p></div>
      </div>
    </div>`;
  }

  function normDrug(d, idx) {
    const rawInds = Array.isArray(d.indications) && d.indications.length ? d.indications : [{ label: d.indication || 'Dawkowanie standardowe', fixedDose: d.dose || '' }];
    const rawForms = Array.isArray(d.forms || d.formulations) && (d.forms || d.formulations).length ? (d.forms || d.formulations) : [{ label: d.form || 'Postać standardowa' }];
    const route = String(d.defaultRoute || '').toLowerCase();
    const setting = d.setting || d.type || d.mode || (route === 'i.v.' ? 'hospital' : (route.includes('i.v.') ? 'both' : 'rx'));
    return Object.assign({}, d, {
      id: String(d.id || ('drug-' + idx)),
      name: d.name || d.title || d.drug || 'Lek neurologiczny',
      cat: d.categoryName || d.cat || d.category || 'Inne',
      brand: d.brand || (Array.isArray(d.tradeNames) ? d.tradeNames.join(', ') : ''),
      setting,
      indications: rawInds.map(x => typeof x === 'string' ? { label: x } : Object.assign({}, x, {
        label: x.label || x.name || 'Dawkowanie standardowe',
        fixedDose: x.fixedDose || x.dose || x.doseScheme || ''
      })),
      forms: rawForms.map(x => typeof x === 'string' ? { label: x } : Object.assign({}, x, {
        label: x.label || x.name || 'Postać standardowa',
        pack: x.pack || x.packLabel || '',
        strength: x.strength || x.strengthLabel || '',
        concMgMl: x.concMgMl ?? x.conc ?? x.strengthMgPerMl
      }))
    });
  }

  function formatDrugOrder(drug, ind, form, w) {
    const mgKg = Number(ind.mgKg ?? ind.doseMgKg ?? ind.mgPerKg);
    const fixedMg = Number(ind.fixedMg ?? ind.fixedDoseMg ?? ind.doseMg);
    const maxSingle = Number(ind.maxMg ?? ind.maxSingleMg);
    let calcMg = null, capped = false;
    if (Number.isFinite(mgKg) && mgKg > 0) {
      calcMg = round1(w * mgKg);
      if (Number.isFinite(maxSingle) && maxSingle > 0 && calcMg > maxSingle) { calcMg = maxSingle; capped = true; }
    } else if (Number.isFinite(fixedMg) && fixedMg > 0) calcMg = fixedMg;

    const doseStr = calcMg != null ? `${calcMg >= 100 ? Math.round(calcMg) : calcMg} mg` : (ind.fixedDose || ind.dose || form.strength || 'Wg schematu klinicznego');
    const conc = Number(form.concMgMl ?? form.conc), str = Number(form.strengthMg ?? form.mgPerTab);
    const vol = calcMg == null ? '' : (Number.isFinite(conc) && conc > 0) ? `${round1(calcMg / conc)} ml` : (Number.isFinite(str) && str > 0) ? `${round1(calcMg / str)} ${form.unit || 'tabl.'}` : '';
    const fill = s => String(s || '').replace(/\{dose\}/g, doseStr).replace(/\{vol\}/g, vol || doseStr).replace(/\{w\}/g, String(w)).replace(/\{freq\}/g, ind.freq || '');
    return {
      doseStr, vol, capped, maxDaily: Number(ind.maxDailyMg ?? ind.maxDaily), freq: ind.freq || '', note: ind.note || ind.desc || '',
      rpText: fill(form.rp || form.rx || `${drug.name} — ${form.label}${form.pack ? `\nOp. orig. ${form.pack}` : ''}`),
      dsText: fill(ind.ds || ind.dsTemplate || ind.sig || drug.ds || `${doseStr}${vol ? ` (${vol})` : ''}${ind.freq ? ` · ${ind.freq}` : ''}`)
    };
  }

  function renderPrescGenerator(drugs) {
    if (!drugs.length) return `<div class="card"><h3>Brak bazy leków</h3><p class="muted" style="margin-top:.3rem">Brak danych <code>window.HUB_META.NEURO_DRUG_DATABASE</code>.</p></div>`;
    const list = drugs.map(normDrug);
    const cats = ['all', ...new Set(list.map(d => d.cat))];
    if (!cats.includes(state.presc.cat)) state.presc.cat = 'all';
    const filtered = state.presc.cat === 'all' ? list : list.filter(d => d.cat === state.presc.cat);
    const activeDrug = filtered.find(d => d.id === state.presc.drugId) || filtered[0];
    state.presc.drugId = activeDrug.id;
    const indIdx = Math.min(state.presc.indIdx || 0, activeDrug.indications.length - 1);
    const formIdx = Math.min(state.presc.formIdx || 0, activeDrug.forms.length - 1);
    const activeInd = activeDrug.indications[indIdx], activeForm = activeDrug.forms[formIdx];
    const order = formatDrugOrder(activeDrug, activeInd, activeForm, state.w);
    const setting = activeInd.setting || activeForm.setting || activeDrug.setting || 'rx';
    const advice = [].concat(activeDrug.advice || activeDrug.patientAdvice || activeDrug.counseling || []).filter(Boolean);
    const warn = [].concat(activeDrug.warning || activeDrug.warnings || activeDrug.contraindications || []).filter(Boolean);

    return `<div class="presc-cat-pills">${cats.map(c => `<button type="button" class="presc-cat-pill${state.presc.cat === c ? ' active' : ''}" data-presc-cat="${safeEsc(c)}">${c === 'all' ? 'Wszystkie grupy' : safeEsc(c)}</button>`).join('')}</div>
    <div class="presc-drug-grid">${filtered.map(d => `<button type="button" class="presc-drug-btn${d.id === activeDrug.id ? ' active' : ''}" data-presc-drug="${safeEsc(d.id)}">
      <div style="display:flex;justify-content:space-between;gap:.4rem;align-items:center"><strong>${safeEsc(d.name)}</strong><span class="chip">${d.setting === 'hospital' ? 'SOR/Oddział' : d.setting === 'both' ? 'SOR + e-Rp' : 'e-Recepta'}</span></div>
      <small class="muted">${safeEsc(d.cat)}${d.brand ? ` · ${safeEsc(d.brand)}` : ''}</small>
    </button>`).join('')}</div>
    <div class="presc-workspace-grid">
      <div class="presc-config-card">
        <div class="eyebrow">1. Wskazanie i postać</div><h3 style="margin-bottom:.7rem">${safeEsc(activeDrug.name)}</h3>
        <div style="display:grid;gap:.4rem;margin-bottom:.85rem">${activeDrug.indications.map((ind, i) => `<button type="button" class="presc-ind-btn${i === indIdx ? ' active' : ''}" data-presc-ind="${i}">${safeEsc(ind.label || ind.name || `Wskazanie ${i + 1}`)}</button>`).join('')}</div>
        ${order.note ? `<div class="presc-ind-note">${safeEsc(order.note)}</div>` : ''}
        ${activeDrug.forms.length > 1 ? `<div style="margin-top:.85rem"><div class="eyebrow">Postać / stężenie</div><div style="display:grid;gap:.4rem">${activeDrug.forms.map((fm, i) => `<button type="button" class="presc-ind-btn${i === formIdx ? ' active' : ''}" data-presc-form="${i}">${safeEsc(fm.label || fm.name)}</button>`).join('')}</div></div>` : ''}
        <div class="presc-calc-summary">
          ${calcRow('Masa pacjenta:', `${state.w} kg`)}
          ${calcRow('Wyliczona dawka:', order.doseStr, true)}
          ${order.vol ? calcRow('Objętość / jednostki:', order.vol) : ''}
          ${order.freq ? calcRow('Schemat podawania:', order.freq) : ''}
          ${Number.isFinite(order.maxDaily) && order.maxDaily > 0 ? calcRow('Maks. dawka dobowa:', `${order.maxDaily} mg/d`) : ''}
        </div>
        ${order.capped ? `<div class="presc-alert-warning">Zastosowano limit maksymalnej dawki pojedynczej dla masy ${state.w} kg.</div>` : ''}
      </div>
      <div class="presc-output-column">
        ${setting !== 'hospital' ? `<div class="prescription-blankiet"><div class="prescription-header-bar"><span>e-Recepta · Wzór dydaktyczny</span><span>${safeEsc(activeDrug.cat)}</span></div><div class="prescription-rp-box"><span class="prescription-rp-symbol">Rp.</span><span style="white-space:pre-line;font-weight:700">${safeEsc(order.rpText)}</span></div><div class="prescription-ds-box"><strong>D.S.</strong> ${safeEsc(order.dsText)}</div><button type="button" class="btn sec sm" data-copy-text="${safeEsc(`Rp.\n${order.rpText}\nD.S. ${order.dsText}`)}">📋 Kopiuj receptę</button></div>` : ''}
        ${setting !== 'rx' ? `<div class="hospital-order-card"><div class="hospital-order-header"><span>Karta zleceń · SOR / Oddział</span><span>${state.w} kg</span></div><p style="font-weight:700;margin-bottom:.4rem">${safeEsc(activeDrug.name)} — ${safeEsc(order.doseStr)}${order.vol ? ` (${safeEsc(order.vol)})` : ''}</p><p class="muted" style="font-size:.88rem;margin-bottom:.65rem">${safeEsc(order.dsText)}</p><button type="button" class="btn sec sm" data-copy-text="${safeEsc(`${activeDrug.name}: ${order.doseStr}${order.vol ? ` (${order.vol})` : ''} — ${order.dsText}`)}">📋 Kopiuj zlecenie</button></div>` : ''}
        ${advice.length ? `<div class="parent-advice-box"><div class="eyebrow">💬 Zalecenia dla pacjenta / obserwacja</div><p style="font-size:.88rem">${advice.map(safeEsc).join(' · ')}</p></div>` : ''}
        ${warn.length ? `<div class="presc-warning-box"><strong>⚠️ Przeciwwskazania i uwagi ChPL:</strong> ${warn.map(safeEsc).join(' · ')}</div>` : ''}
      </div>
    </div>`;
  }

  function renderPrescChallenges(challenges) {
    if (!challenges.length) return `<div class="card"><h3>Brak przypadków treningowych</h3><p class="muted" style="margin-top:.3rem">Brak danych <code>window.HUB_META.PRESCRIPTION_CHALLENGES</code>.</p></div>`;
    const list = challenges.map((ch, i) => Object.assign({ id: ch.id || ('ch-' + i) }, ch));
    const active = list.find(c => c.id === state.chal.activeId) || list[0];
    state.chal.activeId = active.id;
    const steps = Array.isArray(active.steps || active.questions) ? (active.steps || active.questions) : [];
    const ansMap = state.chal.answers[active.id] || {};
    const stepIdx = Math.max(0, Math.min(state.chal.stepIdx || 0, Math.max(0, steps.length - 1)));
    const curStep = steps[stepIdx] || {}, opts = Array.isArray(curStep.opts || curStep.options) ? (curStep.opts || curStep.options) : [];
    const key = Number(curStep.key ?? curStep.correct ?? curStep.ans ?? 0), curAns = ansMap[stepIdx];
    const allDone = steps.length > 0 && steps.every((_, i) => !!ansMap[i]);
    const okCount = steps.filter((_, i) => ansMap[i] && ansMap[i].ok).length;
    const scorePct = typeof pct === 'function' ? pct(okCount, steps.length) : (steps.length ? Math.round(100 * okCount / steps.length) : 0);
    const letters = 'ABCDEFGH', nextId = list[(list.findIndex(c => c.id === active.id) + 1) % list.length].id;

    return `<div class="chal-module-wrap">
      <div class="chal-pills-row">${list.map((c, i) => `<button type="button" class="chal-pill-btn${c.id === active.id ? ' active' : ''}${state.chal.done[c.id] ? ' done' : ''}" data-chal-id="${safeEsc(c.id)}"><span class="chal-num">#${i + 1}</span><span>${safeEsc(c.title || c.name || `Przypadek ${i + 1}`)}</span>${state.chal.done[c.id] ? '<span class="chal-check">✓</span>' : ''}</button>`).join('')}</div>
      <div class="chal-card">
        <div class="chal-card-header"><div><div class="eyebrow">Trening ordynacji neurologicznej</div><h3>${safeEsc(active.title || active.name)}</h3></div><div class="chal-weight-badge"><div class="muted" style="font-size:.72rem;font-weight:700">${safeEsc(active.patient || active.age || 'Pacjent dorosły')}</div><strong class="mono">${safeEsc(active.weightKg || active.weight || active.w || state.w)} kg</strong></div></div>
        <div class="chal-vignette-box"><strong>Opis kliniczny:</strong> ${safeEsc(active.vignette || active.case || active.scenario || '')}</div>
        <div class="chal-stepper">${steps.map((_, i) => `<button type="button" class="chal-step-dot${i === stepIdx ? ' current' : ansMap[i] ? ' done' : ''}" data-chal-step="${i}">${ansMap[i] ? (ansMap[i].ok ? '✓' : '!') : i + 1}</button>`).join('')}<span class="muted" style="font-size:.82rem;font-weight:700;margin-left:.3rem">Krok ${stepIdx + 1} z ${steps.length}</span></div>
        ${steps.length ? `<div class="chal-question-box">
          <p style="font-weight:800;font-size:1rem">${safeEsc(curStep.q || curStep.prompt || curStep.question || curStep.stem || '')}</p>
          <div class="chal-options-stack">${opts.map((opt, i) => {
            const cls = curAns ? (i === key ? ' correct' : i === curAns.sel ? ' wrong' : ' disabled') : '';
            return `<button type="button" class="chal-opt-btn${cls}" data-chal-opt="${i}" ${curAns ? 'disabled' : ''}><span class="chal-opt-letter">${letters[i] || (i + 1)}.</span><span>${safeEsc(opt)}</span></button>`;
          }).join('')}</div>
          ${curAns ? `<div class="chal-explanation-box ${curAns.ok ? 'ok' : 'err'}"><strong>${curAns.ok ? '✓ Poprawna decyzja!' : `✗ Nieoptymalnie — właściwa odpowiedź: ${letters[key] || '?'}`}</strong><p style="margin-top:.3rem;font-size:.9rem">${safeEsc(curStep.why || curStep.exp || curStep.explanation || '')}</p>${stepIdx < steps.length - 1 ? `<button type="button" class="btn pri sm" id="btnChalNext" style="margin-top:.65rem">Następny krok →</button>` : ''}</div>` : ''}
        </div>` : ''}
        ${allDone ? `<div class="chal-congrats-banner" style="margin-top:1rem"><strong>🎉 Przypadek ukończony (${okCount}/${steps.length} · ${scorePct}%)</strong>${active.pearl || active.summary ? `<div class="chal-pearl-box"><strong>Perła egzaminacyjna PUM:</strong> ${safeEsc(active.pearl || active.summary)}</div>` : ''}<div class="acts" style="margin-top:.7rem"><button type="button" class="btn sec sm" id="btnChalReset">🔄 Powtórz</button>${list.length > 1 ? `<button type="button" class="btn pri sm" data-chal-next="${safeEsc(nextId)}">Następny przypadek →</button>` : ''}</div></div>` : ''}
      </div>
    </div>`;
  }

  function renderRecepty() {
    const drugs = getDrugs(), challenges = getChallenges();
    const done = challenges.filter((c, i) => state.chal.done[c.id || ('ch-' + i)]).length;
    return `<div class="presc-wrap">
      <div class="presc-mode-bar"><div class="presc-mode-toggle" role="tablist">
        <button type="button" class="presc-mode-btn${state.presc.mode === 'generator' ? ' active' : ''}" data-presc-mode="generator">💊 Generator ordynacji (${drugs.length})</button>
        <button type="button" class="presc-mode-btn${state.presc.mode === 'challenges' ? ' active' : ''}" data-presc-mode="challenges">🎯 Trening ordynacji (${done}/${challenges.length})</button>
      </div></div>
      ${state.presc.mode === 'challenges' ? renderPrescChallenges(challenges) : renderPrescGenerator(drugs)}
    </div>`;
  }

  function renderActiveTab() {
    return ({ gcs: renderGCS, udar: renderUdar, padaczka: renderPadaczka, skale: renderSkale, recepty: renderRecepty }[state.tab] || renderNIHSS)();
  }

  function exportNihssToNotes() {
    const res = calcNIHSS(state.nihss), dose = calcAlteplaseDose(state.w);
    const scored = NIHSS_DOMAINS.filter(d => (state.nihss[d.id] || 0) > 0);
    const md = [
      `# Ocena NIHSS: ${res.total} / 42 pkt`,
      `- **Data:** ${new Date().toLocaleString('pl-PL')}`,
      `- **Interpretacja:** ${res.label}`,
      `- **Masa:** ${state.w} kg (rtPA: ${dose.totalMg} mg [bolus ${dose.bolusMg} mg + wlew ${dose.infusionMg} mg/h]; TNK: ${dose.tnkMg} mg)`,
      '', '## Domeny z deficytem (>0 pkt)',
      scored.length ? scored.map(d => `- **${d.label}:** ${d.opts[state.nihss[d.id]] || state.nihss[d.id]}`).join('\n') : '- Brak objawów ubytkowych (0 pkt).'
    ].join('\n');
    if (typeof getNotes === 'function' && typeof saveNotes === 'function') {
      const notes = getNotes(), list = Array.isArray(notes) ? notes.slice() : [], now = Date.now(), sample = list.find(Boolean) || {};
      const entry = { id: 'nihss-' + now, title: `NIHSS ${res.total}/42 pkt (${state.w} kg)`, content: md, updated: now, updatedAt: now };
      if ('body' in sample) entry.body = md;
      list.unshift(entry);
      saveNotes(list);
      notify('Zapisano wynik NIHSS w Notatniku 📝');
    } else copyToClipboard(md, 'Skopiowano raport NIHSS (Markdown)');
  }

  function syncWeightUI(root) {
    const valEl = q1('#calcWeightVal', root), numEl = q1('#calcWeightNum', root), sliderEl = q1('#calcWeightSlider', root), rtpa = q1('#calcRtpaQuick', root);
    const dose = calcAlteplaseDose(state.w);
    if (valEl) valEl.textContent = String(state.w);
    if (numEl && document.activeElement !== numEl) numEl.value = String(state.w);
    if (sliderEl && document.activeElement !== sliderEl) sliderEl.value = String(Math.round(state.w));
    if (rtpa) rtpa.textContent = `Alteplaza: ${dose.totalMg} mg · TNK: ${dose.tnkMg} mg · LEV SE: ${Math.min(4500, Math.round(state.w * 60))} mg`;
    qAll('.calc-pill[data-w]', root).forEach(b => b.classList.toggle('active', Number(b.dataset.w) === state.w));
  }

  function bindEvents(root) {
    const refreshTab = () => { const b = q1('#calcTabBody', root); if (b) b.innerHTML = renderActiveTab(); };
    root.addEventListener('input', ev => {
      if (ev.target.id !== 'calcWeightSlider') return;
      state.w = clampW(ev.target.value);
      saveState(); syncWeightUI(root); refreshTab();
    });
    root.addEventListener('change', ev => {
      if (ev.target.id === 'calcWeightNum') { state.w = clampW(ev.target.value); saveState(); syncWeightUI(root); refreshTab(); return; }
      const box = ev.target.closest('input[data-rtpa-contra]');
      if (box) { state.rtpaContra[box.dataset.rtpaContra] = !!box.checked; saveState(); refreshTab(); }
    });
    root.addEventListener('click', ev => {
      const t = ev.target.closest('button');
      if (!t) return;
      let dirty = false;
      if (t.dataset.calcTab && VALID_TABS.has(t.dataset.calcTab)) {
        state.tab = t.dataset.calcTab;
        qAll('.calc-tab-btn', root).forEach(b => { const on = b.dataset.calcTab === state.tab; b.classList.toggle('active', on); b.setAttribute('aria-selected', String(on)); });
        dirty = true;
      } else if (t.dataset.w) { state.w = clampW(t.dataset.w); syncWeightUI(root); dirty = true; }
      else if (t.dataset.nihssProfile) {
        const prof = NIHSS_PROFILES.find(p => p.id === t.dataset.nihssProfile);
        NIHSS_DOMAINS.forEach(d => { state.nihss[d.id] = (prof && prof.scores[d.id]) || 0; });
        dirty = true;
      } else if (t.id === 'btnResetNihss') { NIHSS_DOMAINS.forEach(d => { state.nihss[d.id] = 0; }); dirty = true; }
      else if (t.id === 'btnExportNihss') { exportNihssToNotes(); }
      else if (t.id === 'btnCopyNihss') {
        const res = calcNIHSS(state.nihss);
        const items = NIHSS_DOMAINS.filter(d => state.nihss[d.id] > 0).map(d => `${d.label}: ${state.nihss[d.id]}`).join('; ') || 'brak deficytów';
        copyToClipboard(`NIHSS: ${res.total}/42 pkt (${res.label}) — ${items}`, 'Skopiowano podsumowanie NIHSS');
      } else if (t.dataset.nihssItem) { state.nihss[t.dataset.nihssItem] = Number(t.dataset.val) || 0; dirty = true; }
      else if (t.dataset.gcsPreset) { state.gcs = { e: +t.dataset.e, v: +t.dataset.v, m: +t.dataset.m }; dirty = true; }
      else if (t.dataset.gcsPart) { state.gcs[t.dataset.gcsPart] = Number(t.dataset.val) || 1; dirty = true; }
      else if (t.id === 'btnResetRtpa') { state.rtpaContra = {}; dirty = true; }
      else if (t.dataset.seAccess) { state.seAccess = t.dataset.seAccess; dirty = true; }
      else if (t.dataset.seStage) { state.seStage = t.dataset.seStage; dirty = true; }
      else if (t.dataset.chaFlag) {
        const k = t.dataset.chaFlag;
        state.cha[k] = !state.cha[k];
        if (k === 'age75' && state.cha.age75) state.cha.age65 = false;
        if (k === 'age65' && state.cha.age65) state.cha.age75 = false;
        dirty = true;
      } else if (t.dataset.abcdKey) { state.abcd2[t.dataset.abcdKey] = Number(t.dataset.val) || 0; dirty = true; }
      else if (t.dataset.mrsVal != null) { state.mrs = Number(t.dataset.mrsVal); dirty = true; }
      else if (t.dataset.hhVal != null) { state.hh = Number(t.dataset.hhVal); dirty = true; }
      else if (t.dataset.prescMode) { state.presc.mode = t.dataset.prescMode; dirty = true; }
      else if (t.dataset.prescCat) { state.presc.cat = t.dataset.prescCat; state.presc.indIdx = 0; state.presc.formIdx = 0; dirty = true; }
      else if (t.dataset.prescDrug) { state.presc.drugId = t.dataset.prescDrug; state.presc.indIdx = 0; state.presc.formIdx = 0; dirty = true; }
      else if (t.dataset.prescInd != null) { state.presc.indIdx = Number(t.dataset.prescInd) || 0; dirty = true; }
      else if (t.dataset.prescForm != null) { state.presc.formIdx = Number(t.dataset.prescForm) || 0; dirty = true; }
      else if (t.dataset.copyText) { copyToClipboard(t.dataset.copyText, 'Skopiowano treść ordynacji'); }
      else if (t.dataset.chalId) { state.chal.activeId = t.dataset.chalId; state.chal.stepIdx = 0; dirty = true; }
      else if (t.dataset.chalStep != null) { state.chal.stepIdx = Number(t.dataset.chalStep) || 0; dirty = true; }
      else if (t.dataset.chalOpt != null) {
        const list = getChallenges().map((c, i) => Object.assign({ id: c.id || ('ch-' + i) }, c));
        const active = list.find(c => c.id === state.chal.activeId) || list[0];
        if (active) {
          const steps = Array.isArray(active.steps || active.questions) ? (active.steps || active.questions) : [];
          const idx = Math.max(0, Math.min(state.chal.stepIdx || 0, Math.max(0, steps.length - 1)));
          const sel = Number(t.dataset.chalOpt), key = Number(steps[idx]?.key ?? steps[idx]?.correct ?? steps[idx]?.ans ?? 0);
          state.chal.answers[active.id] = state.chal.answers[active.id] || {};
          state.chal.answers[active.id][idx] = { sel, ok: sel === key };
          if (steps.length && steps.every((_, i) => !!state.chal.answers[active.id][i])) state.chal.done[active.id] = true;
          dirty = true;
        }
      } else if (t.id === 'btnChalNext') { state.chal.stepIdx = (state.chal.stepIdx || 0) + 1; dirty = true; }
      else if (t.id === 'btnChalReset') { delete state.chal.answers[state.chal.activeId]; delete state.chal.done[state.chal.activeId]; state.chal.stepIdx = 0; dirty = true; }
      else if (t.dataset.chalNext) { state.chal.activeId = t.dataset.chalNext; state.chal.stepIdx = 0; dirty = true; }
      if (dirty) { saveState(); refreshTab(); }
    });
  }

  function viewCalculator(params = {}) {
    state = loadState();
    if (params && params.tab && VALID_TABS.has(params.tab)) state.tab = params.tab;
    if (params && params.w != null && params.w !== '') state.w = clampW(params.w);
    if (params && params.lek) {
      const target = String(params.lek).trim().toLowerCase();
      const match = getDrugs().map(normDrug).find(d => d.id.toLowerCase() === target || d.name.toLowerCase().includes(target));
      if (match) {
        state.presc.drugId = match.id; state.presc.indIdx = 0; state.presc.formIdx = 0; state.presc.mode = 'generator';
        if (!params.tab) state.tab = 'recepty';
      }
    }
    saveState();

    const host = typeof main === 'function' ? main() : main;
    if (!host) return;
    const dose = calcAlteplaseDose(state.w);

    host.innerHTML = `<div class="wrap view" id="calcRoot" style="padding-block:clamp(1.6rem,4vw,2.6rem)">
      <div class="eyebrow">Klinika Neurologii PUM · Stany nagłe, skale i dawkowanie</div>
      <h2>Skale neurologiczne i kalkulator dawek</h2>
      <p class="lead">Ocena punktowa (NIHSS, GCS/FOUR, CHA₂DS₂-VA, ABCD², mRS, Hunt-Hess), dawkowanie w trombolizie i.v. oraz stan padaczkowy i ordynacja leków.</p>
      <div class="calc-param-card"><div class="calc-param-grid">
        <div class="calc-field-group">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem;flex-wrap:wrap">
            <label for="calcWeightSlider" style="font-size:.82rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Masa ciała pacjenta (30–160 kg)</label>
            <div class="calc-val-display"><span class="calc-val-number" id="calcWeightVal">${state.w}</span><span class="muted" style="font-weight:800">kg</span>
              <input type="number" id="calcWeightNum" min="30" max="160" step="0.5" value="${state.w}" aria-label="Masa ciała w kg" style="width:76px;padding:.25rem .45rem;border:1.5px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);font-weight:800;text-align:center">
            </div>
          </div>
          <input type="range" id="calcWeightSlider" class="calc-slider" min="30" max="160" step="1" value="${Math.round(state.w)}" aria-label="Suwak masy ciała">
          <div class="calc-quick-pills">${QUICK_WEIGHTS.map(wVal => `<button type="button" class="calc-pill${state.w === wVal ? ' active' : ''}" data-w="${wVal}">${wVal} kg</button>`).join('')}</div>
        </div>
        <div class="calc-field-group calc-field-divider">
          <div style="font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Podgląd dawek ratunkowych (na żywo)</div>
          <div id="calcRtpaQuick" class="mono" style="font-weight:800;color:var(--ink);font-size:.96rem">Alteplaza: ${dose.totalMg} mg · TNK: ${dose.tnkMg} mg · LEV SE: ${Math.min(4500, Math.round(state.w * 60))} mg</div>
          <div class="srcline">Przeliczanie automatyczne dla trombolizy, stanu padaczkowego i generatora ordynacji.</div>
        </div>
      </div></div>
      <nav class="calc-tab-nav" id="calcTabNav" role="tablist" aria-label="Moduły kalkulatora">${TABS.map(t => `<button type="button" role="tab" class="calc-tab-btn${state.tab === t.id ? ' active' : ''}" data-calc-tab="${t.id}" aria-selected="${state.tab === t.id}"><span>${t.icon}</span><span>${safeEsc(t.label)}</span></button>`).join('')}</nav>
      <div id="calcTabBody">${renderActiveTab()}</div>
      <p class="srcline" style="margin-top:1.4rem">Źródła: Sylabus Kliniki Neurologii PUM 2026/2027 (Podemski 2019, Fuller 2022, Stępień 2022, Kozubski/Liberski 2021) oraz wytyczne ESO/AHA/ASA, ILAE/AES i ESC 2024. Materiał wyłącznie dydaktyczny — dawkowanie weryfikuj w ChPL.</p>
    </div>`;
    const root = q1('#calcRoot', host);
    if (root) bindEvents(root);
  }

  return { viewCalculator };
};
