# Forex Academy VN

Website tự học Forex miễn phí, ưu tiên tiếng Việt (có bản tiếng Anh). Giao diện là site tĩnh trong `public/`, được phục vụ bằng Node.js + Express.

## Chạy trên máy

```bash
npm install
npm start        # http://localhost:3000
```

Đổi cổng bằng biến môi trường `PORT`.

## Cấu trúc

- `server.js` – máy chủ Express (phục vụ `public/`, `/healthz`, header bảo mật cơ bản)
- `public/index.html`, `public/css`, `public/js` – giao diện và nội dung bài học
- `public/img/mt5/` – ảnh chụp MT5 thật (xem `README.txt` trong thư mục)

Khi sửa `public/js/*` hoặc `public/css/*`, tăng số phiên bản `?v=` tương ứng trong `public/index.html` (và trong `public/js/i18n.js` cho `figs.js` và gói ngôn ngữ) để trình duyệt tải bản mới.

## Triển khai lên Hostinger (Node.js Web Apps)

1. Đưa mã lên GitHub (nhánh `main`).
2. hPanel → **Websites → Add website → Node.js Apps** → **Import Git Repository**, chọn repo `FX-academy`.
3. Cấu hình: Framework **Express.js**, Node 18 trở lên, Build command `npm install`, Start command `npm start`, Entry file `server.js`.
4. Deploy, rồi gắn tên miền. Hostinger tự cấp `PORT`, không cần đặt tay.
5. Mỗi lần push lên `main`, bật **Auto deploy** (webhook) để tự cập nhật.

Nếu gói của bạn là Shared hosting không hỗ trợ Node.js, có thể tải nguyên thư mục `public/` lên `public_html` vì đây là site tĩnh.
