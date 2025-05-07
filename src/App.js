import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import Home from './pages/Home'; 
import Dashboard from './pages/Admin/Dashboard';
import CourseManager from './pages/Admin/CourseManager';
import UserManager from './pages/Admin/UserManager';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import CourseInfo from './pages/CourseInfo';

function App() {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') ? true : false);

  // Handle login/logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user'); // Or any other action to log out
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="flex">
        <Routes>
          <Route path="/admin/*" element={<AdminSidebar />} />
        </Routes>
        
        <div className="flex-grow mt-4 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/reactjs" element={<CourseInfo />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="" element={<Dashboard />} />
              <Route path="coursemanager" element={<CourseManager />} />
              <Route path="usermanager" element={<UserManager />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
