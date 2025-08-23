import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access if required
  if (requiredRole && user && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    if (user.role === 'student') {
      return <Navigate to="/student-dashboard" replace />;
    } else if (user.role === 'club_admin') {
      return <Navigate to="/admin-dashboard" replace />;
    }
    
    // Fallback to home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
