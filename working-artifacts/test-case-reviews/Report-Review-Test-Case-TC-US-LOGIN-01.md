# Report — Review Test Cases: TC-US-LOGIN-01

## Metadata

| Field | Value |
|---|---|
| Review Report ID | Report-Review-TC-US-LOGIN-01 |
| Reviewed Artifact | `working-artifacts/test-cases/TC-US-LOGIN-01-dang-nhap-voi-thong-tin-xac-thuc.md` |
| Related User Story | US-LOGIN-01 |
| Review Scope | Functional + Non-Functional (Security, Accessibility) |
| Reviewer | Test Agent |
| Review Date | 2026-08-15 |
| Verdict | **⚠ REVISION REQUIRED (Major + Minor Issues)** |

---

## Executive Summary

Tài liệu test case cho US-LOGIN-01 có chất lượng tổng thể **khá tốt**: coverage toàn bộ 4 AC (AC1–AC4) và NFR-SEC-01, có cả test case accessibility và security. Tuy nhiên, có **2 lỗi Major** cần sửa trước khi execution và **5 lỗi Minor** cần cải thiện.

| Severity | Count |
|---|---|
| Major | 2 |
| Minor | 5 |
| Missing Coverage | 3 |

---

## 1. Requirement Coverage Check

| AC ID | Description | Test Case(s) | Status |
|---|---|---|---|
| AC1 | Đăng nhập thành công với thông tin hợp lệ | TC_LOGIN_001, TC_LOGIN_011 | ✅ Covered |
| AC2 | Đăng nhập thất bại với thông tin sai | TC_LOGIN_003, TC_LOGIN_004, TC_LOGIN_005 | ✅ Covered |
| AC3 | Validate form khi trường bắt buộc để trống | TC_LOGIN_006, TC_LOGIN_007, TC_LOGIN_008 | ✅ Covered |
| AC4 | Điều hướng sang trang Register | TC_LOGIN_009 | ✅ Covered |
| NFR-SEC-01 | Password không hiển thị dạng plain text | TC_LOGIN_010 | ✅ Covered |
| Auth persistence (A2) | Trạng thái đăng nhập được giữ sau reload | TC_LOGIN_002 | ✅ Covered (cần sửa) |
| SQL Injection | Input chứa ký tự đặc biệt | TC_LOGIN_012 | ✅ Covered (cần sửa) |
| Error message security | Không tiết lộ thông tin hệ thống | TC_LOGIN_013 | ✅ Covered |
| Accessibility | Keyboard navigation | TC_LOGIN_011 | ✅ Covered (cần sửa priority) |

**Kết luận:** Tất cả AC đều có ít nhất 1 test case tương ứng. Không có orphan test case.

---

## 2. Findings

### 🔴 MAJOR-01 — TC_LOGIN_002: Vi phạm Independence Principle

**Test Case:** TC_LOGIN_002  
**Checklist Item:** Test cases must be executable independently — independence is non-negotiable.  

**Vấn đề:**  
Precondition của TC_LOGIN_002 ghi: _"User đã đăng nhập thành công (TC_LOGIN_001 passed)"_ — tức là test case này phụ thuộc trực tiếp vào kết quả của TC_LOGIN_001. Đây là vi phạm nghiêm trọng nguyên tắc independence.

**Tác động:**  
Nếu TC_LOGIN_001 fail vì bất kỳ lý do gì (môi trường, flaky), TC_LOGIN_002 sẽ không thể thực thi, dẫn đến kết quả test không đáng tin cậy.

**Hướng sửa:**  
Thay precondition thành setup độc lập — tự thực hiện login trong precondition mà không tham chiếu đến test case khác.

> **Ví dụ sửa:**  
> Preconditions: _"User đã có tài khoản; user thực hiện đăng nhập với username `admin` / password `123456` thành công; ứng dụng đang ở trang Home (`/`)"_

---

### 🔴 MAJOR-02 — TC_LOGIN_012: Expected Results không observable từ UI level

**Test Case:** TC_LOGIN_012  
**Checklist Item:** Expected results must be observable and verifiable.  

**Vấn đề:**  
Expected result bao gồm:
- _"Hệ thống không bị SQL Injection"_
- _"Không có data leakage"_

Đây là backend/server-side assertions — không thể quan sát hoặc verify trực tiếp từ UI level mà không có access vào server logs hoặc database. Test step hiện tại cũng chỉ thao tác trên UI.

**Tác động:**  
Test case không thể được thực thi một cách có ý nghĩa ở cấp độ UI/e2e test. Automation script không thể assert các điều kiện này.

