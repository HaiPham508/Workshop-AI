import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';

/**
 * Test Suite: Login Feature
 * Test Case Document: TC-US-LOGIN-01
 * Related User Story: US-LOGIN-01
 * Implementation Approach: A2 — Frontend source code analysis
 * Locator Evidence Source: src/features/auth/components/LoginForm/LoginForm.tsx
 *
 * Note: Test data uses actual mock credentials from src/mocks/users.ts.
 *   TC_LOGIN_001 uses admin/admin123 (mock data overrides the TC doc which listed 123456).
 */

const TEST_DATA = {
  validUser: { username: 'admin', password: 'admin123', displayName: 'Admin' },
  wrongPassword: { username: 'admin', password: 'wrongpass' },
  nonexistentUser: { username: 'nonexistent_user', password: 'anypassword' },
};

const ERROR_MESSAGES = {
  invalidCredentials: 'Tên đăng nhập hoặc mật khẩu không đúng',
  usernameRequired: 'Vui lòng nhập tên đăng nhập',
  passwordRequired: 'Vui lòng nhập mật khẩu',
};

test.describe('Login Feature — TC-US-LOGIN-01', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // TC_LOGIN_001 — Verify user can log in with valid username and password
  test('TC_LOGIN_001 — user can log in with valid credentials', async ({ page }) => {
    // Arrange & Act
    await loginPage.login(TEST_DATA.validUser.username, TEST_DATA.validUser.password);

    // Assert — redirected to home and UI reflects authenticated state
    await expect(page).toHaveURL('/');
    await expect(page.getByText(`Xin chào, ${TEST_DATA.validUser.displayName}`)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Đăng xuất' })).toBeVisible();
  });

  // TC_LOGIN_003 — Verify error message is shown when password is incorrect
  test('TC_LOGIN_003 — error message shown when password is incorrect', async ({ page }) => {
    // Arrange & Act
    await loginPage.login(TEST_DATA.wrongPassword.username, TEST_DATA.wrongPassword.password);

    // Assert — error shown, user stays on /login, username field retains value
    await expect(loginPage.serverErrorAlert).toBeVisible();
    await expect(loginPage.serverErrorAlert).toHaveText(ERROR_MESSAGES.invalidCredentials);
    await expect(page).toHaveURL('/login');
    await expect(loginPage.usernameInput).toHaveValue(TEST_DATA.wrongPassword.username);
  });

  // TC_LOGIN_004 — Verify error message is shown when username does not exist
  test('TC_LOGIN_004 — error message shown when username does not exist', async ({ page }) => {
    // Arrange & Act
    await loginPage.login(TEST_DATA.nonexistentUser.username, TEST_DATA.nonexistentUser.password);

    // Assert — generic error shown (no user enumeration), user stays on /login
    await expect(loginPage.serverErrorAlert).toBeVisible();
    await expect(loginPage.serverErrorAlert).toHaveText(ERROR_MESSAGES.invalidCredentials);
    await expect(page).toHaveURL('/login');
  });

  // TC_LOGIN_006 — Verify validation error when username field is empty
  test('TC_LOGIN_006 — validation error shown when username is empty', async ({ page }) => {
    // Arrange — only fill password, leave username empty
    await loginPage.fillPassword(TEST_DATA.validUser.password);

    // Act
    await loginPage.submit();

    // Assert — username validation error shown, no server error, form not submitted
    await expect(loginPage.usernameError).toBeVisible();
    await expect(loginPage.usernameError).toHaveText(ERROR_MESSAGES.usernameRequired);
    await expect(loginPage.serverErrorAlert).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  // TC_LOGIN_007 — Verify validation error when password field is empty
  test('TC_LOGIN_007 — validation error shown when password is empty', async ({ page }) => {
    // Arrange — only fill username, leave password empty
    await loginPage.fillUsername(TEST_DATA.validUser.username);

    // Act
    await loginPage.submit();

    // Assert — password validation error shown, no server error, form not submitted
    await expect(loginPage.passwordError).toBeVisible();
    await expect(loginPage.passwordError).toHaveText(ERROR_MESSAGES.passwordRequired);
    await expect(loginPage.serverErrorAlert).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});
