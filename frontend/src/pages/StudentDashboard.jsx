// src/pages/StudentDashboard.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Student Dashboard</h1>
        <p>Welcome back, {user?.firstName}!</p>
      </div>
      
      <div style={styles.content}>
        <div style={styles.card}>
          <h3>Student Information</h3>
          <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Student ID:</strong> {user?.studentId}</p>
          <p><strong>Department:</strong> {user?.department || 'Not specified'}</p>
        </div>
        
        <div style={styles.card}>
          <h3>Quick Actions</h3>
          <button style={styles.button}>View Events</button>
          <button style={styles.button}>Join Club</button>
          <button style={styles.button}>My Schedule</button>
        </div>
        
        <div style={styles.card}>
          <h3>Account</h3>
          <button style={styles.button}>Edit Profile</button>
          <button style={styles.button}>Change Password</button>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    backgroundColor: '#f8b700',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  logoutButton: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
};

export default StudentDashboard;
