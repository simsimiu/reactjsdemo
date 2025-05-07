import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

const Login = ({ setUser, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!email || !password) {
      setError('Vui lòng nhập Email và Mật khẩu.');
      return false;
    }
    return true;
  };
   // ✅ Nếu đã đăng nhập, redirect sang trang chính
   useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/courses');
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const user = await loginUser(email, password);
      localStorage.setItem('role', user.role);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      navigate(user.role === 'admin' ? '/admin' : '/courses');     

    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Đăng nhập</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Mật khẩu</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Đăng nhập
      </button>

      {error && <p className="mt-3 text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default Login;
