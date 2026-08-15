# Page Object Review Report — LoginPage

| Field | Detail |
|---|---|
| **Review Date** | 2026-08-15 |
| **Reviewer** | Test Agent (AI Senior Test Engineer) |
| **File Reviewed** | `e2e/src/pages/LoginPage.ts` |
| **Related Component** | `src/features/auth/components/LoginForm/LoginForm.tsx` |
| **Related Test Script** | `e2e/test/functions/login.spec.ts` |
| **Standards Applied** | pom-standard, locator-standard, page-object-standard, automation-coding-standard |
| **Overall Verdict** | ✅ Approved with Minor Issues |

---

## 1. Executive Summary

`LoginPage.ts` is well-structured and correctly follows the Page Object Model for the `/login` route. It applies user-facing locators where available, documents non-standard locator choices with clear justifications, and exposes business-level action methods. No assertions exist inside the class. No hardcoded waits are used.

Two **Minor** issues require remediation: locator visibility (public instead of private) and file naming convention (PascalCase instead of kebab-case). Two **Advisory** observations are noted for locator upgrade paths. No blocking issues were found.

---

## 2. Findings

### Finding 1 — Locator Visibility: `public` Instead of `private`

| Attribute | Value |
|---|---|
| **Severity** | Minor |
| **Category** | Encapsulation / POM Architecture |
| **Status** | Open |

**Evidence**

```typescript
// Current — all locators are public
readonly usernameInput: Locator;
readonly passwordInput: Locator;
readonly submitButton: Locator;
readonly serverErrorAlert: Locator;
readonly usernameError: Locator;
readonly passwordError: Locator;
```

**Standard Reference**

The `page-object-standard.md` template specifies locators as `private readonly`:

```typescript
private readonly usernameTextbox = this.page.getByLabel('Username');
```

**Impact**

Test scripts bypass business action methods and access raw locators directly for assertions (e.g., `loginPage.serverErrorAlert`, `loginPage.usernameError`). This couples test assertion logic to the locator implementation and reduces encapsulation.

**Recommendation**

Option A — Make locators `private readonly` and add locator getter methods for assertion use:

```typescript
// Page Object
private readonly _serverErrorAlert = page.locator('div[role="alert"]');
private readonly _usernameError = page.locator('#username-error');
private readonly _passwordError = page.locator('#password-error');
private readonly _usernameInput = page.getByLabel('Tên đăng nhập');

// Expose as getters
get serverErrorAlert(): Locator { return this._serverErrorAlert; }
get usernameError(): Locator { return this._usernameError; }
get passwordError(): Locator { return this._passwordError; }
get usernameInput(): Locator { return this._usernameInput; }
```

Option B — Explicitly document the team decision to keep locators public for assertion access and align with a team-wide pattern.

---

### Finding 2 — File Naming Convention

| Attribute | Value |
|---|---|
| **Severity** | Minor |
| **Category** | Coding Standard / Naming Convention |
| **Status** | Open |

**Evidence**

Current filename: `LoginPage.ts`

**Standard Reference**

`automation-coding-standard.md` — File Naming section:

```text
login-page.ts
checkout-page.ts
```

**Impact**

Inconsistency with the project file naming convention. Low runtime impact but violates team standards and complicates tooling or glob-based file discovery.

**Recommendation**

Rename file to `login-page.ts` and update the import in `login.spec.ts`:

```typescript
// Before
import { LoginPage } from '../../src/pages/LoginPage';

// After
import { LoginPage } from '../../src/pages/login-page';
```

---

### Finding 3 — `serverErrorAlert`: CSS Selector at Priority 6 (Advisory)

| Attribute | Value |
|---|---|
| **Severity** | Advisory |
| **Category** | Locator Quality |
| **Status** | Accepted with Justification |

**Evidence**

```typescript
this.serverErrorAlert = page.locator('div[role="alert"]');
// Comment: page has 3 role=alert elements; getByRole would be ambiguous
```

**Assessment**

The justification is valid — the page renders three elements with `role="alert"` simultaneously (one `div` for server error, two `span` elements for field errors). Using `div[role="alert"]` disambiguates by element type. The comment documents the reasoning clearly.

The selector is stable relative to the source (`LoginForm.tsx` hardcodes `<div role="alert">`). However, it would break if the element type changes.

**Recommendation**

Add `data-testid="server-error"` to the component's error `div` and upgrade the locator:

```typescript
// Component (LoginForm.tsx)
<div role="alert" data-testid="server-error" ...>

// Page Object
this.serverErrorAlert = page.getByTestId('server-error');
```

