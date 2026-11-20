/* Logika interaktywna atlasu [9] Choroby demielinizacyjne i autoimmunologiczne OUN */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const ui = window.ATLAS_UI || {};

  /* 1. Wykresy słupkowe */
  if (typeof ui.bars === 'function') {
    ui.bars('barsMsSymptoms', [
      { l: 'Zaburzenia czucia (parestezje, Lhermitte)', v: 85, t: '~80–85%', c: 'b' },
      { l: 'Niedowład piramidowy / spastyczność', v: 80, t: '~80%', c: 'r' },
      { l: 'Przewlekłe zmęczenie (fatigue)', v: 75, t: '~75–80%', c: 'a' },
      { l: 'Zaburzenia zwieraczy (pęcherz neurogenny)', v: 60, t: '~60%', c: 'v' },
      { l: 'Zaburzenia widzenia (ON / INO / diplopia)', v: 55, t: '~50–60%', c: 'g' },
      { l: 'Objawy móżdżkowe (ataksja, drżenie zamiarowe)', v: 50, t: '~50%', c: 'b' }
    ]);

    ui.bars('barsOcbSens', [
      { l: 'Stwardnienie rozsiane (SM)', v: 92, t: '~90–95%', c: 'g' },
      { l: 'CIS (wysokie ryzyko konwersji)', v: 70, t: '~65–75%', c: 'b' },
      { l: 'NMOSD (AQP4-IgG+)', v: 20, t: '~15–25%', c: 'a' },
      { l: 'MOGAD (MOG-IgG+)', v: 12, t: '<15%', c: 'r' }
    ]);
  }

  /* 2. Interaktywny ewaluator kryteriów McDonalda (2017) */
  function initMcDonaldChecker() {
    const disBox = $('#mcdDis');
    const ditBox = $('#mcdDit');
    const out = $('#mcdResult');
    if (!disBox || !ditBox || !out) return;

    function update() {
      const disCount = disBox.querySelectorAll('input:checked').length;
      const ditChecked = ditBox.querySelectorAll('input:checked').length;
      const hasDis = disCount >= 2;
      const hasDit = ditChecked >= 1;

      let tone = 'amber';
      let verdict = 'Kryteria McDonalda 2017 niespełnione';
      let note = 'Wymagane jest spełnienie zarówno DIS (≥2 z 4 typowych lokalizacji OUN), jak i DIT (lub zastępujących je prążków oligoklonalnych w PMR) oraz wykluczenie innych przyczyn (np. NMOSD, MOGAD, SLE, niedoboru B12).';

      if (hasDis && hasDit) {
        tone = 'green';
        verdict = 'Rozpoznanie pewnego SM (kryteria McDonalda 2017 spełnione)';
        note = `DIS: ${disCount}/4 lokalizacji OUN · DIT/OCB: spełnione (${ditChecked} wykładnik${ditChecked > 1 ? 'i' : ''}). Warunek bezwzględny: brak lepszego wyjaśnienia obrazu klinicznego („no better explanation”).`;
      } else if (hasDis || hasDit) {
        tone = 'blue';
        verdict = 'Zespół klinicznie izolowany (CIS) lub diagnostyka niepełna';
        note = hasDis
          ? `DIS spełnione (${disCount}/4), brakuje potwierdzenia DIT — sprawdź prążki oligoklonalne (OCB) w PMR lub wykonaj kontrolne MRI w poszukiwaniu nowego ogniska T2/Gd+.`
          : `Wykazano wykładnik DIT/OCB, lecz DIS niespełnione (${disCount}/4, potrzeba ≥2 lokalizacji typowych w MRI).`;
      }

      out.innerHTML = `<div class="callout ${tone}"><b class="k">${verdict}</b>${note}</div>`;
    }

    disBox.addEventListener('change', update);
    ditBox.addEventListener('change', update);
    update();
  }
  initMcDonaldChecker();

  /* 3. Graf powiązań międzymodułowych */
  const crossSvg = $('#crossSvg');
  if (crossSvg) {
    const cx = 340;
    const cy = 235;
    const nodes = [
      ['[3]', 'Świadomość', 'anty-NMDAR, encefalopatia, katatonia', '#A82D1E'],
      ['[4]', 'Padaczka', 'napady w AE, FBDS w anty-LGI1', '#A82D1E'],
      ['[5]', 'Badanie U02', 'Romberg, sznury tylne, spastyczność', '#8F5808'],
      ['[6]', 'Nerwy I–XII', 'ON (n. II), INO (MLF), objawowa V', '#8F5808'],
      ['[7]', 'Neuralgia V', 'obustronna / u młodego = wyklucz SM', '#8F5808'],
      ['[12]', 'Interna', 'niedobór B12, SLE, sarkoidoza, teratoma', '#2B63AE'],
      ['[16]', 'Diagnostyka', 'MRI T2/Gd+, palce Dawsona, OCB w PMR', '#245B7A']
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
    svgHtml += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" fill="#FFFFFF" font-size="25" font-weight="800">[9]</text>`;
    svgHtml += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">Autoimmuno</text>`;
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

  /* 4. Quiz i nawigacja z atlas-shared.js */
  if (typeof ui.mountQuiz === 'function') {
    ui.mountQuiz({
      topics: window.ATLAS_TOPICS,
      questions: window.ATLAS_Q,
      modTag: '[9]'
    });
  }
  if (typeof ui.initNavSpy === 'function') {
    ui.initNavSpy();
  }
})();
