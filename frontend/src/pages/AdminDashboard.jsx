import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="admin-container bg-body text-body">
      <div className="text-center mb-5">
        <h1>Club Admin Dashboard</h1>
        <p>Welcome back, {user?.firstName}!</p>
        <p className="club-name">Club: {user?.clubName}</p>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h3>Admin Information</h3>
          <p>
            <strong>Name:</strong> {user?.firstName} {user?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Club:</strong> {user?.clubName}
          </p>
          <p>
            <strong>Department:</strong> {user?.department || "Not specified"}
          </p>
        </div>

        <div className="admin-card">
          <h3>Event Management</h3>
          <Link to="/admin/events/new" style={styles.button}>
            Create New Event
          </Link>
          <Link to="/admin/events" style={styles.button}>
            Manage Events
          </Link>
        </div>

        <div className="admin-card">
          <h3>Quick Stats</h3>
          <div className="admin-stat">
            <span className="admin-stat-number">12</span>
            <span className="admin-stat-label">Active Events</span>
          </div>
          <div className="admin-stat">
            <span className="admin-stat-number">156</span>
            <span className="admin-stat-label">Club Members</span>
          </div>
          <div className="admin-stat">
            <span className="admin-stat-number">8</span>
            <span className="admin-stat-label">Upcoming Events</span>
          </div>
        </div>

        <div className="admin-card">
          <h3>Account</h3>
          <button
            className="admin-btn"
            onClick={() => setShowEditProfile(true)}
          >
            Edit Profile
          </button>
          <button
            className="admin-btn"
            onClick={() => setShowChangePassword(true)}
          >
            Change Password
          </button>
          <button className="admin-btn logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        show={showEditProfile}
        onHide={() => setShowEditProfile(false)}
      />
      <ChangePasswordModal
        show={showChangePassword}
        onHide={() => setShowChangePassword(false)}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  clubName: {
    color: "#f8b700",
    fontSize: "1.2rem",
    fontWeight: "600",
    marginTop: "0.5rem",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0",
    backgroundColor: "#f8b700",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
    textDecoration: "none", // Added for Link component
    textAlign: "center", // Added for Link component
  },
  logoutButton: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem 0",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#f8b700",
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "0.5rem",
  },
};

export default AdminDashboard;
