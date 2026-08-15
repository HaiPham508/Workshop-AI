# Findings Summary — Page Object Review: LoginPage

**File:** `e2e/src/pages/LoginPage.ts`
**Date:** 2026-08-15
**Verdict:** ✅ Approved with Minor Issues

---

## Findings at a Glance

| ID | Finding | Severity | Status |
|---|---|---|---|
| F-01 | Locators declared `public readonly` instead of `private readonly` | Minor | Open |
| F-02 | File named `LoginPage.ts` instead of `login-page.ts` | Minor | Open |
| F-03 | `serverErrorAlert` uses CSS selector (P6) — justified, `data-testid` preferred | Advisory | Accepted |
| F-04 | Field error locators use ID selectors (P6) — justified, `data-testid` preferred | Advisory | Accepted |

---

## What Passes

- No assertions inside the page object
- No hardcoded waits
- No test scenario logic
- `navigate()` correctly placed in the owning page object
- `login()` composite method correctly abstracts the full login workflow
- All locators cross-validated against `LoginForm.tsx` source — all match
- Top-tier locators used where possible: `getByLabel` (P2) for inputs, `getByRole` (P1) for button
- Non-standard locator choices are documented with clear justification comments
- TypeScript strict typing — no `any` usage
- All async methods properly await Playwright actions

---

## Required Actions Before Merge

1. **[F-01]** Convert locators to `private readonly` and expose via getters, or document a team-wide decision to keep selected locators public for assertion purposes.
2. **[F-02]** Rename `LoginPage.ts` → `login-page.ts` and update the corresponding import in `login.spec.ts`.

---

## Optional Improvements (Post-Merge)

3. **[F-03]** Add `data-testid="server-error"` to the `<div role="alert">` in `LoginForm.tsx` and upgrade the locator to `getByTestId('server-error')`.
4. **[F-04]** Add `data-testid` to `#username-error` and `#password-error` spans and upgrade locators to `getByTestId`.
