# TC-US-LOGIN-01 — Đăng nhập với thông tin xác thực

## Metadata

| Field | Value |
|---|---|
| Test Case Document ID | TC-US-LOGIN-01 |
| Related User Story | US-LOGIN-01 |
| Feature | Authentication — Login |
| Status | Draft |
| Created | 2026-08-15 |

---

## Assumptions & Open Items

| ID | Assumption / Open Item | Impact |
|----|---|---|
| A1 | Field đăng nhập là "username" (không phải email) theo product-notes | Label/validation thay đổi nếu sai |
| A2 | Auth token/session được lưu client-side (localStorage/cookie) sau login thành công | Cơ chế kiểm tra trạng thái đăng nhập trên UI |
| A3 | Không có MFA hoặc captcha trong phiên bản này | Cần thêm test nếu có |
| A4 | User đã đăng nhập truy cập `/login` → behavior chưa xác định (Q4) — bỏ qua ở phiên bản này | Cần xác nhận với team |
| A5 | Giới hạn số lần đăng nhập thất bại chưa xác định (Q2) — không thiết kế test cho lock account | Thêm test cases khi có requirement |

---

## Traceability Matrix

| AC ID | Description | Test Case(s) |
|---|---|---|
| AC1 | Đăng nhập thành công với thông tin hợp lệ | TC_LOGIN_001, TC_LOGIN_002 |
| AC2 | Đăng nhập thất bại với thông tin sai | TC_LOGIN_003, TC_LOGIN_004, TC_LOGIN_005 |
| AC3 | Validate form khi trường bắt buộc để trống | TC_LOGIN_006, TC_LOGIN_007, TC_LOGIN_008 |
| AC4 | Điều hướng sang trang Register | TC_LOGIN_009 |
| NFR-SEC-01 | Password không hiển thị dạng plain text | TC_LOGIN_010 |

---

## Test Cases

