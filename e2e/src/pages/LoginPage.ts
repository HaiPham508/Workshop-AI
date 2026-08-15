import { type Page, type Locator } from '@playwright/test';

/**
 * LoginPage — Page Object for /login
 *
 * Source: src/features/auth/components/LoginForm/LoginForm.tsx
 * Locator evidence: frontend source code analysis (Approach A2)
 */
export class LoginPage {
  private readonly _usernameInput: Locator;
  private readonly _passwordInput: Locator;
  private readonly _submitButton: Locator;
  private readonly _serverErrorAlert: Locator;
  private readonly _usernameError: Locator;
  private readonly _passwordError: Locator;

  constructor(private readonly page: Page) {
    this._usernameInput = page.getByLabel('Tên đăng nhập');
    this._passwordInput = page.getByLabel('Mật khẩu');
    this._submitButton = page.getByRole('button', { name: 'Đăng nhập' });
    this._serverErrorAlert = page.getByTestId('server-error');
    this._usernameError = page.getByTestId('username-error');
    this._passwordError = page.getByTestId('password-error');
  }

  // Locator getters — exposed for assertion use in test scripts
  get usernameInput(): Locator { return this._usernameInput; }
  get serverErrorAlert(): Locator { return this._serverErrorAlert; }
  get usernameError(): Locator { return this._usernameError; }
  get passwordError(): Locator { return this._passwordError; }

  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  async fillUsername(username: string): Promise<void> {
    await this._usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this._passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this._submitButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }
}
