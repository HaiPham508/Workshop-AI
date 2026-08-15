import { MOCK_USERS } from '../../../mocks/users';
import type { AuthUser, LoginCredentials, LoginResult } from '../types/auth.types';

const AUTH_USER_KEY = 'auth_user';

const simulateNetworkDelay = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 400));

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResult> {
    await simulateNetworkDelay();

    const matched = MOCK_USERS.find(
      (u) => u.username === credentials.username && u.password === credentials.password,
    );

    if (!matched) {
      return {
        success: false,
        errorMessage: 'Tên đăng nhập hoặc mật khẩu không đúng',
      };
    }

    const user: AuthUser = {
      id: matched.id,
      username: matched.username,
      displayName: matched.displayName,
    };

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

    return { success: true, user };
  },

  logout(): void {
    localStorage.removeItem(AUTH_USER_KEY);
  },

  getStoredUser(): AuthUser | null {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  },
};
