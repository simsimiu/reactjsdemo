// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Navigate to="/login" replace />;

  // Kiểm tra quyền
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />; // hoặc trang báo lỗi quyền hạn
  }

  return <Outlet />;
};

export default PrivateRoute;
