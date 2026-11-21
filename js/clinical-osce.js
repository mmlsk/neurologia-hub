/* Neurologia V – moduł kliniczny: Symulator egzaminu praktycznego OSCE */
(function () {
  'use strict';
  window.HUB_CLINICAL = window.HUB_CLINICAL || {};
  window.HUB_CLINICAL.osce = function (ctx) {
    const { OSCE_STATIONS = [] } = window.HUB_META || {};
    const { $, $$, main, toast, save, getNotes, saveNotes } = ctx;
    const esc = ctx.esc || (s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])));
    const norm = s => String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');

    let OSCE_ACTIVE = null;

    function getVitalStatus(key, val) {
      if (key === 'bp') {
        const sys = parseInt(String(val || ''), 10);
        if (!sys) return 'ok';
        if (sys >= 100 && sys <= 159) return 'ok';
        return ((sys >= 90 && sys < 100) || (sys >= 160 && sys <= 184)) ? 'warn' : 'danger';
      }
      if (ctx.patient && typeof ctx.patient.getVitalStatus === 'function') {
        const res = ctx.patient.getVitalStatus(key, val);
        if (res) return res;
      }
      const n = parseFloat(val);
      if (Number.isNaN(n)) return 'ok';
      if (key === 'spo2') return n >= 95 ? 'ok' : (n >= 90 ? 'warn' : 'danger');
      if (key === 'gcs') return n >= 14 ? 'ok' : (n >= 9 ? 'warn' : 'danger');
      if (key === 'temp') return (n >= 36.2 && n <= 37.5) ? 'ok' : (n <= 38.4 ? 'warn' : 'danger');
      if (key === 'hr') return (n >= 55 && n <= 100) ? 'ok' : ((n >= 45 && n <= 120) ? 'warn' : 'danger');
      if (key === 'rr') return (n >= 12 && n <= 20) ? 'ok' : ((n >= 9 && n <= 26) ? 'warn' : 'danger');
      if (key === 'gluc') return (n >= 70 && n <= 140) ? 'ok' : ((n >= 55 && n <= 220) ? 'warn' : 'danger');
      return 'ok';
    }

    function renderOsceImagingBadge(stationId) {
      const map = {
        'stacja-1-nerwy-czaszkowe': { link: '#/badania?tab=topo', text: '🔬 Przećwicz topodiagnostykę nerwów czaszkowych i pnia mózgu →', col: 'var(--teal-d)', bg: 'var(--teal-l)' },
        'stacja-2-udar-nihss': { link: '#/badania?tab=imaging&case=tk-udar-mca', text: '🔬 Przećwicz TK w ostrym udarze MCA w Trenażerze Obrazowania →', col: 'var(--red)', bg: 'var(--red-l)' },
        'stacja-3-ataksja-umn': { link: '#/badania?tab=topo', text: '🔬 Sprawdź różnicowanie UMN/LMN i dróg móżdżkowych w Topodiagnostyce →', col: 'var(--amber)', bg: 'var(--amber-l)' },
        'stacja-4-opony-korzenie': { link: '#/badania?tab=pmr', text: '🔬 Zinterpretuj profil PMR w Trenażerze Badań →', col: 'var(--violet)', bg: 'var(--violet-l)' }
      };
      const item = map[stationId];
      if (!item) return '';
      return `<div style="margin-top:.4rem"><a class="chip" href="${item.link}" style="background:${item.bg};color:${item.col};font-weight:700;font-size:.78rem;text-decoration:none">${item.text}</a></div>`;
    }

    function getReactionBadge(r) {
      const type = typeof r === 'string' ? r : (r && r.type) || 'normal';
      const note = (r && typeof r === 'object' && r.text) ? ` · ${esc(r.text)}` : '';
      switch (type) {
        case 'pain': return `<span class="osce-reaction-badge pain">😣 Ból / Objawy oponowe lub korzeniowe${note}</span>`;
        case 'cry': return `<span class="osce-reaction-badge cry">😰 Pobudzenie / Zaburzenia mowy${note}</span>`;
        case 'lethargy': return `<span class="osce-reaction-badge lethargy">😴 Senność / Deficyt przytomności${note}</span>`;
        case 'crisis': return `<span class="osce-reaction-badge crisis">🚨 KRYZYS NEUROLOGICZNY / ZAŁAMANIE PARAMETRÓW${note}</span>`;
        case 'normal':
        default: return `<span class="osce-reaction-badge normal">🙂 Przytomny / Współpracujący${note}</span>`;
      }
    }

    function getInitialReaction(station) {
      if (station && station.patient && station.patient.initialReaction) return station.patient.initialReaction;
      if (station && station.id === 'stacja-2-udar-nihss') return 'lethargy';
      if (station && station.id === 'stacja-4-opony-korzenie') return 'pain';
      return 'normal';
    }

    function isZoneDone(zone) {
      if (!zone || !Array.isArray(zone.maneuvers) || !zone.maneuvers.length) return false;
      const perf = OSCE_ACTIVE && OSCE_ACTIVE.performedManeuvers;
      if (!perf) return false;
      const keys = zone.maneuvers.filter(m => m.isKey);
      return keys.length > 0 ? keys.every(m => perf.has(m.id)) : zone.maneuvers.some(m => perf.has(m.id));
    }

    function getZoneClass(station, zoneId, selectedZoneObj) {
      const zone = station.zones && station.zones.find(z => z.id === zoneId);
      let cls = 'osce-anatomy-region';
      if (selectedZoneObj && selectedZoneObj.id === zoneId) cls += ' active-zone';
      if (isZoneDone(zone)) cls += ' done-zone';
      return cls;
    }

    function renderAdultNeuroSvg(station, selectedZoneObj, viewMode = 'front') {
      const isBack = viewMode === 'back';
      const doneSet = new Set((station.zones || []).filter(isZoneDone).map(z => z.id));
      const fillBase = 'var(--teal-l)';
      const strokeBase = 'var(--teal)';
      const badge = (cx, cy, ok) => ok
        ? `<g class="osce-finding-badge-svg"><circle cx="${cx}" cy="${cy}" r="8" fill="var(--green)"/><path d="M${cx - 3.5},${cy} l2.5,2.5 l4.5,-5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>`
        : '';

      return `<svg class="osce-silhouette-svg" viewBox="0 0 300 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sylwetka neurologiczna dorosłego pacjenta">
        <defs><linearGradient id="neuroSkin" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--teal)" stop-opacity="0.07"/><stop offset="100%" stop-color="var(--teal)" stop-opacity="0.16"/></linearGradient></defs>
        <rect x="14" y="10" width="272" height="460" rx="22" fill="var(--surface-2)" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4"/>
        <line x1="150" y1="20" x2="150" y2="458" stroke="var(--line)" stroke-width="1" stroke-dasharray="3 5" opacity="0.65"/>
        <g fill="url(#neuroSkin)" stroke="${strokeBase}" stroke-width="1.6" stroke-linejoin="round">
          <ellipse cx="150" cy="64" rx="32" ry="40"/>
          <path d="M134,100 L166,100 L169,126 L131,126 Z"/>
          <path d="M106,128 Q150,120 194,128 L186,246 L114,246 Z"/>
          <path d="M106,128 L80,206 L72,272 L88,276 L98,214 L114,158 Z"/>
          <path d="M194,128 L220,206 L228,272 L212,276 L202,214 L186,158 Z"/>
          <path d="M114,246 L146,246 L142,346 L138,442 L117,442 L113,346 Z"/>
          <path d="M154,246 L186,246 L187,346 L183,442 L162,442 L158,346 Z"/>
        </g>
        <path class="${getZoneClass(station, 'glowa_nerwy', selectedZoneObj)}" data-zone-id="glowa_nerwy" d="M118,58 C118,29 182,29 182,58 C182,67 175,71 150,71 C125,71 118,67 118,58 Z" fill="${fillBase}" stroke="${strokeBase}" stroke-width="1.8"/>
        ${!isBack
          ? '<ellipse cx="137" cy="54" rx="6.5" ry="4" fill="var(--surface)" stroke="var(--teal)" stroke-width="1.3" pointer-events="none"/><ellipse cx="163" cy="54" rx="6.5" ry="4" fill="var(--surface)" stroke="var(--teal)" stroke-width="1.3" pointer-events="none"/><circle cx="137" cy="54" r="2" fill="var(--ink)" pointer-events="none"/><circle cx="163" cy="54" r="2" fill="var(--ink)" pointer-events="none"/>'
          : '<path d="M130,52 Q150,42 170,52 M132,62 Q150,72 168,62" fill="none" stroke="var(--teal)" stroke-width="1.3" opacity="0.65" pointer-events="none"/>'}
        <path class="${getZoneClass(station, 'twarz_mowa', selectedZoneObj)}" data-zone-id="twarz_mowa" d="M123,67 Q150,63 177,67 L173,92 Q150,106 127,92 Z" fill="${fillBase}" stroke="${strokeBase}" stroke-width="1.8"/>
        ${!isBack
          ? '<path d="M140,86 Q150,91 160,86" fill="none" stroke="var(--teal-d)" stroke-width="1.6" stroke-linecap="round" pointer-events="none"/>'
          : '<text x="150" y="86" text-anchor="middle" font-size="9" font-weight="700" fill="var(--ink-muted)" pointer-events="none">Podstawa</text>'}
        <rect class="${getZoneClass(station, 'kark_opony', selectedZoneObj)}" data-zone-id="kark_opony" x="130" y="100" width="40" height="28" rx="9" fill="${fillBase}" stroke="${strokeBase}" stroke-width="1.8"/>
        ${isBack ? '<line x1="150" y1="102" x2="150" y2="126" stroke="var(--teal)" stroke-width="2" stroke-dasharray="3 2" pointer-events="none"/>' : ''}
        <g class="${getZoneClass(station, 'konczyny_gorne', selectedZoneObj)}" data-zone-id="konczyny_gorne" fill="${fillBase}" stroke="${strokeBase}" stroke-width="1.8">
          <path d="M106,128 L80,206 L72,272 L88,276 L98,214 L114,158 Z"/>
          <path d="M194,128 L220,206 L228,272 L212,276 L202,214 L186,158 Z"/>
          <circle cx="88" cy="198" r="4" fill="var(--surface)" stroke="var(--teal)" stroke-width="1.2" pointer-events="none"/>
          <circle cx="212" cy="198" r="4" fill="var(--surface)" stroke="var(--teal)" stroke-width="1.2" pointer-events="none"/>
        </g>
        <path class="${getZoneClass(station, 'tulow_odruchy', selectedZoneObj)}" data-zone-id="tulow_odruchy" d="M114,132 L186,132 L182,244 L118,244 Z" fill="${fillBase}" stroke="${strokeBase}" stroke-width="1.8"/>
        ${isBack
          ? '<rect x="144" y="136" width="12" height="102" rx="6" fill="var(--teal-l)" stroke="var(--teal)" stroke-width="1.2" pointer-events="none"/><circle cx="150" cy="216" r="4.5" fill="var(--amber)" opacity="0.85" pointer-events="none"/>'
          : '<path d="M132,162 L168,162 M130,192 L170,192 M134,218 L166,218" stroke="var(--teal)" stroke-width="1.1" stroke-dasharray="3 3" opacity="0.55" pointer-events="none"/>'}
        <g class="${getZoneClass(station, 'konczyny_dolne', selectedZoneObj)}" data-zone-id="konczyny_dolne" fill="${fillBase}" stroke="${strokeBase}" stroke-width="1.8">
          <path d="M114,248 L146,248 L142,346 L138,442 L117,442 L113,346 Z"/>
          <path d="M154,248 L186,248 L187,346 L183,442 L162,442 L158,346 Z"/>
          <circle cx="130" cy="340" r="4.5" fill="var(--surface)" stroke="var(--teal)" stroke-width="1.2" pointer-events="none"/>
          <circle cx="170" cy="340" r="4.5" fill="var(--surface)" stroke="var(--teal)" stroke-width="1.2" pointer-events="none"/>
          <circle cx="128" cy="434" r="3.5" fill="var(--surface)" stroke="var(--teal)" stroke-width="1.2" pointer-events="none"/>
          <circle cx="172" cy="434" r="3.5" fill="var(--surface)" stroke="var(--teal)" stroke-width="1.2" pointer-events="none"/>
        </g>
        ${OSCE_ACTIVE && OSCE_ACTIVE.isComplication ? '<circle cx="150" cy="58" r="14" fill="var(--red-l)" stroke="var(--red)" stroke-width="2.5" class="osce-pulse-ring"/>' : ''}
        ${badge(184, 40, doneSet.has('glowa_nerwy'))}${badge(180, 86, doneSet.has('twarz_mowa'))}${badge(174, 114, doneSet.has('kark_opony'))}
        ${badge(226, 212, doneSet.has('konczyny_gorne'))}${badge(184, 194, doneSet.has('tulow_odruchy'))}${badge(188, 344, doneSet.has('konczyny_dolne'))}
      </svg>`;
    }

    function renderOscePatientSilhouette(station, selectedZoneObj, viewMode = 'front') {
      return renderAdultNeuroSvg(station, selectedZoneObj, viewMode);
    }

    function startOsceStation(station) {
      OSCE_ACTIVE = {
        stationId: station.id,
        performedManeuvers: new Set(),
        performedQuestions: new Set(),
        performedOrder: [],
        viewMode: 'front',
        scaleExpanded: false,
        selectedZone: station.zones && station.zones[0] ? station.zones[0].id : null,
        activeTab: 'maneuvers',
        reaction: getInitialReaction(station),
        currentVitals: { ...(station.patient && station.patient.vitalsInitial ? station.patient.vitalsInitial : {}) },
        isComplication: false,
        complicationMessage: '',
        findings: [],
        fatalErrorsTriggered: 0,
        isFinished: false,
        synthesisDiagnosis: null,
        synthesisDifferentials: [],
        synthesisActions: [],
        score: null,
        startedAt: Date.now()
      };
    }

    function renderOsceStationList() {
      window.scrollTo(0, 0);
      const totalStations = OSCE_STATIONS.length;
      const savedMap = (ctx.S && ctx.S.osceCases) || {};
      const completedCount = Object.keys(savedMap).length;
      const avgScore = completedCount > 0 ? Math.round(Object.values(savedMap).reduce((acc, c) => acc + (c.score || 0), 0) / completedCount) : 0;

      main.innerHTML = `<section class="blk" style="border:0"><div class="wrap" style="max-width:1040px">
        <div class="eyebrow">Symulator kliniczny · Egzamin Praktyczny OSCE · Klinika Neurologii PUM</div>
        <h2>Stacje Badania Neurologicznego (U02) i Status Praesens</h2>
        <div class="conn-tabs" role="tablist" style="margin-bottom:1.5rem">
          <button class="conn-tab-btn" data-ptab="sor" role="tab" aria-selected="false">🚨 SOR / Ostry Dyżur (${(ctx.patient && ctx.patient.cases ? ctx.patient.cases : []).length})</button>
          <button class="conn-tab-btn active" data-ptab="osce" role="tab" aria-selected="true">📋 Stacje OSCE / Badanie U02 (${totalStations})</button>
        </div>
        <p class="lead">Przyłóżkowy symulator badania neurologicznego dorosłego pacjenta. Zbadaj strefy anatomiczne na interaktywnej planszy manewr po manewrze, zbierz celowany wywiad, unikaj błędów krytycznych i wygeneruj wzorcowy raport Status Praesens zgodny z sylabusem PUM.</p>
        <div class="hero-strip" style="margin-bottom:2rem">
          <div class="hero-stat"><span class="val">${totalStations}</span><span class="lbl">Stacji OSCE</span></div>
          <div class="hero-stat"><span class="val">${completedCount} / ${totalStations}</span><span class="lbl">Zaliczonych</span></div>
          <div class="hero-stat"><span class="val">${avgScore > 0 ? avgScore + '%' : '–'}</span><span class="lbl">Średni wynik</span></div>
          <div class="hero-stat"><span class="val">U02</span><span class="lbl">Status Praesens</span></div>
        </div>
        <div class="grid cols-2" style="gap:1.4rem">
          ${OSCE_STATIONS.map(station => {
            const saved = savedMap[station.id];
            const isPassed = saved && saved.score >= 60;
            const totalKey = (station.zones || []).flatMap(z => z.maneuvers || []).filter(m => m.isKey).length;
            const totalZones = (station.zones || []).length;
            const sexLabel = String(station.patient && station.patient.gender || '').toLowerCase() === 'm' ? 'Mężczyzna' : 'Kobieta';
            return `<div class="card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--teal)">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.4rem">
                  <span class="badge" style="background:var(--teal);color:var(--on-accent);font-weight:800">STACJA ${station.number}</span>
                  <span style="font-size:.82rem;color:var(--ink-muted);font-weight:700">Wiek: ${esc(station.patient.age)} · ${sexLabel}</span>
                </div>
                <h3 style="margin-top:0;margin-bottom:.4rem"><a href="#/pacjent/osce/${station.id}">${esc(station.title)}</a></h3>
                <div style="font-size:.85rem;color:var(--teal);font-weight:700;margin-bottom:.6rem">🧠 ${esc(station.topic)}</div>
                <p style="font-size:.88rem;color:var(--ink-muted);line-height:1.45;margin-bottom:.9rem">${esc(station.briefing.scenario)}</p>
                <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem">
                  <span class="badge" style="background:var(--teal-l);color:var(--teal)">📍 ${totalZones} stref anatomicznych</span>
                  <span class="badge" style="background:var(--teal-l);color:var(--teal)">🔑 ${totalKey} manewrów kluczowych</span>
                  <span class="badge" style="background:var(--red-l);color:var(--red)">⚠️ Błędy krytyczne</span>
                </div>
              </div>
              <div style="border-top:1px solid var(--line-2);padding-top:.9rem;display:flex;align-items:center;justify-content:space-between">
                <div>${saved ? `<span class="badge" style="background:${isPassed ? 'var(--green-l)' : 'var(--red-l)'};color:${isPassed ? 'var(--green)' : 'var(--red)'};font-weight:800">${isPassed ? '✅ ZALICZONE' : '❌ DO POPRAWY'}: ${saved.score}%</span>` : '<span class="badge" style="background:var(--surface-2);color:var(--ink-muted)">Status: Nowa stacja</span>'}</div>
                <a href="#/pacjent/osce/${station.id}" class="btn btn-sm btn-primary">${saved ? 'Powtórz badanie →' : 'Rozpocznij stację →'}</a>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div></section>`;

      $$('.conn-tab-btn[data-ptab]').forEach(b => { b.onclick = () => { location.hash = b.dataset.ptab === 'osce' ? '#/pacjent?tab=osce' : '#/pacjent'; }; });
    }

    function computeOsceScale(station) {
      if (!station || !station.scale) return null;
      const s = station.scale;
      let totalScore = 0;
      let assessedCount = 0;
      const perfM = (OSCE_ACTIVE && OSCE_ACTIVE.performedManeuvers) || new Set();
      const perfQ = (OSCE_ACTIVE && OSCE_ACTIVE.performedQuestions) || new Set();

      const items = (s.items || []).map(item => {
        const hit = !!(item.triggerIntro || item.triggerVitals || item.triggerLab ||
          (item.triggerManeuvers && item.triggerManeuvers.some(id => perfM.has(id))) ||
          (item.triggerQuestions && item.triggerQuestions.some(idx => perfQ.has(idx))));
        const earned = hit ? item.score : 0;
        if (hit) { assessedCount += 1; totalScore += earned; }
        return { ...item, isAssessed: hit, earned };
      });

      const interps = s.interpretations || [];
      let interpretation = interps[0] || { max: 0, label: 'Brak oceny', color: 'var(--teal)', tip: '' };
      for (const interp of interps) { interpretation = interp; if (totalScore <= interp.max) break; }

      return { id: s.id, name: s.name, unit: s.unit || 'pkt', maxScore: s.maxScore, currentScore: totalScore, assessedCount, totalItems: items.length, isComplete: assessedCount >= items.length, items, interpretation };
    }

    function validateOsceTechnique(station) {
      if (!OSCE_ACTIVE || !OSCE_ACTIVE.performedOrder || !OSCE_ACTIVE.performedOrder.length) return null;
      const allManeuvers = (station.zones || []).flatMap(z => z.maneuvers || []);
      const done = OSCE_ACTIVE.performedOrder.map(id => allManeuvers.find(m => m.id === id)).filter(Boolean).map(m => norm(m.id + ' ' + m.label));
      const has = re => done.some(txt => re.test(txt));
      const noFatal = OSCE_ACTIVE.fatalErrorsTriggered === 0;

      if (station.id === 'stacja-1-nerwy-czaszkowe' && has(/galkoruch|iii|iv|vi|zrenic|szczelin/) && has(/twarz|vii|podnieb|vernet|ix|x/)) {
        return { type: 'gold', badge: '🏅 Systematyczna topodiagnostyka nerwów czaszkowych', text: 'Zbadano ruchomość gałek ocznych (III, IV, VI), oszczędzenie mięśni czoła w n. VII oraz funkcję podniebienia i odruchu gardłowego (IX, X – objaw firanki Verneta).' };
      }
      if (station.id === 'stacja-2-udar-nihss') {
        if (has(/glikem|glukoz|cukier/) && has(/nihss|sila|mow|afaz|swiadom|niedowlad/) && noFatal) {
          return { type: 'gold', badge: '🏅 Złoty standard protokołu udarowego (NIHSS + czas + glukoza)', text: 'Wykluczono hipoglikemię jako maskę udaru, oceniono deficyt w skali NIHSS i czas zachorowania przed kwalifikacją do TK bez kontrastu oraz rtPA (≤4,5 h) / MT (6–24 h).' };
        }
        if (done.length >= 2 && !has(/glikem|glukoz|cukier/)) {
          return { type: 'tip', badge: '💡 Wskazówka techniki OSCE (udar)', text: 'Przed decyzją o trombolizie (rtPA/TNK) pamiętaj o oznaczeniu glikemii włośniczkowej i ustaleniu dokładnej godziny „ostatnio widziany zdrowy”.' };
        }
      }
      if (station.id === 'stacja-3-ataksja-umn' && has(/romberg|glebok|wibrac/) && has(/mozdz|palec|nos|pieta|kolan|babinsk|odruch/)) {
        return { type: 'gold', badge: '🏅 Różnicowanie UMN vs LMN oraz móżdżek vs sznury tylne', text: 'Zestawiono próbę Romberga (otwarte vs zamknięte oczy) i czucie głębokie z próbami zborności móżdżkowej oraz oceną zespołu piramidowego (UMN) i obwodowego (LMN).' };
      }
      if (station.id === 'stacja-4-opony-korzenie' && has(/opon|kark|brudzinsk|kernig|lasegue|ogon/) && has(/dno|tarcza|ognisk|gcs|przytom/) && noFatal) {
        return { type: 'gold', badge: '🏅 Bezpieczna kolejność w zespole oponowym i korzeniowym', text: 'Przed ewentualnym nakłuciem lędźwiowym wykluczono objawy wzmożonego ICP i deficyty ogniskowe wymagające uprzedniego TK mózgu.' };
      }
      return null;
    }

    function renderOsceScaleWidget(station) {
      const scale = computeOsceScale(station);
      if (!scale) return '';
      const isExpanded = !!OSCE_ACTIVE.scaleExpanded;
      const tech = validateOsceTechnique(station);
      const c = scale.interpretation.color;

      return `<div class="card osce-scale-tray" style="margin-bottom:1.2rem;background:var(--surface);border:1px solid color-mix(in srgb, ${c} 45%, var(--line));box-shadow:inset 0 3px 0 0 ${c}">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.6rem">
          <div style="display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;min-width:0">
            <span class="badge" style="background:var(--surface-2);color:var(--ink);font-weight:800;font-size:.78rem">📊 PRZYŁÓŻKOWA SKALA</span>
            <b style="font-size:1rem;color:var(--ink)">${esc(scale.name)}</b>
            <span class="chip" style="background:color-mix(in srgb, ${c} 14%, transparent);color:${c};font-weight:800;border:1px solid color-mix(in srgb, ${c} 35%, transparent)">Wynik: ${scale.currentScore} / ${scale.maxScore} ${esc(scale.unit)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap">
            <span style="font-size:.82rem;font-weight:700;color:${c}">${esc(scale.interpretation.label)}</span>
            <button type="button" class="btn btn-sm btn-subtle" id="btnToggleOsceScale" style="font-size:.78rem;padding:.2rem .6rem">${isExpanded ? 'Zwiń szczegóły ▲' : 'Kryteria szczegółowe (' + scale.assessedCount + '/' + scale.totalItems + ') ▼'}</button>
          </div>
        </div>
        <div style="margin-top:.6rem;padding:.6rem .8rem;border-radius:6px;background:color-mix(in srgb, ${c} 10%, transparent);border:1px solid color-mix(in srgb, ${c} 28%, transparent);font-size:.84rem;line-height:1.45;color:var(--ink)"><b>💡 Wskazanie kliniczne:</b> ${esc(scale.interpretation.tip)}</div>
        ${tech ? `<div style="margin-top:.6rem;padding:.55rem .8rem;border-radius:8px;background:${tech.type === 'gold' ? 'var(--amber-l)' : 'var(--teal-l)'};border:1px solid ${tech.type === 'gold' ? 'var(--amber)' : 'var(--teal)'};font-size:.82rem;line-height:1.4"><b style="color:${tech.type === 'gold' ? 'var(--amber)' : 'var(--teal)'}">${tech.badge}:</b> ${tech.text}</div>` : ''}
        ${isExpanded ? `<div style="margin-top:.9rem;padding-top:.8rem;border-top:1px solid var(--line-2)"><div style="font-size:.78rem;font-weight:700;color:var(--ink-muted);text-transform:uppercase;margin-bottom:.5rem">Status składowych skali w badaniu:</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:.5rem">${scale.items.map(it => `<div style="padding:.5rem .7rem;border-radius:6px;background:var(--bg);border:1px solid ${it.isAssessed ? 'var(--line)' : 'var(--line-2)'};font-size:.8rem"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.2rem"><span style="font-weight:700;color:var(--ink)">${esc(it.label)}</span><span class="chip" style="font-size:.7rem;padding:.1rem .35rem;background:${it.isAssessed ? 'var(--teal-l)' : 'var(--surface)'};color:${it.isAssessed ? 'var(--teal-d)' : 'var(--ink-muted)'};font-weight:700">${it.isAssessed ? '+' + it.earned + ' pkt' : '⏳ Czeka'}</span></div><div style="color:${it.isAssessed ? 'var(--teal)' : 'var(--ink-muted)'};font-size:.76rem">${it.isAssessed ? '✓ ' + esc(it.findingVal) : '○ Wymaga zbadania odpowiedniej strefy'}</div></div>`).join('')}</div></div>` : ''}
      </div>`;
    }

    function renderActiveOsceStation(station) {
      if (!OSCE_ACTIVE || OSCE_ACTIVE.stationId !== station.id) startOsceStation(station);

      const zones = station.zones || [];
      const allManeuvers = zones.flatMap(z => z.maneuvers || []);
      const totalKey = allManeuvers.filter(m => m.isKey).length;
      const doneKey = allManeuvers.filter(m => m.isKey && OSCE_ACTIVE.performedManeuvers.has(m.id)).length;
      const progressPct = Math.round((doneKey / (totalKey || 1)) * 100);
      const selectedZoneObj = zones.find(z => z.id === OSCE_ACTIVE.selectedZone) || zones[0];
      const viewMode = OSCE_ACTIVE.viewMode || 'front';
      const v = OSCE_ACTIVE.currentVitals || {};

      const sixthVital = v.gcs != null
        ? { cls: getVitalStatus('gcs', parseInt(v.gcs, 10)), lab: '🧠 GCS', val: String(v.gcs).includes('/') ? esc(v.gcs) : `${esc(v.gcs)}<span class="v-unit">/15</span>` }
        : v.gluc != null
          ? { cls: getVitalStatus('gluc', parseFloat(v.gluc)), lab: '🩸 Glikemia', val: esc(v.gluc) }
          : v.crt != null
            ? { cls: getVitalStatus('crt', parseFloat(v.crt)), lab: '⏱️ CRT', val: esc(v.crt) }
            : { cls: 'ok', lab: '🧠 GCS', val: '15<span class="v-unit">/15</span>' };

      main.innerHTML = `<section class="blk" style="border:0"><div class="wrap" style="max-width:1120px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
          <div class="crumbs" style="margin:0"><a href="#/pacjent?tab=osce">← Stacje OSCE</a> / <span>${esc(station.shortTitle)}</span></div>
          <div style="display:flex;gap:.5rem;align-items:center">
            <button class="btn btn-sm" id="btnRestartOsce" title="Zresetuj stację i zacznij od początku">🔄 Od nowa</button>
            <button class="btn btn-sm btn-primary" id="btnFinishOsce">Zakończ badanie i sprawdź Status Praesens →</button>
          </div>
        </div>

        <div class="card" style="margin-bottom:1.2rem;background:var(--surface);border:1.5px solid var(--line);box-shadow:var(--shadow)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:.8rem">
            <div style="min-width:0;max-width:100%;flex:1 1 260px">
              <div style="display:flex;align-items:center;flex-wrap:wrap;gap:.5rem;margin-bottom:.3rem">
                <span class="badge" style="background:var(--teal);color:var(--on-accent);font-weight:800;white-space:nowrap">STACJA ${station.number}</span>
                <h2 style="margin:0;font-size:1.3rem;min-width:0">${esc(station.title)}</h2>
              </div>
              <div style="font-size:.88rem;color:var(--ink-muted)"><b>Pacjent:</b> ${esc(station.patient.name)} (${esc(station.patient.age)}${station.patient.weight ? ', ' + esc(station.patient.weight) : ''}) · <b>Problem kliniczny:</b> ${esc(station.topic)}</div>
              ${renderOsceImagingBadge(station.id)}
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.3rem">
              <div style="font-size:.78rem;font-weight:700;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.05em">Stan i reakcja pacjenta:</div>
              <div>${getReactionBadge(OSCE_ACTIVE.reaction)}</div>
            </div>
          </div>

          <div class="osce-vitals-monitor">
            <div class="vital-chip ${getVitalStatus('hr', parseInt(v.hr || '75', 10))}"><span class="v-lab">❤️ HR</span><span class="v-val">${esc(v.hr || '–')}<span class="v-unit">/min</span></span></div>
            <div class="vital-chip ${getVitalStatus('rr', parseInt(v.rr || '16', 10))}"><span class="v-lab">💨 Oddech</span><span class="v-val">${esc(v.rr || '–')}<span class="v-unit">/min</span></span></div>
            <div class="vital-chip ${getVitalStatus('bp', v.bp)}"><span class="v-lab">🩸 RR (BP)</span><span class="v-val" style="font-size:1.05rem">${esc(v.bp || '–')}<span class="v-unit">mmHg</span></span></div>
            <div class="vital-chip ${getVitalStatus('temp', parseFloat(v.temp || '36.8'))}"><span class="v-lab">🌡️ Temp</span><span class="v-val">${esc(v.temp || '–')}</span></div>
            <div class="vital-chip ${getVitalStatus('spo2', parseInt(v.spo2 || '98', 10))}"><span class="v-lab">🫁 SpO₂</span><span class="v-val">${esc(v.spo2 || '–')}</span></div>
            <div class="vital-chip ${sixthVital.cls}"><span class="v-lab">${sixthVital.lab}</span><span class="v-val">${sixthVital.val}</span></div>
          </div>

          <div style="margin-top:.8rem">
            <div style="display:flex;justify-content:space-between;font-size:.8rem;font-weight:700;margin-bottom:.3rem"><span>Postęp badania neurologicznego: ${doneKey} z ${totalKey} manewrów kluczowych</span><span>${progressPct}%</span></div>
            <div style="height:7px;background:var(--line);border-radius:999px;overflow:hidden"><div style="width:${progressPct}%;height:100%;background:var(--teal);transition:width .3s ease"></div></div>
          </div>
        </div>

        ${renderOsceScaleWidget(station)}

        ${OSCE_ACTIVE.isComplication ? `<div class="osce-complication-card"><div style="display:flex;align-items:flex-start;gap:.8rem"><div style="font-size:1.8rem;line-height:1">🚨</div><div style="flex:1"><h4 style="margin:0 0 .4rem 0;color:var(--red);font-size:1.05rem">ZAŁAMANIE STANU PACJENTA – POWIKŁANIE JATROGENNE!</h4><p style="margin:0 0 .6rem 0;font-size:.9rem;line-height:1.45">${esc(OSCE_ACTIVE.complicationMessage)}</p><button class="btn btn-sm" id="btnStabilizeOsce" style="background:var(--red);color:var(--ink-inv);border-color:var(--red)">🚑 Zastosuj postępowanie ratunkowe i ustabilizuj pacjenta</button></div></div></div>` : ''}

        <div class="osce-wrap">
          <div class="osce-board">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.4rem">
              <div>
                <span style="font-weight:800;font-size:.92rem;color:var(--ink)">📍 Pacjent: ${esc(station.patient.name)} (${esc(station.patient.age)})</span>
                <span style="font-size:.74rem;color:var(--teal);display:block;font-weight:700">${viewMode === 'front' ? 'Widok z przodu (Anterior)' : 'Widok od tyłu (Posterior / Oś OUN)'}</span>
              </div>
              <div style="display:inline-flex;border-radius:6px;border:1px solid var(--line);background:var(--bg);padding:2px">
                <button class="btn btn-sm ${viewMode === 'front' ? 'btn-primary' : 'btn-subtle'}" id="btnOsceViewFront" style="padding:.2rem .6rem;font-size:.76rem;border-radius:4px;border:0">🧍 Przód</button>
                <button class="btn btn-sm ${viewMode === 'back' ? 'btn-primary' : 'btn-subtle'}" id="btnOsceViewBack" style="padding:.2rem .6rem;font-size:.76rem;border-radius:4px;border:0">🔄 Tył</button>
              </div>
            </div>

            <div class="osce-patient-stage" id="oscePatientStage">
              <div class="osce-stage-inner">
                ${renderOscePatientSilhouette(station, selectedZoneObj, viewMode)}
                ${zones.map(zone => {
                  const isDone = isZoneDone(zone);
                  const isActive = selectedZoneObj && selectedZoneObj.id === zone.id;
                  const doneInZone = (zone.maneuvers || []).filter(m => OSCE_ACTIVE.performedManeuvers.has(m.id)).length;
                  const shortName = zone.name.split('–')[0].split('(')[0].trim();
                  const posX = (viewMode === 'back' && zone.backX !== undefined) ? zone.backX : zone.x;
                  const posY = (viewMode === 'back' && zone.backY !== undefined) ? zone.backY : zone.y;
                  return `<button type="button" class="osce-hotspot ${isDone ? 'performed' : ''} ${isActive ? 'active' : ''}" data-zone="${esc(zone.id)}" style="left:${posX}%; top:${posY}%;" aria-pressed="${isActive ? 'true' : 'false'}" aria-label="${esc(zone.name)}" title="${esc(zone.name)} (${doneInZone}/${(zone.maneuvers || []).length})"><span class="osce-pin-badge"><span class="pin-icon" aria-hidden="true">${zone.icon}</span><span class="pin-name">${esc(shortName)}</span>${isDone ? '<span class="pin-check" aria-hidden="true">✓</span>' : ''}</span></button>`;
                }).join('')}
              </div>
            </div>

            <div style="margin-top:1rem">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem">
                <span style="font-size:.78rem;font-weight:800;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.04em">Strefy neurologiczne:</span>
                <span style="font-size:.78rem;font-weight:700;color:var(--teal)">Wybrana: <b>${selectedZoneObj ? esc(selectedZoneObj.name.split('–')[0].trim()) : '–'}</b></span>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:.35rem">
                ${zones.map(zone => {
                  const isDone = isZoneDone(zone);
                  const isActive = selectedZoneObj && selectedZoneObj.id === zone.id;
                  return `<button class="btn btn-sm btn-subtle zone-chip-btn ${isActive ? 'btn-primary' : ''}" data-zone="${esc(zone.id)}" style="font-size:.78rem;padding:.25rem .55rem;border-radius:999px;${isDone ? 'border-color:var(--green);color:var(--green)' : ''}">${zone.icon} ${esc(zone.name.split('–')[0].trim())} ${isDone ? '✓' : ''}</button>`;
                }).join('')}
              </div>
            </div>
          </div>

          <div>
            <div class="conn-tabs" style="margin-bottom:.8rem">
              <button class="conn-tab-btn ${OSCE_ACTIVE.activeTab === 'maneuvers' ? 'active' : ''}" id="tabBtnManeuvers">🩺 Badanie U02 (${selectedZoneObj ? esc(selectedZoneObj.name.split('–')[0].trim()) : ''})</button>
              <button class="conn-tab-btn ${OSCE_ACTIVE.activeTab === 'interview' ? 'active' : ''}" id="tabBtnInterview">🗣️ Wywiad (${OSCE_ACTIVE.performedQuestions.size}/${(station.interview || []).length})</button>
            </div>

            ${OSCE_ACTIVE.activeTab === 'maneuvers' && selectedZoneObj ? `
              <div class="card" id="osceManeuversCard" style="margin-bottom:1rem;background:var(--surface)">
                <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.8rem">
                  <span style="font-size:1.4rem">${selectedZoneObj.icon}</span>
                  <div><h4 style="margin:0;font-size:1.05rem;color:var(--ink)">${esc(selectedZoneObj.name)}</h4><div style="font-size:.78rem;color:var(--ink-muted)">Dostępne manewry neurologiczne w tej strefie:</div></div>
                </div>
                ${(selectedZoneObj.maneuvers || []).map(m => {
                  const isPerformed = OSCE_ACTIVE.performedManeuvers.has(m.id);
                  return `<div style="margin-bottom:.65rem">
                    <button class="osce-maneuver-btn ${isPerformed ? 'done' : ''}" data-maneuver="${esc(m.id)}">
                      <span style="display:flex;align-items:center;gap:.4rem;flex:1;text-align:left">${isPerformed ? '✅' : '🩺'}<span>${esc(m.label)}</span>${isPerformed && m.isKey ? '<span class="badge" style="background:var(--teal-l);color:var(--teal);font-size:.68rem;padding:.15rem .4rem">KLUCZOWY</span>' : ''}${isPerformed && m.isFatal ? '<span class="badge" style="background:var(--red-l);color:var(--red);font-size:.68rem;padding:.15rem .4rem">RYZYKO</span>' : ''}</span>
                      <span style="font-size:.78rem;font-weight:800;color:${isPerformed ? 'var(--green)' : 'var(--teal)'};margin-left:.6rem">${isPerformed ? 'Wykonano' : 'Zbadaj →'}</span>
                    </button>
                    ${isPerformed ? `<div class="osce-finding-alert"><b>Wynik badania:</b> ${esc(m.finding)}</div>` : ''}
                  </div>`;
                }).join('')}
              </div>
            ` : `
              <div class="card" id="osceManeuversCard" style="margin-bottom:1rem;background:var(--surface)">
                <div style="margin-bottom:.8rem"><h4 style="margin:0 0 .2rem 0;font-size:1.05rem;color:var(--ink)">🗣️ Wywiad celowany z pacjentem / rodziną / świadkiem</h4><p style="margin:0;font-size:.82rem;color:var(--ink-muted)">Wybierz pytania, aby ustalić dynamikę objawów, okno terapeutyczne i obciążenia:</p></div>
                ${(station.interview || []).map((item, idx) => {
                  const isAsked = OSCE_ACTIVE.performedQuestions.has(idx);
                  return `<div class="card" style="margin-bottom:.6rem;padding:.75rem .9rem;background:var(--bg);border:1px solid ${isAsked ? 'var(--green)' : 'var(--line)'}">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem">
                      <span style="font-weight:700;font-size:.86rem;color:var(--ink)">„${esc(item.q)}”</span>
                      ${!isAsked ? `<button class="btn btn-sm btn-subtle btn-ask-question" data-qidx="${idx}" style="white-space:nowrap">Zapytaj 💬</button>` : '<span class="badge" style="background:var(--green-l);color:var(--green);font-size:.72rem">Zadano</span>'}
                    </div>
                    ${isAsked ? `<div style="margin-top:.5rem;padding-top:.5rem;border-top:1px dashed var(--line);font-size:.84rem;color:var(--teal);line-height:1.45"><b>Odpowiedź:</b> „${esc(item.a)}” ${item.isKey ? '<span class="badge" style="background:var(--teal-l);color:var(--teal);font-size:.65rem;margin-left:.4rem">KLUCZOWE</span>' : ''}</div>` : ''}
                  </div>`;
                }).join('')}
              </div>
            `}

            <div class="card" style="background:var(--bg);border:1px solid var(--line-2)">
              <div style="font-weight:800;font-size:.86rem;color:var(--ink);margin-bottom:.5rem">📝 Ostatnio odkryte objawy neurologiczne (${OSCE_ACTIVE.findings.length})</div>
              ${OSCE_ACTIVE.findings.length === 0
                ? '<div style="font-size:.82rem;color:var(--ink-muted);font-style:italic">Nie wykonano jeszcze żadnych manewrów. Kliknij wybraną strefę sylwetki, aby rozpocząć badanie neurologiczne.</div>'
                : `<div style="max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:.4rem">${OSCE_ACTIVE.findings.map(f => `<div style="font-size:.8rem;padding:.45rem .65rem;background:var(--surface);border-radius:8px;border:1px solid ${f.isFatal ? 'var(--red-b)' : 'var(--teal)'}"><div style="display:flex;justify-content:space-between;color:var(--ink-muted);font-size:.72rem;margin-bottom:.15rem"><span><b>${esc(f.zoneName)}</b> › ${esc(f.label)}</span><span>${esc(f.time)}</span></div><div style="color:var(--ink);line-height:1.35">${esc(f.finding)}</div></div>`).join('')}</div>`}
            </div>
          </div>
        </div>
      </div></section>`;

      const zoneMap = new Map(zones.map(z => [z.id, z]));
      const handleZoneSelect = zoneId => {
        if (!zoneMap.has(zoneId)) return;
        const activeEl = document.activeElement;
        const refocusHotspot = activeEl && activeEl.classList && activeEl.classList.contains('osce-hotspot');
        const refocusSvgZone = activeEl && activeEl.classList && activeEl.classList.contains('osce-anatomy-region');
        OSCE_ACTIVE.selectedZone = zoneId;
        OSCE_ACTIVE.activeTab = 'maneuvers';
        const scrollY = window.scrollY;
        renderActiveOsceStation(station);
        if (refocusHotspot) {
          const btn = $$('.osce-hotspot[data-zone]').find(b => b.dataset.zone === zoneId);
          if (btn) btn.focus({ preventScroll: true });
        } else if (refocusSvgZone) {
          const reg = $$('.osce-anatomy-region[data-zone-id]').find(r => r.dataset.zoneId === zoneId);
          if (reg) reg.focus({ preventScroll: true });
        }
        if (window.innerWidth < 960) {
          const card = $('#osceManeuversCard');
          if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          window.scrollTo(0, scrollY);
        }
      };

      $$('.osce-hotspot[data-zone]').forEach(h => {
        h.onclick = () => handleZoneSelect(h.dataset.zone);
        h.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleZoneSelect(h.dataset.zone); } };
      });
      $$('.osce-anatomy-region[data-zone-id]').forEach(el => {
        const zId = el.dataset.zoneId;
        const zObj = zoneMap.get(zId);
        if (!zObj) { el.style.cursor = 'default'; el.style.opacity = '0.6'; return; }
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.setAttribute('aria-pressed', String(OSCE_ACTIVE.selectedZone === zId));
        el.setAttribute('aria-label', zObj.name);
        el.onclick = () => handleZoneSelect(zId);
        el.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleZoneSelect(zId); } };
      });
      $$('.zone-chip-btn[data-zone]').forEach(b => { b.onclick = () => handleZoneSelect(b.dataset.zone); });

      const keepScroll = fn => { const y = window.scrollY; fn(); renderActiveOsceStation(station); window.scrollTo(0, y); };
      const btnFront = $('#btnOsceViewFront');
      const btnBack = $('#btnOsceViewBack');
      if (btnFront) btnFront.onclick = () => keepScroll(() => { OSCE_ACTIVE.viewMode = 'front'; });
      if (btnBack) btnBack.onclick = () => keepScroll(() => { OSCE_ACTIVE.viewMode = 'back'; });
      const tManeuvers = $('#tabBtnManeuvers');
      const tInterview = $('#tabBtnInterview');
      if (tManeuvers) tManeuvers.onclick = () => keepScroll(() => { OSCE_ACTIVE.activeTab = 'maneuvers'; });
      if (tInterview) tInterview.onclick = () => keepScroll(() => { OSCE_ACTIVE.activeTab = 'interview'; });
      const btnToggleScale = $('#btnToggleOsceScale');
      if (btnToggleScale) btnToggleScale.onclick = () => keepScroll(() => { OSCE_ACTIVE.scaleExpanded = !OSCE_ACTIVE.scaleExpanded; });

      $$('.osce-maneuver-btn[data-maneuver]').forEach(b => {
        b.onclick = () => {
          const m = selectedZoneObj && (selectedZoneObj.maneuvers || []).find(x => x.id === b.dataset.maneuver);
          if (m) performOsceManeuver(station, selectedZoneObj, m);
        };
      });
      $$('.btn-ask-question[data-qidx]').forEach(b => { b.onclick = () => askOsceInterviewQuestion(station, parseInt(b.dataset.qidx, 10)); });

      const btnRestart = $('#btnRestartOsce');
      if (btnRestart) btnRestart.onclick = () => {
        if (confirm('Czy na pewno chcesz zresetować tę stację i rozpocząć badanie od początku?')) {
          startOsceStation(station);
          renderActiveOsceStation(station);
        }
      };
      const btnStabilize = $('#btnStabilizeOsce');
      if (btnStabilize) btnStabilize.onclick = () => stabilizeOscePatient(station);
      const btnFinish = $('#btnFinishOsce');
      if (btnFinish) btnFinish.onclick = () => finishOsceStation(station);
    }

    function performOsceManeuver(station, zone, maneuver) {
      if (!OSCE_ACTIVE) return;
      OSCE_ACTIVE.performedManeuvers.add(maneuver.id);
      if (!OSCE_ACTIVE.performedOrder.includes(maneuver.id)) OSCE_ACTIVE.performedOrder.push(maneuver.id);

      if (maneuver.isFatal) {
        OSCE_ACTIVE.isComplication = true;
        OSCE_ACTIVE.complicationMessage = maneuver.fatalMessage;
        OSCE_ACTIVE.reaction = { type: 'crisis', text: (maneuver.reaction && typeof maneuver.reaction === 'object' ? maneuver.reaction.text : '') || '' };
        OSCE_ACTIVE.fatalErrorsTriggered += 1;
        if (maneuver.complicationVitals) OSCE_ACTIVE.currentVitals = { ...OSCE_ACTIVE.currentVitals, ...maneuver.complicationVitals };
        toast('⚠️ BŁĄD KRYTYCZNY! Sprawdź stan pacjenta!');
      } else {
        OSCE_ACTIVE.reaction = maneuver.reaction || 'normal';
        toast('Wykonano: ' + maneuver.label);
      }

      OSCE_ACTIVE.findings.unshift({
        zoneName: zone.name.split('–')[0].trim(),
        label: maneuver.label,
        finding: maneuver.finding,
        reaction: maneuver.reaction,
        isFatal: maneuver.isFatal,
        time: new Date().toLocaleTimeString('pl-PL', { minute: '2-digit', second: '2-digit' })
      });

      const y = window.scrollY;
      renderActiveOsceStation(station);
      window.scrollTo(0, y);
    }

    function askOsceInterviewQuestion(station, index) {
      if (!OSCE_ACTIVE) return;
      OSCE_ACTIVE.performedQuestions.add(index);
      const q = station.interview && station.interview[index];
      if (q && q.isKey) toast('Uzyskano kluczową informację z wywiadu!');
      const y = window.scrollY;
      renderActiveOsceStation(station);
      window.scrollTo(0, y);
    }

    function stabilizeOscePatient(station) {
      if (!OSCE_ACTIVE) return;
      OSCE_ACTIVE.isComplication = false;
      OSCE_ACTIVE.reaction = getInitialReaction(station);
      OSCE_ACTIVE.currentVitals = { ...(station.patient && station.patient.vitalsInitial ? station.patient.vitalsInitial : {}) };
      toast('🚑 Wykonano procedury ratunkowe – parametry ustabilizowane.');
      const y = window.scrollY;
      renderActiveOsceStation(station);
      window.scrollTo(0, y);
    }

    function finishOsceStation(station) {
      window.scrollTo(0, 0);
      if (!OSCE_ACTIVE || OSCE_ACTIVE.stationId !== station.id) startOsceStation(station);

      const allManeuvers = (station.zones || []).flatMap(z => z.maneuvers || []);
      const totalKey = allManeuvers.filter(m => m.isKey).length;
      const doneKey = allManeuvers.filter(m => m.isKey && OSCE_ACTIVE.performedManeuvers.has(m.id)).length;
      const interview = station.interview || [];
      const totalInterviewKey = interview.filter(q => q.isKey).length;
      const doneInterviewKey = interview.filter((q, idx) => q.isKey && OSCE_ACTIVE.performedQuestions.has(idx)).length;

      const renderSummary = () => {
        const isEvaluated = OSCE_ACTIVE.isFinished;
        const syn = station.synthesis || {};
        const sp = station.statusPraesens || { title: 'Status Praesens', sections: [], conclusions: '' };

        main.innerHTML = `<section class="blk" style="border:0"><div class="wrap" style="max-width:980px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
            <div class="crumbs" style="margin:0"><a href="#/pacjent?tab=osce">← Stacje OSCE</a> / <a href="#/pacjent/osce/${station.id}" id="btnBackCrumb">Badanie neurologiczne</a> / <span>Ewaluacja i Status Praesens</span></div>
            <button type="button" class="btn btn-sm" id="btnBackToOsceExam">← Wróć do badania pacjenta</button>
          </div>

          <div class="card" style="margin-bottom:1.5rem;border-top:4px solid var(--teal)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:.8rem">
              <div><div class="eyebrow" style="color:var(--teal)">Karta oceny OSCE · ${esc(station.shortTitle)}</div><h2 style="margin:0">${esc(station.title)}</h2></div>
              ${isEvaluated ? `<div style="text-align:right"><span class="badge" style="font-size:1.1rem;padding:.4rem .9rem;background:${OSCE_ACTIVE.score >= 60 ? 'var(--green-l)' : 'var(--red-l)'};color:${OSCE_ACTIVE.score >= 60 ? 'var(--green)' : 'var(--red)'};font-weight:900">${OSCE_ACTIVE.score >= 60 ? '✅ ZDANY' : '❌ NIEZALICZONY'}: ${OSCE_ACTIVE.score}%</span></div>` : ''}
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:.8rem;background:var(--bg);padding:1rem;border-radius:var(--r);margin-bottom:1rem">
              <div><div style="font-size:.75rem;font-weight:800;color:var(--ink-muted)">Manewry kluczowe</div><div style="font-size:1.1rem;font-weight:900;color:var(--ink)">${doneKey} / ${totalKey}</div></div>
              <div><div style="font-size:.75rem;font-weight:800;color:var(--ink-muted)">Kluczowy wywiad</div><div style="font-size:1.1rem;font-weight:900;color:var(--ink)">${doneInterviewKey} / ${totalInterviewKey}</div></div>
              <div><div style="font-size:.75rem;font-weight:800;color:var(--ink-muted)">Błędy krytyczne</div><div style="font-size:1.1rem;font-weight:900;color:${OSCE_ACTIVE.fatalErrorsTriggered > 0 ? 'var(--red)' : 'var(--green)'}">${OSCE_ACTIVE.fatalErrorsTriggered > 0 ? '⚠️ ' + OSCE_ACTIVE.fatalErrorsTriggered + ' powikłań' : '0 (Czysto)'}</div></div>
              <div><div style="font-size:.75rem;font-weight:800;color:var(--ink-muted)">Ocena syntetyczna</div><div style="font-size:1.1rem;font-weight:900;color:var(--teal)">${isEvaluated ? OSCE_ACTIVE.score + '% punktów' : 'Oczekuje na test'}</div></div>
            </div>

            <details style="margin-bottom:1rem;background:var(--bg);border:1px solid var(--line);border-radius:var(--r);padding:.75rem .95rem">
              <summary style="cursor:pointer;font-weight:800;font-size:.88rem;color:var(--ink)">📋 Podgląd zebranych objawów (${OSCE_ACTIVE.findings.length}), wywiadu (${OSCE_ACTIVE.performedQuestions.size}) i parametrów życiowych</summary>
              <div style="margin-top:.75rem;display:grid;gap:.6rem;font-size:.84rem">
                <div style="display:flex;flex-wrap:wrap;gap:.5rem;padding:.5rem .7rem;background:var(--surface);border-radius:8px;border:1px solid var(--line-2)">
                  <span><b>BP:</b> ${esc((OSCE_ACTIVE.currentVitals || {}).bp || '—')}</span>
                  <span><b>HR:</b> ${esc((OSCE_ACTIVE.currentVitals || {}).hr || '—')}</span>
                  <span><b>SpO₂:</b> ${esc((OSCE_ACTIVE.currentVitals || {}).spo2 || '—')}</span>
                  <span><b>Temp:</b> ${esc((OSCE_ACTIVE.currentVitals || {}).temp || '—')}</span>
                  <span><b>Glukemia:</b> ${esc((OSCE_ACTIVE.currentVitals || {}).glucose || '—')}</span>
                </div>
                ${OSCE_ACTIVE.findings.length ? `<div><div style="font-weight:800;font-size:.78rem;color:var(--ink-muted);margin-bottom:.3rem">ODKRYTE OBJAWY W BADANIU (${OSCE_ACTIVE.findings.length}):</div><div style="display:grid;gap:.3rem;max-height:200px;overflow-y:auto">${OSCE_ACTIVE.findings.map(f => `<div style="padding:.4rem .6rem;background:var(--surface);border-radius:6px;border:1px solid var(--line-2)"><b>${esc(f.zoneName)} › ${esc(f.label)}:</b> ${esc(f.finding)}</div>`).join('')}</div></div>` : '<div class="muted">Nie wykonano jeszcze żadnych manewrów badania.</div>'}
                ${OSCE_ACTIVE.performedQuestions.size ? `<div><div style="font-weight:800;font-size:.78rem;color:var(--ink-muted);margin-bottom:.3rem">ZEBRANY WYWIAD (${OSCE_ACTIVE.performedQuestions.size}):</div><div style="display:grid;gap:.3rem">${interview.map((q, idx) => OSCE_ACTIVE.performedQuestions.has(idx) ? `<div style="padding:.4rem .6rem;background:var(--surface);border-radius:6px;border:1px solid var(--line-2)"><b>${esc(q.q)}</b> → ${esc(q.a)}</div>` : '').join('')}</div></div>` : ''}
              </div>
            </details>

            <div style="border-top:1px solid var(--line-2);padding-top:1.2rem">
              <h3 style="margin-top:0;margin-bottom:.5rem;font-size:1.1rem">🧠 Synteza kliniczna i decyzja egzaminacyjna</h3>
              <p style="font-size:.86rem;color:var(--ink-muted);margin-bottom:1.2rem">Przed wygenerowaniem wzorcowego raportu Status Praesens wskaż rozpoznanie główne, rozpoznania różnicowe i kluczowe postępowanie.</p>

              <div style="margin-bottom:1.3rem">
                <div style="font-weight:800;font-size:.92rem;margin-bottom:.6rem;color:var(--ink)">1. ${esc(syn.questionDiagnostic)}</div>
                <div style="display:flex;flex-direction:column;gap:.5rem">
                  ${(syn.optionsDiagnostic || []).map(opt => {
                    const isSelected = OSCE_ACTIVE.synthesisDiagnosis === opt.id;
                    return `<label style="display:flex;align-items:flex-start;gap:.6rem;padding:.75rem .9rem;border-radius:8px;background:var(--bg);border:1.5px solid ${isSelected ? 'var(--teal)' : 'var(--line)'};cursor:pointer;transition:all .15s">
                      <input type="radio" name="osceDiag" value="${esc(opt.id)}" ${isSelected ? 'checked' : ''} ${isEvaluated ? 'disabled' : ''} style="margin-top:.2rem"/>
                      <div style="flex:1"><span style="font-size:.9rem;font-weight:700;color:var(--ink)">${esc(opt.label)}</span>${isEvaluated ? `<div style="margin-top:.35rem;font-size:.82rem;color:${opt.isCorrect ? 'var(--green)' : 'var(--red)'}">${opt.isCorrect ? '✅ Prawidłowe:' : '❌ Błędne:'} ${esc(opt.explanation)}</div>` : ''}</div>
                    </label>`;
                  }).join('')}
                </div>
              </div>

              <div style="margin-bottom:1.3rem">
                <div style="font-weight:800;font-size:.92rem;margin-bottom:.6rem;color:var(--ink)">2. Zaznacz trafne rozpoznania różnicowe, które należy uwzględnić:</div>
                <div style="display:flex;flex-direction:column;gap:.5rem">
                  ${(syn.differentialOptions || []).map(diff => {
                    const isChecked = (OSCE_ACTIVE.synthesisDifferentials || []).includes(diff.id);
                    return `<label style="display:flex;align-items:center;gap:.6rem;padding:.65rem .85rem;border-radius:8px;background:var(--bg);border:1.5px solid ${isChecked ? 'var(--teal)' : 'var(--line)'};cursor:pointer">
                      <input type="checkbox" class="osce-diff-cb" value="${esc(diff.id)}" ${isChecked ? 'checked' : ''} ${isEvaluated ? 'disabled' : ''}/>
                      <span style="font-size:.88rem;color:var(--ink);flex:1">${esc(diff.label)}</span>
                      ${isEvaluated ? `<span style="font-size:.8rem;font-weight:800;color:${diff.isCorrect ? 'var(--green)' : 'var(--red)'}">${diff.isCorrect ? '✅ Należy uwzględnić' : '❌ Niezwiązane'}</span>` : ''}
                    </label>`;
                  }).join('')}
                </div>
              </div>

              <div style="margin-bottom:1.3rem">
                <div style="font-weight:800;font-size:.92rem;margin-bottom:.6rem;color:var(--ink)">3. Zaznacz kluczowe kroki postępowania diagnostyczno-terapeutycznego:</div>
                <div style="display:flex;flex-direction:column;gap:.5rem">
                  ${(syn.actionOptions || []).map(act => {
                    const isChecked = (OSCE_ACTIVE.synthesisActions || []).includes(act.id);
                    return `<label style="display:flex;align-items:center;gap:.6rem;padding:.65rem .85rem;border-radius:8px;background:var(--bg);border:1.5px solid ${isChecked ? 'var(--teal)' : 'var(--line)'};cursor:pointer">
                      <input type="checkbox" class="osce-act-cb" value="${esc(act.id)}" ${isChecked ? 'checked' : ''} ${isEvaluated ? 'disabled' : ''}/>
                      <span style="font-size:.88rem;color:var(--ink);flex:1">${esc(act.label)}</span>
                      ${isEvaluated ? `<span style="font-size:.8rem;font-weight:800;color:${act.isCorrect ? 'var(--green)' : 'var(--red)'}">${act.isCorrect ? '✅ Zalecane' : '❌ Błędne / Przeciwwskazane'}</span>` : ''}
                    </label>`;
                  }).join('')}
                </div>
              </div>

              ${!isEvaluated ? '<button class="btn btn-primary" id="btnSubmitOsceEvaluation" style="width:100%;padding:.8rem;font-size:.95rem">Zatwierdź rozpoznanie i odbierz Wzorcowy Status Praesens →</button>' : ''}
            </div>
          </div>

          ${isEvaluated ? `
            <div class="card" style="margin-bottom:1.5rem">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;margin-bottom:1rem">
                <div><div class="eyebrow" style="color:var(--teal)">Egzamin kliniczny · Dokumentacja medyczna</div><h3 style="margin:0">${esc(sp.title)}</h3></div>
                <button class="btn btn-sm btn-primary" id="btnCopyStatusPraesens">📋 Kopiuj raport do Notatnika Markdown</button>
              </div>
              <p style="font-size:.86rem;color:var(--ink-muted);line-height:1.45;margin-bottom:1.2rem">Wzorcowy opis stanu neurologicznego (Status Praesens) zgodny ze standardem badania U02 w Klinice Neurologii PUM. Skopiuj raport do Notatnika lub schowka jednym kliknięciem.</p>
              <div class="status-praesens-box">
                ${(sp.sections || []).map(sec => `<div class="status-praesens-section"><h4>${esc(sec.num)}. ${esc(sec.title)}</h4><p style="margin:0;color:var(--ink)">${esc(sec.content)}</p></div>`).join('')}
                <div style="margin-top:1.2rem;border-top:1.5px solid var(--line);background:var(--teal-l);padding:1rem;border-radius:8px"><h4 style="margin:0 0 .35rem 0;color:var(--teal)">💡 Wnioski kliniczne i rozpoznanie końcowe:</h4><p style="margin:0;font-size:.9rem;line-height:1.5;color:var(--ink)">${esc(sp.conclusions)}</p></div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1.2rem;flex-wrap:wrap;gap:.6rem">
                <a href="#/pacjent?tab=osce" class="btn">← Wróć do listy stacji OSCE</a>
                <div style="display:flex;gap:.5rem"><button class="btn" id="btnRepeatOsce">🔄 Powtórz stację</button><button class="btn btn-primary" id="btnCopyStatusPraesensBottom">📋 Kopiuj do Notatnika</button></div>
              </div>
            </div>
          ` : ''}
        </div></section>`;

        const backHandler = e => { if (e) e.preventDefault(); renderActiveOsceStation(station); };
        const btnBack = $('#btnBackToOsceExam');
        const btnCrumb = $('#btnBackCrumb');
        if (btnBack) btnBack.onclick = backHandler;
        if (btnCrumb) btnCrumb.onclick = backHandler;

        $$('input[name="osceDiag"]').forEach(r => { r.onchange = () => { OSCE_ACTIVE.synthesisDiagnosis = r.value; }; });
        const bindChecks = (sel, key) => $$(sel).forEach(cb => {
          cb.onchange = () => {
            const set = new Set(OSCE_ACTIVE[key] || []);
            cb.checked ? set.add(cb.value) : set.delete(cb.value);
            OSCE_ACTIVE[key] = Array.from(set);
          };
        });
        bindChecks('.osce-diff-cb', 'synthesisDifferentials');
        bindChecks('.osce-act-cb', 'synthesisActions');

        const btnSubmit = $('#btnSubmitOsceEvaluation');
        if (btnSubmit) {
          btnSubmit.onclick = () => {
            if (!OSCE_ACTIVE.synthesisDiagnosis) { toast('Proszę wskazać rozpoznanie główne przed zatwierdzeniem'); return; }
            const maneuverPts = (doneKey / (totalKey || 1)) * 50;
            const interviewPts = (doneInterviewKey / (totalInterviewKey || 1)) * 10;
            const correctDiag = (syn.optionsDiagnostic || []).find(o => o.isCorrect);
            const diagPts = OSCE_ACTIVE.synthesisDiagnosis === (correctDiag ? correctDiag.id : '') ? 20 : 0;
            const scoreMulti = (opts, sel) => {
              const correct = (opts || []).filter(o => o.isCorrect).map(o => o.id);
              const s = sel || [];
              return Math.max(0, (s.filter(id => correct.includes(id)).length - s.filter(id => !correct.includes(id)).length) / (correct.length || 1) * 10);
            };
            const diffPts = scoreMulti(syn.differentialOptions, OSCE_ACTIVE.synthesisDifferentials);
            const actPts = scoreMulti(syn.actionOptions, OSCE_ACTIVE.synthesisActions);
            const finalPct = Math.max(0, Math.min(100, Math.round(maneuverPts + interviewPts + diagPts + diffPts + actPts - OSCE_ACTIVE.fatalErrorsTriggered * 25)));

            OSCE_ACTIVE.score = finalPct;
            OSCE_ACTIVE.isFinished = true;
            ctx.S.osceCases = ctx.S.osceCases || {};
            ctx.S.osceCases[station.id] = { score: finalPct, doneAt: Date.now(), passed: finalPct >= 60, maneuversDone: doneKey, maneuversTotal: totalKey };
            save();
            toast(finalPct >= 60 ? `Gratulacje! Stacja zaliczona na ${finalPct}%` : `Wynik: ${finalPct}% – przeanalizuj błędy i powtórz badanie`);
            renderSummary();
          };
        }

        const copyBtn = $('#btnCopyStatusPraesens');
        const copyBtnBottom = $('#btnCopyStatusPraesensBottom');
        if (copyBtn) copyBtn.onclick = () => copyStatusPraesensToNotes(station);
        if (copyBtnBottom) copyBtnBottom.onclick = () => copyStatusPraesensToNotes(station);

        const btnRepeat = $('#btnRepeatOsce');
        if (btnRepeat) btnRepeat.onclick = () => { startOsceStation(station); renderActiveOsceStation(station); };
      };

      renderSummary();
    }

    function copyStatusPraesensToNotes(station) {
      if (!station || !station.statusPraesens) return;
      const sp = station.statusPraesens;
      const nowStr = new Date().toLocaleDateString('pl-PL') + ' ' + new Date().toLocaleTimeString('pl-PL');
      const md = `# ${sp.title}
**Data badania:** ${nowStr}
**Pacjent:** ${station.patient.name} (${station.patient.age}${station.patient.weight ? ', ' + station.patient.weight : ''})
**Tematyka kliniczna:** ${station.topic}

---

## Badanie przedmiotowe (Status Praesens)

${(sp.sections || []).map(s => `### ${s.num}. ${s.title}\n${s.content}`).join('\n\n')}

---

### Wnioski kliniczne i rozpoznanie końcowe
${sp.conclusions}

---
*Wygenerowano w module Wirtualny Pacjent – Symulator Egzaminu Praktycznego OSCE (Neurologia V – Hub)*
`;
      try {
        const notes = getNotes();
        notes.unshift({ id: 'osce_sp_' + Date.now(), title: `Status Praesens: ${station.shortTitle} (OSCE)`, content: md, body: md, mod: (station.mods && station.mods[0]) ? station.mods[0] : 'all', updatedAt: Date.now() });
        saveNotes(notes);
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).catch(() => {});
        toast('✅ Skopiowano raport do Notatnika oraz do schowka!');
      } catch (err) {
        console.error('Błąd zapisu notatki:', err);
        toast('Nie udało się zapisać notatki');
      }
    }

    function openStation(station) {
      if (!OSCE_ACTIVE || OSCE_ACTIVE.stationId !== station.id) startOsceStation(station);
      renderActiveOsceStation(station);
    }

    return { openStation, renderOsceStationList, startOsceStation, renderActiveOsceStation };
  };
})();
