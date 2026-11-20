/* Inicjalizacja wykresów, mapy topograficznej, quizu i nawigacji modułu [13] */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ui = window.ATLAS_UI || {};

  /* 1. Wykresy słupkowe */
  if (typeof ui.bars === 'function') {
    ui.bars('barsEpi', [
      { l: 'Przerzuty do OUN (płuco, pierś, czerniak, nerka)', v: 50, t: '~50%', c: 'r' },
      { l: 'Glejaki (w tym GBM — najczęstsze pierwotne złośliwe)', v: 26, t: '~25–30%', c: 'b' },
      { l: 'Oponiaki (najczęstsze pierwotne łagodne)', v: 18, t: '~15–20%', c: 'a' },
      { l: 'Gruczolaki przysadki i okolica siodłowa', v: 9, t: '~8–10%', c: 'v' },
      { l: 'Osłoniaki (np. nerwiak n. VIII w kącie m.-m.)', v: 6, t: '~5–8%', c: 'g' }
    ]);

    ui.bars('barsCord', [
      { l: 'Zewnątrzoponowe (gł. przerzuty do trzonów kręgów)', v: 58, t: '55–60%', c: 'r' },
      { l: 'Śródtwardówkowe zewnątrzrdzeniowe (oponiak, nerwiak)', v: 32, t: '30–35%', c: 'a' },
      { l: 'Śródrdzeniowe (wyściółczak, gwiaździak)', v: 10, t: '5–10%', c: 'v' }
    ]);
  }

  /* 2. Interaktywna mapa objawów ogniskowych OUN */
  const LOCATIONS = {
    frontal: {
      title: 'Płat czołowy (kora ruchowa i przedczołowa)',
      badge: 'Napady ogniskowe · abulia · Foster-Kennedy',
      tone: 'b',
      items: [
        '<b>Kora przedruchowa/ruchowa:</b> przeciwstronny niedowład połowiczy oraz ogniskowe napady ruchowe (marsz Jacksona)',
        '<b>Ośrodek Broki (półkula dominująca):</b> afazja ruchowa (chory rozumie mowę, mówi z wysiłkiem, agramatycznie)',
        '<b>Okolica przedczołowa:</b> apatia, abulia, spowolnienie psychoruchowe lub rozhamowanie („moria”), brak krytycyzmu, odruchy deliberacyjne (chwytny, pyskowy), nietrzymanie moczu (płat przyśrodkowy)',
        '<b>Podstawa płata czołowego (oponiak rynienki węchowej):</b> zespół Foster-Kennedy’ego — tożstronna anosmia + tożstronny zanik n. II z ucisku + przeciwstronny obrzęk tarczy n. II ze wzrostu ICP'
      ],
      trap: 'Guzy okolicy przedczołowej bywają długo mylone z depresją lub otępieniem — zawsze wykonaj MRI głowy przy nowym zespole apatii z bólami głowy!'
    },
    parietal: {
      title: 'Płat ciemieniowy (czucie korowe i praksja)',
      badge: 'Gerstmann (dom.) · Neglect (niedom.)',
      tone: 'a',
      items: [
        '<b>Kora czuciowa (zakręt zaśrodkowy):</b> przeciwstronne zaburzenia czucia złożonego (astereognozja, agrafestezja, brak dyskryminacji dwupunktowej) przy względnie zachowanym bólu/temperaturze',
        '<b>Półkula dominująca (lewa):</b> <b>zespół Gerstmanna</b> (agnozja palców, mylenie strony prawej i lewej, akalkulia, agrafia) + apraksja ideomotoryczna',
        '<b>Półkula niedominująca (prawa):</b> <b>zespół zaniedbywania połowiczego</b> (hemineglect) i anozognozja (zaprzeczanie chorobie)',
        '<b>Górne włókna promienistości wzrokowej:</b> przeciwstronna <b>kwadrantopsja jednoimienna dolna</b> („pie in the floor”)'
      ],
      trap: 'Rozróżniaj promienistość wzrokową: płat ciemieniowy uszkadza kwadrant DOLNY, a płat skroniowy (pętla Meyera) — kwadrant GÓRNY!'
    },
    temporal: {
      title: 'Płat skroniowy (układ limbiczny i mowa)',
      badge: 'Wernicke · napady hakowe · pętla Meyera',
      tone: 'v',
      items: [
        '<b>Ośrodek Wernickego (półkula dominująca):</b> afazja czuciowa (płynna, z parafazjami i zaburzeniem rozumienia)',
        '<b>Przyśrodkowy płat skroniowy (hipokamp, hak):</b> napady ogniskowe ze strefy skroniowej — aura epigastryczna, <i>déjà vu</i>, lęk, omamy węchowe/smakowe (napady hakowe / <i>uncinate fits</i>) i automatyzmy',
        '<b>Pętla Meyera (dolne włókna promienistości wzrokowej):</b> przeciwstronna <b>kwadrantopsja jednoimienna górna</b> („pie in the sky”)',
        '<b>Ryzyko powikłań:</b> masywny guz płata skroniowego najłatwiej powoduje <b>wgłobienie haka</b> przez wcięcie namiotu (ucisk n. III!)'
      ],
      trap: 'Omamy węchowe (np. zapach spalonej gumy) przed napadem wskazują na przyśrodkową część płata skroniowego — wyklucz glejaka lub przerzut!'
    },
    occipital: {
      title: 'Płat potyliczny (kora wzrokowa)',
      badge: 'Hemianopsja jednoimienna · oszczędzenie plamki',
      tone: 'g',
      items: [
        '<b>Kora pierwszorzędowa (bruzda ostrogowa):</b> przeciwstronne <b>niedowidzenie połowicze jednoimienne</b> (często z zaoszczędzeniem widzenia plamkowego)',
        '<b>Napady ogniskowe potyliczne:</b> proste omamy wzrokowe (błyski światła, barwne kręgi, fotopsje)',
        '<b>Kora kojarzeniowa:</b> agnozja wzrokowa, aleksja bez agrafii (uszkodzenie lewego płata potylicznego i płata ciała modzelowatego)',
        '<b>Obustronne zajęcie:</b> ślepota korowa (z zachowanym odruchem źrenicznym na światło!) i zespół Antona (konfabulacje wzrokowe)'
      ],
      trap: 'W ślepocie korowej odruch źrenic na światło pozostaje PRAWIDŁOWY, ponieważ łuk odruchu omija korę potyliczną!'
    },
    sella: {
      title: 'Okolica siodła tureckiego i skrzyżowanie wzrokowe',
      badge: 'Hemianopsja dwuskroniowa · endokrynopatia',
      tone: 'r',
      items: [
        '<b>Ucisk skrzyżowania wzrokowego (chiasma):</b> heteronimiczna <b>hemianopsja dwuskroniowa</b> (najpierw górne kwadranty skroniowe przy ucisku od dołu przez gruczolak)',
        '<b>Gruczolak przysadki:</b> czynny (prolaktynoma → mlekotok/brak miesiączki; GH → akromegalia; ACTH → choroba Cushinga) lub nieczynny (niedoczynność przysadki)',
        '<b>Udar przysadki (apopleksja):</b> nagły piorunujący ból głowy + spadek ostrości wzroku + oftalmoplegia (ucisk zatoki jamistej: nn. III, IV, VI, V1/V2)',
        '<b>Różnicowanie:</b> czaszkogardlak (zwapnienia nadsiodłowe), oponiak guzka siodła, tętniak'
      ],
      trap: 'Prolaktynoma jest jedynym guzem przysadki, w którym leczeniem I rzutu są leki (agoniści dopaminy — kabergolina), a nie operacja!'
    },
    cpa: {
      title: 'Kąt mostowo-móżdżkowy (CPA), móżdżek i pień mózgu',
      badge: 'Nerwiak VIII · ataksja · wczesne wodogłowie',
      tone: 'r',
      items: [
        '<b>Kąt mostowo-móżdżkowy (osłoniak n. VIII, oponiak):</b> kolejność objawów — jednostronny niedosłuch odbiorczy i szumy uszne (<b>n. VIII</b>) → osłabienie odruchu rogówkowego i czucia twarzy (<b>n. V</b>) → obwodowy niedowład twarzy (<b>n. VII</b>) → ataksja',
        '<b>Móżdżek i IV komora:</b> tożstronna ataksja kończyn (dysmetria, adiadochokineza, drżenie zamiarowe) lub ataksja chodu (robak), oczopląs oraz <b>wczesne wodogłowie obturacyjne</b> (poranne bóle i wymioty)',
        '<b>Pień mózgu:</b> zespoły naprzemienne (tożstronne porażenie nn. czaszkowych + przeciwstronny niedowład/czucie), wczesne zaburzenia połykania i świadomości',
        '<b>Szczelina oczodołowa górna (guz podstawy):</b> jednoczesne porażenie nn. <b>III, IV, VI + V1</b>'
      ],
      trap: 'Jednostronny postępujący niedosłuch odbiorczy z osłabionym odruchem rogówkowym to klasyczny sygnał guza kąta mostowo-móżdżkowego (MRI z gadolinem).'
    }
  };

  function renderLocation(key) {
    const data = LOCATIONS[key];
    const host = $('#locInfo');
    if (!data || !host) return;
    $$('#brainLocSvg .reg').forEach(el => {
      const on = el.dataset.reg === key;
      el.classList.toggle('on', on);
      el.setAttribute('aria-pressed', String(on));
    });
    host.innerHTML = `
      <div class="tcard ${data.tone}">
        <span class="pill ${data.tone}">${data.badge}</span>
        <h3 style="margin-top:.35rem">${data.title}</h3>
        <ul style="margin-top:.5rem">${data.items.map(s => `<li>${s}</li>`).join('')}</ul>
        <div class="callout amber" style="margin-top:.75rem"><b class="k">Pułapka egzaminacyjna</b>${data.trap}</div>
      </div>`;
  }

  const locSvg = $('#brainLocSvg');
  if (locSvg) {
    locSvg.addEventListener('click', e => {
      const reg = e.target.closest('.reg');
      if (reg && reg.dataset.reg) renderLocation(reg.dataset.reg);
    });
    locSvg.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const reg = e.target.closest('.reg');
      if (reg && reg.dataset.reg) {
        e.preventDefault();
        renderLocation(reg.dataset.reg);
      }
    });
    renderLocation('cpa');
  }

  /* 3. Quiz i nawigacja z atlas-shared.js */
  if (typeof ui.mountQuiz === 'function') {
    ui.mountQuiz({
      topics: window.ATLAS_TOPICS || {},
      questions: window.ATLAS_Q || [],
      modTag: '[13]'
    });
  }
  if (typeof ui.initNavSpy === 'function') {
    ui.initNavSpy();
  }
})();
