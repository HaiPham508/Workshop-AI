# Example: Login Automation Script

This example illustrates the required `test.step()` pattern for all automation scripts in this project.
Each Arrange, Act, and Assert phase must be wrapped in `test.step()` so that Playwright HTML Report and Trace Viewer display individual step durations and pinpoint the exact phase that failed.

## When to combine Arrange & Act

Use `'Arrange & Act — ...'` when setup and the primary action are a single atomic helper call (e.g. `login()`). Split into separate steps when the setup and the action are distinct operations.

## Full Example

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';

/**
 * Test Suite: Login Feature
 * Test Case Document: TC-US-LOGIN-01
 * Related User Story: US-LOGIN-01
 * Implementation Approach: A2 — Frontend source code analysis
 * Locator Evidence Source: src/features/auth/components/LoginForm/LoginForm.tsx
 */

const TEST_DATA = {
  validUser: { username: 'admin', password: 'admin123', displayName: 'Admin' },
  wrongPassword: { username: 'admin', password: 'wrongpass' },
};

const ERROR_MESSAGES = {
  invalidCredentials: 'Tên đăng nhập hoặc mật khẩu không đúng',
  usernameRequired: 'Vui lòng nhập tên đăng nhập',
};

test.describe('Login Feature — TC-US-LOGIN-01', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // Arrange & Act combined — login() is a single atomic helper
  test('TC_LOGIN_001 — user can log in with valid credentials', async ({ page }) => {
    await test.step('Arrange & Act — submit valid credentials', async () => {
      await loginPage.login(TEST_DATA.validUser.username, TEST_DATA.validUser.password);
    });

    await test.step('Assert — redirected to home and UI reflects authenticated state', async () => {
      await expect(page).toHaveURL('/');
      await expect(page.getByText(`Xin chào, ${TEST_DATA.validUser.displayName}`)).toBeVisible();
      await expect(page.getByRole('button', { name: 'Đăng xuất' })).toBeVisible();
    });
  });

  // Arrange & Act combined — wrong password triggers server error
  test('TC_LOGIN_003 — error message shown when password is incorrect', async ({ page }) => {
    await test.step('Arrange & Act — submit login with wrong password', async () => {
      await loginPage.login(TEST_DATA.wrongPassword.username, TEST_DATA.wrongPassword.password);
    });

    await test.step('Assert — error shown, user stays on /login, username field retains value', async () => {
      await expect(loginPage.serverErrorAlert).toBeVisible();
      await expect(loginPage.serverErrorAlert).toHaveText(ERROR_MESSAGES.invalidCredentials);
      await expect(page).toHaveURL('/login');
      await expect(loginPage.usernameInput).toHaveValue(TEST_DATA.wrongPassword.username);
    });
  });

  // Separate Arrange / Act — fill and submit are distinct operations
  test('TC_LOGIN_006 — validation error shown when username is empty', async ({ page }) => {
    await test.step('Arrange — fill password only, leave username empty', async () => {
      await loginPage.fillPassword(TEST_DATA.validUser.password);
    });

    await test.step('Act — submit the form', async () => {
      await loginPage.submit();
    });

    await test.step('Assert — username validation error shown, no server error, form not submitted', async () => {
      await expect(loginPage.usernameError).toBeVisible();
      await expect(loginPage.usernameError).toHaveText(ERROR_MESSAGES.usernameRequired);
      await expect(loginPage.serverErrorAlert).not.toBeVisible();
      await expect(page).toHaveURL('/login');
    });
  });
});
```

## Step naming rules

| Phase | Pattern | When to use |
|---|---|---|
| `Arrange — <description>` | Setup only, no action | Setup and action are separate steps |
| `Act — <description>` | Action only, no setup | Setup and action are separate steps |
| `Arrange & Act — <description>` | Combined setup + action | A single helper call does both |
| `Assert — <description>` | Assertions only | Always the final step(s) |