| Test Case ID | Title | Preconditions | Test Steps | Test Data | Expected Result | Requirement | Testing Technique | Priority | Automation |
|---|---|---|---|---|---|---|---|---|---|
| TC_LOGIN_001 | Verify user can log in with valid username and password | - User đã có tài khoản trong hệ thống<br>- User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Nhập username hợp lệ vào field "Username"<br>3. Nhập password đúng vào field "Password"<br>4. Click nút "Đăng nhập" | username: `admin`<br>password: `123456` | - Đăng nhập thành công<br>- User được redirect về trang Home (`/`)<br>- UI phản ánh trạng thái đăng nhập (hiển thị tên user hoặc nút Logout) | US-LOGIN-01, AC1 | Use Case Testing | Critical | Yes |
| TC_LOGIN_002 | Verify auth state is persisted after successful login | - User đã đăng nhập thành công (TC_LOGIN_001 passed) | 1. Reload trang sau khi đã đăng nhập thành công<br>2. Kiểm tra trạng thái đăng nhập | N/A | - User vẫn ở trạng thái đăng nhập sau reload<br>- UI vẫn hiển thị tên user hoặc nút Logout | US-LOGIN-01, AC1, A2 | State Transition Testing | High | Yes |
| TC_LOGIN_003 | Verify error message is shown when password is incorrect | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Nhập username hợp lệ<br>3. Nhập password sai<br>4. Click nút "Đăng nhập" | username: `admin`<br>password: `wrongpass` | - Hiển thị thông báo lỗi rõ ràng (ví dụ: "Tên đăng nhập hoặc mật khẩu không đúng")<br>- User vẫn ở trang `/login`<br>- Form không bị xóa (username vẫn còn trong field) | US-LOGIN-01, AC2 | Equivalence Partitioning, Error Guessing | Critical | Yes |
| TC_LOGIN_004 | Verify error message is shown when username is incorrect | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Nhập username không tồn tại trong hệ thống<br>3. Nhập password bất kỳ<br>4. Click nút "Đăng nhập" | username: `nonexistent_user`<br>password: `anypassword` | - Hiển thị thông báo lỗi rõ ràng (ví dụ: "Tên đăng nhập hoặc mật khẩu không đúng")<br>- User vẫn ở trang `/login`<br>- Thông báo lỗi không tiết lộ username có tồn tại hay không (tránh user enumeration) | US-LOGIN-01, AC2 | Equivalence Partitioning, Error Guessing | Critical | Yes |
| TC_LOGIN_005 | Verify error message is shown when both username and password are incorrect | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Nhập username không hợp lệ<br>3. Nhập password sai<br>4. Click nút "Đăng nhập" | username: `wrong_user`<br>password: `wrongpass` | - Hiển thị thông báo lỗi rõ ràng<br>- User vẫn ở trang `/login`<br>- Form không bị xóa | US-LOGIN-01, AC2 | Equivalence Partitioning | High | Yes |
| TC_LOGIN_006 | Verify validation error when username field is empty | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Để trống field "Username"<br>3. Nhập password hợp lệ<br>4. Click nút "Đăng nhập" | username: _(empty)_<br>password: `123456` | - Field "Username" được highlight lỗi<br>- Hiển thị thông báo validation (ví dụ: "Username là bắt buộc")<br>- Không có request nào được gửi lên server | US-LOGIN-01, AC3 | Equivalence Partitioning, Boundary Value Analysis | Critical | Yes |
| TC_LOGIN_007 | Verify validation error when password field is empty | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Nhập username hợp lệ<br>3. Để trống field "Password"<br>4. Click nút "Đăng nhập" | username: `admin`<br>password: _(empty)_ | - Field "Password" được highlight lỗi<br>- Hiển thị thông báo validation (ví dụ: "Password là bắt buộc")<br>- Không có request nào được gửi lên server | US-LOGIN-01, AC3 | Equivalence Partitioning, Boundary Value Analysis | Critical | Yes |
| TC_LOGIN_008 | Verify validation errors when both username and password fields are empty | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Để trống cả hai field "Username" và "Password"<br>3. Click nút "Đăng nhập" | username: _(empty)_<br>password: _(empty)_ | - Cả hai field đều được highlight lỗi<br>- Hiển thị thông báo validation cho từng field<br>- Không có request nào được gửi lên server | US-LOGIN-01, AC3 | Decision Table Testing | High | Yes |
| TC_LOGIN_009 | Verify navigation to Register page | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Click link "Đăng ký" | N/A | - User được chuyển đến trang `/register`<br>- Trang Register được hiển thị đúng | US-LOGIN-01, AC4 | Use Case Testing | Medium | Yes |
| TC_LOGIN_010 | Verify password field does not display plain text | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Nhập password vào field "Password"<br>3. Quan sát giá trị hiển thị trên field | password: `123456` | - Password được hiển thị dưới dạng ký tự ẩn (dấu chấm hoặc dấu hoa thị)<br>- Input type="password" được áp dụng | US-LOGIN-01, NFR-SEC-01 | Error Guessing | High | Yes |
| TC_LOGIN_011 | Verify login form is accessible via keyboard navigation | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Sử dụng phím Tab để điều hướng qua các field<br>3. Nhập username và password bằng bàn phím<br>4. Nhấn Enter để submit form | username: `admin`<br>password: `123456` | - Tab order hợp lý: Username → Password → Nút Đăng nhập<br>- Focus indicator hiển thị rõ ràng trên từng phần tử<br>- Form có thể submit bằng phím Enter | US-LOGIN-01, AC1 | Exploratory Testing | Medium | Yes |
| TC_LOGIN_012 | Verify login with username containing special characters | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Nhập username chứa ký tự đặc biệt<br>3. Nhập password bất kỳ<br>4. Click nút "Đăng nhập" | username: `' OR 1=1 --`<br>password: `anypassword` | - Hệ thống không bị SQL Injection<br>- Hiển thị thông báo lỗi đăng nhập thất bại (không đăng nhập được)<br>- Không có data leakage | US-LOGIN-01, AC2 | Error Guessing | High | Yes |
| TC_LOGIN_013 | Verify error message does not expose sensitive system information | - User chưa đăng nhập<br>- Ứng dụng đang chạy | 1. Truy cập `/login`<br>2. Nhập username và password sai<br>3. Click nút "Đăng nhập"<br>4. Kiểm tra nội dung thông báo lỗi | username: `wrong_user`<br>password: `wrongpass` | - Thông báo lỗi chung chung (ví dụ: "Tên đăng nhập hoặc mật khẩu không đúng")<br>- Không tiết lộ thông tin hệ thống, stack trace, hay chi tiết nội bộ | US-LOGIN-01, AC2 | Error Guessing | High | Yes |

---

## Out of Scope

Các kịch bản sau **không được** đưa vào tài liệu này:

- Chức năng "Quên mật khẩu" / reset password
- Đăng nhập bằng OAuth/SSO
- Khóa tài khoản sau nhiều lần đăng nhập thất bại (Q2 chưa có answer)
- Multi-factor authentication (MFA)
- Redirect về trang gốc sau khi đăng nhập từ protected action (xem US-LOGIN-02)

---

## Open Risks

| ID | Risk | Action |
|----|---|---|
| R1 | Q1 chưa được resolve: username vs email — test data có thể phải update | Confirm với business trước khi execution |
| R2 | Q3 chưa được resolve: auth token storage — TC_LOGIN_002 có thể cần update step kiểm tra | Confirm với tech lead |
| R3 | Q4 chưa được resolve: behavior khi user đã đăng nhập truy cập `/login` — chưa có test | Thêm test case sau khi có requirement |
