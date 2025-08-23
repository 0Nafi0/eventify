import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import logo from '../assets/images/logo.png'; // <-- place your logo inside src/assets/logo.png

function LoginPage() {
  const [role, setRole] = useState('student'); // student | admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleRoleChange = (val) => {
    setRole(val);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${role} with`, email, password);
    // here you can add login logic based on role
  };

  return (
    <div style={styles.container}>
      <Card className="auth-card">
        <Card.Body className="text-center">
          {/* Logo */}
          <img src={logo} alt="Eventify Logo" style={styles.logo} />

          {/* Subtitle */}
          <p style={styles.subtitle}>University Club Event Management</p>

          {/* Role Toggle */}
          <ToggleButtonGroup
            type="radio"
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="w-100 mb-3"
          >
            <ToggleButton id="student-btn" value="student" variant={role === 'student' ? "success" : "outline-success"}>
              Student
            </ToggleButton>
            <ToggleButton id="admin-btn" value="admin" variant={role === 'admin' ? "success" : "outline-success"}>
              Club Admin
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Login Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="your.email@aust.edu"
                name="email"
                value={email}
                onChange={onChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="btn-cta w-100">
              {role === 'student' ? "Sign In as Student" : "Sign In as Admin"}
            </Button>
          </Form>

          {/* Bottom Links */}
          <div className="bottom-links mt-3">
            <p>
              Don’t have an account?{' '}
              <Link to="/register-event" className="footerLink">
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
