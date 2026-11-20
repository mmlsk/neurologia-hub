/* Inicjalizacja wykresów, quizu oraz śledzenia nawigacji dla modułów [7][8] */
(function () {
  'use strict';
  const ui = window.ATLAS_UI;
  if (!ui) return;

  ui.bars('barsHeadache', [
    { l: 'Napięciowy ból głowy (TTH)', v: 42, t: '~42%', c: 'b' },
    { l: 'Migrena (z/bez aury)', v: 15, t: '12–15%', c: 'v' },
    { l: 'Polekowy (MOH, popul.)', v: 2, t: '1–2%', c: 'a' },
    { l: 'Klasterowy (TAC)', v: 1, t: '0,1%', c: 'r' },
    { l: 'Wtórne groźne (SOR)*', v: 8, t: 'priorytet', c: 'r' }
  ]);

  ui.bars('barsRadic', [
    { l: 'L4–L5 (korzeń L5)', v: 45, c: 'b' },
    { l: 'L5–S1 (korzeń S1)', v: 45, c: 'v' },
    { l: 'L3–L4 (korzeń L4)', v: 7, c: 'a' },
    { l: 'L1–L3 (wyższe lędźw.)', v: 3, c: 'g' }
  ]);

  ui.mountQuiz({
    topics: window.ATLAS_TOPICS,
    questions: window.ATLAS_Q,
    modTag: '[7][8]'
  });

  ui.initNavSpy();
})();
