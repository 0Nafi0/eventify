// src/pages/RegisterEvent.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo.png";

function RegisterEvent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    studentId: "",
    clubName: "",
    department: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear errors when component unmounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role,
      studentId: role === 'student' ? prev.studentId : '',
      clubName: role === 'club_admin' ? prev.clubName : ''
    }));
    setErrors(prev => ({ ...prev, studentId: '', clubName: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validation
    if (formData.role === 'student') {
      if (!formData.studentId.trim()) {
        newErrors.studentId = 'Student ID is required';
      } else if (formData.studentId.length < 3) {
        newErrors.studentId = 'Student ID must be at least 3 characters';
      }
    }

    if (formData.role === 'club_admin') {
      if (!formData.clubName.trim()) {
        newErrors.clubName = 'Club name is required';
      } else if (formData.clubName.length < 2) {
        newErrors.clubName = 'Club name must be at least 2 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Prepare user data for registration
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
        department: formData.department.trim() || undefined,
        phone: formData.phone.trim() || undefined
      };

      // Add role-specific fields
      if (formData.role === 'student') {
        userData.studentId = formData.studentId.trim();
      } else if (formData.role === 'club_admin') {
        userData.clubName = formData.clubName.trim();
      }

      await register(userData);
      
      // Registration successful - redirect will happen in useEffect
    } catch (error) {
      console.error('Registration error:', error);
      // Error is already set in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Logo */}
        <img src={logo} alt="Eventify Logo" style={styles.logo} />

        {/* Main Heading */}
        <h1 style={styles.heading}>Register for Eventify</h1>

        {/* Error Display */}
        {error && (
          <div style={styles.errorAlert}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name Fields */}
          <div style={styles.row}>
            <div style={styles.inputContainer}>
              <label htmlFor="firstName" style={styles.label}>
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                style={styles.input}
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
              {errors.firstName && (
                <span style={styles.errorText}>{errors.firstName}</span>
              )}
            </div>

            <div style={styles.inputContainer}>
              <label htmlFor="lastName" style={styles.label}>
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                style={styles.input}
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
              {errors.lastName && (
                <span style={styles.errorText}>{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.input}
              placeholder="your.email@university.edu"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              required
            />
            {errors.email && (
              <span style={styles.errorText}>{errors.email}</span>
            )}
          </div>

          {/* Password Fields */}
          <div style={styles.row}>
            <div style={styles.inputContainer}>
              <label htmlFor="password" style={styles.label}>
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                style={styles.input}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
              {errors.password && (
                <span style={styles.errorText}>{errors.password}</span>
              )}
            </div>

            <div style={styles.inputContainer}>
              <label htmlFor="confirmPassword" style={styles.label}>
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                style={styles.input}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
              {errors.confirmPassword && (
                <span style={styles.errorText}>{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* User Type */}
          <div style={styles.inputContainer}>
            <label style={styles.label}>User Type *</label>
            <div style={styles.userTypeOptions}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={() => handleRoleChange("student")}
                  style={styles.radioInput}
                  disabled={isSubmitting}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="club_admin"
                  checked={formData.role === "club_admin"}
                  onChange={() => handleRoleChange("club_admin")}
                  style={styles.radioInput}
                  disabled={isSubmitting}
                />
                Club Admin
              </label>
            </div>
          </div>

          {/* Role-specific Fields */}
          {formData.role === "student" && (
            <div style={styles.inputContainer}>
              <label htmlFor="studentId" style={styles.label}>
                Student ID *
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                style={styles.input}
                placeholder="Enter your student ID"
                value={formData.studentId}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
              {errors.studentId && (
                <span style={styles.errorText}>{errors.studentId}</span>
              )}
            </div>
          )}

          {formData.role === "club_admin" && (
            <div style={styles.inputContainer}>
              <label htmlFor="clubName" style={styles.label}>
                Club Name *
              </label>
              <input
                type="text"
                id="clubName"
                name="clubName"
                style={styles.input}
                placeholder="Enter your club name"
                value={formData.clubName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
              {errors.clubName && (
                <span style={styles.errorText}>{errors.clubName}</span>
              )}
            </div>
          )}

          {/* Optional Fields */}
          <div style={styles.row}>
            <div style={styles.inputContainer}>
              <label htmlFor="department" style={styles.label}>
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                style={styles.input}
                placeholder="Enter your department"
                value={formData.department}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <div style={styles.inputContainer}>
              <label htmlFor="phone" style={styles.label}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                style={styles.input}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
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
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  logo: {
    width: "120px",
    marginBottom: "1rem",
  },
  heading: {
    fontSize: "2rem",
    color: "#f8b700",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  },
  inputContainer: {
    flex: 1,
    marginBottom: "1rem",
    textAlign: "left",
  },
  label: {
    fontSize: "1rem",
    color: "#212529",
    fontWeight: "500",
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
    backgroundColor: "#f8b700",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "1rem",
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
  errorAlert: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "1rem",
    border: "1px solid #f5c6cb",
  },
  errorText: {
    color: "#dc3545",
    fontSize: "0.875rem",
    marginTop: "5px",
    display: "block",
  },
};

export default RegisterEvent;
