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
     
      <hr />
      <Outlet />
    </div>
  );
};

export default Dashboard;
