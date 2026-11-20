/* Logika interaktywna atlasu [14][15]: Choroby zwyrodnieniowe OUN i zespoły otępienne */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ui = window.ATLAS_UI || {};

  /* 1. Wykresy słupkowe */
  function initBars() {
    if (typeof ui.bars !== 'function') return;

    ui.bars('barsPdSymptoms', [
      { l: 'Bradykinezja (warunek konieczny)', v: 100, t: '100%', c: 'b' },
      { l: 'Objawy prodromalne (hiposmia, RBD)', v: 85, t: '~80–90%', c: 'v' },
      { l: 'Sztywność (koło zębate / rura)', v: 85, t: '~85%', c: 'g' },
      { l: 'Drżenie spoczynkowe 4–6 Hz', v: 75, t: '~70–75%', c: 'a' },
      { l: 'Upadki w 1. roku (czerwona flaga PSP!)', v: 10, t: '<10%', c: 'r' }
    ], '');

    ui.bars('barsDementiaShare', [
      { l: 'Choroba Alzheimera (AD)', v: 65, t: '~60–70%', c: 'b' },
      { l: 'Otępienie naczyniopochodne (VaD / mieszane)', v: 20, t: '~15–20%', c: 'r' },
      { l: 'Otępienie z ciałami Lewy’ego (DLB)', v: 12, t: '~10–15%', c: 'a' },
      { l: 'Otępienie czołowo-skroniowe (FTD)', v: 8, t: '~5–10%', c: 'v' },
      { l: 'Przyczyny potencjalnie odwracalne (NPH, B12, TSH)', v: 8, t: '~5–10%', c: 'g' }
    ], '');
  }

  /* 2. Zakładki (role="tablist") */
  function initTabs() {
    $$('[role="tablist"]').forEach(function (tablist) {
      var tabs = $$('[role="tab"]', tablist);
      tabs.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var targetId = btn.getAttribute('aria-controls');
          tabs.forEach(function (t) {
            var active = t === btn;
            t.setAttribute('aria-selected', String(active));
            var p = document.getElementById(t.getAttribute('aria-controls'));
            if (p) p.hidden = !active;
          });
          var target = targetId && document.getElementById(targetId);
          if (target) target.hidden = false;
        });
      });
    });
  }

  /* 3. Filtr tabeli parkinsonizmu atypowego (białkopatie / grupy) */
  function initAtypFilter() {
    var box = $('#atypFilters');
    var body = $('#atypTableBody');
    if (!box || !body) return;
    var btns = $$('button[data-grp]', box);
    var rows = $$('tr[data-grp]', body);
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var grp = btn.getAttribute('data-grp');
        btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        rows.forEach(function (tr) {
          var rowGrp = tr.getAttribute('data-grp') || '';
          tr.hidden = grp !== 'all' && rowGrp.split(' ').indexOf(grp) === -1;
        });
      });
    });
  }

  /* 4. Interaktywna mapa lokalizacji w SLA (#alsSvg) */
  var ALS_REGIONS = {
    umn: {
      tone: 'b',
      badge: 'Górny neuron ruchowy (UMN) · droga korowo-rdzeniowa / korowo-jądrowa',
      title: 'Uszkodzenie UMN w stwardnieniu zanikowym bocznym',
      items: [
        '<b>Wzmożenie napięcia mięśniowego (spastyczność)</b> i wygórowane odruchy głębokie — szczególnie znamienne, gdy dotyczą kończyny z wyraźnym zanikiem mięśni!',
        '<b>Objaw Babińskiego (+)</b>, objaw Hoffmanna, klonus stopy/rzepki, zniesienie odruchów brzusznych.',
        '<b>Zespół rzekomoopuszkowy (UMN dla opuszki):</b> labilność emocjonalna (przymusowy płacz i śmiech), wygórowany odruch żuchwowy, spastyczna dyzartria.'
      ],
      note: 'Wskazówka PUM #9: obecność wygórowanych odruchów w kończynie z fascykulacjami i zanikiem to klucz do rozpoznania SLA.'
    },
    bulbar: {
      tone: 'r',
      badge: 'Piętro opuszkowe LMN · jądra nerwów IX, X, XII (~25–30% początków SLA)',
      title: 'Postać opuszkowa SLA (najgorsze rokowanie)',
      items: [
        '<b>Dyzartria wiotka</b> (mowa nosowa, zamazana) oraz <b>dysfagia</b> (krztuszenie płynami, ryzyko zachłystowego zapalenia płuc).',
        '<b>Zanik i fascykulacje języka</b> (najlepiej widoczne, gdy język spoczywa swobodnie na dnie jamy ustnej!).',
        '<b>Opadanie żuchwy</b> lub cechy mieszane opuszkowo-rzekomoopuszkowe przy zachowanej świadomości.'
      ],
      note: 'Postać opuszkowa wymaga wczesnej oceny oddechowej (FVC/MIP/SNIP) i terminowego rozważenia gastrostomii (PEG).'
    },
    lmn: {
      tone: 'a',
      badge: 'Dolny neuron ruchowy (LMN) · rogi przednie rdzenia kręgowego',
      title: 'Uszkodzenie LMN w kończynach i mięśniach oddechowych',
      items: [
        '<b>Asymetryczne osłabienie i zanik mięśni</b> — klasycznie najpierw drobne mięśnie dłoni (objaw „rozszczepionej dłoni” — zanik kłębu i I międzykostnego przy względnym zaoszczędzeniu kłębika) lub opadanie stopy.',
        '<b>Fascykulacje i bolesne kurcze mięśniowe</b> (często wyprzedzają jawny niedowład).',
        '<b>EMG:</b> cechy aktywnego odnerwienia (fibrylacje, dodatnie fale ostre) + przewlekłej reinerwacji przy prawidłowym przewodnictwie czuciowym!'
      ],
      note: 'W postaci czysto ruchowej LMN zawsze wyklucz uleczalną wieloogniskową neuropatię ruchową (MMN — blok przewodzenia, przeciwciała anty-GM1, IVIG!).'
    },
    spared: {
      tone: 'g',
      badge: 'Struktury zaoszczędzone w klasycznym SLA (kryterium wykluczające inne choroby)',
      title: 'Czego NIE uszkadza klasyczne SLA?',
      items: [
        '<b>Czucie powierzchowne i głębokie:</b> sznury tylne i drogi rdzeniowo-wzgórzowe pozostają prawidłowe (brak niedoczulicy i zaburzeń wibracji).',
        '<b>Zwieracze pęcherza i odbytu:</b> jądro Onufa w odcinku krzyżowym (S2–S4) jest typowo zaoszczędzone do późnych stadiów.',
        '<b>Ruchy gałek ocznych (III, IV, VI):</b> jądra okoruchowe są oszczędzone (pozwalają chorym na komunikację wzrokową w zaawansowanym SLA!).'
      ],
      note: 'Jeśli chory z UMN+LMN ma zaburzenia czucia głębokiego lub zwieraczy — pilnie wykonaj MRI odcinka szyjnego (mielopatia!) i oznacz B12!'
    }
  };

  function renderAlsRegion(key) {
    var data = ALS_REGIONS[key];
    var host = $('#alsInfo');
    if (!data || !host) return;
    $$('#alsSvg .reg').forEach(function (el) {
      var on = el.dataset.reg === key;
      el.classList.toggle('on', on);
      el.setAttribute('aria-pressed', String(on));
    });
    host.innerHTML =
      '<div class="tcard ' + data.tone + '">' +
        '<span class="pill ' + data.tone + '">' + data.badge + '</span>' +
        '<h3 style="margin-top:.35rem">' + data.title + '</h3>' +
        '<ul>' + data.items.map(function (it) { return '<li>' + it + '</li>'; }).join('') + '</ul>' +
        '<div class="callout amber" style="margin-top:.75rem"><b class="k">Wskazówka kliniczna</b>' + data.note + '</div>' +
      '</div>';
  }

  function initAlsMap() {
    var svg = $('#alsSvg');
    if (!svg) return;
    svg.addEventListener('click', function (e) {
      var reg = e.target.closest('.reg');
      if (reg && reg.dataset.reg) renderAlsRegion(reg.dataset.reg);
    });
    svg.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var reg = e.target.closest('.reg');
      if (reg && reg.dataset.reg) {
        e.preventDefault();
        renderAlsRegion(reg.dataset.reg);
      }
    });
    renderAlsRegion('umn');
  }

  /* 5. Kalkulator diagnostyczny NPH (triada Hakima + Evans + tap-test) */
  function initNphCalc() {
    var box = $('#nphChecks');
    var out = $('#nphOut');
    if (!box || !out) return;
    var inputs = $$('input[type="checkbox"]', box);
    function update() {
      var pts = 0;
      var checkedTap = false;
      inputs.forEach(function (inp) {
        if (inp.checked) {
          pts += Number(inp.value) || 0;
          if (inp.dataset.tap === '1') checkedTap = true;
        }
      });
      var cls = 'callout';
      var title = 'Małe prawdopodobieństwo NPH (' + pts + ' / 9 pkt)';
      var desc = 'Zaznacz objawy triady Hakima (chód magnetyczny, otępienie podkorowe, nietrzymanie moczu), poszerzenie komór (Evans &gt;0,30) oraz wynik próby upustowej PMR, aby ocenić wskazanie do zastawki (VPS).';
      if (pts >= 6 || (pts >= 5 && checkedTap)) {
        cls = 'callout green';
        title = 'Wysokie prawdopodobieństwo NPH (' + pts + ' / 9 pkt) → kwalifikacja do VPS';
        desc = 'Obraz triady Hakima z poszerzeniem komór (Evans &gt;0,30) i poprawą po teście upustowym (30–50 ml PMR) przemawia za wodogłowiem normotensyjnym — chory wymaga konsultacji neurochirurgicznej w kierunku zastawki komorowo-otrzewnowej (VPS). Najlepiej poprawia się chód!';
      } else if (pts >= 3) {
        cls = 'callout amber';
        title = 'Podejrzenie NPH (' + pts + ' / 9 pkt) → wykonaj MRI (Evans/DESH) i tap-test';
        desc = 'Przy dominujących zaburzeniach chodu (bez niedowładu na leżąco) i poszerzeniu komór należy wykonać test upustowy PMR (30–50 ml) z obiektywną oceną czasu chodu przed i po punkcji lędźwiowej oraz wykluczyć B12/TSH.';
      } else if (pts > 0) {
        cls = 'callout blue';
        title = 'Niepełny obraz (' + pts + ' / 9 pkt) → poszerz diagnostykę różnicową';
        desc = 'Izolowane otępienie bez wczesnego chodu magnetycznego przemawia częściej za AD, VaD, DLB lub przyczyną metaboliczną (niedobór B12, niedoczynność tarczycy, depresja).';
      }
      out.className = cls;
      out.innerHTML = '<b class="k">' + title + '</b>' + desc;
    }
    inputs.forEach(function (inp) { inp.addEventListener('change', update); });
    update();
  }

  /* 6. Graf powiązań międzymodułowych */
  function initCrossGraph() {
    var crossSvg = $('#crossSvg');
    if (!crossSvg) return;
    var cx = 340;
    var cy = 235;
    var nodes = [
      ['[2]', 'Udary mózgu', 'VaD, parkinsonizm naczyniowy', '#B93424'],
      ['[5]', 'Badanie U02', 'UMN vs LMN, wzmożone napięcie, chód', '#8F5808'],
      ['[6]', 'Nerwy I–XII', 'opuszka SLA (IX–XII), n. I w PD', '#8F5808'],
      ['[10]', 'Obwodowy UN', 'MMN vs SLA, polineuropatia B12', '#2B63AE'],
      ['[12]', 'Interna', 'B12, TSH, wątroba, leki D2/antychol.', '#2B63AE'],
      ['[13]', 'Guzy OUN', 'guz czołowy / NPH jako mimik otępienia', '#245B7A'],
      ['[16]', 'Diagnostyka', 'MRI (hipokamp/Evans), EMG, PMR Aβ/tau', '#245B7A']
    ];
    var rx = 246;
    var ry = 180;
    var pos = nodes.map(function (_, i) {
      var a = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length;
      return [Math.round(cx + rx * Math.cos(a)), Math.round(cy + ry * Math.sin(a))];
    });
    var svgHtml = '';
    pos.forEach(function (p) {
      svgHtml += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="#B5C0C3" stroke-width="2"/>';
    });
    svgHtml += '<circle cx="' + cx + '" cy="' + cy + '" r="56" fill="#0C7A85"/>';
    svgHtml += '<text x="' + cx + '" y="' + (cy - 5) + '" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="800">[14][15]</text>';
    svgHtml += '<text x="' + cx + '" y="' + (cy + 17) + '" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="700">Zwyrodn. · Otęp.</text>';
    nodes.forEach(function (n, i) {
      var x = pos[i][0];
      var y = pos[i][1];
      var w = 212;
      var h = 58;
      svgHtml +=
        '<rect x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="12" fill="#FFFFFF" stroke="' + n[3] + '" stroke-width="2.2"/>' +
        '<text x="' + x + '" y="' + (y - 6) + '" text-anchor="middle" font-size="13.5" font-weight="800" fill="' + n[3] + '">' + n[0] + ' ' + n[1] + '</text>' +
        '<text x="' + x + '" y="' + (y + 13) + '" text-anchor="middle" font-size="11" fill="#44545D">' + n[2] + '</text>';
    });
    crossSvg.innerHTML = svgHtml;
  }

  /* 7. Inicjalizacja całości */
  function init() {
    initBars();
    initTabs();
    initAtypFilter();
    initAlsMap();
    initNphCalc();
    initCrossGraph();

    if (typeof ui.mountQuiz === 'function') {
      ui.mountQuiz({
        topics: window.ATLAS_TOPICS,
        questions: window.ATLAS_Q,
        modTag: '[14][15]'
      });
    }
    if (typeof ui.initNavSpy === 'function') {
      ui.initNavSpy();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
