# Product App — Quyết Định Kỹ Thuật (Architecture Decision Records)

Tài liệu này ghi lại các quyết định kỹ thuật quan trọng được đưa ra trong quá trình phát triển **product-app**, kèm lý do và hệ quả.

---

## ADR-001: Dùng React state thuần thay vì Zustand / TanStack Query

- **Trạng thái:** Đã chấp thuận
- **Ngày:** 2026-08-15

### Quyết định
Quản lý state bằng `useState` / `useReducer` / React Context thuần, không dùng thư viện state management ngoài (Zustand, Redux, Jotai) và không dùng TanStack Query để fetch dữ liệu.

### Lý do
- Dự án nhỏ, số màn hình ít (Login, Product List, Product Detail, Cart, Register); độ phức tạp của state chưa đủ để biện minh cho thư viện nặng hơn.
- Giảm thiểu phụ thuộc (dependency), giữ bundle size nhỏ.
- Giúp người học / reviewer dễ hiểu luồng dữ liệu hơn.

### Hệ quả
- Nếu ứng dụng mở rộng (thêm nhiều module, nhiều nguồn dữ liệu), cần xem xét đưa vào Zustand hoặc TanStack Query.
- Caching và refetch logic phải tự xử lý thủ công nếu cần.

---

## ADR-002: Dùng mock data thay vì gọi API backend thật

- **Trạng thái:** Đã chấp thuận (tạm thời)
- **Ngày:** 2026-08-15

### Quyết định
Dữ liệu sản phẩm và người dùng được lưu dưới dạng mock (hard-coded JSON / TypeScript objects) trong source code, không gọi tới backend API thật.

### Lý do
- Chưa có backend sẵn sàng trong giai đoạn này.
- Giúp frontend phát triển độc lập, không bị chặn bởi tiến độ backend.
- Dễ kiểm soát dữ liệu trong môi trường dev và demo.

### Hệ quả
- Khi backend sẵn sàng, cần thay thế mock bằng các API call thực tế (fetch / axios) và bổ sung xử lý loading / error state.
- Mock data phải được đặt tập trung (ví dụ: `src/mocks/`) để dễ tìm và thay thế sau này.

---

## ADR-003: Dùng Tailwind CSS cho styling

- **Trạng thái:** Đã chấp thuận
- **Ngày:** 2026-08-15

### Quyết định
Toàn bộ giao diện sử dụng **Tailwind CSS v4** (tích hợp qua `@tailwindcss/vite`), không dùng CSS Modules, Styled Components hay SASS.

### Lý do
- Tailwind cho phép viết style trực tiếp trong JSX, giảm context-switching giữa file `.css` và `.tsx`.
- Nhất quán với hệ thống design token (spacing, color, typography) được cấu hình một lần.
- Cộng đồng lớn, tài liệu đầy đủ, dễ onboard thành viên mới.

### Hệ quả
- Class name trong JSX có thể dài; cần quy ước tổ chức (ví dụ: dùng `cn()` / `clsx` khi kết hợp class động).
- Tránh viết CSS tùy ý ngoài Tailwind trừ khi thực sự cần thiết.

---

## ADR-004: Dùng Vite làm build tool

- **Trạng thái:** Đã chấp thuận
- **Ngày:** 2026-08-15

### Quyết định
Sử dụng **Vite v8** thay vì Create React App (CRA) hoặc Webpack.

### Lý do
- Khởi động dev server gần như tức thì nhờ native ESM.
- HMR (Hot Module Replacement) nhanh hơn CRA nhiều.
- CRA đã không còn được duy trì tích cực.
- Dễ cấu hình qua `vite.config.ts`.

### Hệ quả
- Một số plugin CRA-specific không dùng được; cần tìm plugin tương đương trong hệ sinh thái Vite.

---

## ADR-005: Dùng TypeScript cho toàn bộ source code

- **Trạng thái:** Đã chấp thuận
- **Ngày:** 2026-08-15

### Quyết định
Tất cả file source (component, hook, util, type) đều dùng TypeScript (`.ts` / `.tsx`), không cho phép file `.js` / `.jsx` trong `src/`.

### Lý do
- Type safety giúp phát hiện lỗi sớm tại compile time.
- IDE autocomplete tốt hơn, refactor an toàn hơn.
- Dễ onboard và review code hơn khi contract giữa các module rõ ràng.

### Hệ quả
- Mọi prop, return type, và data shape cần được khai báo tường minh.
- Tránh dùng `any`; ưu tiên `unknown` hoặc type cụ thể.

---

## ADR-006: Dùng React Router v6 cho routing

- **Trạng thái:** Dự kiến (chưa cài đặt tại thời điểm ghi)
- **Ngày:** 2026-08-15

### Quyết định
Sử dụng **React Router v6** để quản lý các route: `/`, `/products/:id`, `/cart`, `/login`, `/register`.

### Lý do
- Standard de-facto cho routing trong ứng dụng React SPA.
- Hỗ trợ nested routes và layout routes, phù hợp với cấu trúc auth guard.
- API `useNavigate`, `useParams`, `Outlet` trực quan, dễ kiểm thử.

### Hệ quả
- Các route được bảo vệ (Cart, ...) cần bọc trong `<PrivateRoute>` / auth guard component.
- Cần cấu hình Vite để redirect tất cả request về `index.html` khi deploy (SPA mode).

---

## ADR-007: Dùng oxlint làm linter

- **Trạng thái:** Đã chấp thuận
- **Ngày:** 2026-08-15

### Quyết định
Sử dụng **oxlint** thay vì ESLint.

### Lý do
- oxlint nhanh hơn ESLint đáng kể (viết bằng Rust).
- Cấu hình đơn giản, phù hợp với dự án nhỏ không cần plugin ecosystem phức tạp.

### Hệ quả
- Một số rule ESLint đặc thù (plugin-based) có thể chưa có sẵn trong oxlint; cần kiểm tra trước khi thêm rule mới.

---

## Ghi Chú

- Mỗi quyết định nên được xem xét lại khi quy mô dự án thay đổi đáng kể.
- Để bổ sung ADR mới, dùng template: **Quyết định → Lý do → Hệ quả**.
