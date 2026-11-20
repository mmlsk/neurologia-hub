/* Logika modułów [5][6]: wykres MRC, zakładki UMN/LMN, filtr nerwów I–XII i inicjalizacja quizu */
(function () {
  'use strict';

  function initTabs() {
    document.querySelectorAll('[role="tablist"]').forEach(function (tablist) {
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
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

  function initNerveFilter() {
    var box = document.getElementById('cnFilters');
    var body = document.getElementById('cnBody');
    if (!box || !body) return;
    var btns = Array.prototype.slice.call(box.querySelectorAll('button[data-grp]'));
    var rows = Array.prototype.slice.call(body.querySelectorAll('tr[data-grp]'));
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var grp = btn.getAttribute('data-grp');
        btns.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        rows.forEach(function (tr) {
          var rowGrp = tr.getAttribute('data-grp') || '';
          tr.hidden = grp !== 'all' && rowGrp.split(' ').indexOf(grp) === -1;
        });
      });
    });
  }

  function init() {
    if (window.ATLAS_UI && typeof window.ATLAS_UI.bars === 'function') {
      window.ATLAS_UI.bars('barsMRC', [
        { l: '5/5 · pełna siła i opór', v: 5, t: '5/5', c: 'g' },
        { l: '4/5 · ruch przeciw oporowi (osłabiony)', v: 4, t: '4/5', c: 'b' },
        { l: '3/5 · ruch przeciw grawitacji (bez oporu)', v: 3, t: '3/5', c: 'a' },
        { l: '2/5 · ruch w płaszczyźnie podłoża', v: 2, t: '2/5', c: 'a' },
        { l: '1/5 · ślad skurczu bez ruchu w stawie', v: 1, t: '1/5', c: 'r' },
        { l: '0/5 · całkowite porażenie (plegia)', v: 0.25, t: '0/5', c: 'r' }
      ], '');
    }

    initTabs();
    initNerveFilter();

    if (window.ATLAS_UI) {
      if (typeof window.ATLAS_UI.mountQuiz === 'function') {
        window.ATLAS_UI.mountQuiz({
          topics: window.ATLAS_TOPICS,
          questions: window.ATLAS_Q,
          modTag: '[5][6]'
        });
      }
      if (typeof window.ATLAS_UI.initNavSpy === 'function') {
        window.ATLAS_UI.initNavSpy();
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
