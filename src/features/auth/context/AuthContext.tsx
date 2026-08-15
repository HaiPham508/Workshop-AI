import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { AuthUser } from '../types/auth.types';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<AuthUser | null>(() => authService.getStoredUser());

  const setUser = useCallback((newUser: AuthUser | null) => {
    setUserState(newUser);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return ctx;
};
