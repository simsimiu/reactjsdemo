import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ.');
      return false;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await registerUser(email, password);
      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Đăng ký tài khoản</h2>

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
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Đăng ký
      </button>

      {success && <p className="mt-3 text-green-600 text-center">✅ Đăng ký thành công! Chuyển hướng...</p>}
      {error && <p className="mt-3 text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default Register;
