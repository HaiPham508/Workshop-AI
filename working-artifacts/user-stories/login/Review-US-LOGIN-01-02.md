# Review Report — User Stories: US-LOGIN-01 & US-LOGIN-02

| Field | Value |
|---|---|
| Review ID | REV-US-LOGIN-01-02 |
| Reviewed Stories | US-LOGIN-01, US-LOGIN-02 |
| Source | working-artifacts/user-stories/login/ |
| Source of Truth | docs/knowledge/product-notes.md |
| Reviewer Role | Senior Business Analyst |
| Review Date | 2026-08-16 |
| Status | Review Complete — Action Required |

---

## Overall Verdict

| Story | INVEST Score | Completeness | Testability | Ready for Sprint? |
|---|---|---|---|---|
| US-LOGIN-01 | ✅ Passes | ⚠️ Minor gaps | ✅ Largely testable | **Conditionally Ready** (fix 3 items) |
| US-LOGIN-02 | ⚠️ Partial | ⚠️ Notable gaps | ⚠️ One AC ambiguous | **Not Ready** (fix 5 items) |

---

## US-LOGIN-01 — Đăng nhập với thông tin xác thực

### INVEST Check

| Criterion | Result | Note |
|---|---|---|
| Independent | ✅ | Standalone, no upstream story dependency |
| Negotiable | ✅ | Story, not a contract |
| Valuable | ✅ | Core authentication function |
| Estimable | ✅ | Scope is clear enough to size |
| Small | ✅ | Single sprint deliverable |
| Testable | ✅ | ACs are concrete enough |

### Findings

#### F1 — MISSING: NFRs Section [Severity: Medium]

US-LOGIN-01 has no Non-functional Requirements section, yet US-LOGIN-02 has one. At minimum, the following NFRs apply to the login form and must be captured:

| NFR | Requirement |
|---|---|
| Security | Password field value must never be logged or exposed in network payloads |
| Security | Form submission must use HTTPS (or equivalent secure transport) |
| Accessibility | Form must be keyboard-navigable; labels must be properly associated with inputs (ARIA) |
| UX | Error messages must not reveal whether the username exists (prevents user enumeration) |

**Action:** Add NFRs section to US-LOGIN-01.

---

#### F2 — MISSING AC: Already-authenticated user accessing `/login` [Severity: Medium]

The product notes state: *"Người dùng đã đăng nhập truy cập `/register` sẽ được redirect về Home"* — this implies the same behavior applies to `/login`. If an authenticated user navigates to `/login`, they should be redirected to Home. No AC covers this.

**Action:** Add the following AC:

```gherkin
AC5: Authenticated user truy cập /login bị redirect về Home
  Given user đã đăng nhập thành công
  When user cố truy cập trang /login (trực tiếp qua URL)
  Then user được redirect về trang Home (/)
  And trang /login không được hiển thị
```

---

#### F3 — OPEN QUESTION: Login credential vs. Registration credential [Severity: High]

**Contradiction detected between product notes sections:**
- **Trang Login** uses field: `Username (tên đăng nhập)`
- **Trang Register** uses field: `email, mật khẩu, xác nhận mật khẩu`

If users register with an **email** but log in with a **username**, this is a system design decision that must be confirmed. Both stories are affected. Two possible resolutions:
1. Login field is email (label "Username" is misleading and should be corrected).
2. Registration requires a separate username field that is not currently listed.

**Action:** Add Open Question (OQ-01) to US-LOGIN-01 and raise with stakeholder.

```
OQ-01 [Owner: Product Owner | Priority: High]
Is the login credential the user's email address or a separately defined username?
The Register page collects "email" but the Login page shows "Username".
Resolution determines: form label, field validation rules, and error messages.
```

---

#### F4 — MINOR: AC1 observable outcome is vague [Severity: Low]

AC1 states: *"hiển thị tên user hoặc nút Logout"* — the `OR` creates ambiguity for QC. The product notes do not specify which indicator is shown. Either confirm and make it concrete, or flag as a design decision open question.

**Action:** Replace `OR` with `AND`, or create OQ-02: *"What UI indicator confirms login state? (username in header, avatar, logout button, etc.)"*

