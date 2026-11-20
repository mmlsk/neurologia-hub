/* Logika modułu [4]: Padaczka i stany drgawkowe */
(function () {
  'use strict';

  const ui = window.ATLAS_UI || {};

  if (typeof ui.bars === 'function') {
    ui.bars('barsEegYield', [
      { l: 'Pojedyncze rutynowe EEG', v: 40, t: '~30–50%', c: 'a' },
      { l: 'Seryjne EEG + aktywacje (HV/FS)', v: 70, t: '~70%', c: 'b' },
      { l: 'EEG po deprywacji snu', v: 80, t: '~75–85%', c: 'v' },
      { l: 'Przedłużone wideo-EEG', v: 92, t: '>90%', c: 'g' }
    ]);

    ui.bars('barsTerato', [
      { l: 'Lamotrygina (LTG)', v: 2.9, t: '~2,9%', c: 'g' },
      { l: 'Lewetyracetam (LEV)', v: 2.8, t: '~2,8%', c: 'g' },
      { l: 'Karbamazepina (CBZ)', v: 5.5, t: '~5,5%', c: 'a' },
      { l: 'Topiramat (TPM)', v: 4.3, t: '~4,3%', c: 'a' },
      { l: 'Walproinian (VPA)', v: 10.3, t: '~10–11%', c: 'r' }
    ]);
  }

  function initEegExplorer() {
    const patterns = window.ATLAS_EEG_PATTERNS || {};
    const tabs = document.getElementById('eegTabs');
    const svg = document.getElementById('eegSvg');
    const title = document.getElementById('eegTitle');
    const tag = document.getElementById('eegTag');
    const provoke = document.getElementById('eegProvoke');
    const clinical = document.getElementById('eegClinical');
    const therapy = document.getElementById('eegTherapy');
    if (!tabs || !svg) return;

    function selectPattern(key) {
      const p = patterns[key];
      if (!p) return;
      svg.innerHTML = p.svg;
      if (title) title.textContent = p.title;
      if (tag) tag.textContent = p.tag;
      if (provoke) provoke.textContent = p.provoke;
      if (clinical) clinical.textContent = p.clinical;
      if (therapy) therapy.textContent = p.therapy;
      tabs.querySelectorAll('button[data-eeg]').forEach(btn => {
        btn.setAttribute('aria-selected', String(btn.dataset.eeg === key));
      });
    }

    tabs.addEventListener('click', ev => {
      const btn = ev.target.closest('button[data-eeg]');
      if (!btn) return;
      selectPattern(btn.dataset.eeg);
    });

    selectPattern('3hz');
  }

  initEegExplorer();

  if (typeof ui.mountQuiz === 'function') {
    ui.mountQuiz({
      topics: window.ATLAS_TOPICS,
      questions: window.ATLAS_Q,
      modTag: '[4]'
    });
  }

  if (typeof ui.initNavSpy === 'function') {
    ui.initNavSpy();
  }
})();
