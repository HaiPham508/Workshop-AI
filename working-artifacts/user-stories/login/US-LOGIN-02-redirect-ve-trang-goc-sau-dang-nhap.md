# US-LOGIN-02 — Redirect về trang gốc sau khi đăng nhập

## Story Metadata

| Field | Value |
|---|---|
| Story ID | US-LOGIN-02 |
| Story Name | Redirect về trang gốc sau khi đăng nhập từ protected action |
| Epic | Authentication & Access Control |
| Priority | Must Have |
| Status | Draft |
| Source | docs/knowledge/product-notes.md — Luồng Người Dùng, Trang Login, Trang Product Detail |

---

## User Story Statement

> **As an** unauthenticated user who triggered a protected action,
> **I want to** be redirected to the Login page and returned to my original context after login,
> **So that** I can complete my intended task without having to navigate back manually.

---

## Preconditions

- User chưa đăng nhập (unauthenticated).
- User đang thực hiện một hành động yêu cầu xác thực (Add to Cart, truy cập `/cart`).

---

## Assumptions

| ID | Assumption | Impact nếu sai |
|----|---|---|
| A1 | URL trang gốc hoặc context được lưu tạm trong state/session khi redirect sang /login | Nếu không lưu, user bị mất context sau login |
| A2 | Sau login thành công từ redirect, user quay lại đúng trang trước đó | Cần xác định: quay lại product detail page hay thực hiện lại Add to Cart? |
| A3 | /cart là protected route — unauthenticated user bị redirect sang /login ngay khi truy cập | Nếu sai, cần auth guard riêng ở route level |

---

## Workflow & Behavior Notes

**Main Flow (Add to Cart trigger):**
1. User xem Product Detail, chưa đăng nhập.
2. User click "Thêm vào giỏ hàng".
3. Hệ thống detect user chưa đăng nhập → redirect sang `/login`.
4. User đăng nhập thành công.
5. Hệ thống redirect user về trang Product Detail trước đó (hoặc Home nếu không xác định được).

**Main Flow (Protected route trigger):**
1. User cố truy cập `/cart` khi chưa đăng nhập.
2. Auth guard redirect về `/login`.
3. User đăng nhập thành công → redirect về `/cart`.

**UI Reference:** TBD

---

## Acceptance Criteria

```gherkin
AC1: Redirect sang Login khi click "Thêm vào giỏ hàng" chưa đăng nhập
  Given user đang xem trang Product Detail (/products/:id)
  And user chưa đăng nhập
  When user click nút "Thêm vào giỏ hàng"
  Then user được redirect đến trang /login
  And context trang gốc (product detail URL) được giữ lại để dùng sau khi login

AC2: Redirect sang Login khi truy cập /cart chưa đăng nhập
  Given user chưa đăng nhập
  When user cố truy cập trang /cart (trực tiếp qua URL hoặc link)
  Then user được redirect đến trang /login

AC3: Quay lại trang gốc sau khi đăng nhập thành công
  Given user đã bị redirect sang /login do thực hiện hành động yêu cầu xác thực
  When user đăng nhập thành công
  Then user được redirect về trang trước đó
  And nếu trang gốc không xác định được, user được redirect về trang Home (/)
```

---

## Out of Scope

- Tự động thực hiện lại hành động Add to Cart sau khi redirect về (cần xác nhận Q1)
- Lưu giỏ hàng tạm của user chưa đăng nhập (guest cart)
- Logic xác thực credentials (xem US-LOGIN-01)

---

## Non-functional Requirements

| NFR | Yêu cầu | Ghi chú |
|-----|---|---|
| Security | URL redirect không được bị thao túng để điều hướng ra ngoài domain (Open Redirect) | Cần validate return URL chỉ là internal path |
| UX | Redirect phải xảy ra tức thời, không có delay nhận thấy được | TBD |

---

## Traceability

| Source | Reference |
|---|---|
| Product Notes | docs/knowledge/product-notes.md — Trang Login (Section 5) |
| Product Notes | docs/knowledge/product-notes.md — Trang Product Detail (Section 3) |
| Product Notes | docs/knowledge/product-notes.md — Trang Giỏ Hàng (Section 4) |
| User Flow | docs/knowledge/product-notes.md — Luồng Người Dùng |

---

## Open Questions

| ID | Câu hỏi | Nhóm | Priority |
|----|---|---|---|
| Q1 | Sau khi login từ Add to Cart redirect: chỉ quay lại trang Product Detail hay tự động thêm vào giỏ hàng luôn? | Business/UX | High |
| Q2 | Nếu return URL không còn hợp lệ (ví dụ: product bị xóa), fallback về đâu? | UX | Low |
| Q3 | Cần xử lý Open Redirect vulnerability — ai validate return URL: frontend hay backend? | Security | High |
