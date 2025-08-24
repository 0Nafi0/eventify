import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: 'var(--bs-text-muted)'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user && user.role !== requiredRole) {
    if (user.role === 'student') {
      return <Navigate to="/student-dashboard" replace />;
    } else if (user.role === 'club_admin') {
      return <Navigate to="/admin-dashboard" replace />;
    }
    
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;