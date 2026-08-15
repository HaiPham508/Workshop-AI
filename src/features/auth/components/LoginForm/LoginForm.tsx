import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import type { LoginCredentials } from '../../types/auth.types';

interface FormErrors {
  username?: string;
  password?: string;
}

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading, errorMessage } = useLogin();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validate = useCallback((): boolean => {
    const errors: FormErrors = {};
    if (!credentials.username.trim()) {
      errors.username = 'Vui lòng nhập tên đăng nhập';
    }
    if (!credentials.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [credentials]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validate()) return;

      const success = await login(credentials);
      if (success) {
        onSuccess();
      }
    },
    [validate, login, credentials, onSuccess],
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {errorMessage && (
        <div role="alert" data-testid="server-error" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Tên đăng nhập
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          value={credentials.username}
          onChange={handleChange}
          aria-describedby={formErrors.username ? 'username-error' : undefined}
          aria-invalid={!!formErrors.username}
          className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.username ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Nhập tên đăng nhập"
        />
        {formErrors.username && (
          <span id="username-error" data-testid="username-error" role="alert" className="text-xs text-red-600">
            {formErrors.username}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={credentials.password}
          onChange={handleChange}
          aria-describedby={formErrors.password ? 'password-error' : undefined}
          aria-invalid={!!formErrors.password}
          className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Nhập mật khẩu"
        />
        {formErrors.password && (
          <span id="password-error" data-testid="password-error" role="alert" className="text-xs text-red-600">
            {formErrors.password}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:underline">
          Đăng ký
        </Link>
      </p>
    </form>
  );
};
