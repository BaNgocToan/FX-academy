'use strict';
/* Máy chủ Node.js (Express) phục vụ Forex Academy VN – site tĩnh nằm trong thư mục public/ */
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  });
  next();
});

app.get('/healthz', (req, res) => res.type('text').send('ok'));

app.use(express.static(PUBLIC, {
  extensions: ['html'],
  setHeaders(res, file) {
    /* HTML luôn kiểm tra lại; JS/CSS/ảnh dùng ?v= để đổi phiên bản nên được cache */
    if (file.endsWith('.html')) res.set('Cache-Control', 'no-cache');
    else res.set('Cache-Control', 'public, max-age=3600');
  }
}));

/* Trang dùng hash router (#/…) nên mọi đường dẫn lạ đều trả về index.html */
app.use((req, res) => res.status(200).sendFile(path.join(PUBLIC, 'index.html')));

app.listen(PORT, () => console.log('Forex Academy VN chạy tại http://localhost:' + PORT));
