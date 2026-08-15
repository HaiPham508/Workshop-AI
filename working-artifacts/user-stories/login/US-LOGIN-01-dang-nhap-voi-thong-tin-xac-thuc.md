# US-LOGIN-01 — Đăng nhập với thông tin xác thực

## Story Metadata

| Field | Value |
|---|---|
| Story ID | US-LOGIN-01 |
| Story Name | Đăng nhập với thông tin xác thực |
| Epic | Authentication & Access Control |
| Priority | Must Have |
| Status | Draft |
| Source | docs/knowledge/product-notes.md — Trang Login |

---

## User Story Statement

> **As a** registered user,
> **I want to** log in with my username and password,
> **So that** I can access features that require authentication (e.g., Cart, Add to Cart).

---

## Preconditions

- User đã có tài khoản đã đăng ký trong hệ thống.
- User đang ở trạng thái chưa đăng nhập (unauthenticated).
- Ứng dụng đang chạy và backend auth service khả dụng.

---

## Assumptions

| ID | Assumption | Impact nếu sai |
|----|---|---|
| A1 | Field "Username" là username, không phải email | Form field label và validation sẽ thay đổi |
| A2 | Session/token được lưu client-side (localStorage hoặc cookie) sau login thành công | Cần xác định cơ chế lưu auth state |
| A3 | Không có yêu cầu MFA hoặc captcha ở phiên bản này | Cần bổ sung story nếu có security requirement |

---

## Workflow & Behavior Notes

**Main Flow:**
1. User truy cập `/login`.
2. User nhập username và password vào form.
3. User nhấn nút "Đăng nhập".
4. Hệ thống xác thực thông tin với backend.
5. Đăng nhập thành công → redirect về trang Home (`/`).

**Alternate Flows:**
- Thông tin sai → hiển thị lỗi, user ở lại trang `/login`.
- Trường bắt buộc để trống → highlight trường lỗi, không gửi request.
- User click "Đăng ký" → redirect đến `/register`.

**UI Reference:** TBD (mockup chưa có)

---

## Acceptance Criteria

```gherkin
AC1: Đăng nhập thành công với thông tin hợp lệ
  Given user truy cập trang /login
  And user chưa đăng nhập
  When user nhập username hợp lệ và password đúng
  And user nhấn nút "Đăng nhập"
  Then hệ thống xác thực thành công
  And user được redirect về trang Home (/)
  And trạng thái đăng nhập được phản ánh trên UI (ví dụ: hiển thị tên user hoặc nút Logout)

AC2: Đăng nhập thất bại với thông tin sai
  Given user đang ở trang /login
  When user nhập username hoặc password không đúng
  And user nhấn nút "Đăng nhập"
  Then hệ thống hiển thị thông báo lỗi rõ ràng (ví dụ: "Tên đăng nhập hoặc mật khẩu không đúng")
  And user vẫn ở trang /login
  And form không bị xóa để user có thể sửa

AC3: Validate form khi trường bắt buộc để trống
  Given user đang ở trang /login
  When user không nhập username hoặc password
  And user nhấn nút "Đăng nhập"
  Then hệ thống highlight trường bị thiếu
  And hiển thị thông báo validation tương ứng
  And request không được gửi lên server

AC4: Điều hướng sang trang Register
  Given user đang ở trang /login
  When user click link "Đăng ký"
  Then user được chuyển đến trang /register
```

---

## Out of Scope

- Chức năng "Quên mật khẩu" / reset password
- Đăng nhập bằng mạng xã hội (OAuth/SSO)
- Khóa tài khoản sau nhiều lần đăng nhập thất bại
- Multi-factor authentication (MFA)
- Redirect về trang gốc sau khi đăng nhập từ protected action (xem US-LOGIN-02)

---

## Non-functional Requirements

| NFR | Yêu cầu | Ghi chú |
|-----|---|---|
| Security | Password không được hiển thị dưới dạng plain text | Input type="password" |
| Security | API call phải qua HTTPS | TBD — phụ thuộc môi trường deploy |
| Performance | Thời gian phản hồi login ≤ 3s trong điều kiện bình thường | TBD — cần xác nhận với team |

---

## Traceability

| Source | Reference |
|---|---|
| Product Notes | docs/knowledge/product-notes.md — Trang Login (Section 5) |
| User Flow | docs/knowledge/product-notes.md — Luồng Người Dùng |

---

## Open Questions

| ID | Câu hỏi | Nhóm | Priority |
|----|---|---|---|
| Q1 | Field login là "username" hay "email"? product-notes ghi "username" nhưng Register dùng "email" | Business | High |
| Q2 | Sau login thất bại bao nhiêu lần thì có hành động gì? (khóa tài khoản, captcha?) | Security | Medium |
| Q3 | Auth token lưu ở đâu? Cookie (HttpOnly) hay localStorage? | Security/Tech | High |
| Q4 | User đã đăng nhập truy cập /login thì redirect về đâu? | UX | Medium |
