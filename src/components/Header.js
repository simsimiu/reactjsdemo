import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout, user }) => {
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      setUserEmail(user.email);
    } else {
      setUserEmail('');
    }
  }, [isLoggedIn, user]);

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-3xl font-bold text-white flex items-center space-x-3">
          {/* Optional: Logo or Icon */}
          <span className="text-4xl text-white">📘</span>
          <h1>ReactJSDemo</h1>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center text-lg font-medium">
            <li><Link to="/" className="hover:text-yellow-300 transition-colors">Trang chủ</Link></li>
            <li><Link to="/reactjs" className="hover:text-yellow-300 transition-colors">Khóa học ReactJS</Link></li>
            <li><Link to="/quizpage" className="hover:text-yellow-300 transition-colors">Kiểm tra</Link></li>

            {isLoggedIn ? (
              <>
                <li className="text-sm text-gray-200">👤 {user?.email}</li>
                <li>
                  <button 
                    onClick={onLogout} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">
                    Đăng xuất
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-yellow-300 transition-colors">Đăng nhập</Link></li>
                <li><Link to="/register" className="hover:text-yellow-300 transition-colors">Đăng ký</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
