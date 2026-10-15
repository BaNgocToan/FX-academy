/* Bộ vẽ hình minh hoạ (SVG) dùng chung cho các bài học – màu theo giao diện sáng/tối.
   Mọi chữ trong hình được truyền vào từ bài học nên dùng được cho cả tiếng Việt và tiếng Anh. */
(function () {
  'use strict';
  var F = (window.I18N && window.I18N.fig) || {};
  function E(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function T(x, y, lines, cls, anchor) {
    lines = [].concat(lines);
    return lines.map(function (l, i) { return '<text class="' + cls + '" x="' + x + '" y="' + (y + i * 17) + '" text-anchor="' + (anchor || 'middle') + '">' + E(l) + '</text>'; }).join('');
  }
  /* chữ nhiều dòng, canh giữa theo chiều dọc quanh cy */
  function TC(x, cy, lines, cls, anchor) { lines = [].concat(lines); return T(x, cy - (lines.length - 1) * 8.5 + 5, lines, cls, anchor); }
  function box(x, y, w, h, fill, stroke, dash) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="' + (fill || 'var(--surface-2)') + '" stroke="' + (stroke || 'var(--border)') + '" stroke-width="1.5"' + (dash ? ' stroke-dasharray="6 4"' : '') + '/>';
  }
  function arrow(x1, y1, x2, y2, col) {
    var a = Math.atan2(y2 - y1, x2 - x1), hx = 10, hw = 6;
    var bx = x2 - hx * Math.cos(a), by = y2 - hx * Math.sin(a);
    var px = -Math.sin(a) * hw, py = Math.cos(a) * hw;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + bx.toFixed(1) + '" y2="' + by.toFixed(1) + '" stroke="' + col + '" stroke-width="2.5" stroke-linecap="round"/>' +
      '<polygon points="' + x2 + ',' + y2 + ' ' + (bx + px).toFixed(1) + ',' + (by + py).toFixed(1) + ' ' + (bx - px).toFixed(1) + ',' + (by - py).toFixed(1) + '" fill="' + col + '"/>';
  }
  function badge(cx, cy, n) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="11" fill="var(--accent)"/><text x="' + cx + '" y="' + (cy + 4.5) + '" text-anchor="middle" font-size="13" font-weight="800" fill="var(--on-accent)">' + n + '</text>';
  }
  function wrap(vh, aria, inner, cap) {
    return '<figure class="diagram"><svg viewBox="0 0 700 ' + vh + '" role="img" aria-label="' + E(aria) + '">' + inner + '</svg>' + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure>';
  }
  var ACC = 'var(--accent)', DAN = 'var(--danger)', WARN = '#f59e0b';

  /* Các bước nối tiếp: L = {aria, items:[[dòng,...],...], cap} */
  F.steps = function (L) {
    var n = L.items.length, perRow = n <= 4 ? n : Math.ceil(n / 2), rows = Math.ceil(n / perRow), gap = 44;
    var w = (680 - (perRow - 1) * gap) / perRow, h = 92, s = '', vh = 24 + rows * h + (rows - 1) * 40;
    var pos = [];
    for (var i = 0; i < n; i++) {
      var r = Math.floor(i / perRow), c = i % perRow, x = 10 + c * (w + gap), y = 12 + r * (h + 40);
      pos.push({ x: x, y: y });
      s += box(x, y, w, h) + badge(x + 18, y + 18, i + 1) + TC(x + w / 2, y + h / 2 + 8, L.items[i], 'svg-text');
      if (c < perRow - 1 && i < n - 1) s += arrow(x + w + 4, y + h / 2, x + w + gap - 4, y + h / 2, ACC);
    }
    if (rows === 2) {
      var last = pos[perRow - 1], first = pos[perRow], lx = last.x + w / 2, fx = first.x + w / 2, my = last.y + h + 20;
      s += '<path d="M' + lx + ' ' + (last.y + h + 2) + 'V' + my + 'H' + fx + 'V' + (first.y - 10) + '" fill="none" stroke="' + ACC + '" stroke-width="2.5" stroke-linecap="round"/>' +
        '<polygon points="' + fx + ',' + (first.y - 2) + ' ' + (fx - 6) + ',' + (first.y - 12) + ' ' + (fx + 6) + ',' + (first.y - 12) + '" fill="' + ACC + '"/>';
    }
    return wrap(vh, L.aria, s, L.cap);
  };

  /* Sơ đồ trung tâm – các nhánh: L = {aria, center:[...], items:[[...] x4|6], cap} */
  F.hub = function (L) {
    var n = L.items.length, half = n / 2, rowH = 76, vh = 24 + half * rowH, cy = vh / 2, s = '';
    s += box(270, cy - 44, 160, 88, 'var(--accent-soft)', ACC);
    for (var i = 0; i < n; i++) {
      var left = i < half, k = left ? i : i - half, y = 12 + k * rowH, x = left ? 10 : 490, ex = left ? 210 : 490, cx = left ? 270 : 430;
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + ex + '" y2="' + (y + 31) + '" stroke="var(--text-muted)" stroke-width="1.8" stroke-dasharray="4 4"/>';
      s += box(x, y, 200, 62) + TC(x + 100, y + 31, L.items[i], 'svg-text');
    }
    s += TC(350, cy, L.center, 'svg-text');
    return wrap(vh, L.aria, s, L.cap);
  };

  /* Phương trình A + B + C = D: L = {aria, items:[[...] x3], result:[...], cap} */
  F.equation = function (L) {
    var s = '', w = 130, gap = 52, x0 = 12, ops = ['+', '+', '='], all = L.items.concat([L.result]);
    all.forEach(function (it, i) {
      var x = x0 + i * (w + gap), res = i === 3;
      s += box(x, 30, w, 96, res ? 'var(--accent-soft)' : null, res ? ACC : null) + TC(x + w / 2, 78, it, 'svg-text');
      if (i < 3) s += '<text x="' + (x + w + gap / 2) + '" y="88" text-anchor="middle" font-size="30" font-weight="800" fill="var(--text-muted)">' + ops[i] + '</text>';
    });
    return wrap(156, L.aria, s, L.cap);
  };

  /* So sánh dự báo/thực tế: L = {aria, a, b, ta, tb, va, vb, diff, react:[...], cap} */
  F.compare = function (L) {
    var base = 170, s = '<line x1="30" y1="' + base + '" x2="300" y2="' + base + '" stroke="var(--border)" stroke-width="2"/>';
    var ha = L.va * 1.2, hb = L.vb * 1.2;
    s += '<rect x="70" y="' + (base - ha) + '" width="70" height="' + ha + '" rx="6" fill="var(--text-muted)" opacity=".55"/>' +
      '<rect x="180" y="' + (base - hb) + '" width="70" height="' + hb + '" rx="6" fill="' + ACC + '"/>';
    s += T(105, base - ha - 8, L.ta, 'svg-text') + T(215, base - hb - 8, L.tb, 'svg-text');
    s += T(105, base + 20, L.a, 'svg-muted') + T(215, base + 20, L.b, 'svg-muted');
    s += '<rect x="148" y="' + (base - hb - 40) + '" width="64" height="22" rx="11" fill="var(--accent-soft)" stroke="' + ACC + '"/>' + T(180, base - hb - 24, L.diff, 'svg-text');
    s += arrow(300, 110, 350, 110, ACC) + box(360, 50, 330, 120, 'var(--accent-soft)', ACC) + TC(525, 110, L.react, 'svg-text');
    return wrap(206, L.aria, s, L.cap);
  };

  /* Biểu đồ cột ngang: L = {aria, items:[{label,value,text,c:'ok'|'warn'|'bad'}], cap} */
  F.bars = function (L) {
    var s = '', rowH = 52, col = { ok: ACC, warn: WARN, bad: DAN };
    L.items.forEach(function (it, i) {
      var y = 14 + i * rowH, bw = Math.max(it.value, 0) / 100 * 360;
      s += T(10, y + 25, it.label, 'svg-text', 'start');
      s += '<rect x="230" y="' + y + '" width="360" height="34" rx="8" fill="var(--surface-2)"/>' +
        '<rect x="230" y="' + y + '" width="' + bw.toFixed(1) + '" height="34" rx="8" fill="' + (col[it.c] || ACC) + '"/>' +
        T(230 + bw + 10, y + 23, it.text, 'svg-text', 'start');
    });
    return wrap(28 + L.items.length * rowH, L.aria, s, L.cap);
  };

  /* Đường vốn và drawdown: L = {aria, peak, trough, dd, rec, cap} */
  F.drawdown = function (L) {
    var s = '<line x1="20" y1="196" x2="680" y2="196" stroke="var(--border)" stroke-width="2"/>';
    s += '<line x1="200" y1="56" x2="640" y2="56" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="6 5"/>';
    s += '<polyline points="20,170 80,138 140,100 200,56 260,96 320,140 360,172 430,140 500,112 580,84" fill="none" stroke="' + ACC + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>';
    s += '<circle cx="200" cy="56" r="6" fill="' + ACC + '"/><circle cx="360" cy="172" r="6" fill="' + DAN + '"/>';
    s += '<path d="M392 56V172" stroke="' + DAN + '" stroke-width="2.5"/><path d="M384 56h16M384 172h16" stroke="' + DAN + '" stroke-width="2.5"/>';
    s += T(200, 40, L.peak, 'svg-text') + T(360, 192, L.trough, 'svg-text') + T(406, 118, L.dd, 'svg-text', 'start') + T(580, 70, L.rec, 'svg-muted');
    return wrap(212, L.aria, s, L.cap);
  };

  /* Vòng lặp 4 bước: L = {aria, nodes:[[...] x4], center:[...], cap} */
  F.cycle = function (L) {
    var C = [[350, 40], [590, 110], [350, 180], [110, 110]], w = 200, h = 56, s = '';
    s += arrow(448, 52, 540, 88, DAN) + arrow(540, 134, 448, 168, DAN) + arrow(252, 168, 160, 134, DAN) + arrow(160, 88, 252, 52, DAN);
    C.forEach(function (p, i) { s += box(p[0] - w / 2, p[1] - h / 2, w, h, i === 3 ? 'var(--danger-soft)' : null, i === 3 ? DAN : null) + TC(p[0], p[1], L.nodes[i], 'svg-text'); });
    s += TC(350, 110, L.center, 'svg-muted');
    return wrap(222, L.aria, s, L.cap);
  };

  /* Tương quan cặp tiền: L = {aria, head:[c1,c2,c3], base, rows:[{pair, dir:'up'|'down', text}], cap} */
  F.corr = function (L) {
    var s = T(20, 28, L.head[0], 'svg-muted', 'start') + T(300, 28, L.head[1], 'svg-muted') + T(470, 28, L.head[2], 'svg-muted', 'start');
    s += '<line x1="10" y1="40" x2="690" y2="40" stroke="var(--border)"/>';
    L.rows.forEach(function (r, i) {
      var y = 56 + i * 58, up = r.dir === 'up', col = up ? ACC : DAN;
      s += box(10, y, 680, 48) + T(24, y + 29, r.pair, 'svg-text', 'start');
      s += up
        ? '<path d="M300 ' + (y + 38) + 'V' + (y + 10) + 'M290 ' + (y + 20) + 'L300 ' + (y + 10) + 'L310 ' + (y + 20) + '" fill="none" stroke="' + col + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
        : '<path d="M300 ' + (y + 10) + 'V' + (y + 38) + 'M290 ' + (y + 28) + 'L300 ' + (y + 38) + 'L310 ' + (y + 28) + '" fill="none" stroke="' + col + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
      s += T(470, y + 29, r.text, 'svg-text', 'start');
    });
    return wrap(70 + L.rows.length * 58, L.aria, s, L.cap);
  };

  /* Lưới nến mẫu: L = {aria, cols, items:[{k, n, s}], cap}; k = loại nến/mô hình, nến = [mở, cao, thấp, đóng] trên thang 0–100 */
  var DN = [[90, 92, 76, 78], [76, 78, 62, 64]], UP = [[14, 26, 12, 24], [24, 38, 22, 36]];
  var PAT = {
    marubozuUp: [[15, 85, 15, 85]],
    marubozuDown: [[85, 85, 15, 15]],
    spinning: [[45, 75, 25, 55]],
    doji: [[50, 82, 18, 50]],
    hammer: DN.concat([[56, 62, 10, 60]]),
    shooting: UP.concat([[46, 94, 42, 44]]),
    bullEng: [[88, 90, 78, 80], [78, 80, 66, 68], [66, 68, 52, 54], [50, 80, 48, 78]],
    bearEng: [[20, 32, 18, 30], [30, 42, 28, 40], [40, 52, 38, 50], [54, 56, 32, 34]],
    morning: [[90, 92, 78, 80], [76, 78, 46, 48], [40, 44, 34, 38], [42, 76, 40, 72]],
    evening: [[14, 26, 12, 24], [24, 54, 22, 52], [60, 66, 56, 62], [58, 60, 26, 28]],
    inside: [[88, 90, 78, 80], [30, 78, 26, 72], [60, 68, 48, 52]],
    tweezer: [[90, 92, 78, 80], [70, 72, 30, 34], [36, 70, 30, 66]]
  };
  F.patterns = function (L) {
    var cols = L.cols || 3, n = L.items.length, rows = Math.ceil(n / cols), gap = 12, w = (680 - (cols - 1) * gap) / cols, h = 200, s = '';
    L.items.forEach(function (it, i) {
      var r = Math.floor(i / cols), c = i % cols, x = 10 + c * (w + gap), y = 10 + r * (h + gap), cs = PAT[it.k] || [];
      var step = 52, x0 = x + w / 2 - ((cs.length - 1) * step) / 2;
      s += box(x, y, w, h) + '<line class="grid-line" x1="' + (x + 12) + '" x2="' + (x + w - 12) + '" y1="' + (y + 132) + '" y2="' + (y + 132) + '" stroke-dasharray="3 5"/>';
      cs.forEach(function (k, j) {
        var cx = x0 + j * step, Y = function (p) { return y + 126 - p * 1.1; };
        var up = k[3] >= k[0], top = Math.min(Y(k[0]), Y(k[3])), bh = Math.max(Math.abs(Y(k[0]) - Y(k[3])), 2.5), last = j === cs.length - 1;
        var o = last || cs.length === 1 ? '' : ' opacity=".55"';
        s += '<g' + o + '><line class="' + (up ? 'up' : 'down') + '" stroke-width="2.5" x1="' + cx + '" x2="' + cx + '" y1="' + Y(k[1]).toFixed(1) + '" y2="' + Y(k[2]).toFixed(1) + '"/>' +
          '<rect class="' + (up ? 'up' : 'down') + '" x="' + (cx - 12) + '" y="' + top.toFixed(1) + '" width="24" height="' + bh.toFixed(1) + '" rx="2"/></g>';
      });
      s += T(x + w / 2, y + 160, it.n, 'svg-text') + T(x + w / 2, y + 180, it.s, 'svg-muted');
    });
    return wrap(20 + rows * (h + gap) - gap, L.aria, s, L.cap);
  };
})();
