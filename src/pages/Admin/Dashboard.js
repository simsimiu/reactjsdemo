import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h1>Trang Admin</h1>
      <nav>
        <Link to="/admin/coursemanager">Quản lý chương học</Link> |{' '}
        <Link to="/admin/usermanager">Quản lý người dùng</Link> |{' '}
        <button onClick={handleLogout}>Đăng xuất</button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default Dashboard;
