# Product App — Thông Tin Nghiệp Vụ

## Tổng Quan

Web app cho phép người dùng tìm kiếm, xem danh sách sản phẩm, xem chi tiết từng sản phẩm và thêm sản phẩm vào giỏ hàng. Một số tính năng yêu cầu người dùng đăng nhập trước khi thực hiện. Người dùng chưa có tài khoản có thể đăng ký mới.

---

## Các Trang & Luồng Nghiệp Vụ

### 1. Trang Home (Product List)

- Là trang mặc định khi truy cập ứng dụng (route `/`).
- Có thanh **tìm kiếm sản phẩm** (Search) ở đầu trang.
- Hiển thị danh sách sản phẩm dưới dạng lưới (grid) hoặc danh sách (list).
- **Phân trang**: hiển thị **10 sản phẩm mỗi trang**.
- Mỗi sản phẩm (product card) hiển thị:
  - **Hình ảnh** (image) sản phẩm
  - **Tên sản phẩm** (title)
  - **Mô tả ngắn** (short description)
- Người dùng có thể click vào một sản phẩm để xem chi tiết.

### 2. Tìm Kiếm Sản Phẩm (Search)

- Người dùng nhập từ khóa vào thanh tìm kiếm → danh sách sản phẩm được lọc theo từ khóa.
- Tìm kiếm có thể theo: tên sản phẩm, mô tả.
- Không cần đăng nhập để sử dụng tính năng tìm kiếm.
- Nếu không có kết quả phù hợp, hiển thị thông báo "Không tìm thấy sản phẩm".

### 3. Trang Product Detail

- Truy cập khi người dùng click vào một sản phẩm ở trang Home (route `/products/:id`).
- Hiển thị thông tin sản phẩm gồm:
  - **Hình ảnh** (image) sản phẩm
  - **Tên sản phẩm** (title)
  - **Thông tin chi tiết sản phẩm** (product details information): mô tả đầy đủ, giá, danh mục, v.v.
- Có nút **"Thêm vào giỏ hàng"** (Add to Cart).
- **Luồng thêm vào giỏ hàng:**
  - Nếu người dùng **đã đăng nhập** → thêm sản phẩm vào giỏ hàng bình thường.
  - Nếu người dùng **chưa đăng nhập** → chuyển hướng sang trang Login.

### 4. Trang Giỏ Hàng (Cart)

- Route: `/cart`.
- Yêu cầu đăng nhập; nếu chưa đăng nhập sẽ redirect sang trang Login.
- **Xem giỏ hàng**: hiển thị danh sách sản phẩm đã thêm (tên, hình ảnh, giá, số lượng, thành tiền) và tổng tiền.
- **Cập nhật số lượng**: người dùng có thể tăng/giảm số lượng từng sản phẩm; tổng tiền tự động cập nhật.
- **Xóa sản phẩm**: người dùng có thể xóa từng sản phẩm khỏi giỏ hàng.

### 5. Trang Login

- Route: `/login`.
- Được mở khi người dùng chưa đăng nhập và thực hiện hành động yêu cầu xác thực (ví dụ: thêm vào giỏ hàng).
- Form đăng nhập gồm:
  - **Username** (tên đăng nhập)
  - **Password** (mật khẩu)
- Sau khi đăng nhập thành công, người dùng được chuyển trở lại trang trước đó (hoặc trang Home).
- Có link **"Đăng ký"** để chuyển sang trang Register nếu chưa có tài khoản.

### 6. Trang Register (Đăng Ký)

- Route: `/register`.
- Cho phép người dùng tạo tài khoản mới.
- Thông tin đăng ký tối thiểu: email, mật khẩu, xác nhận mật khẩu.
- Sau khi đăng ký thành công, tự động đăng nhập và chuyển về trang Home (hoặc trang đang thao tác trước đó).
- Có link **"Đăng nhập"** để quay lại trang Login nếu đã có tài khoản.
- Người dùng đã đăng nhập truy cập `/register` sẽ được redirect về Home.

---

## Luồng Người Dùng (User Flows)

```
[Home - Product List]
        │                  ▲
        │ nhập từ khóa    │ kết quả lọc
        ├──────────► [Search] ──────────┘
        │
        │ click sản phẩm
        ▼
[Product Detail]
        │
        │ click "Thêm vào giỏ hàng"
        ├── [Đã đăng nhập] ──► Thêm vào giỏ hàng ✓ ──► [Trang Cart]
        │                                                       │
        │                                          ┌───────────┴──────────┐
        │                                   Cập nhật số lượng       Xóa sản phẩm
        │
        └── [Chưa đăng nhập] ──► [Trang Login]
                                        │              │
                                        │ đăng nhập    │ chưa có tài khoản
                                        │ thành công   ▼
                                        │        [Trang Register]
                                        │              │
                                        │              │ đăng ký thành công
                                        ▼              ▼
                                 Quay lại trang trước / Home
```

---

## Quy Tắc Nghiệp Vụ

| # | Quy tắc |
|---|---------|
| 1 | Trang Home, Product Detail và tính năng Tìm kiếm có thể dùng mà **không cần đăng nhập**. |
| 2 | Hành động **Thêm vào giỏ hàng** yêu cầu người dùng **đã đăng nhập**. |
| 3 | Khi chưa đăng nhập và click "Thêm vào giỏ hàng", ứng dụng **chuyển hướng sang trang Login**. |
| 4 | Sau khi đăng nhập thành công, ứng dụng nên **điều hướng trở lại** trang người dùng đang thao tác. |
| 5 | Người dùng đã đăng nhập truy cập `/login` hoặc `/register` sẽ được **redirect về Home**. |
| 6 | Trang Login có link sang trang Register và ngược lại. |
| 7 | Sau khi đăng ký thành công, người dùng được **tự động đăng nhập** và điều hướng về trang trước đó hoặc Home. |
| 8 | Trang Giỏ hàng **yêu cầu đăng nhập**; truy cập khi chưa đăng nhập sẽ redirect sang trang Login. |
| 9 | Người dùng có thể **cập nhật số lượng** từng sản phẩm trong giỏ; tổng tiền tự động tính lại. |
| 10 | Người dùng có thể **xóa từng sản phẩm** khỏi giỏ hàng. |

---

## Phạm Vi Tính Năng (Scope)

| Tính năng | Trong phạm vi | Ghi chú |
|-----------|:---:|---------|
| Hiển thị danh sách sản phẩm | ✅ | Trang Home |
| Xem chi tiết sản phẩm | ✅ | Trang Product Detail |
| Thêm vào giỏ hàng | ✅ | Yêu cầu đăng nhập |
| Tìm kiếm sản phẩm | ✅ | Theo tên, mô tả; không cần đăng nhập |
| Đăng nhập | ✅ | Trang Login |
| Đăng ký tài khoản | ✅ | Trang Register |
| Xem giỏ hàng | ✅ | Yêu cầu đăng nhập |
| Cập nhật số lượng sản phẩm trong giỏ | ✅ | Yêu cầu đăng nhập |
| Xóa sản phẩm khỏi giỏ hàng | ✅ | Yêu cầu đăng nhập |
| Thanh toán | ❌ | Ngoài phạm vi hiện tại |
| Lọc / sắp xếp sản phẩm nâng cao | ❌ | Ngoài phạm vi hiện tại |
