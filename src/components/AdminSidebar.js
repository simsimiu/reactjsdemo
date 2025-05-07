import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiBook, FiUsers } from 'react-icons/fi'; // Sử dụng react-icons

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: <FiGrid /> },
    { label: 'Quản lý nội dung', path: '/admin/coursemanager', icon: <FiBook /> },
    { label: 'Danh sách đăng kí', path: '/admin/usermanager', icon: <FiUsers /> },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all 
                  ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 hover:text-blue-300'}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminSidebar;
