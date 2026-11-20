/* Logika interaktywna atlasu [2] Choroby naczyniowe mózgu i udar */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ui = window.ATLAS_UI || {};

  /* 1. Wykresy słupkowe */
  if (typeof ui.bars === 'function') {
    ui.bars('barsStrokeTypes', [
      { l: 'Udar niedokrwienny', v: 85, t: '~80–85%', c: 'b' },
      { l: 'Krwotok śródmózgowy (ICH)', v: 12, t: '~10–15%', c: 'r' },
      { l: 'Krwotok podpajęczynówkowy (SAH)', v: 5, t: '~5%', c: 'a' }
    ]);

    ui.bars('barsSahSens', [
      { l: 'TK bez kontrastu ≤ 6 h', v: 99, t: '~98–100%', c: 'g' },
      { l: 'TK bez kontrastu ~12 h', v: 93, t: '~93%', c: 'b' },
      { l: 'TK bez kontrastu ~24 h', v: 90, t: '~90%', c: 'a' },
      { l: 'TK bez kontrastu w 5. dobie', v: 60, t: '~50–85%', c: 'r' }
    ]);
  }

  /* 2. Interaktywna mapa terytoriów tętniczych */
  const ARTERIES = {
    aca: {
      title: 'Tętnica przednia mózgu (ACA)',
      badge: 'Wskazówka PUM #5 · krążenie przednie',
      tone: 'a',
      supply: 'Przyśrodkowa powierzchnia płata czołowego i ciemieniowego (zakręt przedśrodkowy i zaśrodkowy dla kończyny dolnej), ciało modzelowate, część przednia jąder podstawy.',
      symptoms: [
        'Niedowład i zaburzenia czucia po stronie przeciwnej: <b>kończyna dolna &gt;&gt; kończyna górna</b>',
        'Zespół płata czołowego: <b>abulia, apatia, mutyzm akinetyczny</b> (zwłaszcza obustronnie)',
        'Nietrzymanie moczu, odruchy patologiczne prymitywne (odruch chwytny)',
        'Apraksja lewej ręki (uszkodzenie ciała modzelowatego)'
      ],
      trap: 'Gdy chory ma izolowane lub dominujące osłabienie stopy i podudzia bez afazji — pomyśl o ACA (nie MCA!).'
    },
    mca: {
      title: 'Tętnica środkowa mózgu (MCA)',
      badge: 'Najczęstsza lokalizacja udaru (~60–70%)',
      tone: 'r',
      supply: 'Boczna wypukłość półkuli mózgu (kora ruchowa i czuciowa dla twarzy i kończyny górnej, ośrodki mowy Broki i Wernickego, promienistość wzrokowa) oraz przez t. soczewkowo-prążkowiowe torebka wewnętrzna i jądra podstawy.',
      symptoms: [
        'Niedowład połowiczy i zaburzenia czucia przeciwstronne: <b>twarz i kończyna górna &gt; kończyna dolna</b>',
        '<b>Półkula dominująca (zwykle lewa):</b> afazja ruchowa (Broki), czuciowa (Wernickego) lub mieszana',
        '<b>Półkula niedominująca (zwykle prawa):</b> zespół zaniedbywania połowiczego (neglect), anozognozja',
        'Przymusowe spojrzenie w stronę ogniska („chory patrzy na swoje ognisko”) + niedowidzenie połowicze jednoimienne'
      ],
      trap: 'Ośrodkowe porażenie n. VII po stronie przeciwnej w udarze MCA <b>oszczędza mięśnie czoła</b> — nie pomyl z porażeniem Bella!'
    },
    pca: {
      title: 'Tętnica tylna mózgu (PCA)',
      badge: 'Kora wzrokowa i wzgórze',
      tone: 'v',
      supply: 'Płat potyliczny (kora wzrokowa I-rzędowa wokół bruzdy ostrogowej), dolno-przyśrodkowa część płata skroniowego, wzgórze (gałęzie przeszywające), część śródmózgowia.',
      symptoms: [
        '<b>Przeciwstronne niedowidzenie połowicze jednoimienne</b> (często z oszczędzeniem widzenia plamkowego)',
        '<b>Aleksja bez agrafii</b> (zawał lewego płata potylicznego + płata ciała modzelowatego)',
        'Zespół wzgórzowy (Dejerine-Roussy): połowicze zaburzenia czucia + piekący ból wzgórzowy',
        'Ślepota korowa (obustronna PCA) z zaprzeczaniem ślepocie (zespół Antona)'
      ],
      trap: 'Chory z udarem PCA może mieć <b>prawidłową siłę mięśniową</b> (NIHSS bywa niski!), dlatego zawsze badaj pole widzenia konfrontacyjnie.'
    },
    ba: {
      title: 'Tętnica podstawna (BA)',
      badge: 'Stan bezpośredniego zagrożenia życia',
      tone: 'b',
      supply: 'Most, częściowo śródmózgowie i móżdżek (przez AICA, SCA i gałęzie przeszywające do mostu).',
      symptoms: [
        '<b>Tetrapareza / tetraplegia</b>, obustronne objawy piramidowe (objaw Babińskiego)',
        '<b>Zespół zamknięcia (locked-in syndrome):</b> przytomność zachowana, porażenie wszystkich kończyn i mowy — komunikacja tylko ruchami pionowymi gałek ocznych i mruganiem',
        'Zaburzenia świadomości do śpiączki, porażenia nerwów czaszkowych III–VII, dwojenie, dyzartria, ciężka dysfagia',
        'Przepowiadacze („heraldic symptoms”): nawracające przemijające zawroty głowy, diplopia, ataksja przed pełną okluzją'
      ],
      trap: 'Niedrożność tętnicy podstawnej wymaga pilnej diagnostyki angio-TK i rozważenia trombektomii mechanicznej nawet do 24 h!'
    },
    pica: {
      title: 'Tętnica móżdżkowa dolna tylna (PICA · Wallenberg)',
      badge: 'Wskazówka PUM #5 · zespół boczny opuszki',
      tone: 'g',
      supply: 'Grzbietowo-boczna część rdzenia przedłużonego (opuszki) oraz dolna powierzchnia półkuli móżdżku.',
      symptoms: [
        '<b>Brak niedowładu kończyn</b> (drogi piramidowe w piramidach opuszki mają osobne unaczynienie z tętnicy rdzeniowej przedniej)',
        '<b>Po stronie ogniska (ipsilateralnie):</b> zespół Hornera, ataksja kończyn, zniesienie czucia bólu i temp. na twarzy (n. V), dysfagia, chrypka, zniesienie odruchu wymiotnego (IX/X)',
        '<b>Po stronie przeciwnej (kontralateralnie):</b> zniesienie czucia bólu i temp. na tułowiu i kończynach (droga rdzeniowo-wzgórzowa)',
        'Silne układowe zawroty głowy, nudności, wymioty, oczopląs, czkawka'
      ],
      trap: 'Zespół skrzyżowany (twarz po stronie ogniska + ciało po przeciwnej) + Horner + dysfagia, ale <b>bez niedowładu piramidowego</b> = Wallenberg.'
    }
  };

  function renderArtery(key) {
    const data = ARTERIES[key];
    const host = $('#arteryInfo');
    if (!data || !host) return;
    $$('#arteryMapSvg .reg').forEach(el => {
      const on = el.dataset.reg === key;
      el.classList.toggle('on', on);
      el.setAttribute('aria-pressed', String(on));
    });
    host.innerHTML = `
      <div class="tcard ${data.tone}">
        <span class="pill ${data.tone}">${data.badge}</span>
        <h3 style="margin-top:.3rem">${data.title}</h3>
        <p class="small" style="margin:.35rem 0 .6rem"><b>Obszar unaczynienia:</b> ${data.supply}</p>
        <ul>${data.symptoms.map(s => `<li>${s}</li>`).join('')}</ul>
        <div class="callout amber" style="margin-top:.75rem"><b class="k">Pułapka egzaminacyjna</b>${data.trap}</div>
      </div>`;
  }

  const mapSvg = $('#arteryMapSvg');
  if (mapSvg) {
    mapSvg.addEventListener('click', e => {
      const reg = e.target.closest('.reg');
      if (reg && reg.dataset.reg) renderArtery(reg.dataset.reg);
    });
    mapSvg.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const reg = e.target.closest('.reg');
      if (reg && reg.dataset.reg) {
        e.preventDefault();
        renderArtery(reg.dataset.reg);
      }
    });
    renderArtery('mca');
  }

  /* 3. Kalkulator dawek rtPA / TNK (zgodny z logiką Hubu) */
  const wRange = $('#doseWeight');
  function updateDose() {
    if (!wRange) return;
    const w = Math.max(40, Math.min(130, Number(wRange.value) || 75));
    const totalMg = Math.round(Math.min(90, w * 0.9) * 10) / 10;
    const bolusMg = Math.round(totalMg * 0.1 * 10) / 10;
    const infusionMg = Math.round((totalMg - bolusMg) * 10) / 10;
    const tnkMg = Math.round(Math.min(25, w * 0.25) * 10) / 10;
    const lbl = $('#doseWeightVal');
    const out = $('#doseGrid');
    if (lbl) lbl.textContent = `${w} kg`;
    if (out) {
      out.innerHTML = `
        <div class="dose-box"><span>Alteplaza łącznie</span><b>${totalMg} mg</b></div>
        <div class="dose-box"><span>Bolus 10% (1 min)</span><b>${bolusMg} mg</b></div>
        <div class="dose-box"><span>Wlew 90% (60 min)</span><b>${infusionMg} ml/h</b></div>
        <div class="dose-box"><span>Tenekteplaza (bolus)</span><b>${tnkMg} mg</b></div>`;
    }
  }
  if (wRange) {
    wRange.addEventListener('input', updateDose);
    updateDose();
  }

  /* 4. Graf powiązań międzymodułowych */
  const crossSvg = $('#crossSvg');
  if (crossSvg) {
    const cx = 340;
    const cy = 235;
    const nodes = [
      ['[1]', 'Stany nagłe', 'triage udarowy, ICP, wgłobienie', '#B93424'],
      ['[3]', 'Świadomość', 'BA / pień mózgu, locked-in, śpiączka', '#B93424'],
      ['[5]', 'Badanie U02', 'NIHSS, UMN/LMN, pole widzenia', '#8F5808'],
      ['[6]', 'Nerwy I–XII', 'ośrodkowy VII, Wallenberg IX/X, n. III', '#8F5808'],
      ['[7]', 'Bóle głowy', 'piorunujący ból = wyklucz SAH i CVST', '#8F5808'],
      ['[12]', 'Interna', 'AF (DOAC), DM (hipoglikemia), zakrzepica', '#2B63AE'],
      ['[16]', 'Diagnostyka', 'wczesne TK, angio-TK, perfuzja, PMR', '#245B7A']
    ];
    const rx = 248;
    const ry = 182;
    const pos = nodes.map((_, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length;
      return [Math.round(cx + rx * Math.cos(a)), Math.round(cy + ry * Math.sin(a))];
    });
    let svgHtml = '';
    pos.forEach(p => {
      svgHtml += `<line x1="${cx}" y1="${cy}" x2="${p[0]}" y2="${p[1]}" stroke="#B5C0C3" stroke-width="2"/>`;
    });
    svgHtml += `<circle cx="${cx}" cy="${cy}" r="54" fill="#0C7A85"/>`;
    svgHtml += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" fill="#FFFFFF" font-size="25" font-weight="800">[2]</text>`;
    svgHtml += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">Udar mózgu</text>`;
    nodes.forEach((n, i) => {
      const [x, y] = pos[i];
      const w = 204;
      const h = 58;
      svgHtml += `
        <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="12" fill="#FFFFFF" stroke="${n[3]}" stroke-width="2.2"/>
        <text x="${x}" y="${y - 6}" text-anchor="middle" font-size="13.5" font-weight="800" fill="${n[3]}">${n[0]} ${n[1]}</text>
        <text x="${x}" y="${y + 13}" text-anchor="middle" font-size="11" fill="#44545D">${n[2]}</text>`;
    });
    crossSvg.innerHTML = svgHtml;
  }

  /* 5. Quiz i nawigacja z atlas-shared.js */
  if (typeof ui.mountQuiz === 'function') {
    ui.mountQuiz({
      topics: window.ATLAS_TOPICS,
      questions: window.ATLAS_Q,
      modTag: '[2]'
    });
  }
  if (typeof ui.initNavSpy === 'function') {
    ui.initNavSpy();
  }
})();
