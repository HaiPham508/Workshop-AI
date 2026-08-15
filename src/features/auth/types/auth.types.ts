export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export interface LoginResult {
  success: boolean;
  user?: AuthUser;
  errorMessage?: string;
}
