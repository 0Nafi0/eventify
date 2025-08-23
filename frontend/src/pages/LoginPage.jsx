import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and login logic
    console.log("Logging in with email:", email, "password:", password);
  };

  return (
    <div style={styles.container}>
      <Card className="auth-card">
        <Card.Body>
          <h1 className="auth-title">Login to Eventify</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={onChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
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

            <Button type="submit" className="btn-cta">Login</Button>
          </Form>

          <div className="bottom-links">
            <p>
              Don't have an account? <Link to="/register-event" className="footerLink">Sign Up</Link>
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
  },
};

export default LoginPage;
