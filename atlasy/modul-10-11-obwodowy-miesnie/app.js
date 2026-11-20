/* Wykresy, filtry kliniczne, quiz #zadania i śledzenie nawigacji dla modułów [10][11] */
(function () {
  'use strict';
  const ui = window.ATLAS_UI;
  if (!ui) return;

  ui.bars('barsPoly', [
    { l: 'Cukrzycowa (aksonalna)', v: 38, t: '~38%', c: 'b' },
    { l: 'Kryptogenna / CIAP', v: 24, t: '~24%', c: 'v' },
    { l: 'Alkoholowa i niedobór B12/B1', v: 16, t: '~16%', c: 'a' },
    { l: 'Zapalna (GBS, CIDP)', v: 10, t: '~10%', c: 'r' },
    { l: 'Dziedziczna (CMT)', v: 7, t: '~7%', c: 'g' },
    { l: 'Polekowa / paraneopl.', v: 5, t: '~5%', c: '' }
  ]);

  ui.bars('barsGBS', [
    { l: 'Wiotki niedowład kończyn', v: 95, c: 'r' },
    { l: 'Zniesienie / osłabienie odruchów', v: 92, c: 'r' },
    { l: 'Rozszczepienie białkowo-komórkowe (>2. tyg.)', v: 85, c: 'b' },
    { l: 'Poprzedzająca infekcja (1–3 tyg.)', v: 65, c: 'a' },
    { l: 'Dysautonomia (RR, arytmie)', v: 50, c: 'v' },
    { l: 'Niewydolność oddechowa (OIT)', v: 25, c: 'r' }
  ]);

  ui.bars('barsMG', [
    { l: 'Przeciwciała anty-AChR', v: 85, c: 'b' },
    { l: 'Podwójnie seronegatywna (SNMG)', v: 7, c: 'a' },
    { l: 'Przeciwciała anty-MuSK', v: 6, c: 'v' },
    { l: 'Przeciwciała anty-LRP4', v: 2, c: 'g' }
  ]);

  function initFilter(boxId, containerId, itemSel, attr) {
    const box = document.getElementById(boxId);
    const host = document.getElementById(containerId);
    if (!box || !host) return;
    const btns = Array.from(box.querySelectorAll('button[data-grp]'));
    const items = Array.from(host.querySelectorAll(itemSel));
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const grp = btn.getAttribute('data-grp');
        btns.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
        items.forEach(el => {
          const val = el.getAttribute(attr) || '';
          el.hidden = grp !== 'all' && val.split(' ').indexOf(grp) === -1;
        });
      });
    });
  }

  initFilter('monoFilters', 'monoBody', 'tr[data-grp]', 'data-grp');
  initFilter('myoFilters', 'myoCards', '[data-grp]', 'data-grp');

  ui.mountQuiz({
    topics: window.ATLAS_TOPICS,
    questions: window.ATLAS_Q,
    modTag: '[10][11]'
  });

  ui.initNavSpy();
})();