This reaches Priority 5 (`getByTestId`) while remaining explicit.

---

### Finding 4 — `usernameError` / `passwordError`: ID Selectors at Priority 6 (Advisory)

| Attribute | Value |
|---|---|
| **Severity** | Advisory |
| **Category** | Locator Quality |
| **Status** | Accepted with Justification |

**Evidence**

```typescript
this.usernameError = page.locator('#username-error');
this.passwordError = page.locator('#password-error');
// Comment: ids are hardcoded in the source component and are stable
```

**Assessment**

Source confirms `id="username-error"` and `id="password-error"` are hardcoded in `LoginForm.tsx`. The justification is accurate and documented. IDs provide high specificity and low ambiguity.

**Recommendation**

If `data-testid` attributes are added to the error spans, upgrade to `getByTestId`:

```typescript
// Component (LoginForm.tsx)
<span id="username-error" data-testid="username-error" role="alert" ...>

// Page Object
this.usernameError = page.getByTestId('username-error');
```

Current ID selectors are acceptable given the documented justification.

---

## 3. Standards Compliance Summary

| Check | Standard | Result |
|---|---|---|
| No assertions inside page object | page-object-standard | ✅ Pass |
| No test scenario logic in page object | page-object-standard | ✅ Pass |
| No hardcoded waits (`waitForTimeout`) | automation-coding-standard | ✅ Pass |
| navigate() placed in owning page object | pom-standard | ✅ Pass |
| Composite `login()` action method present | pom-standard | ✅ Pass |
| `usernameInput` uses `getByLabel` (P2) | locator-standard | ✅ Pass |
| `passwordInput` uses `getByLabel` (P2) | locator-standard | ✅ Pass |
| `submitButton` uses `getByRole` (P1) | locator-standard | ✅ Pass |
| Non-standard locators documented | locator-standard | ✅ Pass |
| All async methods properly `await` actions | automation-coding-standard | ✅ Pass |
| No `any` type usage | automation-coding-standard | ✅ Pass |
| Single page per class (SRP) | pom-standard | ✅ Pass |
| Locators declared `private readonly` | page-object-standard | ⚠️ Minor — public |
| File naming follows kebab-case | automation-coding-standard | ⚠️ Minor — PascalCase |

---

## 4. Checklist Execution

| Checklist Item | Result |
|---|---|
| Page object contains no assertions | ✅ Pass |
| Locators are stable and user-facing where possible | ✅ Pass |
| `getByTestId()` used when test IDs are available | ⚠️ Advisory — no `data-testid` on components yet |
| Code does not duplicate existing page object logic | ✅ Pass |
| POM followed consistently | ✅ Pass |
| Methods are small and focused on one page-level action | ✅ Pass |
| Method and locator names follow naming standard | ✅ Pass |
| Navigation behavior in owning page object | ✅ Pass |
| No hardcoded waits | ✅ Pass |
| Test scenario logic outside the page object | ✅ Pass |

---

## 5. Locator Evidence Validation

All locators were cross-validated against `src/features/auth/components/LoginForm/LoginForm.tsx`:

| Locator | Source Evidence | Valid |
|---|---|---|
| `getByLabel('Tên đăng nhập')` | `<label htmlFor="username">Tên đăng nhập</label>` | ✅ |
| `getByLabel('Mật khẩu')` | `<label htmlFor="password">Mật khẩu</label>` | ✅ |
| `getByRole('button', { name: 'Đăng nhập' })` | `<button type="submit">Đăng nhập</button>` | ✅ |
| `locator('div[role="alert"]')` | `<div role="alert">` (server error div) | ✅ |
| `locator('#username-error')` | `<span id="username-error" role="alert">` | ✅ |
| `locator('#password-error')` | `<span id="password-error" role="alert">` | ✅ |

---

## 6. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `div[role="alert"]` breaks if element type changes | Low | Medium | Add `data-testid` to component |
| `#username-error` / `#password-error` breaks if IDs change | Low | Medium | Add `data-testid` to component |
| Public locators cause coupling if POM evolves | Medium | Low | Apply Finding 1 recommendation |
| Button name mismatch during loading state | Very Low | Low | `getByRole` partial match is acceptable here |

---

## 7. Recommendations Summary

| Priority | Action | Effort |
|---|---|---|
| 1 | Convert locators to `private readonly` with getter exposure | Low |
| 2 | Rename file to `login-page.ts` | Low |
| 3 | Add `data-testid` to `div[role="alert"]` in `LoginForm.tsx` | Low |
| 4 | Add `data-testid` to error `span` elements in `LoginForm.tsx` | Low |
