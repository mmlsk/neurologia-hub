/* Inicjalizacja wykresów, quizu i nawigacji modułów [1][3] za pośrednictwem ATLAS_UI */
(function () {
  'use strict';

  const ui = window.ATLAS_UI;
  if (!ui) return;

  ui.bars('barsCauses', [
    { l: 'Metaboliczne i toksyczne (hipoglikemia, leki, alkohol, dyselektrolitemie)', v: 62, t: '~60–65%', c: 'a' },
    { l: 'Strukturalne nadnamiotowe (udar, krwotok, krwiak SDH/EDH, guz)', v: 22, t: '~20–25%', c: 'r' },
    { l: 'Strukturalne podnamiotowe / pniowe (krwotok pniowy, zakrzepica BA)', v: 16, t: '~15%', c: 'v' }
  ]);

  ui.bars('barsZomr', [
    { l: 'Streptococcus pneumoniae (najczęstsze u dorosłych)', v: 50, t: '~50%', c: 'r' },
    { l: 'Neisseria meningitidis (młodzi dorośli, wybroczyny)', v: 25, t: '~25%', c: 'b' },
    { l: 'Listeria monocytogenes (>50 r.ż., ciąża, immunosupresja)', v: 12, t: '10–15%', c: 'a' },
    { l: 'Inne (pałeczki G−, S. aureus po zabiegach/urazach)', v: 13, t: '10–15%', c: 'v' }
  ]);

  ui.mountQuiz({
    topics: window.ATLAS_TOPICS || {},
    questions: window.ATLAS_Q || [],
    modTag: '[1][3]'
  });

  ui.initNavSpy();
})();
