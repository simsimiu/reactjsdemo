import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginUser(email);
      localStorage.setItem('role', user.role);
      localStorage.setItem('user', JSON.stringify(user));
      //localStorage.setItem('user', JSON.stringify({ email, role }));
      navigate(user.role === 'admin' ? '/admin' : '/courses');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;