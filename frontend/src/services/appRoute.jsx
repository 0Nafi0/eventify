// src/services/appRoute.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import StudentDashboard from '../pages/StudentDashboard.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';  
import EventDetails from '../pages/EventDetails.jsx';
import RegisterEvent from '../pages/RegisterEvent.jsx';
import { ThemeProvider } from '../context/ThemeContext';  

function AppRoute() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />  
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/register-event" element={<RegisterEvent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default AppRoute;