**Hướng sửa:**  
Giới hạn expected result ở những gì observable từ UI:
- Login thất bại — hiển thị thông báo lỗi chung chung
- User vẫn ở trang `/login`
- Không có dữ liệu bất thường xuất hiện trên UI (trang không bị bypass)
- (Optional) Kiểm tra Network tab: không có response trả về unexpected data

Nếu muốn verify SQL injection ở backend, cần tách thành test case riêng cho API/security testing layer.

---

### 🟡 MINOR-01 — TC_LOGIN_011: Priority không phù hợp

**Test Case:** TC_LOGIN_011  
**Priority hiện tại:** Medium  

**Vấn đề:**  
TC_LOGIN_011 kiểm tra keyboard accessibility của login form — đây là một critical user journey (đăng nhập). Theo WCAG 2.1 AA, toàn bộ chức năng phải có thể thao tác bằng bàn phím. Login form là điểm vào bắt buộc với mọi user.

**Hướng sửa:**  
Đổi Priority từ `Medium` → `High`.

---

### 🟡 MINOR-02 — TC_LOGIN_011: Testing Technique không chính xác

**Test Case:** TC_LOGIN_011  
**Technique hiện tại:** `Exploratory Testing`  

**Vấn đề:**  
TC_LOGIN_011 là một test case có script cụ thể (step-by-step), không phải exploratory testing. Exploratory testing là unscripted và discovery-driven.

**Hướng sửa:**  
Đổi Testing Technique thành `Accessibility Testing` hoặc `Use Case Testing`.

---

### 🟡 MINOR-03 — TC_LOGIN_004 và TC_LOGIN_013: Expected Result chồng chéo

**Test Cases:** TC_LOGIN_004, TC_LOGIN_013  

**Vấn đề:**  
TC_LOGIN_004 expected result đã bao gồm assertion: _"Thông báo lỗi không tiết lộ username có tồn tại hay không (tránh user enumeration)"_ — đây là một security assertion cũng được cover bởi TC_LOGIN_013.

Sự chồng chéo không phải lỗi nghiêm trọng, nhưng có thể gây ra:
- Duplicate execution effort
- Confusion về scope của từng test case

**Hướng sửa:**  
Hai phương án:
1. Giữ nguyên và thêm chú thích scope khác nhau (TC_LOGIN_004: user enumeration cụ thể; TC_LOGIN_013: general information disclosure)
2. Bỏ security assertion khỏi TC_LOGIN_004 expected result, để TC_LOGIN_013 chịu trách nhiệm hoàn toàn.

Phương án 1 được khuyến nghị.

---

### 🟡 MINOR-04 — TC_LOGIN_005: Khả năng redundant với TC_LOGIN_003/004

**Test Case:** TC_LOGIN_005  
**Technique:** `Equivalence Partitioning`  

**Vấn đề:**  
TC_LOGIN_005 (_"cả hai sai"_) là một partition hợp lệ nhưng expected result giống hệt TC_LOGIN_003 và TC_LOGIN_004. Không có hành vi mới được verify.

**Hướng sửa:**  
Nếu giữ lại, ghi rõ lý do (decision table completeness). Nếu muốn tối ưu coverage, có thể merge vào TC_LOGIN_003 hoặc TC_LOGIN_004 với test data bổ sung. Không bắt buộc xóa.

---

### 🟡 MINOR-05 — TC_LOGIN_008: Technique không đồng nhất với TC_LOGIN_006/007

**Test Case:** TC_LOGIN_008  
**Technique:** `Decision Table Testing`  
**TC_LOGIN_006/007 Technique:** `Equivalence Partitioning, Boundary Value Analysis`  

**Vấn đề:**  
Ba test case (TC_LOGIN_006, TC_LOGIN_007, TC_LOGIN_008) thực chất là triển khai từ cùng một decision table (username empty/filled × password empty/filled). Nên sử dụng kỹ thuật nhất quán, hoặc ghi chú rõ mối liên hệ.

**Hướng sửa:**  
Thêm `Decision Table Testing` vào technique của TC_LOGIN_006 và TC_LOGIN_007 để thể hiện chúng đến từ cùng một decision table.

---

## 3. Missing Coverage

