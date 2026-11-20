/* Inicjalizacja wykresów, quizu oraz śledzenia nawigacji dla modułów [12][16] */
(function () {
  'use strict';

  const ui = window.ATLAS_UI;
  if (!ui) return;

  ui.bars('barsSahCT', [
    { l: 'TK bez kontrastu ≤ 6 h od bólu', v: 99, t: '~99–100%', c: 'g' },
    { l: 'TK bez kontrastu po ~12 h', v: 93, t: '~93%', c: 'b' },
    { l: 'TK bez kontrastu po ~24 h', v: 88, t: '~85–90%', c: 'a' },
    { l: 'TK bez kontrastu w 5. dobie', v: 55, t: '~50–60%', c: 'r' }
  ]);

  ui.bars('barsEEG', [
    { l: 'Beta (>13 Hz) — czuwanie, leki (BZD)', v: 22, t: '14–30 Hz', c: 'b' },
    { l: 'Alfa (8–13 Hz) — oczy zamknięte, spoczynek', v: 13, t: '8–13 Hz', c: 'g' },
    { l: 'Theta (4–7 Hz) — senność, ognisko/zwolnienie', v: 7, t: '4–7 Hz', c: 'a' },
    { l: 'Delta (<4 Hz) — głęboki sen, encefalopatia/guz', v: 4, t: '<4 Hz', c: 'r' },
    { l: 'Iglica–fala 3 Hz — napady nieświadomości', v: 3, t: '3 Hz', c: 'v' }
  ]);

  ui.mountQuiz({
    topics: window.ATLAS_TOPICS || {},
    questions: window.ATLAS_Q || [],
    modTag: '[12][16]'
  });

  ui.initNavSpy();
})();
