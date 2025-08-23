// src/pages/RegisterEvent.jsx
import React, { useState } from "react";
import logo from "../assets/images/logo.png"; // Adjust path to your logo file

function RegisterEvent() {
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Type:", userType);
    console.log("User Name:", userName);
    console.log("Password:", password);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Logo */}
        <img src={logo} alt="Eventify Logo" style={styles.logo} />

        {/* Main Heading */}
        <h1 style={styles.heading}>Register for Eventify</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="userName" style={styles.label}>
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              style={styles.input}
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <label style={styles.label}>User Type</label>
            <div style={styles.userTypeOptions}>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={userType === "student"}
                  onChange={() => setUserType("student")}
                  style={styles.radioInput}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={() => setUserType("admin")}
                  style={styles.radioInput}
                />
                Club Admin
              </label>
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>
            Sign Up
          </button>
          <p style={styles.footerText}>
            Already have an account?{" "}
            <a href="/login" style={styles.footerLink}>
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
  },
  logo: {
    width: "120px", // made bigger
    marginBottom: "1rem",
  },
  heading: {
    fontSize: "2rem",
    color: "#f8b700", // Yellow color
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  label: {
    fontSize: "1rem",
    color: "#212529",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginTop: "5px",
  },
  userTypeOptions: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  radioInput: {
    marginRight: "5px",
  },
  submitButton: {
    padding: "12px",
    fontSize: "1.2rem",
    color: "white",
    backgroundColor: "#f8b700", // Yellow color
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#ffcc00",
  },
  footerText: {
    marginTop: "1.5rem",
    fontSize: "0.9rem",
    color: "#212529",
  },
  footerLink: {
    color: "#f8b700",
    textDecoration: "none",
  },
};

export default RegisterEvent;
