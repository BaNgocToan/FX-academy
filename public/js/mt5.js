/* Hình minh hoạ mô phỏng giao diện MetaTrader 5 trên điện thoại (vẽ bằng SVG, dữ liệu giả lập, KHÔNG phải ảnh chụp thật).
   Muốn dùng ảnh thật: đặt file PNG/JPG vào img/mt5/<khoá>.png (ví dụ img/mt5/order.png) – trang sẽ tự thay thế. */
(function () {
  'use strict';
  var BASE = 1.0800, PIP = 0.0001;
  var UP = '#2ebd85', DN = '#f6465d', TXT = '#e5e7eb', MUT = '#8b95a7', GRID = '#1b2230', ACC = '#38bdf8';

  function rng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; var t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function px(p) { return (BASE + p * PIP).toFixed(5); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* ---------- dữ liệu nến giả lập (đơn vị: pip) ---------- */
  function build(sp) {
    var r = rng(sp.seed || 7), cur = sp.start || 0, path = [], cs = [], prev = cur;
    sp.segs.forEach(function (s) { for (var k = 1; k <= s[1]; k++) path.push(cur + (s[0] - cur) * k / s[1]); cur = s[0]; });
    path.forEach(function (p) {
      var c = p + (r() - .5) * 2 * (sp.noise || 3), o = prev;
      cs.push({ o: o, c: c, h: Math.max(o, c) + r() * (sp.wick || 4), l: Math.min(o, c) - r() * (sp.wick || 4) });
      prev = c;
    });
    (sp.edit || []).forEach(function (e) {
      var k = cs[e.i]; k.o = e.o; k.c = e.c; k.h = e.h; k.l = e.l;
      var n = cs[e.i + 1]; if (n) { n.o = k.c; n.h = Math.max(n.h, n.o, n.c); n.l = Math.min(n.l, n.o, n.c); }
    });
    return cs;
  }
  var SC = {
    up: { seed: 11, segs: [[30, 8], [18, 5], [55, 8], [40, 5], [85, 9], [65, 5], [110, 8]], noise: 4, wick: 5 },
    range: { seed: 5, segs: [[22, 6], [-22, 10], [20, 8], [-20, 10], [22, 8], [-4, 6]], noise: 3, wick: 4 },
    pip: { seed: 3, segs: [[0, 4], [6, 4], [2, 3], [18, 5], [34, 6], [45, 6]], noise: 2, wick: 3 },
    candles: { seed: 9, segs: [[-25, 14], [-10, 6], [-30, 8], [-10, 6], [10, 6]], noise: 3, wick: 3,
      edit: [{ i: 13, o: -21, h: -19, l: -42, c: -22 }, { i: 26, o: -27, h: -17, l: -37, c: -27.4 }, { i: 36, o: -8, h: 16, l: -10, c: 14 }] },
    swing: { seed: 21, segs: [[60, 14], [20, 12], [75, 14]], noise: 4, wick: 4 },
    squeeze: { seed: 4, segs: [[0, 6], [6, 4], [-5, 4], [3, 6], [-2, 4], [1, 4], [45, 6], [70, 6], [75, 5]], noise: 1.5, wick: 2 },
    fib: { seed: 13, segs: [[100, 18], [40, 9], [78, 9]], noise: 4, wick: 4 },
    pin: { seed: 17, segs: [[10, 6], [0, 5], [12, 5], [2, 5], [40, 8], [12, 8], [60, 6], [90, 8]], noise: 2.5, wick: 3,
      edit: [{ i: 36, o: 15, h: 18, l: 1, c: 17 }] },
    dtop: { seed: 8, segs: [[60, 10], [28, 6], [61, 6], [26, 6], [-8, 8]], noise: 3, wick: 3 },
    brk: { seed: 14, segs: [[10, 5], [-8, 6], [10, 6], [-8, 6], [10, 5], [-8, 5], [45, 5], [14, 4], [70, 6]], noise: 2, wick: 3 },
    sweep: { seed: 6, segs: [[10, 6], [-10, 6], [8, 6], [-10, 6], [9, 5], [-9, 5], [-22, 3], [28, 6], [60, 8]], noise: 2, wick: 3 }
  };

  /* ---------- chỉ báo ---------- */
  function ema(a, n) { var k = 2 / (n + 1), o = [], p = a[0]; a.forEach(function (v, i) { p = i ? v * k + p * (1 - k) : v; o.push(p); }); return o; }
  function sma(a, n) { return a.map(function (_, i) { if (i < n - 1) return null; var s = 0; for (var j = i - n + 1; j <= i; j++) s += a[j]; return s / n; }); }
  function rsi(c, n) {
    var o = c.map(function () { return null; }), g = 0, l = 0, i;
    for (i = 1; i <= n && i < c.length; i++) { var d = c[i] - c[i - 1]; g += Math.max(d, 0); l += Math.max(-d, 0); }
    g /= n; l /= n; o[n] = l === 0 ? 100 : 100 - 100 / (1 + g / l);
    for (i = n + 1; i < c.length; i++) { var d2 = c[i] - c[i - 1]; g = (g * (n - 1) + Math.max(d2, 0)) / n; l = (l * (n - 1) + Math.max(-d2, 0)) / n; o[i] = l === 0 ? 100 : 100 - 100 / (1 + g / l); }
    return o;
  }
  function bb(c, n, k) {
    var m = sma(c, n); return m.map(function (v, i) { if (v == null) return null; var s = 0; for (var j = i - n + 1; j <= i; j++) s += Math.pow(c[j] - v, 2); var sd = Math.sqrt(s / n); return [v - k * sd, v, v + k * sd]; });
  }
  function atr(cs, n) {
    var tr = cs.map(function (k, i) { var pc = i ? cs[i - 1].c : k.o; return Math.max(k.h - k.l, Math.abs(k.h - pc), Math.abs(k.l - pc)); });
    var o = tr.map(function () { return null; }), s = 0, i;
    for (i = 0; i < n; i++) s += tr[i]; o[n - 1] = s / n;
    for (i = n; i < tr.length; i++) o[i] = (o[i - 1] * (n - 1) + tr[i]) / n;
    return o;
  }
  function stoch(cs, n) {
    var raw = cs.map(function (k, i) { if (i < n - 1) return null; var hh = -1e9, ll = 1e9; for (var j = i - n + 1; j <= i; j++) { hh = Math.max(hh, cs[j].h); ll = Math.min(ll, cs[j].l); } return (k.c - ll) / (hh - ll) * 100; });
    function sm(a, m) { return a.map(function (_, i) { if (i < m - 1 || a[i] == null) return null; var s = 0; for (var j = i - m + 1; j <= i; j++) { if (a[j] == null) return null; s += a[j]; } return s / m; }); }
    var K = sm(raw, 3); return [K, sm(K, 3)];
  }

  /* ---------- khung điện thoại ---------- */
  var NAV = [['Quotes', 'M5 8l3-3 3 3M8 5v8M14 12l-3 3-3-3M11 15V7'], ['Chart', 'M7 6v2M7 15v2M15 8v2M15 17v2M5 8h4v7H5zM13 10h4v7h-4z'], ['Trade', 'M4 16l4-5 3 3 6-8'], ['History', 'M11 6v5l3 2M11 3a8 8 0 100 16 8 8 0 000-16z'], ['Settings', 'M11 8a3 3 0 100 6 3 3 0 000-6zM11 3v2M11 17v2M3 11h2M17 11h2']];
  function frame(inner, active, label) {
    var s = '<svg class="mt5-phone" viewBox="0 0 300 560" role="img" aria-label="' + esc(label) + '">' +
      '<rect x="2" y="2" width="296" height="556" rx="32" fill="#0a0c10" stroke="#3b4251" stroke-width="3"/>' +
      '<rect x="10" y="10" width="280" height="540" rx="24" fill="#0d1117"/>' +
      '<text x="28" y="31" fill="' + TXT + '" font-size="10" font-weight="600">9:41</text>' +
      '<rect x="248" y="23" width="20" height="9" rx="2.5" fill="none" stroke="' + TXT + '"/><rect x="250" y="25" width="13" height="5" rx="1" fill="' + TXT + '"/>' +
      inner + '<line x1="10" x2="290" y1="500" y2="500" stroke="#1f2937"/>';
    NAV.forEach(function (n, k) {
      var cx = 10 + 280 / 5 * (k + .5), col = k === active ? ACC : MUT;
      s += '<g transform="translate(' + (cx - 11) + ',505)" fill="none" stroke="' + col + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="' + n[1] + '"/></g>' +
        '<text x="' + cx + '" y="540" fill="' + col + '" font-size="8" text-anchor="middle">' + n[0] + '</text>';
    });
    return s + '</svg>';
  }
  function badge(x, y, n) { return '<g><circle cx="' + x + '" cy="' + y + '" r="9" fill="#fbbf24" stroke="#0d1117" stroke-width="1.5"/><text x="' + x + '" y="' + (y + 3.6) + '" text-anchor="middle" font-size="10.5" font-weight="800" fill="#111">' + n + '</text></g>'; }
  function toolbar(title, tf) {
    var s = '<text x="20" y="54" fill="' + TXT + '" font-size="12" font-weight="700">' + title + '</text><text x="20" y="66" fill="' + MUT + '" font-size="8">' + (tf || 'Euro vs US Dollar') + '</text>';
    s += '<circle cx="168" cy="52" r="10" fill="none" stroke="#4b5563"/><text x="168" y="56" text-anchor="middle" fill="' + TXT + '" font-size="12" font-style="italic" font-family="Georgia,serif">f</text>';
    s += '<circle cx="196" cy="52" r="10" fill="none" stroke="#4b5563"/><path d="M191 57l1-4 7-7 3 3-7 7z" fill="none" stroke="' + TXT + '" stroke-width="1.3"/>';
    s += '<circle cx="224" cy="52" r="10" fill="none" stroke="#4b5563"/><path d="M224 47v5l3 2" fill="none" stroke="' + TXT + '" stroke-width="1.3"/>';
    s += '<circle cx="252" cy="52" r="10" fill="none" stroke="#4b5563"/><path d="M252 47v10M247 52h10" stroke="' + TXT + '" stroke-width="1.3"/>';
    return s;
  }
  var TB = { f: [168, 52], pen: [196, 52], tf: [224, 52], plus: [252, 52] };

  /* ---------- biểu đồ ---------- */
  function resolve(cs, b) {
    var i = b.i;
    if (b.r) { i = b.r[0]; for (var k = b.r[0]; k <= Math.min(b.r[1], cs.length - 1); k++) { if (b.s === 'h' ? cs[k].h > cs[i].h : cs[k].l < cs[i].l) i = k; } }
    return i;
  }
  function chart(cfg) {
    var cs = build(SC[cfg.scn]), n = cs.length, x0 = 16, x1 = 246, step = (x1 - x0) / n, bw = Math.max(step * .62, 2);
    var top = 76, bot = cfg.panel ? 372 : 494, closes = cs.map(function (k) { return k.c; });
    var lo = 1e9, hi = -1e9;
    cs.forEach(function (k) { lo = Math.min(lo, k.l); hi = Math.max(hi, k.h); });
    var bbv = cfg.bb ? bb(closes, 20, 2) : null;
    if (bbv) bbv.forEach(function (v) { if (v) { lo = Math.min(lo, v[0]); hi = Math.max(hi, v[2]); } });
    var trade = null;
    if (cfg.trade) {
      var en = cs[cfg.trade.i].c, sl = cfg.trade.sl === 'swing' ? Math.min.apply(null, cs.slice(cfg.trade.i - 6, cfg.trade.i + 1).map(function (k) { return k.l; })) - 2 : cfg.trade.sl;
      trade = { en: en, sl: sl, tp: en + (en - sl) * 2 }; hi = Math.max(hi, trade.tp); lo = Math.min(lo, trade.sl);
    }
    var pad = (hi - lo) * .08; lo -= pad; hi += pad;
    function Y(p) { return bot - (p - lo) / (hi - lo) * (bot - top); }
    function X(i) { return x0 + (i + .5) * step; }
    var s = toolbar(cfg.symbol || 'EURUSD', cfg.tfLabel || (cfg.tf ? 'Euro vs US Dollar, ' + cfg.tf : null));
    // lưới + trục giá
    for (var t = 0; t <= 4; t++) { var pp = lo + (hi - lo) * t / 4, yy = Y(pp); s += '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + yy + '" y2="' + yy + '" stroke="' + GRID + '"/><text x="249" y="' + (yy + 3) + '" fill="' + MUT + '" font-size="8">' + px(pp) + '</text>'; }
    (cfg.zone || []).forEach(function (z) { s += '<rect x="' + x0 + '" y="' + Y(z.p2) + '" width="' + (x1 - x0) + '" height="' + (Y(z.p1) - Y(z.p2)) + '" fill="' + (z.col || '#38bdf8') + '" opacity=".18"/><text x="' + (x0 + 4) + '" y="' + (Y(z.p2) + 10) + '" fill="' + (z.col || '#38bdf8') + '" font-size="8.5" font-weight="700">' + esc(z.label || '') + '</text>'; });
    if (cfg.fib) {
      var ia = resolve(cs, cfg.fib.a), ib = resolve(cs, cfg.fib.b), fl = cs[ia].l, fh = cs[ib].h;
      [0, .382, .5, .618, 1].forEach(function (lv) { var p = fh - (fh - fl) * lv, yy = Y(p); s += '<line x1="' + X(ib) + '" x2="' + x1 + '" y1="' + yy + '" y2="' + yy + '" stroke="#eab308" stroke-dasharray="3 3" opacity=".9"/><text x="' + (X(ib) + 3) + '" y="' + (yy - 2) + '" fill="#eab308" font-size="8">' + (lv * 100).toFixed(1) + '</text>'; });
      s += '<line x1="' + X(ia) + '" y1="' + Y(fl) + '" x2="' + X(ib) + '" y2="' + Y(fh) + '" stroke="#eab308" stroke-width="1.2"/>';
    }
    if (bbv) {
      [0, 1, 2].forEach(function (b) { var d = ''; bbv.forEach(function (v, i) { if (v) d += (d ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v[b]).toFixed(1); }); s += '<path d="' + d + '" fill="none" stroke="' + (b === 1 ? '#f59e0b' : '#a78bfa') + '" stroke-width="1" ' + (b === 1 ? 'stroke-dasharray="2 2"' : '') + '/>'; });
    }
    cs.forEach(function (k, i) {
      var col = k.c >= k.o ? UP : DN, x = X(i), yt = Y(Math.max(k.o, k.c)), yb = Y(Math.min(k.o, k.c));
      s += '<line x1="' + x + '" x2="' + x + '" y1="' + Y(k.h) + '" y2="' + Y(k.l) + '" stroke="' + col + '"/><rect x="' + (x - bw / 2) + '" y="' + yt + '" width="' + bw + '" height="' + Math.max(yb - yt, 1) + '" fill="' + col + '"/>';
    });
    var cols = ['#fbbf24', '#60a5fa', '#c084fc'];
    (cfg.ema || []).forEach(function (n2, k) { var e = ema(closes, n2), d = ''; e.forEach(function (v, i) { d += (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1); }); s += '<path d="' + d + '" fill="none" stroke="' + cols[k] + '" stroke-width="1.5"/>'; });
    (cfg.hl || []).forEach(function (h) { var yy = Y(h.p); s += '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + yy + '" y2="' + yy + '" stroke="' + (h.col || '#cbd5e1') + '" stroke-dasharray="' + (h.dash || '5 3') + '"/><text x="' + (x0 + 3) + '" y="' + (yy - 3) + '" fill="' + (h.col || '#cbd5e1') + '" font-size="8.5" font-weight="700">' + esc(h.label || '') + '</text>'; });
    (cfg.tl || []).forEach(function (l) {
      var a = resolve(cs, l.a), b = resolve(cs, l.b), pa = cs[a][l.a.s], pb = cs[b][l.b.s], m = (pb - pa) / (b - a);
      s += '<line x1="' + X(a) + '" y1="' + Y(pa) + '" x2="' + x1 + '" y2="' + Y(pa + m * (n - 1 - a)) + '" stroke="' + (l.col || ACC) + '" stroke-width="1.4" stroke-dasharray="6 3"/>';
    });
    if (trade) {
      var xe = X(cfg.trade.i);
      s += '<rect x="' + xe + '" y="' + Y(trade.tp) + '" width="' + (x1 - xe) + '" height="' + (Y(trade.en) - Y(trade.tp)) + '" fill="' + UP + '" opacity=".22"/>' +
        '<rect x="' + xe + '" y="' + Y(trade.en) + '" width="' + (x1 - xe) + '" height="' + (Y(trade.sl) - Y(trade.en)) + '" fill="' + DN + '" opacity=".25"/>' +
        '<line x1="' + xe + '" x2="' + x1 + '" y1="' + Y(trade.en) + '" y2="' + Y(trade.en) + '" stroke="#e5e7eb" stroke-dasharray="3 2"/>' +
        '<text x="' + (xe + 4) + '" y="' + (Y(trade.tp) + 11) + '" fill="' + UP + '" font-size="8.5" font-weight="700">TP  ' + px(trade.tp) + '</text>' +
        '<text x="' + (xe + 4) + '" y="' + (Y(trade.en) - 3) + '" fill="#e5e7eb" font-size="8.5" font-weight="700">BUY  ' + px(trade.en) + '</text>' +
        '<text x="' + (xe + 4) + '" y="' + (Y(trade.sl) - 3) + '" fill="' + DN + '" font-size="8.5" font-weight="700">SL  ' + px(trade.sl) + '</text>';
      s += badge(x1 - 14, Y(trade.en) - 14, 1) + badge(x1 - 14, Y(trade.sl) - 12, 2) + badge(x1 - 14, Y(trade.tp) + 14, 3);
    }
    var last = cs[n - 1], ly = Y(last.c);
    s += '<rect x="246" y="' + (ly - 6) + '" width="46" height="12" rx="2" fill="' + (last.c >= last.o ? UP : DN) + '"/><text x="249" y="' + (ly + 3) + '" fill="#06130d" font-size="8" font-weight="700">' + px(last.c) + '</text>';

    // ---- panel chỉ báo ----
    if (cfg.panel) {
      var pt = 384, pb2 = 494, ph = pb2 - pt, ttl = '', pc = '';
      s += '<rect x="' + x0 + '" y="' + pt + '" width="' + (x1 - x0) + '" height="' + ph + '" fill="none" stroke="' + GRID + '"/>';
      var line = function (arr, mn, mx, col, w) { var d = ''; arr.forEach(function (v, i) { if (v != null) d += (d ? 'L' : 'M') + X(i).toFixed(1) + ' ' + (pb2 - (v - mn) / (mx - mn) * ph).toFixed(1); }); return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 1.3) + '"/>'; };
      var lv = function (v, mn, mx, lab) { var yy = pb2 - (v - mn) / (mx - mn) * ph; return '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + yy + '" y2="' + yy + '" stroke="#4b5563" stroke-dasharray="3 3"/><text x="249" y="' + (yy + 3) + '" fill="' + MUT + '" font-size="8">' + lab + '</text>'; };
      if (cfg.panel === 'rsi') {
        var R = rsi(closes, 14); ttl = 'RSI(14) ' + R[n - 1].toFixed(2);
        pc = lv(70, 0, 100, '70') + lv(30, 0, 100, '30') + lv(50, 0, 100, '50') + line(R, 0, 100, '#a78bfa');
      } else if (cfg.panel === 'macd') {
        var e12 = ema(closes, 12), e26 = ema(closes, 26), M = e12.map(function (v, i) { return v - e26[i]; }), S = ema(M, 9);
        var mx = Math.max.apply(null, M.concat(S).map(Math.abs)) * 1.15; ttl = 'MACD(12,26,9) ' + M[n - 1].toFixed(2);
        pc = lv(0, -mx, mx, '0');
        M.forEach(function (v, i) { var h = v - S[i], y0 = pb2 - (0 + mx) / (2 * mx) * ph, y1 = pb2 - (h + mx) / (2 * mx) * ph; pc += '<rect x="' + (X(i) - bw / 2) + '" y="' + Math.min(y0, y1) + '" width="' + bw + '" height="' + Math.max(Math.abs(y1 - y0), .5) + '" fill="' + (h >= 0 ? UP : DN) + '" opacity=".55"/>'; });
        pc += line(M, -mx, mx, '#38bdf8') + line(S, -mx, mx, '#f59e0b');
        cfg._M = M; cfg._S = S;
      } else if (cfg.panel === 'atr') {
        var A = atr(cs, 14), av = A.filter(function (v) { return v != null; }), amx = Math.max.apply(null, av) * 1.2, amn = Math.min.apply(null, av) * .8;
        ttl = 'ATR(14) ' + A[n - 1].toFixed(1) + ' pip'; pc = line(A, amn, amx, '#38bdf8', 1.6);
      } else if (cfg.panel === 'stoch') {
        var SK = stoch(cs, 14); ttl = 'Stochastic(14,3,3) ' + SK[0][n - 1].toFixed(1) + ' ' + SK[1][n - 1].toFixed(1);
        pc = lv(80, 0, 100, '80') + lv(20, 0, 100, '20') + line(SK[0], 0, 100, '#38bdf8') + line(SK[1], 0, 100, '#f59e0b');
      }
      s += '<text x="' + (x0 + 4) + '" y="' + (pt + 10) + '" fill="' + MUT + '" font-size="8.5">' + ttl + '</text>' + pc;
    }
    if (cfg.ema) s += '<text x="20" y="80" fill="' + MUT + '" font-size="8" opacity="0"></text>';
    // ---- badge ----
    (cfg.badges || []).forEach(function (b) {
      var i = b.cross ? crossIdx(cfg, b) : resolve(cs, b), side = b.s || 'l', yv, dy = 0;
      if (b.p != null) yv = Y(b.p); else { yv = Y(side === 'c' ? cs[i].c : cs[i][side]); dy = side === 'h' ? -13 : side === 'l' ? 13 : 0; }
      s += badge(Math.min(Math.max(X(i), x0 + 9), x1 - 9), Math.min(Math.max(yv + dy, top + 8), bot - 8), b.n);
    });
    return s;
  }
  function crossIdx(cfg, b) {
    var M = cfg._M, S = cfg._S, out = [];
    for (var i = 27; i < M.length; i++) { var up = M[i - 1] <= S[i - 1] && M[i] > S[i], dn = M[i - 1] >= S[i - 1] && M[i] < S[i]; if ((b.cross === 'up' && up) || (b.cross === 'down' && dn)) out.push(i); }
    return out[b.k || 0] || M.length - 1;
  }
  function chartSvg(cfg, active) {
    var c2 = {}; for (var k in cfg) c2[k] = cfg[k];
    var inner = chart(c2);
    return frame(inner, 1, cfg.alt || 'Biểu đồ MT5 mô phỏng');
  }

  /* ---------- màn hình khác ---------- */
  function rows(list, y0, h) { return list.map(function (r, i) { return '<line x1="14" x2="286" y1="' + (y0 + i * h) + '" y2="' + (y0 + i * h) + '" stroke="#1f2937"/>'; }).join(''); }
  function quotes() {
    var d = [['EURUSD', '1.08042', '1.08051', 9], ['GBPUSD', '1.26418', '1.26429', 11], ['USDJPY', '150.212', '150.221', 9], ['AUDUSD', '0.65230', '0.65241', 11], ['XAUUSD', '2345.12', '2345.42', 30]];
    var s = '<text x="20" y="58" fill="' + TXT + '" font-size="15" font-weight="700">Quotes</text>' + rows(d, 80, 56);
    d.forEach(function (r, i) {
      var y = 80 + i * 56;
      s += '<text x="20" y="' + (y + 24) + '" fill="' + TXT + '" font-size="12" font-weight="700">' + r[0] + '</text><text x="20" y="' + (y + 40) + '" fill="' + MUT + '" font-size="8.5">Spread: ' + r[3] + ' point</text>' +
        '<text x="168" y="' + (y + 26) + '" text-anchor="end" fill="' + DN + '" font-size="14" font-weight="600">' + r[1] + '</text><text x="268" y="' + (y + 26) + '" text-anchor="end" fill="#60a5fa" font-size="14" font-weight="600">' + r[2] + '</text>';
    });
    s += '<text x="168" y="76" text-anchor="end" fill="' + MUT + '" font-size="8">Bid</text><text x="268" y="76" text-anchor="end" fill="' + MUT + '" font-size="8">Ask</text>';
    s += badge(20, 98, 1) + badge(58, 126, 2) + badge(218, 126, 3) + badge(116, 62, 4);
    return frame(s, 0, 'Màn hình Quotes (Báo giá) của MT5 mô phỏng');
  }
  function order(o) {
    var s = '<text x="20" y="58" fill="' + TXT + '" font-size="15" font-weight="700">EURUSD</text><text x="20" y="72" fill="' + MUT + '" font-size="8.5">Euro vs US Dollar</text>';
    s += '<text x="268" y="58" text-anchor="end" fill="' + ACC + '" font-size="10">New Order</text>' + rows([1, 2, 3, 4, 5], 90, 46);
    var lab = function (t, y, v, vc) { return '<text x="20" y="' + (y + 28) + '" fill="' + MUT + '" font-size="10.5">' + t + '</text><text x="268" y="' + (y + 28) + '" text-anchor="end" fill="' + (vc || TXT) + '" font-size="12" font-weight="600">' + v + '</text>'; };
    s += lab('Type', 90, 'Market Execution') + lab('Volume', 136, '') + lab('Stop Loss', 182, o.sl) + lab('Take Profit', 228, o.tp) + lab('Comment', 274, '—', MUT);
    s += '<rect x="166" y="150" width="26" height="24" rx="4" fill="#1f2937"/><text x="179" y="167" text-anchor="middle" fill="' + TXT + '" font-size="15">−</text>' +
      '<text x="222" y="167" text-anchor="middle" fill="' + TXT + '" font-size="13" font-weight="700">' + o.vol + '</text>' +
      '<rect x="244" y="150" width="26" height="24" rx="4" fill="#1f2937"/><text x="257" y="168" text-anchor="middle" fill="' + TXT + '" font-size="15">+</text>';
    s += '<text x="82" y="418" text-anchor="middle" fill="' + DN + '" font-size="12" font-weight="700">1.08042</text><text x="218" y="418" text-anchor="middle" fill="#60a5fa" font-size="12" font-weight="700">1.08051</text>' +
      '<rect x="22" y="428" width="120" height="44" rx="8" fill="' + DN + '"/><text x="82" y="455" text-anchor="middle" fill="#fff" font-size="12" font-weight="800">SELL</text>' +
      '<rect x="158" y="428" width="120" height="44" rx="8" fill="#2563eb"/><text x="218" y="455" text-anchor="middle" fill="#fff" font-size="12" font-weight="800">BUY</text>';
    s += badge(136, 150, 1) + badge(24, 202, 2) + badge(24, 248, 3) + badge(150, 428, 4);
    return frame(s, 2, 'Màn hình đặt lệnh mới của MT5 mô phỏng');
  }
  function tfmenu() {
    var s = toolbar('EURUSD', 'Euro vs US Dollar, H4');
    s += '<rect x="30" y="170" width="240" height="190" rx="14" fill="#161b26" stroke="#2b3447"/><text x="46" y="196" fill="' + TXT + '" font-size="12" font-weight="700">Timeframe</text>';
    var tf = ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1', 'MN'];
    tf.forEach(function (t, i) {
      var cx = 46 + (i % 3) * 74, cy = 214 + Math.floor(i / 3) * 46, sel = t === 'H4';
      s += '<rect x="' + cx + '" y="' + cy + '" width="62" height="34" rx="8" fill="' + (sel ? '#2563eb' : '#1f2937') + '"/><text x="' + (cx + 31) + '" y="' + (cy + 22) + '" text-anchor="middle" fill="' + (sel ? '#fff' : TXT) + '" font-size="12" font-weight="700">' + t + '</text>';
    });
    s += badge(TB.tf[0], TB.tf[1] + 22, 1) + badge(46 + 2 * 74 - 10, 214 + 46, 2) + badge(46 + 6 * 0 + 8, 214 + 92 + 8, 3);
    return frame(s, 1, 'Menu chọn khung thời gian trên MT5 mô phỏng');
  }
  function listScreen(title, groups, active, badges) {
    var s = '<text x="20" y="58" fill="' + TXT + '" font-size="14" font-weight="700">' + title + '</text>', y = 84;
    groups.forEach(function (g) {
      s += '<text x="20" y="' + y + '" fill="' + ACC + '" font-size="10" font-weight="700">' + g[0] + '</text>'; y += 8;
      g[1].forEach(function (it) { s += '<line x1="14" x2="286" y1="' + y + '" y2="' + y + '" stroke="#1f2937"/><text x="24" y="' + (y + 24) + '" fill="' + TXT + '" font-size="11.5">' + it + '</text><path d="M268 ' + (y + 14) + 'l5 5-5 5" fill="none" stroke="' + MUT + '" stroke-width="1.5"/>'; y += 36; });
      y += 18;
    });
    (badges || []).forEach(function (b) { s += badge(b[0], b[1], b[2]); });
    return s;
  }
  function addIndPhones(types) {
    var p1 = frame(chart({ scn: 'up', ema: [], badges: [] }) + badge(TB.f[0], TB.f[1] + 20, 1), 1, 'Bước 1: chạm biểu tượng f trên biểu đồ');
    var p2 = frame(listScreen('Indicators', [['Main chart', ['Add indicator']], ['Indicator window', ['Add indicator']]], 1, [[236, 110, 2]]), 1, 'Bước 2: chọn Add indicator');
    var p3 = frame(listScreen('Add indicator', [['Trend', ['Moving Average', 'Bollinger Bands']], ['Oscillators', ['MACD', 'Relative Strength Index', 'Stochastic Oscillator']]], 1, [[236, 110, 3], [236, 244, 4]]), 1, 'Bước 3: chọn chỉ báo trong nhóm');
    return [p1, p2, p3];
  }
  function account() {
    var s = '<text x="20" y="58" fill="' + TXT + '" font-size="15" font-weight="700">Trade</text>';
    var kv = [['Balance', '1 000.00'], ['Equity', '1 022.00'], ['Margin', '86.40'], ['Free margin', '935.60'], ['Margin level (%)', '1 182.87']];
    kv.forEach(function (r, i) { var y = 86 + i * 30; s += '<line x1="14" x2="286" y1="' + y + '" y2="' + y + '" stroke="#1f2937"/><text x="20" y="' + (y + 20) + '" fill="' + MUT + '" font-size="10.5">' + r[0] + '</text><text x="268" y="' + (y + 20) + '" text-anchor="end" fill="' + TXT + '" font-size="12" font-weight="600">' + r[1] + '</text>'; });
    s += '<text x="20" y="262" fill="' + ACC + '" font-size="10" font-weight="700">Positions</text><line x1="14" x2="286" y1="270" y2="270" stroke="#1f2937"/>' +
      '<text x="20" y="292" fill="' + TXT + '" font-size="12" font-weight="700">EURUSD, buy 0.08</text><text x="20" y="308" fill="' + MUT + '" font-size="9">1.08000 → 1.08275</text><text x="268" y="300" text-anchor="end" fill="' + UP + '" font-size="14" font-weight="700">22.00</text>';
    s += badge(260, 100, 1) + badge(260, 130, 2) + badge(260, 220, 3) + badge(206, 296, 4);
    return frame(s, 2, 'Tab Trade của MT5 mô phỏng với số dư và ký quỹ');
  }
  function history() {
    var d = [['EURUSD', 'buy 0.08', '+20.00', UP], ['GBPUSD', 'sell 0.08', '-20.00', DN], ['EURUSD', 'buy 0.08', '+40.00', UP], ['GBPUSD', 'buy 0.08', '-20.00', DN], ['EURUSD', 'sell 0.08', '+40.00', UP]];
    var s = '<text x="20" y="58" fill="' + TXT + '" font-size="15" font-weight="700">History</text><text x="268" y="58" text-anchor="end" fill="' + ACC + '" font-size="10">Last month</text>';
    s += '<text x="20" y="92" fill="' + MUT + '" font-size="10.5">Profit</text><text x="268" y="92" text-anchor="end" fill="' + UP + '" font-size="14" font-weight="700">60.00</text>' +
      '<text x="20" y="114" fill="' + MUT + '" font-size="10.5">Deals</text><text x="268" y="114" text-anchor="end" fill="' + TXT + '" font-size="12" font-weight="600">5</text>' + rows([1, 2, 3, 4, 5, 6], 124, 52);
    d.forEach(function (r, i) { var y = 124 + i * 52; s += '<text x="20" y="' + (y + 24) + '" fill="' + TXT + '" font-size="12" font-weight="700">' + r[0] + '</text><text x="20" y="' + (y + 40) + '" fill="' + MUT + '" font-size="9">' + r[1] + '</text><text x="268" y="' + (y + 30) + '" text-anchor="end" fill="' + r[3] + '" font-size="13" font-weight="700">' + r[2] + '</text>'; });
    s += badge(168, 88, 1) + badge(190, 180, 2) + badge(190, 232, 3);
    return frame(s, 3, 'Tab History của MT5 mô phỏng');
  }

  /* ---------- danh mục hình ---------- */
  var FIG = {
    quotes: { t: 'Màn hình Quotes (Báo giá) trên MT5', svg: quotes, lg: ['Tên cặp tiền – chạm vào để mở biểu đồ hoặc đặt lệnh.', 'Giá Bid (giá bạn bán) – màu đỏ.', 'Giá Ask (giá bạn mua) – màu xanh dương, luôn cao hơn Bid.', 'Cột Bid/Ask. Chênh lệch giữa hai giá chính là spread (MT5 thường hiển thị bằng point; 10 point = 1 pip).'] },
    pip: { t: 'Đo biến động 40 pip trên biểu đồ', cfg: { scn: 'pip', hl: [{ p: 5, label: 'Giá vào 1.08050', col: '#fbbf24' }, { p: 45, label: 'Giá hiện tại 1.08450', col: '#60a5fa' }], badges: [{ n: 1, i: 22, p: 5 }, { n: 2, i: 40, p: 45 }], alt: 'Biểu đồ minh hoạ khoảng cách 40 pip' }, lg: ['Giá vào lệnh 1,08050.', 'Giá hiện tại 1,08450 → chênh lệch 0,0040 = 40 pip.', 'Với 0,1 lot, 40 pip tương ứng khoảng 40 USD lãi (hoặc lỗ nếu đi ngược).'] },
    account: { t: 'Tab Trade: số dư, ký quỹ và vị thế đang mở', svg: account, lg: ['Balance: số dư chưa tính lệnh đang mở.', 'Equity: vốn thực = Balance + lãi/lỗ đang chạy (1 000 + 22 = 1 022).', 'Margin level = Equity ÷ Margin × 100%. Nếu xuống quá thấp, sàn có thể cảnh báo margin call hoặc stop out.', 'Vị thế mở: EURUSD mua 0,08 lot đang lãi 22 USD (27,5 pip × 0,8 USD/pip). Ký quỹ 86,40 USD = 8 640 ÷ 100 (đòn bẩy 1:100).'] },
    order: { t: 'Màn hình đặt lệnh mới', svg: function () { return order({ vol: '0.10', sl: '1.07750', tp: '1.08500' }); }, lg: ['Volume: khối lượng lệnh (lot). Chạm + / − để điều chỉnh.', 'Stop Loss: giá tự đóng lệnh khi lỗ. Luôn đặt SL.', 'Take Profit: giá tự đóng lệnh khi đạt mục tiêu lãi.', 'SELL (bán) hoặc BUY (mua) theo giá thị trường (Market Execution).'] },
    order2: { t: 'Đặt lệnh với khối lượng đã tính (0,08 lot, SL 25 pip)', svg: function () { return order({ vol: '0.08', sl: '1.07750', tp: '1.08500' }); }, lg: ['Volume 0,08 lot lấy từ công thức: (2 000 × 1%) ÷ (25 pip × 10 USD) = 0,08.', 'SL 1,07750 cách điểm vào 1,08000 đúng 25 pip.', 'TP 1,08500 cách 50 pip → R:R = 1:2.', 'Kiểm tra lại các số trước khi nhấn BUY/SELL.'] },
    candleRead: { t: 'Đọc nến trên biểu đồ điện thoại', cfg: { scn: 'candles', tf: 'H1', badges: [{ n: 1, i: 13, s: 'l' }, { n: 2, i: 26, s: 'l' }, { n: 3, i: 36, s: 'h' }], alt: 'Biểu đồ nến với nến pin bar, doji và nến thân dài' }, lg: ['Nến có bóng dưới rất dài (dạng pin bar/hammer): giá bị đẩy xuống rồi bị từ chối.', 'Nến thân rất nhỏ, hai bóng (dạng Doji): thị trường lưỡng lự.', 'Nến tăng thân dài: phe mua áp đảo trong khung thời gian đó.'] },
    tfmenu: { t: 'Đổi khung thời gian trên MT5', svg: tfmenu, lg: ['Chạm biểu tượng đồng hồ trên thanh công cụ của biểu đồ.', 'Chọn khung thời gian muốn xem (ví dụ H4).', 'Dãy khung nhỏ (M1–M30) dành cho vào lệnh; H4–D1 dùng xem xu hướng lớn.'] },
    trendUp: { t: 'Xu hướng tăng: đỉnh và đáy cùng cao dần', cfg: { scn: 'up', tf: 'H1', tl: [{ a: { r: [8, 14], s: 'l' }, b: { r: [35, 40], s: 'l' } }], badges: [{ n: 1, r: [17, 22], s: 'h' }, { n: 2, r: [21, 27], s: 'l' }, { n: 3, r: [31, 36], s: 'h' }], alt: 'Biểu đồ xu hướng tăng có đường xu hướng' }, lg: ['Đỉnh sau cao hơn đỉnh trước (HH).', 'Đáy sau cao hơn đáy trước (HL).', 'Đỉnh mới tiếp tục cao hơn. Đường nét đứt xanh dương nối các đáy là đường xu hướng.'] },
    sr: { t: 'Vùng hỗ trợ và kháng cự', cfg: { scn: 'range', tf: 'H1', zone: [{ p1: 17, p2: 28, col: '#f6465d', label: 'Kháng cự' }, { p1: -28, p2: -17, col: '#2ebd85', label: 'Hỗ trợ' }], badges: [{ n: 1, r: [3, 8], s: 'h' }, { n: 2, r: [10, 16], s: 'l' }, { n: 3, r: [36, 41], s: 'h' }], alt: 'Biểu đồ có vùng hỗ trợ và kháng cự' }, lg: ['Giá lần đầu chạm vùng kháng cự rồi quay xuống.', 'Giá chạm vùng hỗ trợ và bật lên.', 'Giá quay lại chạm kháng cự lần nữa. Vẽ vùng (hình chữ nhật) thay vì một đường duy nhất.'] },
    addInd: { t: 'Cách thêm chỉ báo trên MT5 điện thoại', phones: addIndPhones, lg: ['Mở biểu đồ, chạm biểu tượng f (Indicators) trên thanh công cụ.', 'Chọn Add indicator ở Main chart (chỉ báo vẽ trên giá, như MA) hoặc Indicator window (cửa sổ riêng, như RSI, MACD).', 'Chọn nhóm (Trend, Oscillators…) rồi chọn chỉ báo, chỉnh thông số và bấm Done.', 'Ví dụ: RSI nằm ở nhóm Oscillators.'], note: 'Tên và vị trí nút có thể khác nhau chút ít giữa Android/iOS và phiên bản MT5.' },
    ma: { t: 'EMA 20 (vàng) và EMA 50 (xanh) trên biểu đồ', cfg: { scn: 'up', tf: 'H1', ema: [20, 50], badges: [{ n: 1, r: [8, 14], s: 'l' }, { n: 2, r: [21, 27], s: 'l' }], alt: 'Biểu đồ nến kèm hai đường EMA' }, lg: ['Giá hồi về gần các đường EMA rồi tiếp tục tăng – EMA đóng vai trò hỗ trợ động.', 'EMA dốc lên và giá nằm trên EMA là xu hướng tăng; EMA 20 trên EMA 50.'] },
    rsi: { t: 'RSI(14) ở khung dưới biểu đồ', cfg: { scn: 'up', tf: 'H1', panel: 'rsi', badges: [{ n: 1, r: [27, 34], s: 'h' }, { n: 2, r: [40, 47], s: 'h' }], alt: 'Biểu đồ giá kèm chỉ báo RSI' }, lg: ['Đợt tăng mạnh: RSI vượt 70 (quá mua) nhưng giá vẫn tiếp tục lên.', 'RSI hạ nhiệt trong nhịp hồi (chưa chạm vùng quá bán) rồi tăng lại – không nên bán chỉ vì RSI > 70.'] },
    macd: { t: 'MACD(12,26,9) ở khung dưới biểu đồ', cfg: { scn: 'swing', tf: 'H1', panel: 'macd', badges: [{ n: 1, cross: 'down', k: 0, s: 'h' }, { n: 2, cross: 'up', k: 0, s: 'l' }], alt: 'Biểu đồ giá kèm chỉ báo MACD' }, lg: ['MACD cắt xuống đường Signal: động lượng giảm dần.', 'MACD cắt lên đường Signal: động lượng tăng trở lại. Histogram là phần chênh lệch giữa hai đường.'], note: 'MACD là chỉ báo trễ: tín hiệu cắt thường đến sau khi giá đã di chuyển một đoạn.' },
    bb: { t: 'Bollinger Bands: thắt chặt rồi bung ra', cfg: { scn: 'squeeze', tf: 'H1', bb: true, badges: [{ n: 1, r: [14, 22], s: 'h' }, { n: 2, r: [30, 40], s: 'l' }], alt: 'Biểu đồ Bollinger Bands với giai đoạn thắt chặt và bùng nổ' }, lg: ['Dải co hẹp (squeeze): biến động thấp, thị trường tích luỹ.', 'Dải mở rộng khi giá bùng nổ; giá bám dải trên (band walk) trong xu hướng mạnh.'] },
    stoch: { t: 'Stochastic ở khung dưới biểu đồ', cfg: { scn: 'range', tf: 'H1', panel: 'stoch', badges: [{ n: 1, r: [14, 17], s: 'l' }, { n: 2, r: [22, 25], s: 'h' }], alt: 'Biểu đồ giá kèm chỉ báo Stochastic' }, lg: ['Stochastic xuống dưới 20 (quá bán) khi giá chạm hỗ trợ trong thị trường đi ngang.', 'Stochastic lên trên 80 (quá mua) khi giá chạm kháng cự.'] },
    atr: { t: 'ATR(14) – đo mức biến động', cfg: { scn: 'up', tf: 'H1', panel: 'atr', badges: [{ n: 1, r: [26, 34], s: 'h' }], alt: 'Biểu đồ giá kèm chỉ báo ATR' }, lg: ['ATR cho biết biên độ trung bình mỗi nến (đơn vị pip); dùng để đặt SL theo biến động, ví dụ 1,5 × ATR.'] },
    fib: { t: 'Fibonacci thoái lui trên nhịp tăng', cfg: { scn: 'fib', tf: 'H1', fib: { a: { r: [0, 3], s: 'l' }, b: { r: [14, 20], s: 'h' } }, badges: [{ n: 1, r: [14, 20], s: 'h' }, { n: 2, r: [26, 30], s: 'l' }], alt: 'Biểu đồ Fibonacci thoái lui' }, lg: ['Đỉnh của nhịp tăng (mức 0) và đáy của nhịp (mức 100) là hai điểm neo.', 'Giá hồi về vùng 61,8% rồi tăng trở lại.'], note: 'Công cụ vẽ: chạm biểu tượng bút/đối tượng (Objects) → chọn Fibonacci Retracement → kéo từ đáy lên đỉnh.' },
    pin: { t: 'Pin bar tại vùng hỗ trợ', cfg: { scn: 'pin', tf: 'H1', zone: [{ p1: 0, p2: 14, col: '#2ebd85', label: 'Hỗ trợ (kháng cự cũ)' }], badges: [{ n: 1, i: 36, s: 'l' }, { n: 2, r: [44, 50], s: 'h' }], alt: 'Biểu đồ với pin bar tại vùng hỗ trợ' }, lg: ['Pin bar có bóng dưới dài chạm vùng hỗ trợ rồi đóng cửa cao: giá bị từ chối.', 'Sau đó giá tăng tiếp. Vào lệnh sau khi nến pin bar đóng cửa; SL đặt dưới bóng nến.'] },
    doubleTop: { t: 'Mô hình hai đỉnh và đường cổ', cfg: { scn: 'dtop', tf: 'H1', hl: [{ p: 27, label: 'Đường cổ', col: '#fbbf24' }, { p: -6, label: 'Mục tiêu đo biên độ', col: '#60a5fa' }], badges: [{ n: 1, r: [5, 12], s: 'h' }, { n: 2, r: [17, 24], s: 'h' }, { n: 3, r: [26, 31], s: 'l' }], alt: 'Biểu đồ mô hình hai đỉnh' }, lg: ['Đỉnh thứ nhất.', 'Đỉnh thứ hai ngang đỉnh đầu nhưng không vượt qua – phe mua yếu dần.', 'Giá phá xuống dưới đường cổ: xác nhận mô hình. Mục tiêu bằng chiều cao mô hình.'] },
    tradeSetup: { t: 'Lệnh mua theo xu hướng: Entry, SL, TP với R:R 1:2', cfg: { scn: 'up', tf: 'H1', ema: [50], trade: { i: 26, sl: 'swing' }, alt: 'Biểu đồ thiết lập lệnh mua với vùng SL và TP' }, lg: ['Điểm vào: sau nhịp hồi về EMA 50 trong xu hướng tăng.', 'Stop Loss: dưới đáy nhịp hồi (vùng đỏ).', 'Take Profit: cách entry gấp 2 lần khoảng SL (vùng xanh) → R:R = 1:2.'], note: 'Trên MT5, bạn có thể kéo các đường SL/TP trực tiếp trên biểu đồ khi giữ vào lệnh đang mở.' },
    breakout: { t: 'Phá vỡ và retest', cfg: { scn: 'brk', tf: 'H1', hl: [{ p: 12, label: 'Kháng cự', col: '#f6465d' }], badges: [{ n: 1, r: [3, 28], s: 'h' }, { n: 2, r: [33, 37], s: 'h' }, { n: 3, r: [38, 42], s: 'l' }], alt: 'Biểu đồ phá vỡ vùng đi ngang rồi retest' }, lg: ['Giá đi ngang dưới vùng kháng cự nhiều lần.', 'Nến thân dài đóng cửa trên kháng cự: phá vỡ.', 'Giá quay lại kiểm tra vùng cũ (retest) – kháng cự cũ thành hỗ trợ.'] },
    history: { t: 'Tab History dùng để ghi nhật ký giao dịch', svg: history, lg: ['Tổng lợi nhuận trong kỳ (60 USD). Mỗi lệnh rủi ro 20 USD, tức 1R.', 'Lệnh thua: -20 USD = -1R (SL được chạm).', 'Lệnh thắng: +40 USD = +2R. Nên chép kết quả quy ra R vào nhật ký hằng tuần.'] },
    sweep: { t: 'Quét thanh khoản dưới đáy ngang', cfg: { scn: 'sweep', tf: 'M15', hl: [{ p: -10, label: 'Thanh khoản (đáy ngang)', col: '#fbbf24' }], badges: [{ n: 1, r: [34, 38], s: 'l' }, { n: 2, r: [38, 44], s: 'h' }], alt: 'Biểu đồ quét thanh khoản' }, lg: ['Giá chọc xuống dưới các đáy ngang (quét lệnh dừng lỗ) rồi bị từ chối.', 'Nến đảo chiều mạnh đi lên – điểm tham khảo vào lệnh, SL dưới điểm quét.'] }
  };

  function T(k, v) { return window.I18N ? window.I18N.t(k, v) : k; }
  function ovr(key) { var p = window.I18N && window.I18N.pack ? window.I18N.pack() : null; return (p && p.mt5 && p.mt5[key]) || {}; }
  function setAria(svg, label) { return svg.replace(/(<svg class="mt5-phone"[^>]*aria-label=")[^"]*(")/, function (m, a, b) { return a + esc(label) + b; }); }
  function fig(key) {
    var f = FIG[key]; if (!f) return '';
    var o = ovr(key), svgs;
    if (f.phones) svgs = f.phones();
    else if (f.svg) svgs = [f.svg()];
    else {
      var cfg = JSON.parse(JSON.stringify(f.cfg));
      (cfg.hl || []).forEach(function (h, i) { if (o.hl && o.hl[i] != null) h.label = o.hl[i]; });
      (cfg.zone || []).forEach(function (z, i) { if (o.zone && o.zone[i] != null) z.label = o.zone[i]; });
      if (o.alt) cfg.alt = o.alt;
      svgs = [chartSvg(cfg)];
    }
    if (o.alts) svgs = svgs.map(function (s, i) { return o.alts[i] ? setAria(s, o.alts[i]) : s; });
    else if (o.alt && (f.svg || f.phones)) svgs = svgs.map(function (s) { return setAria(s, o.alt); });
    var title = o.t || f.t, lg = o.lg || f.lg, note = o.note != null ? o.note : f.note;
    return '<figure class="mt5" data-shot="' + key + '" data-title="' + esc(title) + '"><div class="mt5-title"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/></svg><strong>' + esc(T('mt5.title')) + ' · ' + esc(title) + '</strong></div>' +
      '<div class="phones">' + svgs.join('') + '</div>' +
      '<figcaption><ol class="mt5-legend">' + lg.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ol>' +
      '<p class="mt5-note">' + esc(T('mt5.note')) + (note ? '. ' + esc(note) : '.') + '</p></figcaption></figure>';
  }
  /* Nếu có ảnh thật tại img/mt5/<khoá>.png thì thay hình mô phỏng */
  function upgradeShots(root) {
    (root || document).querySelectorAll('figure.mt5[data-shot]').forEach(function (fg) {
      var key = fg.dataset.shot, im = new Image();
      im.onload = function () {
        var box = fg.querySelector('.phones'); box.innerHTML = '';
        im.alt = T('mt5.real.alt', { t: fg.dataset.title || key }); im.className = 'mt5-real'; box.appendChild(im);
        var n = fg.querySelector('.mt5-note'); if (n) n.textContent = T('mt5.real');
      };
      im.src = 'img/mt5/' + key + '.png';
    });
  }
  window.MT5 = { fig: fig, upgradeShots: upgradeShots };
})();
