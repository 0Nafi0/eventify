import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Card, ToggleButtonGroup, ToggleButton, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';

function LoginPage() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear errors when component unmounts or role changes
  useEffect(() => {
    clearError();
    setErrors({});
  }, [role, clearError]);

  const handleRoleChange = (val) => {
    if (val) {
      setRole(val);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await login(email, password);
      
      // Login successful - redirect will happen in useEffect
    } catch (error) {
      console.error('Login error:', error);
      // Error is already set in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card className="auth-card">
        <Card.Body className="text-center">
          {/* Logo */}
          <img src={logo} alt="Eventify Logo" style={styles.logo} />

          {/* Subtitle */}
          <p style={styles.subtitle}>University Club Event Management</p>

          {/* Error Alert */}
          {error && (
            <Alert variant="danger" onClose={clearError} dismissible>
              {error}
            </Alert>
          )}

          {/* Role Toggle */}
          <ToggleButtonGroup
            type="radio"
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="w-100 mb-3"
          >
            <ToggleButton 
              id="student-btn" 
              value="student" 
              variant={role === 'student' ? "success" : "outline-success"}
            >
              Student
            </ToggleButton>
            <ToggleButton 
              id="admin-btn" 
              value="club_admin" 
              variant={role === 'club_admin' ? "success" : "outline-success"}
            >
              Club Admin
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Login Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="your.email@university.edu"
                name="email"
                value={email}
                onChange={onChange}
                isInvalid={!!errors.email}
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={onChange}
                isInvalid={!!errors.password}
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              type="submit" 
              className="btn-cta w-100" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Signing In...
                </>
              ) : (
                `Sign In as ${role === 'student' ? 'Student' : 'Club Admin'}`
              )}
            </Button>
          </Form>

          {/* Bottom Links */}
          <div className="bottom-links mt-3">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="footerLink">
                Sign Up
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
  },
  logo: {
    width: '100px',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#555',
    fontSize: '15px',
    marginTop: '5px',
  },
};

export default LoginPage;