---

### US-LOGIN-01 Summary — Required Actions

| # | Action | Priority |
|---|---|---|
| F1 | Add NFRs section (security, accessibility, UX) | Medium |
| F2 | Add AC5 for authenticated user redirected from `/login` | Medium |
| F3 | Create OQ-01 — login credential type; raise with PO | High |
| F4 | Resolve or clarify AC1 observable login state indicator | Low |

---

## US-LOGIN-02 — Redirect về trang gốc sau khi đăng nhập

### INVEST Check

| Criterion | Result | Note |
|---|---|---|
| Independent | ⚠️ | Technically dependent on US-LOGIN-01; dependency not stated |
| Negotiable | ✅ | |
| Valuable | ✅ | Core UX flow |
| Estimable | ⚠️ | Assumption A2 is unresolved; scope of "return context" is unclear |
| Small | ⚠️ | Two distinct redirect triggers (route guard vs. action trigger) may warrant a split |
| Testable | ⚠️ | AC3 uses "trang trước đó" ambiguously |

### Findings

#### F5 — OPEN QUESTION disguised as Assumption (A2) [Severity: High]

Assumption A2 reads: *"Cần xác định: quay lại product detail page hay thực hiện lại Add to Cart?"*

This is not an assumption — it is an **unresolved design question** that directly affects AC3, the implementation approach, and the sprint scope. It must be promoted to an Open Questions section and assigned to a decision owner before the story is sprint-ready.

**Action:** Move A2 out of Assumptions and add:

```
OQ-03 [Owner: Product Owner | Priority: High]
After login from an Add-to-Cart trigger: should the system
  (a) return user to the Product Detail page only, OR
  (b) return user to Product Detail AND automatically re-execute the Add-to-Cart action?
This determines whether a cart-pending-action state must be persisted across the login flow.
```

---

#### F6 — AMBIGUOUS: AC3 "trang trước đó" undefined [Severity: Medium]

AC3 states *"user được redirect về trang trước đó"* without defining what "trang trước đó" means in each trigger scenario:

| Trigger | Expected "previous page" |
|---|---|
| Add-to-Cart on Product Detail | Product Detail page (`/products/:id`) |
| Direct URL access to `/cart` | `/cart` |

"Trang trước đó" must be explicitly named per trigger scenario, otherwise Dev and QC will interpret it differently.

**Action:** Rewrite AC3 to specify expected return destination per trigger:

```gherkin
AC3a: Quay lại Product Detail sau khi đăng nhập từ Add-to-Cart trigger
  Given user đã bị redirect sang /login do click "Thêm vào giỏ hàng" ở trang /products/:id
  When user đăng nhập thành công
  Then user được redirect về trang /products/:id
  And product detail content được hiển thị đầy đủ

AC3b: Quay lại /cart sau khi đăng nhập từ protected route trigger
  Given user đã bị redirect sang /login do cố truy cập /cart
  When user đăng nhập thành công
  Then user được redirect về trang /cart

AC3c: Fallback redirect khi return URL không xác định được
  Given user đã bị redirect sang /login
  And return context không được lưu hoặc không hợp lệ
  When user đăng nhập thành công
  Then user được redirect về trang Home (/)
```

---

#### F7 — MISSING AC: Invalid / manipulated return URL (Open Redirect) [Severity: High — Security]

The NFR section notes *"URL redirect không được bị thao túng để điều hướng ra ngoài domain"* but there is no corresponding AC to verify this behavior. Security NFRs without testable ACs are invisible to QC.

**Action:** Add AC:

```gherkin
AC4: Ngăn chặn Open Redirect — return URL phải là internal path
  Given return URL parameter chứa external domain (ví dụ: https://evil.com)
  When user đăng nhập thành công
  Then hệ thống không redirect đến external URL
  And user được redirect về trang Home (/) hoặc trang mặc định
```

Also: make the NFR measurable — *"Return URL phải bắt đầu bằng '/' và không chứa '://' hoặc '@'"* — instead of leaving it as a prose description.

---

