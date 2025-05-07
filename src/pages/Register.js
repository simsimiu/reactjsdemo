import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(email);
      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Đăng ký tài khoản</h2>
      <input
        type="email"
        placeholder="Nhập email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Đăng ký</button>
      {success && <p style={{ color: 'green' }}>Đăng ký thành công!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;