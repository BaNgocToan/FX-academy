(function () {
  'use strict';
  var I = window.I18N, L = I.t;
  var D = window.DATA, $ = function (s, r) { return (r || document).querySelector(s); };
  I.localize(D); /* áp bản dịch nội dung bài học/thuật ngữ (nếu không phải tiếng Việt) */
  var main = $('#main');

  /* ---------- helpers ---------- */
  var ICONS = {
    seed: '<path d="M12 22V11"/><path d="M12 11C12 7 9 5 5 5c0 4 2 6 7 6z"/><path d="M12 14c0-3 2-5 6-5 0 3-2 5-6 5z"/>',
    candle: '<path d="M7 3v3M7 14v4M17 6v3M17 18v3"/><rect x="5" y="6" width="4" height="8" rx="1"/><rect x="15" y="9" width="4" height="9" rx="1"/>',
    indicator: '<path d="M3 17l5-6 4 3 8-9"/><path d="M3 21h18"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    brain: '<path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 003 3V4z"/><path d="M15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-3 3V4z"/>',
    rocket: '<path d="M5 15c-1 1-2 4-2 6 2 0 5-1 6-2"/><path d="M12 15l-3-3c1-5 5-9 11-9 0 6-4 10-9 11z"/><circle cx="15" cy="9" r="1.5"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>',
    warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h0"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    quiz: '<path d="M9 9a3 3 0 115 2c-1 1-2 1.5-2 3"/><path d="M12 18h0"/><circle cx="12" cy="12" r="9"/>'
  };
  function ic(n, cls) { return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || '') + '</svg>'; }
  window.__ic = ic;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }

  var done = {};
  try { done = JSON.parse(localStorage.getItem('fx-done') || '{}'); } catch (e) { done = {}; }
  function saveDone() { try { localStorage.setItem('fx-done', JSON.stringify(done)); } catch (e) { } }
  /* Bài "Sàn môi giới" đổi mã 1-6 → 1-7 khi chèn bài KYC/AML: chuyển tiến độ đã lưu (chạy một lần) */
  try { if (!localStorage.getItem('fx-mig-kyc')) { if (done['1-6']) { delete done['1-6']; done['1-7'] = 1; saveDone(); } localStorage.setItem('fx-mig-kyc', '1'); } } catch (e) { }
  var certs = {};
  try { certs = JSON.parse(localStorage.getItem('fx-cert') || '{}'); } catch (e) { certs = {}; }
  function saveCerts() { try { localStorage.setItem('fx-cert', JSON.stringify(certs)); } catch (e) { } }
  function ymd(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function getName() { try { return localStorage.getItem('fx-name') || ''; } catch (e) { return ''; } }
  function setName(v) { try { localStorage.setItem('fx-name', v); } catch (e) { } }
  /* Cấp chứng nhận khi hoàn thành mọi bài của cấp; trả về true nếu vừa được cấp lần đầu */
  function grantCert(lv) {
    if (certs[lv.id] || levelDone(lv) !== lv.lessons.length) return false;
    certs[lv.id] = ymd(new Date()); saveCerts(); return true;
  }

  var allLessons = [];
  D.levels.forEach(function (lv) { lv.lessons.forEach(function (l) { l.level = lv; allLessons.push(l); }); });
  function findLesson(id) { return allLessons.filter(function (l) { return l.id === id; })[0]; }
  function levelDone(lv) { return lv.lessons.filter(function (l) { return done[l.id]; }).length; }
  var totalDone = function () { return allLessons.filter(function (l) { return done[l.id]; }).length; };

  /* ---------- views ---------- */
  function candleHero() {
    /* Biểu đồ minh hoạ xu hướng tăng: nến mô phỏng, EMA, khối lượng và chú thích trực tiếp */
    var W = 480, H = 300, x0 = 14, x1 = 408, top = 30, bot = 214, n = 30, UP = '#2ebd85', DN = '#f6465d';
    var seed = 23; function rnd() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    var segs = [[16, 6], [8, 3], [34, 6], [24, 3], [52, 6], [42, 3], [72, 3]], path = [], cur = 0, i, k;
    segs.forEach(function (s) { for (k = 1; k <= s[1]; k++) path.push(cur + (s[0] - cur) * k / s[1]); cur = s[0]; });
    var cs = [], prev = 0;
    path.forEach(function (p) { var c = p + (rnd() - .5) * 8, o = prev; cs.push({ o: o, c: c, h: Math.max(o, c) + rnd() * 6, l: Math.min(o, c) - rnd() * 6, v: 25 + rnd() * 55 }); prev = c; });
    var lo = Math.min.apply(null, cs.map(function (c) { return c.l; })), hi = Math.max.apply(null, cs.map(function (c) { return c.h; }));
    function Y(p) { return bot - (p - lo) / (hi - lo) * (bot - top); }
    var step = (x1 - x0) / n, bw = step * .62;
    function X(j) { return x0 + (j + .5) * step; }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(L('chart.aria')) + '">';
    s += '<rect width="' + W + '" height="' + H + '" rx="14" fill="#0b0e11"/>';
    for (i = 0; i < 5; i++) { var gy = top + i * (bot - top) / 4; s += '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + gy + '" y2="' + gy + '" stroke="#1b2230"/>'; }
    for (i = 0; i < 5; i++) { var gy2 = top + i * (bot - top) / 4, pv = hi - i * (hi - lo) / 4; s += '<text x="' + (x1 + 8) + '" y="' + (gy2 + 3) + '" font-size="9" fill="#8b95a7">' + (1.08 + pv * 0.0001).toFixed(4) + '</text>'; }
    /* khối lượng */
    cs.forEach(function (c, j) { s += '<rect x="' + (X(j) - bw / 2) + '" y="' + (H - 28 - c.v * .5) + '" width="' + bw + '" height="' + (c.v * .5) + '" rx="1" fill="' + (c.c >= c.o ? UP : DN) + '" opacity=".35"/>'; });
    /* các điểm đỉnh/đáy theo thứ tự tăng dần */
    function argmax(a, b) { var m = a; for (var j = a; j <= b; j++) if (cs[j].h > cs[m].h) m = j; return m; }
    function argmin(a, b) { var m = a; for (var j = a; j <= b; j++) if (cs[j].l < cs[m].l) m = j; return m; }
    var h1 = argmax(3, 9), h2 = argmax(15, 21), h3 = argmax(24, 29), l1 = argmin(0, 6), l2 = argmin(10, 15), l3 = argmin(19, 25);
    /* đường nối đỉnh và đáy (kênh tăng) */
    s += '<path d="M' + X(h1) + ' ' + Y(cs[h1].h) + 'L' + X(h3) + ' ' + Y(cs[h3].h) + '" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5 4" fill="none"/>';
    s += '<path d="M' + X(l1) + ' ' + Y(cs[l1].l) + 'L' + X(l3) + ' ' + Y(cs[l3].l) + '" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" fill="none"/>';
    /* nến */
    cs.forEach(function (c, j) {
      var col = c.c >= c.o ? UP : DN, yt = Y(Math.max(c.o, c.c)), yb = Y(Math.min(c.o, c.c));
      s += '<line x1="' + X(j) + '" x2="' + X(j) + '" y1="' + Y(c.h) + '" y2="' + Y(c.l) + '" stroke="' + col + '" stroke-width="1.5"/><rect x="' + (X(j) - bw / 2) + '" y="' + yt + '" width="' + bw + '" height="' + Math.max(yb - yt, 1.5) + '" rx="1.5" fill="' + col + '"/>';
    });
    /* EMA mượt */
    var kk = 2 / (8 + 1), e = cs[0].c, d = '';
    cs.forEach(function (c, j) { e = j ? c.c * kk + e * (1 - kk) : c.c; d += (j ? 'L' : 'M') + X(j).toFixed(1) + ' ' + Y(e).toFixed(1); });
    s += '<path d="' + d + '" fill="none" stroke="#a78bfa" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
    /* chú thích */
    function dot(j, p, col) { return '<circle cx="' + X(j) + '" cy="' + Y(p) + '" r="4.5" fill="' + col + '" stroke="#0b0e11" stroke-width="1.5"/>'; }
    s += dot(h1, cs[h1].h, '#fbbf24') + dot(h2, cs[h2].h, '#fbbf24') + dot(h3, cs[h3].h, '#fbbf24') + dot(l1, cs[l1].l, '#38bdf8') + dot(l2, cs[l2].l, '#38bdf8') + dot(l3, cs[l3].l, '#38bdf8');
    var hx = X(h1) + (X(h3) - X(h1)) * .42, hy = Y(cs[h1].h) + (Y(cs[h3].h) - Y(cs[h1].h)) * .42;
    s += '<text x="' + hx.toFixed(1) + '" y="' + (hy - 12).toFixed(1) + '" font-size="11" font-weight="700" fill="#fbbf24" text-anchor="middle">' + esc(L('chart.hh')) + '</text>';
    s += '<text x="' + (X(l2) + 20) + '" y="' + (Y(cs[l2].l) + 22) + '" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="middle">' + esc(L('chart.hl')) + '</text>';
    /* điểm mua thuận xu hướng: sau nhịp hồi về EMA */
    var b = l3 + 1, bx = X(b), by = Y(cs[b].l) + 12;
    s += '<path d="M' + bx + ' ' + by + 'l-7 11h14z" fill="' + UP + '"/><text x="' + (bx + 10) + '" y="' + (by + 22) + '" font-size="11" font-weight="700" fill="' + UP + '">' + esc(L('chart.buy')) + '</text>';
    /* chú giải */
    s += '<g font-size="10.5" fill="#cbd5e1"><rect x="14" y="' + (H - 18) + '" width="14" height="3" rx="1.5" fill="#a78bfa"/><text x="34" y="' + (H - 13) + '">' + esc(L('chart.ema')) + '</text>' +
      '<rect x="120" y="' + (H - 18) + '" width="14" height="3" rx="1.5" fill="' + UP + '"/><text x="140" y="' + (H - 13) + '">' + esc(L('chart.vol')) + '</text></g>';
    s += '<text x="14" y="20" font-size="12" font-weight="700" fill="#e5e7eb">EURUSD · H4</text>';
    return s + '</svg>';
  }

  function levelCard(lv) {
    var d = levelDone(lv), n = lv.lessons.length, pct = Math.round(d / n * 100);
    return '<a class="card reveal" href="#/cap/' + lv.id + '">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><span class="lvl-ico">' + ic(lv.icon, '') + '</span><span class="tag">' + L('card.level', { n: lv.id }) + (certs[lv.id] ? L('card.cert') : '') + '</span></div>' +
      '<h3>' + esc(lv.title) + '</h3><p>' + esc(lv.desc) + '</p>' +
      '<div class="progress" role="progressbar" aria-label="' + esc(L('card.prog', { n: lv.id })) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div>' +
      '<span class="muted num" style="font-size:.875rem">' + L('card.learned', { d: d, n: n }) + '</span></a>';
  }

  function home() {
    var total = allLessons.length, td = totalDone();
    var next = allLessons.filter(function (l) { return !done[l.id]; })[0] || allLessons[0];
    var minutes = allLessons.reduce(function (a, l) { return a + l.min; }, 0);
    main.innerHTML =
      '<section class="hero"><div class="wrap hero-grid"><div>' +
      '<span class="eyebrow">' + ic('globe') + ' ' + L('home.eyebrow') + '</span>' +
      '<h1>' + I.rich(L('home.h1')) + '</h1>' +
      '<p class="lead">' + L('home.lead', { n: D.levels.length }) + '</p>' +
      '<div class="cta-row"><a class="btn btn-primary" href="#/bai/' + next.id + '">' + (td ? L('cta.continue', { title: esc(next.title) }) : L('cta.start')) + ' ' + ic('arrow') + '</a>' +
      '<a class="btn btn-ghost" href="#/lo-trinh">' + L('cta.path') + '</a></div></div>' +
      '<figure class="chart-card" style="margin:0">' + candleHero() + '<figcaption>' + L('chart.caption') + '</figcaption></figure></div>' +
      '<div class="wrap"><div class="stats">' +
      '<div class="stat"><b class="num">' + D.levels.length + '</b>' + L('stat.levels') + '</div>' +
      '<div class="stat"><b class="num">' + total + '</b>' + L('stat.lessons') + '</div>' +
      '<div class="stat"><b class="num">~' + Math.round(minutes / 60) + 'h</b>' + L('stat.hours') + '</div>' +
      '<div class="stat"><b class="num">' + td + '/' + total + '</b>' + L('stat.done') + '</div></div></div></section>' +

      '<section class="block"><div class="wrap">' + sessionsBlock(true) + '</div></section>' +

      '<section class="block alt"><div class="wrap"><div class="head"><div><h2>' + L('path.h2') + '</h2><p class="muted" style="margin:0">' + L('path.sub') + '</p></div></div>' +
      '<div class="grid levels">' + D.levels.map(levelCard).join('') + '</div></div></section>' +

      '<section class="block"><div class="wrap"><div class="head"><h2>' + L('why.h2') + '</h2></div><div class="grid features">' +
      feat('shield', L('feat.1.t'), L('feat.1.d')) + feat('quiz', L('feat.2.t'), L('feat.2.d')) +
      feat('calc', L('feat.3.t'), L('feat.3.d')) + feat('book', L('feat.4.t'), L('feat.4.d')) +
      '</div></div></section>' +

      '<section class="block alt"><div class="wrap"><div class="callout danger" style="margin:0"><span>' + ic('warn') + '</span><div><b class="title">' + L('real.t') + '</b><p>' + L('real.d') + '</p></div></div></div></section>';
    afterRender();
  }
  function feat(i, t, d) { return '<div class="card reveal"><span class="lvl-ico">' + ic(i) + '</span><h3>' + t + '</h3><p>' + d + '</p></div>'; }

  function path() {
    main.innerHTML = '<div class="wrap page-head"><h1>' + L('path.h1') + '</h1><p class="muted">' + L('path.meta', { lv: D.levels.length, ls: allLessons.length, d: totalDone() }) + '</p></div>' +
      '<div class="wrap" style="padding-bottom:64px"><div class="grid levels">' + D.levels.map(levelCard).join('') + '</div></div>';
    afterRender(); setTitle(L('title.path'));
  }

  /* Liên kết giới thiệu mở tài khoản – hiển thị ở cuối mỗi cấp độ */
  var BROKER_URL = 'https://client.ebcaccount.com/signup?linkCode=S7732138-a02';
  function brokerCta() {
    return '<aside class="broker-cta" aria-labelledby="bkH"><h2 id="bkH">' + L('bk.h') + '</h2><p>' + L('bk.p') + '</p>' +
      '<p><a class="btn btn-primary" href="' + BROKER_URL + '" target="_blank" rel="noopener noreferrer sponsored nofollow" aria-label="' + esc(L('bk.aria')) + '">' + L('bk.btn') + ' ' + ic('arrow') + '</a></p>' +
      '<p class="bk-note">' + L('bk.risk') + ' <a href="#/bai/1-7">' + L('bk.lesson') + '</a></p></aside>';
  }

  function lessonRow(l, i) {
    return '<li><a class="lesson-item' + (done[l.id] ? ' done' : '') + '" href="#/bai/' + l.id + '"><span class="n">' + (done[l.id] ? ic('check') : (i + 1)) + '</span><span class="t">' + esc(l.title) + '</span><span class="m">' + L('min', { n: l.min }) + '</span></a></li>';
  }
  function level(id) {
    var lv = D.levels.filter(function (x) { return x.id == id; })[0];
    if (!lv) return notFound();
    main.innerHTML = '<div class="narrow page-head"><p class="crumbs"><a href="#/lo-trinh">' + L('crumb.path') + '</a> / ' + L('crumb.level', { n: lv.id }) + '</p>' +
      '<h1>' + esc(lv.title) + '</h1><p class="muted">' + esc(lv.desc) + '</p>' +
      '<p class="muted num">' + L('card.learned', { d: levelDone(lv), n: lv.lessons.length }) + '</p>' +
      (certs[lv.id] || levelDone(lv) === lv.lessons.length
        ? '<a class="btn btn-primary" href="#/chung-nhan/' + lv.id + '">' + ic('check') + ' ' + L('level.cert.view', { n: lv.id }) + '</a>'
        : '<p class="callout tip" style="margin:0"><span>' + ic('info') + '</span><span>' + L('level.cert.hint', { n: lv.lessons.length, id: lv.id, left: lv.lessons.length - levelDone(lv) }) + '</span></p>') +
      '</div>' +
      '<div class="narrow" style="padding-bottom:64px"><ol class="lesson-list">' + lv.lessons.map(lessonRow).join('') + '</ol>' + brokerCta() +
      '<div class="pager">' + (lv.id > 1 ? '<a href="#/cap/' + (lv.id - 1) + '"><small>' + L('level.prev') + '</small>' + esc(D.levels[lv.id - 2].title) + '</a>' : '<span></span>') +
      (D.levels[lv.id] ? '<a class="next" href="#/cap/' + (lv.id + 1) + '"><small>' + L('level.next') + '</small>' + esc(D.levels[lv.id].title) + '</a>' : '') + '</div></div>';
    afterRender(); setTitle(L('title.level', { n: lv.id, t: lv.title }));
  }

  function lesson(id) {
    var l = findLesson(id);
    if (!l) return notFound();
    var lv = l.level, idx = allLessons.indexOf(l), prev = allLessons[idx - 1], next = allLessons[idx + 1];
    var side = '<aside class="side" aria-label="' + esc(L('side.aria', { n: lv.id })) + '"><h2>' + esc(L('side.h', { n: lv.id, title: lv.title })) + '</h2><ol>' +
      lv.lessons.map(function (x) { return '<li><a href="#/bai/' + x.id + '" class="' + (done[x.id] ? 'done' : '') + '"' + (x.id === l.id ? ' aria-current="page"' : '') + '><span class="check">' + (done[x.id] ? ic('check') : '') + '</span>' + esc(x.title) + '</a></li>'; }).join('') + '</ol></aside>';
    var quiz = '';
    if (l.quiz && l.quiz.length) {
      quiz = '<section class="quiz" aria-labelledby="quiz-h"><h2 id="quiz-h" style="font-size:1.2rem">' + L('quiz.h') + '</h2><form id="quizForm" novalidate>' +
        l.quiz.map(function (q, qi) {
          return '<fieldset class="q"><legend>' + (qi + 1) + '. ' + esc(q.q) + '</legend>' + q.o.map(function (o, oi) {
            return '<label class="opt"><input type="radio" name="q' + qi + '" value="' + oi + '"><span>' + esc(o) + '</span></label>';
          }).join('') + '<div class="why" id="why' + qi + '" aria-live="polite"></div></fieldset>';
        }).join('') + '<button class="btn btn-ghost" type="submit">' + L('quiz.check') + '</button> <span id="quizRes" role="status" style="margin-left:8px;font-weight:600"></span></form></section>';
    }
    main.innerHTML = '<div class="wrap lesson-layout">' + side + '<article>' +
      '<p class="crumbs"><a href="#/lo-trinh">' + L('crumb.path') + '</a> / <a href="#/cap/' + lv.id + '">' + L('crumb.level', { n: lv.id }) + '</a> / ' + L('crumb.lesson', { id: l.id }) + '</p>' +
      '<h1 style="font-size:clamp(1.7rem,4vw,2.4rem)">' + esc(l.title) + '</h1>' +
      '<p class="muted" style="display:flex;gap:8px;align-items:center">' + ic('clock') + L('min.read', { n: l.min }) + '</p>' +
      '<div class="prose">' + l.body.replace(/\[\[mt5:(\w+)\]\]/g, function (_, k) { return window.MT5 ? window.MT5.fig(k) : ''; }).replace('[[sessions]]', '<div class="sess-card sess-live" data-kind="w" style="margin:0 0 1.4em">' + sessWidget() + '</div>').replace('[[calendar]]', calEmbed()) +
      '<div class="takeaways"><h2>' + L('take.h') + '</h2><ul>' + l.key.map(function (k) { return '<li>' + k + '</li>'; }).join('') + '</ul></div></div>' +
      quiz +
      '<div class="lesson-actions"><button class="btn btn-primary" id="doneBtn" type="button" aria-pressed="' + (!!done[l.id]) + '">' + (done[l.id] ? ic('check') + ' ' + L('done.done') : L('done.mark')) + '</button></div>' +
      (lv.lessons[lv.lessons.length - 1] === l ? brokerCta() : '') +
      '<nav class="pager" aria-label="' + esc(L('pager.aria')) + '">' + (prev ? '<a href="#/bai/' + prev.id + '"><small>' + L('pager.prev') + '</small>' + esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="next" href="#/bai/' + next.id + '"><small>' + L('pager.next') + '</small>' + esc(next.title) + '</a>' : '') + '</nav></article></div>';

    var btn = $('#doneBtn');
    btn.addEventListener('click', function () {
      if (done[l.id]) delete done[l.id]; else done[l.id] = 1;
      saveDone();
      if (done[l.id]) {
        grantCert(lv);
        if (certs[lv.id] && !$('#certBanner')) {
          var cb = document.createElement('div');
          cb.id = 'certBanner'; cb.className = 'callout tip'; cb.setAttribute('role', 'status');
          cb.innerHTML = '<span>' + ic('check') + '</span><div><b class="title">' + L('banner.t', { n: lv.id }) + '</b><p style="margin:0">' + L('banner.p') + ' <a href="#/chung-nhan/' + lv.id + '">' + L('banner.a') + '</a></p></div>';
          btn.parentNode.parentNode.insertBefore(cb, btn.parentNode);
        }
      }
      btn.innerHTML = done[l.id] ? ic('check') + ' ' + L('done.done') : L('done.mark');
      btn.setAttribute('aria-pressed', String(!!done[l.id]));
      var a = $('.side a[aria-current="page"]');
      if (a) { a.classList.toggle('done', !!done[l.id]); $('.check', a).innerHTML = done[l.id] ? ic('check') : ''; }
    });
    var f = $('#quizForm');
    if (f) f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = 0, answered = 0;
      l.quiz.forEach(function (q, qi) {
        var sel = f.querySelector('input[name="q' + qi + '"]:checked');
        var labels = f.querySelectorAll('input[name="q' + qi + '"]');
        labels.forEach(function (inp) { inp.parentNode.classList.remove('ok', 'bad'); });
        var why = $('#why' + qi);
        if (!sel) { why.textContent = L('quiz.none'); return; }
        answered++;
        var v = +sel.value;
        if (v === q.a) { ok++; sel.parentNode.classList.add('ok'); why.textContent = L('quiz.ok') + q.w; }
        else { sel.parentNode.classList.add('bad'); labels[q.a].parentNode.classList.add('ok'); why.textContent = L('quiz.bad') + q.w; }
      });
      var res = $('#quizRes');
      res.textContent = answered < l.quiz.length ? L('quiz.all') : L('quiz.res', { ok: ok, n: l.quiz.length }) + (ok === l.quiz.length ? L('quiz.great') : '');
      if (ok === l.quiz.length && !done[l.id]) { btn.click(); }
    });
    bindCalEmbed();
    afterRender(); setTitle(l.title);
  }

  /* ---------- chứng nhận ---------- */
  function hash6(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36).toUpperCase().padStart(6, '0').slice(-6); }
  function certSvg(name, lv, iso) {
    var d = iso.split('-'), shown = name.trim() || L('svg.ph'), code = 'FA-C' + lv.id + '-' + hash6(shown + '|' + lv.id + '|' + iso);
    var nameSize = shown.length > 28 ? 34 : shown.length > 20 ? 42 : 52, hasName = !!name.trim();
    var serif = "font-family=\"'Times New Roman', Times, 'Noto Serif', serif\"";
    var sans = "font-family=\"'Be Vietnam Pro', 'Segoe UI', Arial, sans-serif\"";
    var dateTxt = L('svg.date', { d: parseInt(d[2], 10), m: parseInt(d[1], 10), y: d[0], mn: I.months(parseInt(d[1], 10)) });
    var titleSize = I.lang === 'en' ? 44 : 50, discSize = 13;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" role="img" aria-label="' + esc(L('svg.aria', { n: lv.id, name: shown })) + '">' +
      '<rect width="1000" height="700" fill="#fffdf6"/><rect x="24" y="24" width="952" height="652" fill="none" stroke="#b58a2e" stroke-width="6"/><rect x="40" y="40" width="920" height="620" fill="none" stroke="#b58a2e" stroke-width="1.5"/>' +
      [[60, 60], [940, 60], [60, 640], [940, 640]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="9" fill="#b58a2e"/>'; }).join('') +
      '<text x="500" y="112" text-anchor="middle" ' + sans + ' font-size="18" font-weight="700" letter-spacing="5" fill="#166534">FOREX ACADEMY VN</text>' +
      '<text x="500" y="178" text-anchor="middle" ' + serif + ' font-size="' + titleSize + '" font-weight="700" fill="#1f2937">' + esc(L('svg.title')) + '</text>' +
      '<line x1="330" x2="670" y1="204" y2="204" stroke="#b58a2e" stroke-width="2"/>' +
      '<text x="500" y="256" text-anchor="middle" ' + sans + ' font-size="20" fill="#4b5563">' + esc(L('svg.certify')) + '</text>' +
      '<text x="500" y="332" text-anchor="middle" ' + serif + ' font-size="' + nameSize + '" font-style="italic" font-weight="700" fill="' + (hasName ? '#111827' : '#9ca3af') + '">' + esc(shown) + '</text>' +
      '<line x1="220" x2="780" y1="352" y2="352" stroke="#9ca3af" stroke-width="1.2"/>' +
      '<text x="500" y="402" text-anchor="middle" ' + sans + ' font-size="20" fill="#4b5563">' + esc(L('svg.done', { n: lv.lessons.length })) + '</text>' +
      '<text x="500" y="460" text-anchor="middle" ' + serif + ' font-size="40" font-weight="700" fill="#166534">' + esc(L('svg.level', { n: lv.id, title: lv.title })) + '</text>' +
      '<text x="500" y="510" text-anchor="middle" ' + sans + ' font-size="18" fill="#4b5563">' + esc(dateTxt) + '</text>' +
      '<g transform="translate(150,548)"><circle r="50" fill="#166534"/><circle r="42" fill="none" stroke="#fde68a" stroke-width="2"/><path d="M-18 2l12 12 24-26" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>' +
      '<line x1="660" x2="860" y1="575" y2="575" stroke="#6b7280" stroke-width="1.2"/>' +
      '<text x="760" y="597" text-anchor="middle" ' + sans + ' font-size="15" fill="#374151">Forex Academy VN</text>' +
      '<text x="420" y="580" text-anchor="middle" ' + sans + ' font-size="15" fill="#4b5563">' + esc(L('svg.code', { c: code })) + '</text>' +
      '<text x="500" y="640" text-anchor="middle" ' + sans + ' font-size="' + discSize + '" fill="#6b7280">' + esc(L('svg.disc')) + '</text></svg>';
  }
  function certDate(iso) { var p = iso.split('-'); return L('cert.date', { d: p[2], m: p[1], y: p[0] }); }
  function certificates() {
    D.levels.forEach(grantCert);
    var got = D.levels.filter(function (lv) { return certs[lv.id]; }).length;
    function card(lv) {
      var d = levelDone(lv), n = lv.lessons.length, pct = Math.round(d / n * 100);
      if (certs[lv.id]) {
        return '<article class="card cert-card"><a class="cert-thumb" href="#/chung-nhan/' + lv.id + '" aria-label="' + esc(L('cert.view.aria', { n: lv.id })) + '">' + certSvg(getName(), lv, certs[lv.id]) + '</a>' +
          '<div><span class="tag">' + L('card.level', { n: lv.id }) + '</span><h3 style="margin:6px 0 2px">' + esc(lv.title) + '</h3>' +
          '<p class="muted num" style="margin:0">' + certDate(certs[lv.id]) + '</p></div>' +
          '<a class="btn btn-primary" href="#/chung-nhan/' + lv.id + '">' + L('cert.btn') + '</a></article>';
      }
      return '<article class="card cert-card locked"><div class="cert-lock">' + ic('shield') + '<span>' + L('cert.locked') + '</span></div>' +
        '<div><span class="tag">' + L('card.level', { n: lv.id }) + '</span><h3 style="margin:6px 0 2px">' + esc(lv.title) + '</h3>' +
        '<p class="muted num" style="margin:0">' + L('card.learned', { d: d, n: n }) + '</p></div>' +
        '<div class="progress" role="progressbar" aria-label="' + esc(L('card.prog', { n: lv.id })) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div>' +
        '<a class="btn btn-ghost" href="#/cap/' + lv.id + '">' + L('cert.continue', { n: lv.id }) + '</a></article>';
    }
    main.innerHTML = '<div class="wrap page-head"><h1>' + L('cert.h1') + '</h1><p class="muted">' + L('cert.sub', { got: got, n: D.levels.length }) + '</p>' +
      '<div class="field" style="max-width:420px"><label for="certName2">' + L('cert.name.label') + '</label><input id="certName2" maxlength="40" autocomplete="name" value="' + esc(getName()) + '" placeholder="' + esc(L('cert.name.ph')) + '"></div></div>' +
      '<div class="wrap" style="padding-bottom:64px"><div class="grid levels" id="certGrid">' + D.levels.map(card).join('') + '</div></div>';
    $('#certName2').addEventListener('input', function () {
      setName(this.value);
      document.querySelectorAll('#certGrid .cert-card:not(.locked)').forEach(function (el, i) {
        var lvs = D.levels.filter(function (l) { return certs[l.id]; })[i];
        if (lvs) el.querySelector('.cert-thumb').innerHTML = certSvg(getName(), lvs, certs[lvs.id]);
      });
    });
    afterRender(); setTitle(L('title.certs'));
  }
  function certificate(id) {
    var lv = D.levels.filter(function (x) { return x.id == id; })[0];
    if (!lv) return notFound();
    grantCert(lv);
    if (!certs[lv.id]) {
      main.innerHTML = '<div class="narrow page-head" style="padding-bottom:80px"><h1>' + L('cert.no.h') + '</h1><p class="muted">' + L('cert.no.p', { n: lv.lessons.length, id: lv.id, d: levelDone(lv) }) + '</p><p><a class="btn btn-primary" href="#/cap/' + lv.id + '">' + L('cert.continue', { n: lv.id }) + '</a></p></div>';
      afterRender(); setTitle(L('crumb.cert')); return;
    }
    var iso = certs[lv.id];
    main.innerHTML = '<div class="wrap page-head cert-ui"><p class="crumbs"><a href="#/lo-trinh">' + L('crumb.path') + '</a> / <a href="#/cap/' + lv.id + '">' + L('crumb.level', { n: lv.id }) + '</a> / ' + L('crumb.cert') + '</p><h1>' + L('cert.cong', { n: lv.id }) + '</h1>' +
      '<p class="muted">' + L('cert.hint') + '</p></div>' +
      '<div class="wrap" style="padding-bottom:24px"><div class="cert-ui field" style="max-width:420px"><label for="certName">' + L('cert.name.l2') + '</label><input id="certName" maxlength="40" autocomplete="name" value="' + esc(getName()) + '" placeholder="' + esc(L('cert.name.ph')) + '"></div>' +
      '<div class="cert-wrap" id="certBox">' + certSvg(getName(), lv, iso) + '</div>' +
      '<div class="cert-ui cta-row"><button class="btn btn-primary" id="certPng" type="button">' + L('cert.png') + '</button><button class="btn btn-ghost" id="certPrint" type="button">' + L('cert.print') + '</button>' +
      (D.levels[lv.id] ? '<a class="btn btn-ghost" href="#/cap/' + (lv.id + 1) + '">' + L('cert.next', { n: lv.id + 1 }) + '</a>' : '') + '</div><p class="cert-ui muted" id="certMsg" role="status"></p></div>' +
      '<div style="height:48px"></div>';
    var inp = $('#certName'), box = $('#certBox');
    inp.addEventListener('input', function () { setName(inp.value); box.innerHTML = certSvg(inp.value, lv, iso); });
    $('#certPrint').addEventListener('click', function () { window.print(); });
    $('#certPng').addEventListener('click', function () {
      var msg = $('#certMsg');
      try {
        var svg = box.querySelector('svg'), data = new XMLSerializer().serializeToString(svg), img = new Image();
        img.onload = function () {
          var c = document.createElement('canvas'); c.width = 2000; c.height = 1400;
          c.getContext('2d').drawImage(img, 0, 0, 2000, 1400);
          c.toBlob(function (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = L('cert.file', { n: lv.id }) + '.png'; document.body.appendChild(a); a.click(); a.remove(); msg.textContent = L('cert.png.ok'); }, 'image/png');
        };
        img.onerror = function () { msg.textContent = L('cert.png.fail'); };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data);
      } catch (e) { msg.textContent = L('cert.png.fail'); }
    });
    afterRender(); setTitle(L('title.cert', { n: lv.id }));
  }

  /* ---------- tools ---------- */
  function num(v) { var n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : NaN; }
  function fmt(n, d) { return n.toLocaleString(I.locale, { minimumFractionDigits: d || 0, maximumFractionDigits: d == null ? 2 : d }); }
  function field(id, label, val, hint, type) {
    return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" inputmode="decimal" type="' + (type || 'text') + '" value="' + val + '"' + (hint ? ' aria-describedby="' + id + 'h"' : '') + '>' + (hint ? '<small id="' + id + 'h">' + hint + '</small>' : '') + '</div>';
  }
  function tools() {
    main.innerHTML = '<div class="wrap page-head"><h1>' + L('tools.h1') + '</h1><p class="muted">' + L('tools.sub') + '</p></div>' +
      '<div class="wrap grid tools" style="padding-bottom:64px">' +

      '<section class="card" aria-labelledby="t1"><h2 id="t1" style="font-size:1.25rem;margin:0">' + L('tools.lot.h') + '</h2>' +
      field('p-bal', L('tools.bal'), 1000) + field('p-risk', L('tools.risk'), 1, L('tools.risk.h')) + field('p-sl', L('tools.sl'), 25) +
      '<div class="field"><label for="p-pair">' + L('tools.pair') + '</label><select id="p-pair"><option value="usd">' + L('tools.pair.usd') + '</option><option value="jpy">' + L('tools.pair.jpy') + '</option></select></div>' +
      '<div class="field" id="p-px-wrap" hidden><label for="p-px">' + L('tools.jpy.px') + '</label><input id="p-px" inputmode="decimal" value="150"></div>' +
      '<div class="result" aria-live="polite" id="p-out"></div></section>' +

      '<section class="card" aria-labelledby="t2"><h2 id="t2" style="font-size:1.25rem;margin:0">' + L('tools.margin.h') + '</h2>' +
      field('m-lot', L('tools.lot'), 0.1) + field('m-px', L('tools.mpx'), 1.08, L('tools.mpx.h')) + field('m-lev', L('tools.lev'), 100) +
      '<div class="result" aria-live="polite" id="m-out"></div></section>' +

      '<section class="card" aria-labelledby="t3"><h2 id="t3" style="font-size:1.25rem;margin:0">' + L('tools.exp.h') + '</h2>' +
      field('e-win', L('tools.win'), 40) + field('e-rr', L('tools.rr'), 2, L('tools.rr.h')) +
      '<div class="result" aria-live="polite" id="e-out"></div></section>' +

      '<section class="card" aria-labelledby="t4"><h2 id="t4" style="font-size:1.25rem;margin:0">' + L('tools.pip.h') + '</h2>' +
      field('v-lot', L('tools.lot'), 1) +
      '<div class="result" aria-live="polite" id="v-out"></div><p class="muted" style="font-size:.875rem;margin:0">' + L('tools.pip.note') + '</p></section></div>';

    function bind(ids, fn) { ids.forEach(function (i) { $('#' + i).addEventListener('input', fn); }); fn(); }
    function out(id, html, bad) { var e = $('#' + id); e.className = 'result' + (bad ? ' bad' : ''); e.innerHTML = html; }
    function row(k, v) { return '<dt>' + k + '</dt><dd>' + v + '</dd>'; }
    bind(['p-bal', 'p-risk', 'p-sl', 'p-pair', 'p-px'], function () {
      $('#p-px-wrap').hidden = $('#p-pair').value !== 'jpy';
      var b = num($('#p-bal').value), r = num($('#p-risk').value), sl = num($('#p-sl').value), jpy = $('#p-pair').value === 'jpy', px = num($('#p-px').value);
      if (!(b > 0 && r > 0 && sl > 0) || (jpy && !(px > 0))) return out('p-out', L('tools.enter'), true);
      var pipVal = jpy ? 1000 / px : 10, risk = b * r / 100, lots = risk / (sl * pipVal);
      out('p-out', '<dl>' + row(L('tools.r.risk'), fmt(risk, 2) + ' USD') + row(L('tools.r.pipval'), fmt(pipVal, 2) + ' USD') + row(L('tools.r.lots'), '<span style="font-size:1.2rem">' + fmt(lots, 2) + ' lot</span>') + '</dl>' + (r > 3 ? '<p class="error">' + L('tools.r.warn') + '</p>' : ''));
    });
    bind(['m-lot', 'm-px', 'm-lev'], function () {
      var l = num($('#m-lot').value), p = num($('#m-px').value), lev = num($('#m-lev').value);
      if (!(l > 0 && p > 0 && lev > 0)) return out('m-out', L('tools.enter'), true);
      var notional = l * 100000 * p;
      out('m-out', '<dl>' + row(L('tools.r.notional'), fmt(notional, 0) + ' USD') + row(L('tools.r.margin'), fmt(notional / lev, 2) + ' USD') + '</dl>');
    });
    bind(['e-win', 'e-rr'], function () {
      var w = num($('#e-win').value) / 100, rr = num($('#e-rr').value);
      if (!(w >= 0 && w <= 1 && rr > 0)) return out('e-out', L('tools.exp.bad'), true);
      var e = w * rr - (1 - w), be = 1 / (1 + rr) * 100;
      out('e-out', '<dl>' + row(L('tools.r.exp'), (e >= 0 ? '+' : '') + fmt(e, 2) + ' R') + row(L('tools.r.be'), fmt(be, 1) + '%') + '</dl><p style="margin:8px 0 0">' + (e > 0 ? L('tools.exp.pos') : L('tools.exp.neg')) + '</p>', e <= 0);
    });
    bind(['v-lot'], function () {
      var l = num($('#v-lot').value);
      if (!(l > 0)) return out('v-out', L('tools.pip.bad'), true);
      out('v-out', '<dl>' + row(L('tools.pip.1'), fmt(l * 10, 2) + ' USD') + row(L('tools.pip.10'), fmt(l * 100, 2) + ' USD') + row(L('tools.pip.50'), fmt(l * 500, 2) + ' USD') + '</dl>');
    });
    afterRender(); setTitle(L('title.tools'));
  }

  /* ---------- glossary ---------- */
  function glossary() {
    var list = D.glossary.slice().sort(function (a, b) { return a.t.localeCompare(b.t, I.locale); });
    main.innerHTML = '<div class="narrow page-head"><h1>' + L('gloss.h1') + '</h1><p class="muted">' + L('gloss.sub', { n: list.length }) + '</p>' +
      '<div class="gloss-controls"><label class="sr" for="gq">' + L('gloss.label') + '</label><input id="gq" type="search" placeholder="' + esc(L('gloss.ph')) + '"></div>' +
      '<p id="gcount" class="muted" role="status"></p><dl class="gloss" id="gl"></dl></div><div style="height:48px"></div>';
    function draw() {
      var q = norm($('#gq').value.trim());
      var r = list.filter(function (g) { return !q || norm(g.t).indexOf(q) > -1 || norm(g.d).indexOf(q) > -1; });
      $('#gl').innerHTML = r.length ? r.map(function (g) { return '<div><dt>' + esc(g.t) + '</dt><dd>' + esc(g.d) + '</dd></div>'; }).join('') : '<p class="muted">' + L('gloss.none') + '</p>';
      $('#gcount').textContent = L('gloss.count', { n: r.length });
    }
    $('#gq').addEventListener('input', draw); draw();
    afterRender(); setTitle(L('title.gloss'));
  }

  /* ---------- search ---------- */
  function search(q) {
    q = q || '';
    var nq = norm(q.trim());
    var res = !nq ? [] : allLessons.filter(function (l) { return norm(l.title).indexOf(nq) > -1 || norm(l.body.replace(/<[^>]+>/g, ' ')).indexOf(nq) > -1; });
    var g = !nq ? [] : D.glossary.filter(function (x) { return norm(x.t).indexOf(nq) > -1; });
    main.innerHTML = '<div class="narrow page-head"><h1 style="font-size:1.8rem">' + L('search.h1', { q: esc(q) }) + '</h1><p class="muted" role="status">' + L('search.meta', { a: res.length, b: g.length }) + '</p></div>' +
      '<div class="narrow" style="padding-bottom:64px">' + (res.length ? '<ol class="lesson-list">' + res.map(function (l) { return '<li><a class="lesson-item" href="#/bai/' + l.id + '"><span class="n">' + l.id + '</span><span class="t">' + esc(l.title) + '</span><span class="m">' + L('card.level', { n: l.level.id }) + '</span></a></li>'; }).join('') + '</ol>' : '<p>' + L('search.none') + '</p>') +
      (g.length ? '<h2 style="margin-top:32px">' + L('search.gloss') + '</h2><dl class="gloss">' + g.map(function (x) { return '<div><dt>' + esc(x.t) + '</dt><dd>' + esc(x.d) + '</dd></div>'; }).join('') + '</dl>' : '') + '</div>';
    afterRender(); setTitle(L('title.search'));
  }
  function notFound() {
    main.innerHTML = '<div class="narrow page-head" style="padding-bottom:80px"><h1>' + L('nf.h') + '</h1><p><a class="btn btn-primary" href="#/">' + L('nf.back') + '</a></p></div>';
    afterRender(); setTitle(L('title.nf'));
  }

  /* ---------- đồng hồ phiên giao dịch (giờ Việt Nam, UTC+7) ---------- */
  var SESS = [
    { n: 'Sydney', s: 4, e: 13, p: 'AUD/USD, NZD/USD, AUD/JPY' },
    { n: 'Tokyo', s: 7, e: 16, p: 'USD/JPY, EUR/JPY, AUD/JPY' },
    { n: 'London', s: 14, e: 23, p: 'EUR/USD, GBP/USD, EUR/GBP' },
    { n: 'New York', s: 19, e: 4, p: 'EUR/USD, USD/CAD, XAU/USD' }
  ];
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function nowVN() {
    var d = new Date(), v = new Date(d.getTime() + d.getTimezoneOffset() * 60000 + 7 * 3600000);
    return { h: v.getHours(), m: v.getMinutes(), s: v.getSeconds(), day: v.getDay() };
  }
  function marketClosed(t) { return (t.day === 6 && t.h >= 5) || t.day === 0 || (t.day === 1 && t.h < 4); }
  function inSess(x, h) { return x.s < x.e ? (h >= x.s && h < x.e) : (h >= x.s || h < x.e); }
  function hh(h) { return pad2(h % 24) + ':00'; }
  function heat() {
    var c = []; for (var h = 0; h < 24; h++) c.push(SESS.filter(function (x) { return inSess(x, h); }).length);
    return c;
  }
  function busyRanges(c) {
    var r = [], st = -1;
    for (var h = 0; h <= 24; h++) {
      var on = h < 24 && c[h] >= 2;
      if (on && st < 0) st = h; else if (!on && st >= 0) { r.push(hh(st) + '–' + hh(h)); st = -1; }
    }
    return r;
  }
  function bar(cells, cur) {
    return '<div class="sbar" aria-hidden="true">' + cells.map(function (v, h) { return '<i class="c ' + v + (h === cur ? ' cur' : '') + '"></i>'; }).join('') + '</div>';
  }
  function sessWidget() {
    var t = nowVN(), closed = marketClosed(t), c = heat(), labels = '';
    for (var h = 0; h < 24; h += 3) labels += '<span style="grid-column:' + (h + 1) + '">' + pad2(h) + '</span>';
    var s = '<div class="sess-head"><span class="sess-lab">' + L('sess.lab') + '</span><span class="sess-clock num" aria-hidden="true">' + pad2(t.h) + ':' + pad2(t.m) + ':' + pad2(t.s) + '</span></div>' +
      '<div class="shours" aria-hidden="true">' + labels + '</div>';
    SESS.forEach(function (x) {
      var open = !closed && inSess(x, t.h), cells = [];
      for (var h = 0; h < 24; h++) cells.push(inSess(x, h) ? 'on' : 'off');
      s += '<div class="srow" role="group" aria-label="' + esc(L('sess.group', { n: x.n, s: hh(x.s), e: hh(x.e), st: L(open ? 'sess.st.open' : 'sess.st.closed') })) + '">' +
        '<div class="srow-top"><span><b>' + x.n + '</b> <span class="muted num">' + hh(x.s) + '–' + hh(x.e) + '</span></span><span class="pill ' + (open ? 'open' : '') + '">' + L(open ? 'sess.open' : 'sess.closed') + '</span></div>' + bar(cells, t.h) + '</div>';
    });
    var hc = c.map(function (n) { return closed ? 'off' : n >= 2 ? 'hi' : n === 1 ? 'lo' : 'off'; });
    s += '<div class="srow" role="group" aria-label="' + esc(L('sess.heat.aria')) + '"><div class="srow-top"><span><b>' + L('sess.heat') + '</b> <span class="muted">' + L('sess.heat.s') + '</span></span></div>' + bar(hc, t.h) + '</div>' +
      '<p class="muted sess-foot">' + L('sess.foot', { r: busyRanges(c).join(', ') }) + '</p>' +
      (closed ? '<div class="callout warn" style="margin:12px 0 0"><span>' + ic('warn') + '</span><div><b class="title">' + L('sess.wk.t') + '</b><p>' + L('sess.wk.p') + '</p></div></div>' : '');
    return s;
  }
  function cdText(min) { var h = Math.floor(min / 60), m = min % 60; return (h ? L('sess.cd.h', { h: h }) : '') + L('sess.cd.m', { m: m }); }
  function sessCards() {
    var t = nowVN(), closed = marketClosed(t);
    return SESS.map(function (x) {
      var open = !closed && inSess(x, t.h), cd;
      if (closed) cd = L('sess.cd.wk');
      else if (open) { var mm = ((x.e - t.h + 24) % 24) * 60 - t.m; cd = L('sess.cd.close', { x: cdText(mm > 0 ? mm : mm + 1440) }); }
      else { var mo = ((x.s - t.h + 24) % 24) * 60 - t.m; cd = L('sess.cd.open', { x: cdText(mo > 0 ? mo : mo + 1440) }); }
      return '<div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="margin:0">' + x.n + '</h3><span class="pill ' + (open ? 'open' : '') + '">' + L(open ? 'sess.open' : 'sess.closed') + '</span></div>' +
        '<p class="num" style="color:var(--text);font-weight:600">' + hh(x.s) + ' – ' + hh(x.e) + ' · ' + cd + '</p><p>' + L('sess.d.' + x.n) + '</p><p><b>' + L('sess.pairs') + '</b> ' + x.p + '</p></div>';
    }).join('');
  }
  function sessionsBlock(withLink) {
    var t = nowVN(), closed = marketClosed(t), any = !closed && SESS.some(function (x) { return inSess(x, t.h); });
    return '<div class="sess-top"><div><span class="sess-state muted">' + L(any ? 'sess.on' : 'sess.off') + '</span><h2 style="margin:0">' + L('sess.h2') + '</h2></div>' +
      (withLink ? '<a class="btn btn-ghost" href="#/dong-ho">' + L('sess.full') + '</a>' : '') + '</div><div class="sess-card sess-live" data-kind="w">' + sessWidget() + '</div>';
  }
  var tick = null, lastMin = -1;
  function startTick() {
    if (tick) clearInterval(tick); tick = null;
    if (!document.querySelector('.sess-live, .sess-cards')) return;
    lastMin = -1;
    tick = setInterval(function () {
      var t = nowVN();
      document.querySelectorAll('.sess-clock').forEach(function (e) { e.textContent = pad2(t.h) + ':' + pad2(t.m) + ':' + pad2(t.s); });
      if (t.m !== lastMin) {
        if (lastMin !== -1) {
          document.querySelectorAll('.sess-live').forEach(function (e) { e.innerHTML = sessWidget(); });
          document.querySelectorAll('.sess-cards').forEach(function (e) { e.innerHTML = sessCards(); });
        }
        lastMin = t.m;
      }
    }, 1000);
  }
  function clock() {
    main.innerHTML = '<div class="wrap page-head"><p class="crumbs">' + L('crumb.tools') + '</p><h1>' + L('clock.h1') + '</h1><p class="muted">' + L('clock.sub') + '</p></div>' +
      '<div class="wrap" style="padding-bottom:24px"><div class="sess-card sess-live" data-kind="w">' + sessWidget() + '</div></div>' +
      '<div class="wrap"><div class="grid levels sess-cards" style="padding-bottom:24px">' + sessCards() + '</div></div>' +
      '<div class="wrap" style="padding-bottom:64px"><div class="callout"><span>' + ic('info') + '</span><div><b class="title">' + L('clock.note.t') + '</b><p>' + L('clock.note.p') + '</p></div></div></div>';
    afterRender(); setTitle(L('title.clock'));
  }

  /* ---------- lịch kinh tế thời gian thực (widget chính thức của Investing.com) ---------- */
  var CAL_COUNTRIES = '25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5';
  function calUrl(view, imp) {
    var q = ['columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous', 'features=datepicker,timezone',
      'countries=' + CAL_COUNTRIES, (imp === 'high' ? 'importance=3&' : '') + 'calType=' + (view === 'week' ? 'week' : 'day'),
      'timeZone=27', 'lang=' + (I.lang === 'en' ? '1' : '52')];
    return 'https://sslecal2.investing.com/?' + q.join('&');
  }
  /* Khối lịch nhúng ngay trong bài học (token [[calendar]]) */
  function calEmbed() {
    return '<section class="cal-embed" aria-label="' + esc(L('cal.frame')) + '"><div class="cal-controls">' +
      '<div class="field"><label for="calView2">' + L('cal.view') + '</label><select id="calView2"><option value="day">' + L('cal.day') + '</option><option value="week">' + L('cal.week') + '</option></select></div>' +
      '<div class="field"><label for="calImp2">' + L('cal.imp') + '</label><select id="calImp2"><option value="all">' + L('cal.all') + '</option><option value="high">' + L('cal.high') + '</option></select></div>' +
      '<a class="btn btn-ghost" href="#/lich-kinh-te">' + L('cal.full') + ' ' + ic('arrow') + '</a></div>' +
      '<div class="cal-frame compact"><iframe id="calFrame2" title="' + esc(L('cal.frame')) + '" loading="lazy" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" src="' + calUrl('day', 'all') + '"></iframe></div>' +
      '<p class="muted cal-credit">' + L('cal.credit') + ' <a href="https://vn.investing.com/" target="_blank" rel="noopener noreferrer nofollow">Investing.com</a>' + L('cal.provided') + '</p></section>';
  }
  function bindCalEmbed() {
    var v = $('#calView2'), im = $('#calImp2'), fr = $('#calFrame2');
    if (!v || !im || !fr) return;
    function upd() { fr.src = calUrl(v.value, im.value); }
    v.addEventListener('change', upd); im.addEventListener('change', upd);
  }

  function calendar() {
    main.innerHTML = '<div class="wrap page-head"><p class="crumbs">' + L('crumb.tools') + '</p><h1>' + L('cal.h1') + '</h1><p class="muted">' + L('cal.sub') + '</p></div>' +
      '<div class="wrap" style="padding-bottom:24px"><div class="cal-controls">' +
      '<div class="field"><label for="calView">' + L('cal.view') + '</label><select id="calView"><option value="day">' + L('cal.day') + '</option><option value="week">' + L('cal.week') + '</option></select></div>' +
      '<div class="field"><label for="calImp">' + L('cal.imp') + '</label><select id="calImp"><option value="all">' + L('cal.all') + '</option><option value="high">' + L('cal.high') + '</option></select></div>' +
      '<a class="btn btn-ghost" href="https://vn.investing.com/economic-calendar" target="_blank" rel="noopener noreferrer nofollow">' + L('cal.open') + ' ' + ic('arrow') + '</a></div>' +
      '<div class="cal-frame"><iframe id="calFrame" title="' + esc(L('cal.frame')) + '" loading="lazy" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" src="' + calUrl('day', 'all') + '"></iframe></div>' +
      '<p class="muted cal-credit">' + L('cal.credit') + ' <a href="https://vn.investing.com/" target="_blank" rel="noopener noreferrer nofollow">Investing.com</a>' + L('cal.provided') + '</p>' +
      '<div class="callout tip"><span>' + ic('info') + '</span><div><b class="title">' + L('cal.note.t') + '</b><p>' + L('cal.tip') + '</p><p style="margin:0">' + L('cal.note.p') + '</p></div></div></div>';
    function upd() { $('#calFrame').src = calUrl($('#calView').value, $('#calImp').value); }
    $('#calView').addEventListener('change', upd); $('#calImp').addEventListener('change', upd);
    afterRender(); setTitle(L('title.cal'));
  }

  /* ---------- router ---------- */
  function setTitle(t) { document.title = t + ' – ' + L('brand'); }
  function afterRender() {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    if (window.MT5) window.MT5.upgradeShots(main);
    startTick();
    var els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .1 });
      els.forEach(function (e) { io.observe(e); });
    } else els.forEach(function (e) { e.classList.add('in'); });
  }
  function route() {
    var h = location.hash.replace(/^#\/?/, ''), p = h.split('/'), r = 'home';
    $('.nav-row').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false');
    switch (p[0]) {
      case '': home(); document.title = L('doc.title'); r = 'home'; break;
      case 'lo-trinh': path(); r = 'path'; break;
      case 'cap': level(p[1]); r = (p[1] == 3) ? 'ind' : 'path'; break;
      case 'bai': lesson(decodeURIComponent(p[1] || '')); r = 'path'; break;
      case 'cong-cu': tools(); r = 'tools'; break;
      case 'dong-ho': clock(); r = 'clock'; break;
      case 'lich-kinh-te': calendar(); r = 'cal'; break;
      case 'chung-nhan': if (p[1]) certificate(p[1]); else certificates(); r = 'certs'; break;
      case 'thuat-ngu': glossary(); r = 'gloss'; break;
      case 'tim': search(decodeURIComponent((p[1] || ''))); r = ''; break;
      default: notFound(); r = '';
    }
    document.querySelectorAll('#nav a').forEach(function (a) { if (a.dataset.route === r) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  }

  /* ---------- chrome ---------- */
  I.apply(document);
  $('#yr').textContent = new Date().getFullYear();
  var langSel = $('#langSel');
  if (langSel) {
    langSel.innerHTML = I.langs.map(function (l) { return '<option value="' + l.id + '"' + (l.id === I.lang ? ' selected' : '') + '>' + l.label + '</option>'; }).join('');
    langSel.addEventListener('change', function () { I.set(langSel.value); });
  }
  $('#themeBtn').addEventListener('click', function () {
    var t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('fx-theme', t); } catch (e) { }
  });
  $('#menuBtn').addEventListener('click', function () {
    var o = $('.nav-row').classList.toggle('open'); this.setAttribute('aria-expanded', String(o));
  });
  $('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); var v = $('#q').value.trim(); if (v) location.hash = '#/tim/' + encodeURIComponent(v);
  });
  window.addEventListener('hashchange', route);
  route();
})();
