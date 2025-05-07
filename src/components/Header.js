import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-semibold">
          <h1>ReactJSDemo</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-blue-400">Trang chủ</Link></li>
            <li><Link to="/courses" className="hover:text-blue-400">Khóa học</Link></li>
            <li><Link to="/reactjs" className="hover:text-blue-400">Khóa học ReactJS</Link></li>
            {/* Conditional rendering for Login/Register vs Logout */}
            {isLoggedIn ? (
              <li>
                <button onClick={onLogout} className="hover:text-blue-400">Đăng xuất</button>
              </li>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-400">Đăng nhập</Link></li>
                <li><Link to="/register" className="hover:text-blue-400">Đăng ký</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
