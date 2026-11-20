/* Moduł kliniczny: Diagnostyka (PMR · TK/MRI · EEG/EMG · Topodiagnostyka) */
(function () {
  'use strict';

  window.HUB_CLINICAL = window.HUB_CLINICAL || {};

  const IMG_STORAGE_KEY = 'neurologia_hub_imaging_v1';
  const TOPO_STORAGE_KEY = 'neurologia_hub_topo_v1';

  const PMR_PRESETS = [
    { id: 'normal', label: 'Norma', cells: 2, neutPct: 10, proteinMgDl: 32, glucoseRatio: 0.65, xanthochromia: false, oligoclonal: false, pressure: '120 mm H₂O', look: 'Klarowny, bezbarwny' },
    { id: 'bacterial', label: 'Bakteryjne ZOMR', cells: 1650, neutPct: 88, proteinMgDl: 240, glucoseRatio: 0.22, xanthochromia: false, oligoclonal: false, pressure: '>250 mm H₂O', look: 'Mętny / ropny' },
    { id: 'viral', label: 'Wirusowe ZOMR', cells: 110, neutPct: 15, proteinMgDl: 68, glucoseRatio: 0.62, xanthochromia: false, oligoclonal: false, pressure: '160–220 mm H₂O', look: 'Klarowny / opalizujący' },
    { id: 'tb', label: 'Gruźlicze ZOMR', cells: 185, neutPct: 22, proteinMgDl: 260, glucoseRatio: 0.28, xanthochromia: false, oligoclonal: false, pressure: 'Podwyższone', look: 'Opalizujący, siateczka włóknika' },
    { id: 'gbs', label: 'GBS (rozszczepienie)', cells: 3, neutPct: 0, proteinMgDl: 185, glucoseRatio: 0.60, xanthochromia: false, oligoclonal: false, pressure: 'Prawidłowe', look: 'Klarowny (białko rośnie od 2. tyg.)' },
    { id: 'sah', label: 'SAH (ksantochromia)', cells: 18, neutPct: 12, proteinMgDl: 58, glucoseRatio: 0.58, xanthochromia: true, oligoclonal: false, pressure: 'Podwyższone', look: 'Zażółcony po wirowaniu (>6–12 h)' },
    { id: 'ms', label: 'SM (prążki IgG)', cells: 14, neutPct: 5, proteinMgDl: 46, glucoseRatio: 0.62, xanthochromia: false, oligoclonal: true, pressure: 'Prawidłowe', look: 'Klarowny (typ II prążków IgG)' }
  ];

  const LP_CONTRAINDICATIONS = [
    { badge: 'TK przed LP', tone: 'red', title: 'Podejrzenie ciasnoty / wgłobienia', desc: 'Obrzęk tarczy n. II, anizokoria, deficyt ogniskowy, GCS ≤ 8, świeży napad padaczkowy, ciężka immunosupresja lub wywiad guza OUN.' },
    { badge: 'Bezwzględne', tone: 'red', title: 'Zakażenie skóry w miejscu wkłucia', desc: 'Ropne zmiany lub infekcja tkanek miękkich okolicy lędźwiowej L3–L5 grożą zawleczeniem patogenów do kanału kręgowego.' },
    { badge: 'Koagulopatia', tone: 'amber', title: 'Skaza krwotoczna i antykoagulacja', desc: 'PLT < 50 000/µl, INR > 1,4 lub czynne leczenie DOAC/heparyną bez okna odstawienia grożą krwiakiem nadtwardówkowym kanału.' },
    { badge: 'Technika U02', tone: 'blue', title: 'L3/L4–L4/L5 i próba 3 probówek', desc: 'Nakłucie poniżej stożka rdzenia (L1/L2). Próba 3 probówek i wirowanie w kierunku ksantochromii różnicują SAH od artefaktu.' }
  ];

  const NEUROFIZ_PATTERNS = [
    { id: 'eeg-3hz', group: 'eeg', tag: 'EEG · Napady nieświadomości', title: 'Iglica–fala wolna 3 Hz (Absence)', sub: 'Uogólnione, synchroniczne wyładowania na prawidłowym tle', findings: 'Nagły początek i koniec uogólnionych zespołów iglica–fala wolna 3 Hz, prowokowanych hiperwentylacją.', clinical: 'Krótkie (5–15 s) wyłączenia świadomości z przerwaniem czynności bez splątania ponapadowego.', therapy: 'I rzut: etosuksymid (izolowane absence) lub walproinian (z GTC). Karbamazepina i fenytoina nasilają napady!' },
    { id: 'eeg-jme', group: 'eeg', tag: 'EEG · JME', title: 'Poliiglica–fala 4–6 Hz (JME)', sub: 'Młodzieńcza padaczka miokloniczna — fotostymulacja i brak snu', findings: 'Uogólnione wyładowania wieloiglica–fala (polyspike-and-wave) 4–6 Hz z reakcją fotoparoksyzmalną.', clinical: 'Poranne mioklonie ramion („rozlanie porannej kawy”) po deprywacji snu, często przed napadem GTC.', therapy: 'Walproinian (mężczyźni) lub lewetyracetam / lamotrygina (kobiety w wieku rozrodczym). Unikać blokerów Na⁺ (CBZ/PHT).' },
    { id: 'eeg-lpd', group: 'eeg', tag: 'EEG · HSV / Ogniskowe', title: 'Okresowe wyładowania lateralizujące (LPD / PLEDs)', sub: 'Skroniowe fale ostre co 0,5–2 s w opryszczkowym zapaleniu mózgu', findings: 'Powtarzające się co 0,5–2 Hz ostre zespoły nad płatem skroniowym (LPD, daw. PLEDs) na spowolnionym tle delta.', clinical: 'Gorączka, zaburzenia świadomości i zachowania, afazja, napady ogniskowe; MRI FLAIR/DWI w przyśrodkowym płacie skroniowym.', therapy: 'Natychmiast acyklowir i.v. (10 mg/kg co 8 h) jeszcze przed uzyskaniem wyniku PCR z PMR.' },
    { id: 'eeg-metab', group: 'eeg', tag: 'EEG · Encefalopatia', title: 'Spowolnienie rozlane i fale trójfazowe', sub: 'Encefalopatia wątrobowa, mocznicowa, hiponatremia, hipoksja', findings: 'Zanik rytmu alfa (8–13 Hz), dominacja fal theta/delta oraz czołowe fale trójfazowe z opóźnieniem przednio-tylnym.', clinical: 'Fluktuujące zaburzenia świadomości, asterixis i splątanie bez ogniskowego niedowładu piramidowego.', therapy: 'Leczenie przyczynowe (amoniak, sód, mocznik). Różnicowanie fal trójfazowych z NCSE: próba z BDZ i.v.' },
    { id: 'eng-axonal', group: 'emg', tag: 'ENG · Polineuropatie', title: 'Neuropatia aksonalna vs demielinizacyjna', sub: 'Amplituda CMAP/SNAP vs szybkość przewodzenia (NCV) i fala F', findings: 'Aksonalna: spadek amplitudy CMAP/SNAP przy NCV w normie. Demielinizacyjna (GBS/CIDP): spadek NCV <70–80%, wydłużenie DML i fali F, blok przewodzenia.', clinical: 'We wczesnym GBS rutynowe ENG bywa prawidłowe — najczulsze są wydłużenie/brak fali F oraz dyspersja czasowa.', therapy: 'GBS: IVIG (0,4 g/kg/d × 5 dni) lub plazmafereza; GKS są nieskuteczne w GBS (w przeciwieństwie do CIDP).' },
    { id: 'emg-decrement', group: 'emg', tag: 'EMG · Złącze N-M', title: 'Dekrement >10% w próbie RNS 3 Hz (Miastenia)', sub: 'Nużliwość postsynaptyczna (anty-AChR / anty-MuSK) + SFEMG', findings: 'Spadek amplitudy 4./5. potencjału CMAP o >10% względem 1. przy stymulacji 3 Hz; w SFEMG wzrost jitteru.', clinical: 'Ptoza, diplopia i dyzartria nasilające się wieczorem, poprawa po teście z lodem, prawidłowe odruchy głębokie.', therapy: 'Pirydostygmina, GKS/azatiopryna, tymektomia; przełom miasteniczny = IVIG lub plazmafereza + zabezpieczenie oddechu.' },
    { id: 'emg-increment', group: 'emg', tag: 'EMG · Paraneoplastyczne', title: 'Inkrement >100% przy 20–50 Hz (LEMS)', sub: 'Przeciwciała anty-VGCC (presynaptyczne), związek z SCLC', findings: 'Niski wyjściowy CMAP, lecz po krótkim wysiłku lub stymulacji 20–50 Hz wzrost amplitudy o >100% (torowanie).', clinical: 'Proksymalne osłabienie kończyn dolnych, zniesione odruchy wracające po wysiłku, suchość w ustach (dysautonomia).', therapy: 'Pilna diagnostyka drobnokomórkowego raka płuca (TK klatki), amifamprydyna (3,4-DAP), leczenie onkologiczne.' },
    { id: 'emg-sla', group: 'emg', tag: 'EMG · Neuron ruchowy', title: 'Zapis neurogenny z fascykulacjami (SLA)', sub: 'Odnerwienie aktywne + reinerwacja przy prawidłowym ENG czuciowym', findings: 'W spoczynku fibrylacje, dodatnie fale ostre i fascykulacje; przy wysiłku zubożenie zapisu i olbrzymie polifazowe MUP.', clinical: 'Współistnienie UMN (wygórowane odruchy, Babiński) i LMN (zaniki, fascykulacje) bez zaburzeń czucia i zwieraczy.', therapy: 'Ryluzol, wczesne wsparcie oddechowe (NIV) i żywieniowe (PEG); wykluczyć wieloogniskową neuropatię ruchową (MMN).' }
  ];

  const DIAG_QUIZ = [
    { stem: 'W 10. godzinie od piorunującego bólu głowy TK bez kontrastu jest prawidłowe. Co w PMR potwierdza SAH, odróżniając je od artefaktu nakłucia?', opts: ['1200 erytrocytów/µl w 1. probówce', 'Ksantochromia supernatantu po odwirowaniu PMR', 'Białko 55 mg/dl i cytoza 8/µl', 'Stosunek glukozy PMR/surowica 0,55'], key: 1, why: 'Ksantochromia (bilirubina z rozkładu hemoglobiny) rozwija się >6–12 h od SAH i nie występuje w świeżym artefakcie wkłucia.' },
    { stem: 'Jaka jest właściwa kolejność przy podejrzeniu bakteryjnego ZOMR ze świeżym niedowładem połowiczym i obrzękiem tarczy n. II?', opts: ['Natychmiastowa LP przed antybiotykiem', 'Posiewy krwi → deksametazon + antybiotyk i.v. → TK głowy → dopiero po wykluczeniu ciasnoty LP', 'Wyłącznie obserwacja i EEG przez 12 h', 'Mannitol oraz odroczenie antybiotyku do wyniku MRI'], key: 1, why: 'Objawy ogniskowe i obrzęk tarczy n. II nakazują TK przed LP, ale NIE wolno opóźniać antybiotykoterapii i deksametazonu.' },
    { stem: 'W TK po urazie skroni widoczna jest hiperdensyjna, dwuwypukła (soczewkowata) zmiana nieprzekraczająca szwów czaszki. Jakie to krwawienie?', opts: ['Krwiak podtwardówkowy (żyły mostkowe)', 'Krwiak nadtwardówkowy (najczęściej t. oponowa środkowa)', 'Krwotok podpajęczynówkowy z tętniaka ACA', 'Udar niedokrwienny w dorzeczu MCA'], key: 1, why: 'Soczewkowata masa ograniczona szwami czaszki to klasyczny krwiak nadtwardówkowy po uszkodzeniu tętnicy oponowej środkowej.' },
    { stem: 'U młodego dorosłego z typowymi napadami nieświadomości (absence) hiperwentylacja prowokuje wyładowania iglica–fala 3 Hz. Który lek nasili napady?', opts: ['Etosuksymid', 'Kwas walproinowy', 'Karbamazepina', 'Lamotrygina'], key: 2, why: 'Blokery kanałów sodowych (karbamazepina, okskarbazepina, fenytoina) nasilają uogólnione napady nieświadomości i miokloniczne.' },
    { stem: 'Które znalezisko elektrofizjologiczne odróżnia zespół Lamberta–Eatona (LEMS) od miastenii gravis (MG)?', opts: ['Dekrement >10% przy 3 Hz wyłącznie w LEMS', 'Inkrement CMAP >100% przy 20–50 Hz lub po wysiłku w LEMS', 'Fibrylacje wyłącznie w MG', 'Wydłużenie fali F wyłącznie w LEMS'], key: 1, why: 'W LEMS niski wyjściowy CMAP wzrasta o >100% po wysiłku lub stymulacji 20–50 Hz; w MG dominuje dekrement przy 3 Hz.' }
  ];

  let qSel = () => null;
  let hEsc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let sNorm = s => String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');

  function loadStorageMap(key) {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) { return {}; }
  }

  function renderNeurofizSVG(svgKey) {
    const grid = '<rect width="320" height="110" fill="#09101a"/><g stroke="#162436" stroke-width="0.8"><path d="M0 27H320M0 55H320M0 83H320M40 0V110M80 0V110M120 0V110M160 0V110M200 0V110M240 0V110M280 0V110"/></g>';
    const map = {
      'eeg-3hz': '<path d="M8 55 Q24 51 40 55 T56 55 L60 18 L64 62 Q73 92 84 55 L88 16 L92 62 Q101 92 112 55 L116 17 L120 62 Q129 92 140 55 L144 16 L148 62 Q157 92 168 55 L172 18 L176 62 Q185 92 196 55 L200 17 L204 62 Q213 92 224 55 L228 20 L232 60 Q240 82 248 55 Q272 51 312 55" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linejoin="round"/><text x="150" y="13" fill="#fbbf24" font-size="9" font-weight="700" text-anchor="middle">3 Hz iglica–fala (nagły początek/koniec)</text>',
      'eeg-jme': '<path d="M8 58 Q32 54 56 58 L62 20 L65 55 L69 14 L72 58 L76 18 L80 62 Q92 95 104 58 H124 L130 19 L133 56 L137 13 L140 58 L144 18 L148 62 Q160 95 172 58 H194 L200 20 L203 55 L207 15 L210 58 L214 19 L218 62 Q230 95 242 58 Q276 54 312 58" fill="none" stroke="#f59e0b" stroke-width="1.9" stroke-linejoin="round"/><text x="160" y="13" fill="#fde68a" font-size="9" font-weight="700" text-anchor="middle">Poliiglica–fala 4–6 Hz (fotostymulacja)</text>',
      'eeg-lpd': '<path d="M8 38 Q18 35 28 38 L34 15 L39 50 Q48 56 58 38 Q74 42 90 38 L96 14 L101 51 Q110 56 120 38 Q138 43 156 38 L162 15 L167 50 Q176 56 186 38 Q204 42 222 38 L228 14 L233 51 Q242 56 252 38 Q280 42 310 38" fill="none" stroke="#f87171" stroke-width="2" stroke-linejoin="round"/><path d="M8 82 Q45 77 85 82 T165 82 T245 82 T310 82" fill="none" stroke="#64748b" stroke-width="1.6"/><text x="160" y="12" fill="#fca5a5" font-size="8.8" font-weight="700" text-anchor="middle">T3–T5: okresowe LPD co ~1 s (HSV)</text>',
      'eeg-metab': '<path d="M8 58 Q25 46 42 58 L50 66 L62 20 L78 76 Q92 68 106 56 Q118 46 130 58 L138 67 L150 22 L166 76 Q180 68 194 56 Q206 47 218 58 L226 66 L238 21 L254 76 Q268 68 282 56 Q296 48 312 58" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linejoin="round"/><text x="160" y="13" fill="#ddd6fe" font-size="9" font-weight="700" text-anchor="middle">Spowolnienie theta/delta + fale trójfazowe</text>',
      'eng-axonal': '<path d="M12 40 H48 C56 40 60 12 66 12 C72 12 76 55 84 48 C90 43 96 40 124 40" fill="none" stroke="#34d399" stroke-width="2"/><path d="M12 40 H48 C56 40 60 31 66 31 C72 31 76 44 84 42 C90 40 96 40 124 40" fill="none" stroke="#f87171" stroke-width="2"/><path d="M172 78 H210 C218 78 222 50 228 50 C234 50 238 92 246 86 C252 81 258 78 308 78" fill="none" stroke="#34d399" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M172 78 H244 C252 78 258 64 266 64 C274 64 282 88 292 84 C298 81 304 78 312 78" fill="none" stroke="#fbbf24" stroke-width="2"/><text x="72" y="96" fill="#fca5a5" font-size="8.2" font-weight="700" text-anchor="middle">Aksonalna: ↓ Ampl, NCV ≈ N</text><text x="242" y="24" fill="#fde68a" font-size="8.2" font-weight="700" text-anchor="middle">Demielinizacja: ↑ DML, ↓↓ NCV</text>',
      'emg-decrement': '<path d="M24 85 L34 20 L42 85 M78 85 L88 30 L96 85 M132 85 L142 38 L150 85 M186 85 L196 45 L204 85 M240 85 L250 47 L258 85" fill="none" stroke="#f87171" stroke-width="3" stroke-linejoin="round"/><path d="M34 20 L88 30 L142 38 L196 45 L250 47" fill="none" stroke="#fbbf24" stroke-width="1.4" stroke-dasharray="4 3"/><text x="160" y="13" fill="#fca5a5" font-size="9" font-weight="700" text-anchor="middle">RNS 3 Hz: dekrement −32% (4./5. vs 1.)</text>',
      'emg-increment': '<path d="M24 86 L32 68 L40 86 M68 86 L76 70 L84 86" fill="none" stroke="#94a3b8" stroke-width="2.5"/><path d="M135 86 L144 48 L152 86 M185 86 L194 32 L202 86 M235 86 L244 20 L252 86 M280 86 L289 16 L297 86" fill="none" stroke="#34d399" stroke-width="3" stroke-linejoin="round"/><path d="M76 70 L144 48 L194 32 L244 20 L289 16" fill="none" stroke="#38bdf8" stroke-width="1.4" stroke-dasharray="4 3"/><text x="160" y="13" fill="#6ee7b7" font-size="8.8" font-weight="700" text-anchor="middle">LEMS: niski CMAP → po wysiłku / 50 Hz +280%</text>',
      'emg-sla': '<path d="M8 62 H24 L27 46 L30 74 L33 62 H52 L55 77 L58 55 L62 62 H85 L88 45 L91 75 L94 62" fill="none" stroke="#f59e0b" stroke-width="1.6"/><path d="M120 62 H152 L158 18 L164 92 L170 28 L176 80 L182 54 L188 62 H238 L244 20 L250 90 L256 32 L262 78 L268 62 H310" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linejoin="round"/><text x="58" y="15" fill="#fde68a" font-size="8.2" font-weight="700" text-anchor="middle">Fibrylacje / PSW</text><text x="215" y="15" fill="#7dd3fc" font-size="8.2" font-weight="700" text-anchor="middle">Olbrzymie polifazowe MUP</text>'
    };
    return `<svg viewBox="0 0 320 110" class="imaging-canvas-svg" style="max-height:135px;border-radius:8px" role="img" aria-label="Wzorzec elektrofizjologiczny">${grid}${map[svgKey] || ''}</svg>`;
  }

  function resolveImagingGeometry(cases, cItem) {
    const gx = x => Number(x?.hotspot?.targetX ?? x?.targetX);
    const gy = x => Number(x?.hotspot?.targetY ?? x?.targetY);
    const gr = x => Number(x?.hotspot?.radius ?? x?.radius);
    const list = cases.length ? cases : [cItem];
    const isPct = list.every(x => gx(x) <= 100 && gy(x) <= 100 && (gr(x) || 12) <= 22);
    if (isPct) return { vbW: 400, vbH: 300, tx: (gx(cItem) || 50) * 4, ty: (gy(cItem) || 50) * 3, tr: Math.max(24, (gr(cItem) || 10) * 3.2) };
    const maxX = Math.max(...list.map(x => gx(x) || 200));
    const maxY = Math.max(...list.map(x => gy(x) || 150));
    let vbW = 400; let vbH = 300;
    if (maxX <= 250 && maxY <= 210) { vbW = 320; vbH = 260; }
    else if (maxX <= 300 && maxY <= 235 && !list.some(x => gx(x) > 270)) { vbW = 360; vbH = 280; }
    else if (maxX > 380 || maxY > 280) { vbW = Math.max(400, maxX + 55); vbH = Math.max(300, maxY + 55); }
    return { vbW, vbH, tx: gx(cItem) || vbW / 2, ty: gy(cItem) || vbH / 2, tr: Math.max(22, gr(cItem) || 32) };
  }

  function renderAxialScanSVG(cItem, isRevealed, geo, modType) {
    const { vbW, vbH, tx, ty, tr } = geo;
    const cx = vbW / 2; const cy = vbH / 2;
    const rx = Math.min(vbW * 0.34, 134); const ry = Math.min(vbH * 0.42, 126);
    const side = tx < cx ? -1 : 1;
    const isMRI = modType === 'mri';
    const key = sNorm([cItem.id, cItem.title, cItem.short, cItem.svgType, cItem.pathology, cItem.lesion, cItem.finding, cItem.diagnosis, cItem.hotspot?.name, cItem.hotspot?.hint].filter(Boolean).join(' '));
    let lesion = '';
    if (key.includes('nadtward') || key.includes('epidur')) {
      const ex = cx + side * (rx - 14);
      lesion = `<path d="M ${ex} ${ty - 40} Q ${cx + side * (rx - 52)} ${ty} ${ex} ${ty + 40} Q ${ex + side * 14} ${ty} ${ex} ${ty - 40} Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`;
    } else if (key.includes('podtward') || key.includes('subdur')) {
      lesion = `<path d="M ${cx + side * 18} ${cy - ry + 12} A ${rx - 8} ${ry - 10} 0 0 ${side > 0 ? 1 : 0} ${cx + side * 24} ${cy + ry - 12} Q ${cx + side * (rx - 32)} ${cy} ${cx + side * 18} ${cy - ry + 12} Z" fill="#e2e8f0" opacity="0.92"/>`;
    } else if (key.includes('sah') || key.includes('podpajecz')) {
      lesion = `<polygon points="${cx},${cy - 25} ${cx + 12},${cy - 6} ${cx + 32},${cy - 4} ${cx + 15},${cy + 10} ${cx + 21},${cy + 30} ${cx},${cy + 17} ${cx - 21},${cy + 30} ${cx - 15},${cy + 10} ${cx - 32},${cy - 4} ${cx - 12},${cy - 6}" fill="#f8fafc" opacity="0.92"/><path d="M ${cx - 26} ${cy - 4} Q ${cx - 64} ${cy - 16} ${cx - 84} ${cy - 8} M ${cx + 26} ${cy - 4} Q ${cx + 64} ${cy - 16} ${cx + 84} ${cy - 8}" stroke="#f8fafc" stroke-width="4.5" stroke-linecap="round"/>`;
    } else if (key.includes('krwotok') || key.includes('srodmozg') || key.includes('ich')) {
      lesion = `<ellipse cx="${tx}" cy="${ty}" rx="28" ry="21" fill="#0f172a" opacity="0.65"/><ellipse cx="${tx}" cy="${ty}" rx="20" ry="15" fill="#f8fafc"/>`;
    } else if (/(^|[^a-z])sm([^a-z]|$)/.test(key) || key.includes('stwardn') || key.includes('demiel') || key.includes('dawson')) {
      lesion = `<g fill="#f1f5f9"><ellipse cx="${cx - 28}" cy="${cy - 22}" rx="12" ry="5" transform="rotate(-35 ${cx - 28} ${cy - 22})"/><ellipse cx="${cx - 32}" cy="${cy + 14}" rx="13" ry="5" transform="rotate(28 ${cx - 32} ${cy + 14})"/><ellipse cx="${cx + 30}" cy="${cy - 16}" rx="12" ry="5" transform="rotate(32 ${cx + 30} ${cy - 16})"/><ellipse cx="${tx}" cy="${ty}" rx="14" ry="6" transform="rotate(${side * 30} ${tx} ${ty})"/></g>`;
    } else if (key.includes('hsv') || key.includes('opryszcz') || key.includes('skron') || key.includes('guz') || key.includes('glej')) {
      lesion = `<ellipse cx="${tx}" cy="${ty}" rx="28" ry="20" fill="#cbd5e1" opacity="0.85"/><ellipse cx="${tx}" cy="${ty}" rx="16" ry="11" fill="#f8fafc" opacity="0.95"/>`;
    } else {
      const wx = cx + side * (rx - 14);
      lesion = `<path d="M ${cx + side * 26} ${cy - 18} L ${wx - side * 6} ${cy - 52} A ${rx - 12} ${ry - 12} 0 0 ${side > 0 ? 1 : 0} ${wx - side * 6} ${cy + 46} Z" fill="#131922" opacity="0.88"/><path d="M ${cx + side * 12} ${cy + 10} Q ${cx + side * 34} ${cy + 4} ${cx + side * 52} ${cy + 16}" stroke="#f8fafc" stroke-width="4.5" stroke-linecap="round"/>`;
    }
    const shiftX = (key.includes('nadtward') || key.includes('podtward') || key.includes('krwotok') || key.includes('guz')) ? (-side * 6) : 0;
    return `<svg viewBox="0 0 ${vbW} ${vbH}" class="imaging-canvas-svg" id="imgScanSvg" role="group" aria-label="Skan osiowy mózgu">
      <rect width="${vbW}" height="${vbH}" fill="#05080f"/>
      <text x="16" y="26" fill="#94a3b8" font-size="13" font-weight="800">R</text><text x="${vbW - 26}" y="26" fill="#94a3b8" font-size="13" font-weight="800">L</text><text x="${cx}" y="18" fill="#64748b" font-size="10" font-weight="700" text-anchor="middle">A</text>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx + 4}" ry="${ry + 4}" fill="none" stroke="${isMRI ? '#475569' : '#e2e8f0'}" stroke-width="${isMRI ? 4 : 9}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx - 4}" ry="${ry - 4}" fill="${isMRI ? '#334155' : '#26303d'}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx - 18}" ry="${ry - 18}" fill="${isMRI ? '#1e293b' : '#313d4d'}"/>
      <g transform="translate(${shiftX},0)">
        <line x1="${cx}" y1="${cy - ry + 10}" x2="${cx}" y2="${cy + ry - 10}" stroke="#0f172a" stroke-width="2"/>
        <path d="M ${cx - 3} ${cy - 44} Q ${cx - 24} ${cy - 36} ${cx - 16} ${cy - 6} Q ${cx - 10} ${cy + 14} ${cx - 26} ${cy + 34} Q ${cx - 8} ${cy + 28} ${cx - 3} ${cy + 8} Z" fill="#090d16"/>
        <path d="M ${cx + 3} ${cy - 44} Q ${cx + 24} ${cy - 36} ${cx + 16} ${cy - 6} Q ${cx + 10} ${cy + 14} ${cx + 26} ${cy + 34} Q ${cx + 8} ${cy + 28} ${cx + 3} ${cy + 8} Z" fill="#090d16"/>
      </g>
      ${lesion}
      ${isRevealed ? `<circle cx="${tx}" cy="${ty}" r="${tr}" class="imaging-pulse-circle" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="2.5"/>` : ''}
      <circle id="imgHitTarget" class="imaging-hit-circle" cx="${tx}" cy="${ty}" r="${tr}" fill="transparent" stroke="transparent" tabindex="0" role="button" aria-label="Wskaż ognisko patologiczne na skanie"/>
    </svg>`;
  }

  function inferTopoZone(item) {
    const text = sNorm(item?.svgZone || item?.zoneKey || item?.targetZone || [item?.id, item?.name, item?.title, item?.level, item?.location, item?.lesionSite].filter(Boolean).join(' '));
    if (text.includes('mca') || text.includes('aca')) return 'cortex';
    if (text.includes('ogon') || text.includes('cauda')) return 'cauda';
    if (text.includes('sznur') || text.includes('dorsal') || text.includes('gleboki') || text.includes('romberg')) return 'dorsal';
    if (text.includes('szczelin') || text.includes('orbital') || text.includes('oczo') || text.includes('wallenberg') || text.includes('weber') || text.includes('millard') || text.includes('opuszk') || text.includes('most') || text.includes('srodmozg') || text.includes('pnia') || text.includes('pien') || text.includes('galko')) return 'brainstem';
    if (text.includes('mozdz') || text.includes('cerebell') || text.includes('ataksj')) return 'cerebellum';
    if (text.includes('zlacz') || text.includes('miast') || text.includes('lems') || text.includes('miop') || text.includes('miesn')) return 'nmj';
    if (text.includes('sla') || text.includes('stwardnienie zanikowe')) return 'sla';
    if (text.includes('brown') || text.includes('rdzen')) return 'cord';
    if (text.includes('lmn') || text.includes('obwod') || text.includes('polineur') || text.includes('gbs') || text.includes('rwa')) return 'lmn';
    return 'cortex';
  }

  function renderTopoSVG(zoneKey, isUrgent) {
    const hi = isUrgent ? '#dc2626' : '#0c7a85';
    const hiFill = isUrgent ? 'rgba(220,38,38,0.24)' : 'rgba(12,122,133,0.22)';
    const dim = 'var(--line)';
    const zones = {
      cortex: { cx: 108, cy: 52, r: 22 }, brainstem: { cx: 140, cy: 122, r: 20 }, cerebellum: { cx: 194, cy: 126, r: 22 },
      cord: { cx: 140, cy: 196, r: 18 }, dorsal: { cx: 148, cy: 202, r: 16 }, sla: { cx: 140, cy: 186, r: 20 },
      cauda: { cx: 140, cy: 266, r: 20 }, lmn: { cx: 198, cy: 238, r: 20 }, nmj: { cx: 215, cy: 298, r: 20 }
    };
    const z = zones[zoneKey];
    return `<svg viewBox="0 0 280 340" class="rash-svg-canvas" role="img" aria-label="Schemat pięter układu nerwowego">
      <ellipse cx="140" cy="60" rx="64" ry="42" fill="${zoneKey === 'cortex' || zoneKey === 'sla' ? hiFill : 'var(--surface-2)'}" stroke="${zoneKey === 'cortex' || zoneKey === 'sla' ? hi : dim}" stroke-width="2.2"/>
      <path d="M140 20 V100" stroke="${dim}" stroke-width="1.5" stroke-dasharray="3 3"/>
      <ellipse cx="194" cy="126" rx="28" ry="20" fill="${zoneKey === 'cerebellum' ? hiFill : 'var(--surface-2)'}" stroke="${zoneKey === 'cerebellum' ? hi : dim}" stroke-width="2"/>
      <rect x="125" y="98" width="30" height="54" rx="10" fill="${zoneKey === 'brainstem' ? hiFill : 'var(--surface-2)'}" stroke="${zoneKey === 'brainstem' ? hi : dim}" stroke-width="2"/>
      <rect x="131" y="154" width="18" height="92" rx="7" fill="${zoneKey === 'cord' || zoneKey === 'dorsal' || zoneKey === 'sla' ? hiFill : 'var(--surface-2)'}" stroke="${zoneKey === 'cord' || zoneKey === 'dorsal' || zoneKey === 'sla' ? hi : dim}" stroke-width="2"/>
      <path d="M135 246 L124 294 M140 246 V298 M145 246 L156 294" fill="none" stroke="${zoneKey === 'cauda' ? hi : dim}" stroke-width="${zoneKey === 'cauda' ? 2.4 : 1.5}"/>
      <path d="M149 206 C175 212 194 226 210 264" fill="none" stroke="${zoneKey === 'lmn' ? hi : dim}" stroke-width="${zoneKey === 'lmn' ? 3.5 : 2}" stroke-linecap="round"/>
      <ellipse cx="215" cy="298" rx="28" ry="14" fill="${zoneKey === 'nmj' ? hiFill : 'var(--surface-2)'}" stroke="${zoneKey === 'nmj' ? hi : dim}" stroke-width="2"/>
      ${z ? `<circle cx="${z.cx}" cy="${z.cy}" r="${z.r}" fill="${hiFill}" stroke="${hi}" stroke-width="2.5" stroke-dasharray="4 3"/>` : ''}
      ${zoneKey === 'sla' ? `<circle cx="112" cy="52" r="16" fill="${hiFill}" stroke="${hi}" stroke-width="2"/>` : ''}
      <g font-size="9.5" font-weight="700" fill="var(--muted)"><text x="18" y="54">Kora (UMN)</text><text x="18" y="126">Pień (III–XII)</text><text x="228" y="128">Móżdżek</text><text x="18" y="198">Rdzeń</text><text x="18" y="272">Ogon koński</text><text x="215" y="324" text-anchor="middle">Złącze / Mięsień</text></g>
    </svg>`;
  }

  window.HUB_CLINICAL.diagnostics = function (ctx) {
    const c = ctx || {};
    qSel = c.$ || ((s, r = document) => r.querySelector(s));
    const qAll = c.$$ || ((s, r = document) => [...r.querySelectorAll(s)]);
    const getRoot = () => (typeof c.main === 'function' ? c.main() : c.main) || document.getElementById('view');
    if (c.esc) hEsc = c.esc;
    if (c.norm) sNorm = c.norm;
    const saveLS = c.safeStorageSet || ((k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } });
    const notify = c.toast || (() => {});
    const ASHORT = c.ASHORT || {};
    const classifyPMR = c.classifyPMR || (() => ({ id: 'normal', label: 'Brak kalkulatora PMR', tone: 'blue', summary: '' }));

    const getImagingCases = () => Array.isArray(window.HUB_META?.IMAGING_TRAINER_CASES) ? window.HUB_META.IMAGING_TRAINER_CASES : [];
    const getTopoDB = () => Array.isArray(window.HUB_META?.TOPODIAGNOSIS_DATABASE) ? window.HUB_META.TOPODIAGNOSIS_DATABASE : [];
    const getTopoPuzzles = () => Array.isArray(window.HUB_META?.TOPO_PUZZLES) ? window.HUB_META.TOPO_PUZZLES : [];

    const state = {
      tab: 'pmr',
      pmr: { ...PMR_PRESETS[0], presetId: 'normal' },
      modality: 'all',
      caseId: null,
      imgRevealed: {},
      imgStepAns: {},
      imgSolved: loadStorageMap(IMG_STORAGE_KEY),
      nfFilter: 'all',
      topoMode: 'catalog',
      topoId: null,
      compareIds: [],
      puzzleIdx: 0,
      puzzleStep: 0,
      puzzleAns: {},
      topoSolved: loadStorageMap(TOPO_STORAGE_KEY),
      quizAns: {}
    };

    const fmtField = val => Array.isArray(val)
      ? val.map(v => (v && typeof v === 'object') ? `${hEsc(v.label || '')}${v.desc ? `: ${hEsc(v.desc)}` : ''}` : hEsc(v)).join(' · ')
      : hEsc(val || '—');
    const resolveKey = (...args) => {
      for (const v of args) {
        if (typeof v === 'number' && Number.isFinite(v)) return v;
        if (typeof v === 'string' && /^[A-F]$/i.test(v.trim())) return 'ABCDEF'.indexOf(v.trim().toUpperCase());
      }
      return 0;
    };
    const normMod = item => {
      const m = sNorm(item?.modality || item?.mod || item?.type || '');
      if (m === 'ct' || m === 'tk' || m.includes('tomograf')) return 'tk';
      if (m === 'mr' || m === 'mri' || m.includes('rezonans')) return 'mri';
      return m || 'tk';
    };

    function syncHash() {
      const q = new URLSearchParams();
      q.set('tab', state.tab);
      if (state.tab === 'imaging') {
        if (state.modality !== 'all') q.set('modality', state.modality);
        if (state.caseId) q.set('case', state.caseId);
      }
      if (state.tab === 'topo' && state.topoId) q.set('topo', state.topoId);
      try { history.replaceState(null, '', '#/badania?' + q.toString()); } catch (e) {}
    }

    function extractCaseQuiz(item) {
      const q = item?.clinicalQuestion || item?.question;
      if (q && typeof q === 'object') {
        return {
          stem: q.q || q.stem || q.prompt || q.text || 'Wybierz właściwe rozpoznanie lub postępowanie:',
          opts: Array.isArray(q.opts || q.options) ? (q.opts || q.options) : [],
          key: resolveKey(q.key, q.correct, q.answerIndex, q.answer),
          why: q.why || q.explanation || item.explanation || item.why || '',
          pearl: q.pearl || q.tip || item.pearl || item.tip || ''
        };
      }
      return {
        stem: typeof q === 'string' ? q : (item?.qPrompt || 'Wybierz właściwe rozpoznanie lub postępowanie:'),
        opts: Array.isArray(item?.options || item?.opts) ? (item.options || item.opts) : [],
        key: resolveKey(item?.key, item?.correct, item?.answerIndex, item?.answer),
        why: item?.explanation || item?.why || '',
        pearl: item?.pearl || item?.tip || ''
      };
    }

    function extractPuzzleSteps(p) {
      const normStep = s => ({
        stem: s?.stem || s?.question || s?.prompt || s?.q || 'Wybierz właściwą odpowiedź:',
        opts: Array.isArray(s?.opts || s?.options) ? (s.opts || s.options) : [],
        key: resolveKey(s?.key, s?.correct, s?.answerIndex, s?.answer),
        why: s?.why || s?.explanation || ''
      });
      if (Array.isArray(p?.steps) && p.steps.length) return p.steps.map(normStep);
      const list = [];
      if (p?.step1) list.push(normStep(p.step1));
      else if (p?.q1) list.push(normStep({ stem: p.q1, opts: p.opts1 || p.options1, key: p.key1 ?? p.correct1, why: p.why1 || p.exp1 }));
      if (p?.step2) list.push(normStep(p.step2));
      else if (p?.q2) list.push(normStep({ stem: p.q2, opts: p.opts2 || p.options2, key: p.key2 ?? p.correct2, why: p.why2 || p.exp2 }));
      return list;
    }

    function pmrVerdictHTML() {
      const res = classifyPMR({
        cells: state.pmr.cells, neutPct: state.pmr.neutPct, proteinMgDl: state.pmr.proteinMgDl,
        glucoseRatio: state.pmr.glucoseRatio, xanthochromia: state.pmr.xanthochromia, oligoclonal: state.pmr.oligoclonal
      });
      const preset = PMR_PRESETS.find(p => p.id === state.pmr.presetId);
      const tone = res.tone || 'blue';
      return `<div class="lab-verdict-banner" style="background:var(--${tone}-l);border:1.5px solid var(--${tone});color:var(--ink)">
        <div class="lab-verdict-title" style="color:var(--${tone})">${hEsc(res.label)}</div>
        <p>${hEsc(res.summary)}</p>
        ${preset ? `<div class="muted" style="font-size:.84rem;font-weight:700">Profil referencyjny: ciśnienie otwarcia ${hEsc(preset.pressure)} · wygląd: ${hEsc(preset.look)}</div>` : ''}
      </div>`;
    }

    function renderPMR(host) {
      const p = state.pmr;
      host.innerHTML = `<div class="lab-calc-box">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem;flex-wrap:wrap;margin-bottom:.9rem">
          <h3 style="margin:0">Kalkulator płynu mózgowo-rdzeniowego (PMR)</h3>
          <span class="chip">${hEsc(ASHORT.diagnostyka || 'Moduł 12 · 16')}</span>
        </div>
        <div class="pillrow" style="margin-bottom:1rem" role="group" aria-label="Presety profili PMR">
          ${PMR_PRESETS.map(pr => `<button type="button" class="calc-pill${p.presetId === pr.id ? ' active' : ''}" data-pmr-preset="${hEsc(pr.id)}" aria-pressed="${p.presetId === pr.id}">${hEsc(pr.label)}</button>`).join('')}
        </div>
        <div class="lab-inputs-grid">
          <div class="lab-input-group"><label for="pmrCells">Cytoza (kom./µl)</label><input id="pmrCells" type="number" min="0" step="1" value="${p.cells}"></div>
          <div class="lab-input-group"><label for="pmrNeut">Neutrofile (%)</label><input id="pmrNeut" type="number" min="0" max="100" step="1" value="${p.neutPct}"></div>
          <div class="lab-input-group"><label for="pmrProt">Białko całkowite (mg/dl)</label><input id="pmrProt" type="number" min="0" step="1" value="${p.proteinMgDl}"></div>
          <div class="lab-input-group"><label for="pmrGluc">Glukoza PMR / surowica</label><input id="pmrGluc" type="number" min="0" max="1.5" step="0.05" value="${p.glucoseRatio}"></div>
        </div>
        <div class="pillrow" style="gap:.9rem;margin-bottom:.75rem">
          <label class="chk"><input type="checkbox" id="pmrXantho"${p.xanthochromia ? ' checked' : ''}> Ksantochromia po odwirowaniu (&gt;6–12 h)</label>
          <label class="chk"><input type="checkbox" id="pmrOligo"${p.oligoclonal ? ' checked' : ''}> Prążki oligoklonalne IgG (typ II — tylko PMR)</label>
        </div>
        <p class="muted" style="font-size:.82rem">Normy dorosłego: cytoza ≤ 5/µl (limfocyty), białko 15–45 mg/dl, glukoza PMR/surowica ≥ 0,5, ciśnienie otwarcia 70–200 mm H₂O.</p>
        <div id="pmrVerdict">${pmrVerdictHTML()}</div>
      </div>
      <h3 style="margin:0 0 .8rem">Przeciwwskazania do nakłucia lędźwiowego (LP) i technika U02</h3>
      <div class="imaging-grid">${LP_CONTRAINDICATIONS.map(it => `<div class="imaging-card">
        <div><span class="chip" style="border-color:var(--${it.tone});color:var(--${it.tone});background:var(--${it.tone}-l)">${hEsc(it.badge)}</span></div>
        <h3 style="margin:.1rem 0">${hEsc(it.title)}</h3>
        <p style="font-size:.9rem;color:var(--ink-2)">${hEsc(it.desc)}</p>
      </div>`).join('')}</div>`;

      qAll('[data-pmr-preset]', host).forEach(btn => {
        btn.onclick = () => {
          const found = PMR_PRESETS.find(x => x.id === btn.dataset.pmrPreset);
          if (found) { state.pmr = { ...found, presetId: found.id }; renderPMR(host); }
        };
      });
      const updateInputs = () => {
        state.pmr.cells = Math.max(0, Number(qSel('#pmrCells', host)?.value) || 0);
        state.pmr.neutPct = Math.max(0, Math.min(100, Number(qSel('#pmrNeut', host)?.value) || 0));
        state.pmr.proteinMgDl = Math.max(0, Number(qSel('#pmrProt', host)?.value) || 0);
        state.pmr.glucoseRatio = Math.max(0, Number(qSel('#pmrGluc', host)?.value) || 0);
        state.pmr.xanthochromia = !!qSel('#pmrXantho', host)?.checked;
        state.pmr.oligoclonal = !!qSel('#pmrOligo', host)?.checked;
        state.pmr.presetId = null;
        qAll('[data-pmr-preset]', host).forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        const vBox = qSel('#pmrVerdict', host);
        if (vBox) vBox.innerHTML = pmrVerdictHTML();
      };
      ['#pmrCells', '#pmrNeut', '#pmrProt', '#pmrGluc'].forEach(s => { const el = qSel(s, host); if (el) el.oninput = updateInputs; });
      ['#pmrXantho', '#pmrOligo'].forEach(s => { const el = qSel(s, host); if (el) el.onchange = updateInputs; });
    }

    function renderImaging(host) {
      const all = getImagingCases();
      if (!all.length) {
        host.innerHTML = '<div class="card"><h3>Brak przypadków TK/MRI</h3><p class="muted">Brak danych <code>IMAGING_TRAINER_CASES</code>.</p></div>';
        return;
      }
      const tkCount = all.filter(x => normMod(x) === 'tk').length;
      const mriCount = all.filter(x => normMod(x) === 'mri').length;
      const filtered = state.modality === 'all' ? all : all.filter(x => normMod(x) === state.modality);
      const list = filtered.length ? filtered : all;
      const active = list.find(x => x.id === state.caseId) || list[0];
      state.caseId = active.id;
      syncHash();

      const modType = normMod(active);
      const geo = resolveImagingGeometry(all, active);
      const revealed = !!(state.imgRevealed[active.id] || state.imgSolved[active.id]);
      const quiz = extractCaseQuiz(active);
      const picked = state.imgStepAns[active.id];
      const isSolved = !!state.imgSolved[active.id];
      const solvedCount = all.filter(x => state.imgSolved[x.id]).length;
      const letters = 'ABCDEF';

      host.innerHTML = `<div class="imaging-trainer-wrapper">
        <div class="imaging-filter-bar">
          <div class="imaging-filter-pills" role="group" aria-label="Filtr modalności">
            <button type="button" class="imaging-filter-btn${state.modality === 'all' ? ' active' : ''}" data-mod="all">Wszystkie (${all.length})</button>
            <button type="button" class="imaging-filter-btn${state.modality === 'tk' ? ' active' : ''}" data-mod="tk">TK (${tkCount})</button>
            <button type="button" class="imaging-filter-btn${state.modality === 'mri' ? ' active' : ''}" data-mod="mri">MRI (${mriCount})</button>
          </div>
          <div style="display:flex;gap:.5rem;align-items:center"><span class="chip m">Rozwiązane: ${solvedCount}/${all.length}</span><button type="button" class="btn sec sm" id="imgResetBtn">Resetuj</button></div>
        </div>
        <div class="imaging-case-carousel" role="listbox" aria-label="Przypadki obrazowe">
          ${list.map(x => `<button type="button" class="imaging-case-chip${x.id === active.id ? ' active' : ''}${state.imgSolved[x.id] ? ' solved' : ''}" data-case-id="${hEsc(x.id)}">
            <div class="imaging-case-chip-head"><span class="chip">${normMod(x).toUpperCase()}</span><span>${state.imgSolved[x.id] ? '✓' : '○'}</span></div>
            <div class="imaging-case-chip-title">${hEsc(x.title || x.name || x.id)}</div>
            <div class="imaging-case-chip-sub">${hEsc(x.short || x.subtitle || x.patient || x.vignette || '')}</div>
          </button>`).join('')}
        </div>
        <div class="imaging-viewer-grid grid cols-2">
          <div class="imaging-monitor-screen">
            <div class="imaging-monitor-header"><span>${hEsc(active.modalityLabel || active.protocol || (modType === 'mri' ? 'MRI · FLAIR / DWI' : 'TK · BEZ KONTRASTU'))}</span><span>${revealed ? '✓ OGNISKO WSKAZANE' : 'KLIKNIJ ZMIANĘ NA SKANIE'}</span></div>
            ${renderAxialScanSVG(active, revealed, geo, modType)}
          </div>
          <div class="imaging-step-card">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">
              <h3 style="margin:0">${hEsc(active.title || active.name)}</h3><span class="chip">${modType.toUpperCase()}</span>
            </div>
            <p style="font-size:.93rem;color:var(--ink-2)">${hEsc(active.vignette || active.clinical || active.history || active.subtitle || '')}</p>
            <div class="chal-vignette-box" style="margin-top:0">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">
                <strong style="color:${revealed ? 'var(--green)' : 'var(--teal-d)'}">${revealed ? '✓ Krok 1: Ognisko zlokalizowane' : 'Krok 1: Kliknij ognisko patologiczne na skanie'}</strong>
                ${!revealed ? '<button type="button" class="btn sec sm" id="imgHintBtn">Pokaż ognisko</button>' : ''}
              </div>
              ${revealed ? `<p style="margin-top:.4rem;font-size:.88rem">${hEsc(active.finding || active.radiology || active.description || [active.hotspot?.name, active.hotspot?.hint].filter(Boolean).join(' — ') || 'Ognisko uwidocznione.')}</p>` : ''}
            </div>
            ${revealed && quiz.opts.length ? `<div class="chal-question-box">
              <div style="font-weight:800;font-size:.95rem;margin-bottom:.4rem">Krok 2: ${hEsc(quiz.stem)}</div>
              <div class="chal-options-stack">${quiz.opts.map((opt, idx) => {
                let cls = 'chal-opt-btn';
                if (picked !== undefined) cls += idx === quiz.key ? ' correct' : (idx === picked ? ' wrong' : ' disabled');
                return `<button type="button" class="${cls}" data-img-opt="${idx}"${picked !== undefined ? ' disabled' : ''}><span class="chal-opt-letter">${letters[idx] || idx + 1}</span><span>${hEsc(opt)}</span></button>`;
              }).join('')}</div>
              ${picked !== undefined ? `<div class="chal-explanation-box ${picked === quiz.key ? 'ok' : 'err'}"><strong>${picked === quiz.key ? 'Poprawnie!' : 'Błąd — klucz: ' + (letters[quiz.key] || '?')}</strong><p style="margin-top:.3rem;font-size:.88rem">${hEsc(quiz.why)}</p></div>` : ''}
            </div>` : ''}
            ${(isSolved || picked !== undefined) && (quiz.pearl || active.pearl || active.tip) ? `<div class="imaging-pearl-box"><span>💡</span><div><strong>Perła egzaminacyjna:</strong> ${hEsc(quiz.pearl || active.pearl || active.tip)}</div></div>` : ''}
            ${(isSolved || picked === quiz.key) && list.length > 1 ? '<div style="display:flex;justify-content:flex-end"><button type="button" class="btn pri sm" id="imgNextBtn">Następny przypadek →</button></div>' : ''}
          </div>
        </div>
      </div>`;

      qAll('[data-mod]', host).forEach(b => { b.onclick = () => { state.modality = b.dataset.mod; renderImaging(host); }; });
      qAll('[data-case-id]', host).forEach(b => { b.onclick = () => { state.caseId = b.dataset.caseId; renderImaging(host); }; });
      const resetBtn = qSel('#imgResetBtn', host);
      if (resetBtn) resetBtn.onclick = () => {
        state.imgSolved = {}; state.imgRevealed = {}; state.imgStepAns = {};
        saveLS(IMG_STORAGE_KEY, JSON.stringify({}));
        notify('Wyczyszczono postęp trenażera TK/MRI');
        renderImaging(host);
      };
      const markHit = () => {
        if (state.imgRevealed[active.id]) return;
        state.imgRevealed[active.id] = true;
        notify('Ognisko zlokalizowane! Odpowiedz na pytanie kliniczne.');
        renderImaging(host);
      };
      const hintBtn = qSel('#imgHintBtn', host);
      if (hintBtn) hintBtn.onclick = markHit;
      const svgEl = qSel('#imgScanSvg', host);
      if (svgEl) {
        svgEl.onclick = e => {
          if (e.target && e.target.id === 'imgHitTarget') { markHit(); return; }
          let x = 0; let y = 0;
          if (svgEl.getScreenCTM && svgEl.createSVGPoint) {
            const pt = svgEl.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
            const ctm = svgEl.getScreenCTM();
            if (ctm) { const pSvg = pt.matrixTransform(ctm.inverse()); x = pSvg.x; y = pSvg.y; }
          } else {
            const r = svgEl.getBoundingClientRect();
            x = ((e.clientX - r.left) / (r.width || 1)) * geo.vbW;
            y = ((e.clientY - r.top) / (r.height || 1)) * geo.vbH;
          }
          if (Math.hypot(x - geo.tx, y - geo.ty) <= geo.tr * 1.15) markHit();
          else notify('To nie jest główne ognisko — oceń symetrię półkul, komór i zbiorników.');
        };
      }
      const hitTarget = qSel('#imgHitTarget', host);
      if (hitTarget) hitTarget.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); markHit(); } };
      qAll('[data-img-opt]', host).forEach(b => {
        b.onclick = () => {
          const idx = Number(b.dataset.imgOpt);
          state.imgStepAns[active.id] = idx;
          if (idx === quiz.key) { state.imgSolved[active.id] = true; saveLS(IMG_STORAGE_KEY, JSON.stringify(state.imgSolved)); }
          renderImaging(host);
        };
      });
      const nextBtn = qSel('#imgNextBtn', host);
      if (nextBtn) nextBtn.onclick = () => { state.caseId = list[(list.findIndex(x => x.id === active.id) + 1) % list.length].id; renderImaging(host); };
    }

    function renderNeurofiz(host) {
      const items = state.nfFilter === 'all' ? NEUROFIZ_PATTERNS : NEUROFIZ_PATTERNS.filter(x => x.group === state.nfFilter);
      host.innerHTML = `<div class="imaging-filter-bar">
        <div class="imaging-filter-pills" role="group" aria-label="Filtr elektrofizjologii">
          <button type="button" class="imaging-filter-btn${state.nfFilter === 'all' ? ' active' : ''}" data-nf="all">Wszystkie (${NEUROFIZ_PATTERNS.length})</button>
          <button type="button" class="imaging-filter-btn${state.nfFilter === 'eeg' ? ' active' : ''}" data-nf="eeg">EEG (4)</button>
          <button type="button" class="imaging-filter-btn${state.nfFilter === 'emg' ? ' active' : ''}" data-nf="emg">EMG / ENG (4)</button>
        </div>
        <span class="chip">${hEsc(ASHORT.padaczka || 'EEG')} · ${hEsc(ASHORT.obwodowy || 'EMG/ENG')}</span>
      </div>
      <div class="imaging-grid">${items.map(p => `<div class="imaging-card">
        <div><span class="chip">${hEsc(p.tag)}</span></div>
        <h3>${hEsc(p.title)}</h3>
        <p class="muted" style="font-size:.84rem">${hEsc(p.sub)}</p>
        <div class="imaging-monitor-screen">${renderNeurofizSVG(p.id)}</div>
        <div style="font-size:.88rem;line-height:1.45"><strong>Morfologia:</strong> ${hEsc(p.findings)}</div>
        <div style="font-size:.88rem;line-height:1.45"><strong>Klinika:</strong> ${hEsc(p.clinical)}</div>
        <div class="imaging-pearl-box"><span>⚡</span><div><strong>Postępowanie i pułapka:</strong> ${hEsc(p.therapy)}</div></div>
      </div>`).join('')}</div>`;
      qAll('[data-nf]', host).forEach(b => { b.onclick = () => { state.nfFilter = b.dataset.nf; renderNeurofiz(host); }; });
    }

    function renderTopo(host) {
      const db = getTopoDB();
      const puzzles = getTopoPuzzles();
      const validIds = new Set(db.map(x => x.id));
      state.compareIds = state.compareIds.filter(id => validIds.has(id));
      if (!state.topoId && db.length) state.topoId = db[0].id;
      if (state.compareIds.length < 2 && db.length >= 2) state.compareIds = db.slice(0, Math.min(3, db.length)).map(x => x.id);

      const modeNav = `<div class="rash-mode-bar"><div class="calc-tab-nav" style="margin-bottom:0;border-bottom:0">
        <button type="button" class="calc-tab-btn${state.topoMode === 'catalog' ? ' active' : ''}" data-tmode="catalog">🧠 Atlas pięter (${db.length})</button>
        <button type="button" class="calc-tab-btn${state.topoMode === 'matrix' ? ' active' : ''}" data-tmode="matrix">⚖️ Porównanie side-by-side</button>
        <button type="button" class="calc-tab-btn${state.topoMode === 'puzzles' ? ' active' : ''}" data-tmode="puzzles">🧩 Zagadki lokalizacyjne (${puzzles.length})</button>
      </div></div>`;

      let body = '';
      if (state.topoMode === 'catalog') {
        if (!db.length) {
          body = '<div class="card"><h3>Brak bazy topodiagnostyki</h3><p class="muted">Brak danych <code>TOPODIAGNOSIS_DATABASE</code>.</p></div>';
        } else {
          const sel = db.find(x => x.id === state.topoId) || db[0];
          state.topoId = sel.id;
          syncHash();
          const zone = inferTopoZone(sel);
          const isUrgent = !!(sel.urgent || sel.redFlag || sel.alert);
          const glassClass = isUrgent ? 'non_blanching' : (zone === 'brainstem' || zone === 'lmn' ? 'vesicle' : 'blanching');
          body = `<div class="rash-pills-row" role="tablist" aria-label="Zespoły topodiagnostyczne">${db.map(it => `<button type="button" class="rash-pill-btn${it.id === sel.id ? ' active' : ''}${it.urgent || it.redFlag || it.alert ? ' alert-pill' : ''}" data-topo-id="${hEsc(it.id)}">${hEsc(it.title || it.name || it.id)}</button>`).join('')}</div>
          <div class="rash-card-grid">
            <div class="rash-visual-card">
              <div class="rash-silhouette-container">${renderTopoSVG(zone, isUrgent)}</div>
              <div class="rash-zone-badge" style="margin-top:.75rem"><strong>Piętro uszkodzenia:</strong> ${hEsc(sel.lesionSite || sel.level || sel.location || sel.zone || zone)}</div>
              <div class="rash-glass-result ${glassClass}"><strong>Klucz różnicowy:</strong> ${fmtField(sel.classicSign || sel.diff || sel.differential || sel.distinction || sel.keySign)}</div>
            </div>
            <div class="rash-details-card">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem;flex-wrap:wrap">
                <h3 style="margin:0;font-size:1.25rem">${hEsc(sel.title || sel.name)}</h3>
                ${sel.atlas ? `<span class="chip">${hEsc(ASHORT[sel.atlas] || sel.atlas)}</span>` : ''}
              </div>
              <div class="rash-info-sections">
                <div class="rash-info-row"><span class="rash-info-label">Objawy kliniczne</span><div>${fmtField([sel.motorPattern, sel.cranialNerves].filter(Boolean).join(' · ') || sel.symptoms || sel.features || sel.signs)}</div></div>
                <div class="rash-info-row"><span class="rash-info-label">Odruchy i napięcie</span><div>${fmtField(sel.reflexPattern || sel.reflexes || sel.tone)}</div></div>
                <div class="rash-info-row"><span class="rash-info-label">Czucie i próby specjalne</span><div>${fmtField(sel.sensoryPattern || sel.sensory || sel.romberg || sel.special)}${Array.isArray(sel.specialZones) && sel.specialZones.length ? `<div class="muted" style="margin-top:.3rem;font-size:.82rem">${fmtField(sel.specialZones)}</div>` : ''}</div></div>
                <div class="rash-info-row"><span class="rash-info-label">Różnicowanie i postępowanie</span><div>${fmtField(sel.differential || sel.causes || sel.etiology)}${sel.treatment ? `<div style="margin-top:.3rem"><strong>Postępowanie:</strong> ${hEsc(sel.treatment)}</div>` : ''}${sel.trap ? `<div class="muted" style="margin-top:.25rem;font-size:.82rem"><strong>Pułapka:</strong> ${hEsc(sel.trap)}</div>` : ''}</div></div>
              </div>
              ${(sel.pearl || sel.tip || sel.examTip) ? `<div class="rash-pearl-box"><strong>Wskazówka PUM:</strong> ${hEsc(sel.pearl || sel.tip || sel.examTip)}</div>` : ''}
            </div>
          </div>`;
        }
      } else if (state.topoMode === 'matrix') {
        if (db.length < 2) {
          body = '<div class="card"><p class="muted">Zbyt mało zespołów w bazie do porównania.</p></div>';
        } else {
          const picked = state.compareIds.map(id => db.find(x => x.id === id)).filter(Boolean).slice(0, 3);
          const presets = ['MCA vs ACA (#5)', 'Móżdżek vs Sznury tylne (#10)', 'VII ośrodkowy (MCA) vs obwodowy (Most, #3)', 'Rdzeń (Brown-Séquard) vs Ogon koński'];
          body = `<div class="rash-matrix-wrap">
            <div class="rash-matrix-filters">${presets.map((lbl, i) => `<button type="button" class="calc-pill" data-cmp-preset="${i}">${hEsc(lbl)}</button>`).join('')}</div>
            <div class="rash-compare-picker">
              <div class="muted" style="font-size:.8rem;font-weight:700;margin-bottom:.5rem">Wybierz 2–3 zespoły do porównania side-by-side:</div>
              <div class="pillrow">${db.map(x => `<button type="button" class="rash-pill-btn${state.compareIds.includes(x.id) ? ' active' : ''}" data-cmp-id="${hEsc(x.id)}" aria-pressed="${state.compareIds.includes(x.id)}">${hEsc(x.title || x.name)}</button>`).join('')}</div>
            </div>
            <div class="rash-matrix-table-wrap"><table class="rash-matrix-table">
              <thead><tr><th class="feature-col">Cecha kliniczna</th>${picked.map(x => `<th>${hEsc(x.title || x.name)}</th>`).join('')}</tr></thead>
              <tbody>
                <tr><td class="feature-col">Piętro</td>${picked.map(x => `<td>${fmtField(x.lesionSite || x.level || x.location || x.zone)}</td>`).join('')}</tr>
                <tr><td class="feature-col">Objawy</td>${picked.map(x => `<td>${fmtField(x.classicSign || x.motorPattern || x.symptoms || x.features || x.signs)}</td>`).join('')}</tr>
                <tr><td class="feature-col">Odruchy / napięcie</td>${picked.map(x => `<td>${fmtField(x.reflexPattern || x.reflexes || x.tone)}</td>`).join('')}</tr>
                <tr><td class="feature-col">Czucie / Romberg</td>${picked.map(x => `<td>${fmtField(x.sensoryPattern || x.sensory || x.romberg || x.special)}</td>`).join('')}</tr>
                <tr><td class="feature-col">Różnicowanie</td>${picked.map(x => `<td>${fmtField(x.differential || x.diff || x.pearl || x.tip)}</td>`).join('')}</tr>
              </tbody>
            </table></div>
          </div>`;
        }
      } else if (!puzzles.length) {
        body = '<div class="card"><h3>Brak zagadek topodiagnostycznych</h3><p class="muted">Brak danych <code>TOPO_PUZZLES</code>.</p></div>';
      } else {
        const pIdx = Math.min(state.puzzleIdx, puzzles.length - 1);
        state.puzzleIdx = pIdx;
        const puz = puzzles[pIdx];
        const pId = puz.id || ('puz-' + pIdx);
        const steps = extractPuzzleSteps(puz);
        const sIdx = Math.min(state.puzzleStep, Math.max(0, steps.length - 1));
        const step = steps[sIdx] || { stem: '', opts: [], key: 0, why: '' };
        const pickedOpt = state.puzzleAns[`${pId}:${sIdx}`];
        const solved = !!state.topoSolved[pId];
        const step0Done = state.puzzleAns[`${pId}:0`] === steps[0]?.key;
        const letters = 'ABCDEF';

        body = `<div class="rash-puzzles-wrap">
          <div class="chal-pills-row">${puzzles.map((pz, i) => {
            const done = !!state.topoSolved[pz.id || ('puz-' + i)];
            return `<button type="button" class="chal-pill-btn${i === pIdx ? ' active' : ''}${done ? ' done' : ''}" data-puz-idx="${i}"><span class="chal-num">${i + 1}</span><span>${hEsc(pz.short || pz.title || ('Zagadka ' + (i + 1)))}</span>${done ? '<span class="chal-check">✓</span>' : ''}</button>`;
          }).join('')}</div>
          <div class="rash-puzzle-card">
            <div class="chal-card-header">
              <div><h3 style="margin:0">${hEsc(puz.title || ('Zagadka #' + (pIdx + 1)))}</h3><span class="muted" style="font-size:.82rem">Dwuetapowa lokalizacja ogniska i postępowanie</span></div>
              <span class="chip">${solved ? '✓ Rozwiązana' : `Etap ${sIdx + 1}/${steps.length || 2}`}</span>
            </div>
            <div class="rash-puzzle-body-grid">
              <div class="rash-puzzle-svg-box">
                ${renderTopoSVG(step0Done || solved ? inferTopoZone(db.find(x => x.id === puz.topoId) || puz) : 'none', !!(puz.urgent || puz.redFlag))}
                <div class="muted" style="font-size:.76rem;margin-top:.35rem">${step0Done || solved ? 'Lokalizacja podświetlona' : 'Wskaż piętro w Kroku 1'}</div>
              </div>
              <div>
                <div class="rash-puzzle-vignette">${hEsc(puz.vignette || puz.clinical || puz.scenario || '')}</div>
                <div class="chal-stepper">${steps.map((st, i) => {
                  const ok = state.puzzleAns[`${pId}:${i}`] === st.key;
                  return `<button type="button" class="chal-step-dot${i === sIdx ? ' current' : ''}${ok ? ' done' : ''}" data-puz-step="${i}" aria-label="Etap ${i + 1}">${ok ? '✓' : i + 1}</button>`;
                }).join('')}</div>
                <div class="chal-question-box">
                  <div style="font-weight:800;font-size:.96rem">${hEsc(step.stem)}</div>
                  <div class="chal-options-stack">${step.opts.map((opt, idx) => {
                    let cls = 'chal-opt-btn';
                    if (pickedOpt !== undefined) cls += idx === step.key ? ' correct' : (idx === pickedOpt ? ' wrong' : ' disabled');
                    return `<button type="button" class="${cls}" data-puz-opt="${idx}"${pickedOpt !== undefined ? ' disabled' : ''}><span class="chal-opt-letter">${letters[idx] || idx + 1}</span><span>${hEsc(opt)}</span></button>`;
                  }).join('')}</div>
                  ${pickedOpt !== undefined ? `<div class="chal-explanation-box ${pickedOpt === step.key ? 'ok' : 'err'}"><strong>${pickedOpt === step.key ? 'Poprawnie!' : 'Błąd — klucz: ' + (letters[step.key] || '?')}</strong><p style="margin-top:.25rem;font-size:.88rem">${hEsc(step.why)}</p></div>` : ''}
                  ${solved ? `<div class="chal-congrats-banner" style="margin-top:.9rem"><strong>✓ Zagadka ukończona!</strong>${(puz.pearl || puz.tip) ? `<div class="chal-pearl-box">💡 ${hEsc(puz.pearl || puz.tip)}</div>` : ''}</div>` : ''}
                  <div style="display:flex;justify-content:flex-end;gap:.5rem;margin-top:.8rem">
                    ${pickedOpt === step.key && sIdx + 1 < steps.length ? '<button type="button" class="btn pri sm" id="puzNextStep">Przejdź do etapu 2 →</button>' : ''}
                    ${solved && puzzles.length > 1 ? '<button type="button" class="btn sec sm" id="puzNextCase">Następna zagadka →</button>' : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      }

      host.innerHTML = `<div class="rash-module-wrap">${modeNav}${body}</div>`;
      qAll('[data-tmode]', host).forEach(b => { b.onclick = () => { state.topoMode = b.dataset.tmode; renderTopo(host); }; });
      qAll('[data-topo-id]', host).forEach(b => { b.onclick = () => { state.topoId = b.dataset.topoId; renderTopo(host); }; });
      qAll('[data-cmp-id]', host).forEach(b => {
        b.onclick = () => {
          const id = b.dataset.cmpId; const idx = state.compareIds.indexOf(id);
          if (idx !== -1) {
            if (state.compareIds.length <= 2) { notify('Wybierz co najmniej 2 zespoły.'); return; }
            state.compareIds.splice(idx, 1);
          } else {
            if (state.compareIds.length >= 3) state.compareIds.shift();
            state.compareIds.push(id);
          }
          renderTopo(host);
        };
      });
      qAll('[data-cmp-preset]', host).forEach(b => {
        b.onclick = () => {
          const pairs = [['mca-stroke', 'aca-stroke'], ['cerebellar', 'dorsal-columns'], ['mca-stroke', 'millard-gubler'], ['brown-sequard', 'cauda-equina']][Number(b.dataset.cmpPreset)] || [];
          const matched = pairs.map(id => db.find(x => x.id === id || sNorm([x.id, x.title, x.name].join(' ')).includes(id))?.id).filter(Boolean);
          if (matched.length >= 2) { state.compareIds = matched; renderTopo(host); } else notify('Wybierz zespoły ręcznie poniżej.');
        };
      });
      qAll('[data-puz-idx]', host).forEach(b => { b.onclick = () => { state.puzzleIdx = Number(b.dataset.puzIdx); state.puzzleStep = 0; renderTopo(host); }; });
      qAll('[data-puz-step]', host).forEach(b => { b.onclick = () => { state.puzzleStep = Number(b.dataset.puzStep); renderTopo(host); }; });
      qAll('[data-puz-opt]', host).forEach(b => {
        b.onclick = () => {
          const puz = puzzles[state.puzzleIdx]; if (!puz) return;
          const pId = puz.id || ('puz-' + state.puzzleIdx);
          const steps = extractPuzzleSteps(puz);
          if (!steps[state.puzzleStep]) return;
          state.puzzleAns[`${pId}:${state.puzzleStep}`] = Number(b.dataset.puzOpt);
          if (steps.length && steps.every((s, i) => state.puzzleAns[`${pId}:${i}`] === s.key)) {
            state.topoSolved[pId] = true;
            saveLS(TOPO_STORAGE_KEY, JSON.stringify(state.topoSolved));
          }
          renderTopo(host);
        };
      });
      const nextStepBtn = qSel('#puzNextStep', host);
      if (nextStepBtn) nextStepBtn.onclick = () => { state.puzzleStep += 1; renderTopo(host); };
      const nextCaseBtn = qSel('#puzNextCase', host);
      if (nextCaseBtn) nextCaseBtn.onclick = () => { state.puzzleIdx = (state.puzzleIdx + 1) % puzzles.length; state.puzzleStep = 0; renderTopo(host); };
    }

    function renderMiniQuiz(host) {
      const answered = Object.keys(state.quizAns).length;
      const correct = DIAG_QUIZ.filter((q, i) => state.quizAns[i] === q.key).length;
      const letters = 'ABCD';
      host.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;gap:.8rem;flex-wrap:wrap;margin-bottom:1rem">
        <div><div class="eyebrow" style="margin-bottom:.2rem">Szybka powtórka przed ET</div><h3 style="margin:0;font-size:1.3rem">Mini-quiz diagnostyczny (PMR · TK · EEG · EMG)</h3></div>
        <div style="display:flex;gap:.5rem;align-items:center"><span class="chip m">Wynik: ${correct} / ${DIAG_QUIZ.length} (${answered} odp.)</span><button type="button" class="btn sec sm" id="diagQuizReset">Resetuj</button></div>
      </div>
      <div class="qlist">${DIAG_QUIZ.map((q, qi) => {
        const sel = state.quizAns[qi];
        return `<div class="card">
          <div style="font-weight:700;margin-bottom:.7rem">${qi + 1}. ${hEsc(q.stem)}</div>
          <div class="opts">${q.opts.map((opt, oi) => {
            let cls = 'opt';
            if (sel !== undefined) cls += oi === q.key ? ' ok' : (oi === sel ? ' bad' : ' dim');
            return `<button type="button" class="${cls}" data-dq-q="${qi}" data-dq-o="${oi}"${sel !== undefined ? ' disabled' : ''}><span class="l">${letters[oi]}</span><span>${hEsc(opt)}</span></button>`;
          }).join('')}</div>
          ${sel !== undefined ? `<div class="why" style="margin-top:.75rem"><h4>Komentarz</h4><p>${hEsc(q.why)}</p></div>` : ''}
        </div>`;
      }).join('')}</div>`;
      qAll('[data-dq-q]', host).forEach(b => { b.onclick = () => { state.quizAns[Number(b.dataset.dqQ)] = Number(b.dataset.dqO); renderMiniQuiz(host); }; });
      const rst = qSel('#diagQuizReset', host);
      if (rst) rst.onclick = () => { state.quizAns = {}; renderMiniQuiz(host); };
    }

    function viewDiagnostics(params = {}) {
      const root = getRoot();
      if (!root) return;
      const p = params || {};
      if (p.tab && ['pmr', 'imaging', 'neurofiz', 'topo'].includes(p.tab)) state.tab = p.tab;
      else if (p.case) state.tab = 'imaging';
      else if (p.topo) state.tab = 'topo';
      if (p.modality && ['all', 'tk', 'mri'].includes(sNorm(p.modality))) state.modality = sNorm(p.modality);
      else if (p.case) state.modality = 'all';
      if (p.case) state.caseId = p.case;
      if (p.topo) { state.topoId = p.topo; state.topoMode = 'catalog'; }

      root.innerHTML = `<section class="wrap view">
        <div class="eyebrow">Diagnostyka neurologiczna · Sylabus PUM 2026/2027</div>
        <h2>Pracownia PMR, neuroobrazowania, EEG/EMG i topodiagnostyki</h2>
        <p class="lead">Interaktywny kalkulator PMR, trenażer skanów TK/MRI z lokalizacją ogniska, wzorce elektrofizjologiczne oraz silnik lokalizacji uszkodzeń układu nerwowego.</p>
        <div class="calc-tab-nav" role="tablist" aria-label="Moduły diagnostyczne">
          <button type="button" class="calc-tab-btn${state.tab === 'pmr' ? ' active' : ''}" data-dtab="pmr" role="tab" aria-selected="${state.tab === 'pmr'}">🧪 Kalkulator PMR</button>
          <button type="button" class="calc-tab-btn${state.tab === 'imaging' ? ' active' : ''}" data-dtab="imaging" role="tab" aria-selected="${state.tab === 'imaging'}">🩻 Trenażer TK / MRI</button>
          <button type="button" class="calc-tab-btn${state.tab === 'neurofiz' ? ' active' : ''}" data-dtab="neurofiz" role="tab" aria-selected="${state.tab === 'neurofiz'}">📈 Atlas EEG &amp; EMG</button>
          <button type="button" class="calc-tab-btn${state.tab === 'topo' ? ' active' : ''}" data-dtab="topo" role="tab" aria-selected="${state.tab === 'topo'}">🧭 Topodiagnostyka</button>
        </div>
        <div id="diagPanel"></div>
      </section>
      <section class="blk"><div class="wrap" id="diagQuizHost"></div></section>`;

      const panel = qSel('#diagPanel', root);
      const quizHost = qSel('#diagQuizHost', root);
      const renderActiveTab = () => {
        qAll('[data-dtab]', root).forEach(b => {
          const on = b.dataset.dtab === state.tab;
          b.classList.toggle('active', on);
          b.setAttribute('aria-selected', String(on));
        });
        syncHash();
        if (state.tab === 'pmr') renderPMR(panel);
        else if (state.tab === 'imaging') renderImaging(panel);
        else if (state.tab === 'neurofiz') renderNeurofiz(panel);
        else renderTopo(panel);
      };
      qAll('[data-dtab]', root).forEach(b => { b.onclick = () => { state.tab = b.dataset.dtab; renderActiveTab(); }; });
      renderActiveTab();
      renderMiniQuiz(quizHost);
    }

    return { viewDiagnostics };
  };
})();
