import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-semibold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/admin" className="hover:text-blue-400">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/coursemanager" className="hover:text-blue-400">Quản lý nội dung</Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/usermanager" className="hover:text-blue-400">Danh sách đăng kí</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
