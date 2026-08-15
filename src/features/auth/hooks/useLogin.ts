import { useCallback, useState } from 'react';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../types/auth.types';
import { useAuthContext } from '../context/AuthContext';

interface UseLoginReturn {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  isLoading: boolean;
  errorMessage: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      setIsLoading(true);
      setErrorMessage(null);

      const result = await authService.login(credentials);

      setIsLoading(false);

      if (result.success && result.user) {
        setUser(result.user);
        return true;
      }

      setErrorMessage(result.errorMessage ?? 'Đã xảy ra lỗi, vui lòng thử lại');
      return false;
    },
    [setUser],
  );

  return { login, isLoading, errorMessage };
};