| ID | Missing Scenario | Recommendation | Priority |
|---|---|---|---|
| GAP-01 | **Boundary Value: Field length** — Không có test case nào kiểm tra input rất dài (ví dụ: username = 256 ký tự, hoặc password = 1000 ký tự) | Thêm TC_LOGIN_014 cho max-length validation | High |
| GAP-02 | **Whitespace-only input** — Username hoặc password chỉ chứa spaces — không bị bắt bởi "empty field" validation, có thể lọt qua nếu code chỉ check `!value` | Thêm TC_LOGIN_015 kiểm tra whitespace trimming | Medium |
| GAP-03 | **Show/Hide password toggle** — Nếu UI có nút toggle visibility, cần verify rằng sau khi toggle, password type thay đổi và không bị lưu lộ trong DOM không phù hợp | Thêm sau khi xác nhận UI có feature này | Low |

---

## 4. Checklist Execution Summary

### 1. Requirement Coverage
| Check | Status |
|---|---|
| Every requirement is covered by one or more test cases | ✅ |
| Every acceptance criterion is covered | ✅ |
| Alternate flows are covered where applicable | ✅ |
| Error scenarios are included | ✅ |

### 2. Test Design
| Check | Status |
|---|---|
| Positive scenarios included | ✅ |
| Negative scenarios included | ✅ |
| Boundary conditions tested | ⚠ Thiếu (GAP-01) |
| Invalid input scenarios covered | ✅ |
| Duplicate scenarios removed | ⚠ TC_LOGIN_005 borderline redundant |

### 3. Test Case Quality
| Check | Status |
|---|---|
| Test Case ID follows naming convention | ✅ |
| Title begins with "Verify..." | ✅ |
| Requirement reference correct | ✅ |
| Priority assigned correctly | ⚠ TC_LOGIN_011 cần nâng lên High |

### 4. Preconditions
| Check | Status |
|---|---|
| Preconditions clearly defined | ✅ |
| Preconditions do not depend on other test cases | ❌ TC_LOGIN_002 |

### 5. Test Data
| Check | Status |
|---|---|
| Test data realistic | ✅ |
| Test data supports scenario | ✅ |
| Invalid data included where appropriate | ✅ |
| Boundary values included | ⚠ GAP-01 |

### 6. Test Steps
| Check | Status |
|---|---|
| Steps clear and easy to execute | ✅ |
| Each step is a single user action | ✅ |
| Steps concise and unambiguous | ✅ |

### 7. Expected Results
| Check | Status |
|---|---|
| Expected results observable | ❌ TC_LOGIN_012 |
| Expected results verifiable | ❌ TC_LOGIN_012 |
| Expected results specific | ✅ (except TC_LOGIN_012) |
| No vague statements | ✅ |

### 8. Non-functional Considerations
| Area | Status |
|---|---|
| Security | ✅ TC_LOGIN_010, 012, 013 |
| Accessibility | ✅ TC_LOGIN_011 (cần sửa minor) |
| Performance | N/A — chưa có requirement |
| Compatibility | N/A — chưa xác định target browsers |

---

## 5. Verdict & Action Items

**Verdict:** ⚠ **REVISION REQUIRED** — Giải quyết 2 major issues trước khi execution.

| ID | Action | Assigned To | Priority |
|---|---|---|---|
| ACT-01 | Sửa TC_LOGIN_002 precondition — bỏ dependency vào TC_LOGIN_001 | Author | 🔴 Must Fix |
| ACT-02 | Sửa TC_LOGIN_012 expected result — chỉ giữ UI-observable assertions | Author | 🔴 Must Fix |
| ACT-03 | Nâng priority TC_LOGIN_011 từ Medium → High | Author | 🟡 Should Fix |
| ACT-04 | Sửa technique TC_LOGIN_011 từ "Exploratory Testing" → "Accessibility Testing" | Author | 🟡 Should Fix |
| ACT-05 | Thêm Decision Table technique vào TC_LOGIN_006 và TC_LOGIN_007 | Author | 🟡 Should Fix |
| ACT-06 | Thêm TC_LOGIN_014 — boundary value cho field length | Author | 🟡 Should Fix |
| ACT-07 | Thêm TC_LOGIN_015 — whitespace-only input validation | Author | 🟡 Should Fix |
| ACT-08 | Confirm scope overlap giữa TC_LOGIN_004 và TC_LOGIN_013 với team | Author | 🔵 Optional |

---

## 6. Open Risks (Inherited from TC Document)

| ID | Risk | Status |
|---|---|---|
| R1 | Q1 chưa resolve: username vs email — test data cần update | Còn mở |
| R2 | Q3 chưa resolve: auth token storage — TC_LOGIN_002 cần update | Còn mở |
| R3 | Q4 chưa resolve: behavior khi user đã login truy cập `/login` | Còn mở |

---

*Review hoàn thành bởi Test Agent — 2026-08-15*