#### F8 — MISSING: Story dependency not declared [Severity: Low]

US-LOGIN-02 depends on US-LOGIN-01 being done (the login form and auth mechanism must exist). This is not stated in Preconditions or as a story dependency.

**Action:** Add to Preconditions: *"US-LOGIN-01 (login functionality) đã được implement và deploy."*

---

#### F9 — UX NFR not measurable [Severity: Low]

*"Redirect phải xảy ra tức thức, không có delay nhận thấy được"* — "nhận thấy được" (perceivable) is not measurable for QC. Either define a threshold (e.g., *"< 500ms sau khi login response trả về"*) or convert to an open question.

**Action:** Define a concrete performance threshold or add OQ: *"What is the acceptable redirect latency after successful login response?"*

---

#### F10 — SPLIT CANDIDATE: Two distinct redirect mechanisms [Severity: Low — Recommendation]

US-LOGIN-02 covers two distinct behaviors in one story:
1. **Route guard redirect** — auth guard on `/cart` triggers redirect.
2. **Action-triggered redirect** — "Add to Cart" click on Product Detail triggers redirect.

These are independent implementation paths with different risk profiles. If the team finds the story hard to estimate or test as one unit, consider splitting into:
- **US-LOGIN-02a**: Protected route access redirect (`/cart` → `/login` → `/cart`)
- **US-LOGIN-02b**: Action-triggered redirect (Add to Cart → `/login` → `/products/:id`)

This is a recommendation, not a blocker. The PO should decide based on sprint capacity.

---

### US-LOGIN-02 Summary — Required Actions

| # | Action | Priority |
|---|---|---|
| F5 | Promote A2 to open question OQ-03; do not assume answer | High |
| F6 | Rewrite AC3 into AC3a/AC3b/AC3c per trigger scenario | Medium |
| F7 | Add AC4 for Open Redirect prevention; make NFR measurable | High (Security) |
| F8 | Add story dependency on US-LOGIN-01 to Preconditions | Low |
| F9 | Define measurable threshold for redirect latency NFR | Low |
| F10 | Consider story split (recommendation, PO decision) | Low |

---

## Cross-Story Findings

### CX-01 — Missing Stories: Logout & Authenticated-user Route Guards [Severity: Medium]

The product notes imply a **Logout** action (UI indicator mentioned in AC1). No user story exists for logout. The following are likely missing from the backlog:

| Proposed Story | Trigger from Product Notes |
|---|---|
| US-LOGIN-03: Đăng xuất | "nút Logout" referenced in US-LOGIN-01 AC1; standard auth flow |
| US-LOGIN-04: Authenticated user redirected from `/register` | Product notes explicitly state this rule |

### CX-02 — Login Credential Type (OQ-01) Affects Both Stories

The email vs. username ambiguity identified in F3 affects both stories and must be resolved before either story moves to Dev.

---

## Open Questions Summary

| ID | Question | Owner | Priority | Affects |
|---|---|---|---|---|
| OQ-01 | Is the login credential email or username? Register uses email; Login form says "Username". | Product Owner | High | US-LOGIN-01 |
| OQ-02 | What UI element confirms login state post-login? (name in header, avatar, logout button) | UX / PO | Low | US-LOGIN-01 AC1 |
| OQ-03 | After login from Add-to-Cart trigger: return to Product Detail only, or also re-execute Add to Cart? | Product Owner | High | US-LOGIN-02 |
| OQ-04 | What is the acceptable redirect latency threshold after login success? | Tech Lead / PO | Low | US-LOGIN-02 NFR |

---

## Stories Not Yet Written (Backlog Gaps)

| Story | Source Evidence | Priority |
|---|---|---|
| US-LOGIN-03 — Đăng xuất | Implied by UI login state indicator; standard auth lifecycle | Should Have |
| US-LOGIN-04 — Authenticated user guard on `/register` and `/login` | product-notes.md: *"Người dùng đã đăng nhập truy cập /register sẽ được redirect về Home"* | Must Have |
| US-REGISTER-01 — Đăng ký tài khoản mới | product-notes.md: Trang Register section | Must Have |
