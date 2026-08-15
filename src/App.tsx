import { Route, Routes, Link } from 'react-router-dom'
import { LoginPage, useAuthContext } from './features/auth'
import './index.css'

const HomePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthContext()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Product App</h1>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Xin chào, <strong>{user?.displayName}</strong></span>
            <button
              onClick={logout}
              className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Đăng nhập
          </Link>
        )}
      </header>
      <p className="text-gray-500">Trang danh sách sản phẩm (sẽ được triển khai ở story tiếp theo)</p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App