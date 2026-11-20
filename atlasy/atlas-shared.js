/* Współdzielony lekki silnik UI dla 10 atlasów neurologicznych (wykresy, quiz #zadania, nawigacja) */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function bars(id, rows, unit = '%') {
    const el = typeof id === 'string' ? $('#' + id) : id;
    if (!el || !Array.isArray(rows) || !rows.length) return;
    const mx = Math.max(...rows.map(r => r.w ?? r.v ?? 1), 1);
    el.innerHTML = rows.map(r => {
      const val = r.w ?? r.v ?? 0;
      const pctW = Math.max(3, (val / mx) * 100);
      const colStyle = r.c === 'r' ? 'background:var(--red)'
        : r.c === 'a' ? 'background:var(--amber)'
        : r.c === 'b' ? 'background:var(--blue)'
        : r.c === 'g' ? 'background:var(--green)'
        : r.c === 'v' ? 'background:var(--violet)' : '';
      return `<div class="bar"><span>${r.l}</span><div><i class="${r.c || ''}" style="width:${pctW}%;${colStyle}"></i></div><em>${r.t ?? (val + unit)}</em></div>`;
    }).join('');
  }

  function mountQuiz(opts) {
    const topics = opts.topics || {};
    const rawQ = Array.isArray(opts.questions) ? opts.questions : [];
    const modTag = opts.modTag || '[N]';
    const Q = rawQ.map((q, idx) => Object.assign({}, q, { n: q.n || (idx + 1) }));
    const CONF = {
      src: ['src', 'KLUCZ POTWIERDZONY'],
      inf: ['inf', 'KLUCZ WNIOSKOWANY'],
      unk: ['unk', 'KLUCZ NIEPEWNY'],
      did: ['src', 'DYDAKTYCZNE'],
      own: ['inf', 'AUTORSKIE']
    };
    const L = 'ABCDEF';
    let filter = 'all';
    let list = Q.slice();
    let st = {};

    const filtersEl = $('#qFilters');
    if (filtersEl) {
      const topicBtns = Object.keys(topics).map(k =>
        `<button type="button" data-f="${k}" aria-pressed="false">${topics[k]} (${Q.filter(q => q.t === k).length})</button>`
      ).join('');
      const hasGap = Q.some(q => q.gap);
      const hasUnk = Q.some(q => q.c === 'unk');
      filtersEl.innerHTML =
        `<button type="button" data-f="all" aria-pressed="true">Wszystkie (${Q.length})</button>` +
        topicBtns +
        (hasGap ? `<button type="button" data-f="gap" aria-pressed="false">⚖️ Rozbieżności (${Q.filter(q => q.gap).length})</button>` : '') +
        (hasUnk ? `<button type="button" data-f="unk" aria-pressed="false">❓ Niepewny klucz</button>` : '');
    }

    function match(q, f) {
      return f === 'all' || q.t === f || (f === 'gap' && !!q.gap) || (f === 'unk' && q.c === 'unk');
    }

    function bar() {
      const sc = $('#score');
      if (!sc) return;
      const a = Object.values(st);
      sc.textContent = `Wynik: ${a.filter(x => x.ok).length} / ${a.length}`;
    }

    function discHtml(q, done) {
      return `<div class="callout ${done.ok ? 'green' : 'red'}"><b class="k">${done.ok ? 'Poprawnie' : 'Błędnie'} · prawidłowa odpowiedź: ${L[q.k] || '?'}</b>${q.why || ''}</div>` +
        (q.tip ? `<div class="callout blue"><b class="k">Wskazówka egzaminacyjna</b>${q.tip}</div>` : '') +
        (q.gap ? `<div class="cmp"><div class="a"><b class="k">Pod zaliczenie</b>${q.gap.pool || ''}</div><div class="b"><b class="k">Aktualnie klinicznie (wytyczne)</b>${q.gap.now || ''}</div></div>` : '');
    }

    function renderQ() {
      const host = $('#quiz');
      if (!host) return;
      host.innerHTML = list.map(q => {
        const done = st[q.n];
        const c = CONF[q.c] || CONF.did;
        const badgeMod = q.mod ? `[${q.mod}]` : modTag;
        return `<article class="q" id="q${q.n}"><header><span class="n">Zad. ${q.n}</span><span class="mod">${badgeMod}</span><span class="tbadge">${topics[q.t] || 'Ogólne'}</span><span class="kb ${c[0]}">${c[1]}</span>${q.own ? '<span class="tbadge">zadanie autorskie</span>' : ''}${q.adapt ? '<span class="tbadge">✎ adaptacja</span>' : ''}<span class="src">${q.s || 'Sylabus PUM 2026/27'}</span></header><div class="stem">${q.stem}</div><div class="opts" role="group">${(q.o || []).map((o, i) => {
          let cl = 'opt';
          if (done) {
            if (i === q.k) cl += ' key ok';
            else if (i === done.sel) cl += ' bad';
          }
          return `<button type="button" class="${cl}" data-q="${q.n}" data-i="${i}" ${done ? 'disabled' : ''}><span class="l">${L[i]}</span><span>${o}</span></button>`;
        }).join('')}</div><div class="disc" ${done ? '' : 'hidden'}>${done ? discHtml(q, done) : ''}</div></article>`;
      }).join('') || '<p>Brak zadań w tym filtrze.</p>';
      bar();
    }

    const quizEl = $('#quiz');
    if (quizEl) {
      quizEl.addEventListener('click', e => {
        const b = e.target.closest('.opt');
        if (!b) return;
        const q = Q.find(x => x.n == b.dataset.q);
        const i = +b.dataset.i;
        if (!q || st[q.n]) return;
        const done = st[q.n] = { sel: i, ok: i === q.k };
        const art = b.closest('.q');
        if (art) {
          $$('.opt', art).forEach(btn => {
            btn.disabled = true;
            const ix = +btn.dataset.i;
            if (ix === q.k) btn.classList.add('key', 'ok');
            else if (ix === i) btn.classList.add('bad');
          });
          const d = $('.disc', art);
          if (d) {
            d.innerHTML = discHtml(q, done);
            d.classList.add('on');
            d.hidden = false;
          }
        }
        bar();
      });
    }

    function setFilter(f) {
      filter = f;
      list = Q.filter(q => match(q, f));
      $$('#qFilters button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === f)));
      renderQ();
    }

    $$('#qFilters button').forEach(b => { b.onclick = () => setFilter(b.dataset.f); });

    const randBtn = $('#rand10');
    if (randBtn) {
      randBtn.onclick = () => {
        const p = Q.filter(q => match(q, filter)).slice();
        for (let i = p.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [p[i], p[j]] = [p[j], p[i]];
        }
        list = p.slice(0, 10);
        st = {};
        renderQ();
        if (filtersEl) filtersEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    }

    const resetBtn = $('#resetQ');
    if (resetBtn) {
      resetBtn.onclick = () => { st = {}; setFilter(filter); };
    }

    renderQ();
    const palette = ['b', 'r', 'a', 'g', 'v', ''];
    bars('barsPool', Object.keys(topics).map((k, i) => ({
      l: topics[k],
      v: Q.filter(q => q.t === k).length,
      c: palette[i % palette.length]
    })), '');
  }

  function initNavSpy() {
    const links = $$('#navlist a');
    if (!links.length || typeof IntersectionObserver === 'undefined') return;
    const secs = links.map(a => {
      const href = a.getAttribute('href') || '';
      return href.startsWith('#') ? $(href) : null;
    });
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secs.forEach(s => s && io.observe(s));
  }

  window.ATLAS_UI = { bars, mountQuiz, initNavSpy };
})();
