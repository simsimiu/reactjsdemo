import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import QuizPage from './pages/QuizPage';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
   

      <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <main className="flex-grow bg-gray-50 px-4 py-6">
      <div className="flex bg-gradient-to-br from-blue-100 via-white to-pink-100 ">
        <Routes>
          <Route path="/admin/*" element={<AdminSidebar />} />
        </Routes>

        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Home />} />
            <Route path="/reactjs" element={<CourseInfo />} />
            <Route path="/quizpage" element={<QuizPage />} />
            <Route path="/admin" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="coursemanager" element={<CourseManager />} />
              <Route path="usermanager" element={<UserManager />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
