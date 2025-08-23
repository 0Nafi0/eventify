// src/pages/AdminDashboard.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
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
        <h1>Club Admin Dashboard</h1>
        <p>Welcome back, {user?.firstName}!</p>
        <p style={styles.clubName}>Club: {user?.clubName}</p>
      </div>
      
      <div style={styles.content}>
        <div style={styles.card}>
          <h3>Admin Information</h3>
          <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Club:</strong> {user?.clubName}</p>
          <p><strong>Department:</strong> {user?.department || 'Not specified'}</p>
        </div>
        
        <div style={styles.card}>
          <h3>Club Management</h3>
          <button style={styles.button}>Create Event</button>
          <button style={styles.button}>Manage Events</button>
          <button style={styles.button}>Club Members</button>
          <button style={styles.button}>Club Settings</button>
        </div>
        
        <div style={styles.card}>
          <h3>Quick Stats</h3>
          <div style={styles.stat}>
            <span style={styles.statNumber}>12</span>
            <span style={styles.statLabel}>Active Events</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>156</span>
            <span style={styles.statLabel}>Club Members</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>8</span>
            <span style={styles.statLabel}>Upcoming Events</span>
          </div>
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
  clubName: {
    color: '#f8b700',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginTop: '0.5rem',
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
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem 0',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#f8b700',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: '0.5rem',
  },
};

export default AdminDashboard;
