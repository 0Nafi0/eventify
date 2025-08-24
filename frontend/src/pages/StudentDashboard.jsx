// src/pages/StudentDashboard.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { Calendar, Clock, MapPin, Users, Tag, Bookmark, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import eventService from '../services/eventService';
import EventCard from '../components/EventCard';

function StudentDashboard() {
  const location = useLocation();
  const initialTab = location.state?.activeTab || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'student') {
      fetchRegisteredEvents();
    }
  }, [user]);

  const fetchRegisteredEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await eventService.getStudentRegisteredEvents();
      setRegisteredEvents(response.data.registrations);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleUnregister = (eventId) => {
    setRegisteredEvents(prev => prev.filter(reg => reg.event._id !== eventId));
  };

  const getUpcomingEvents = () => {
    return registeredEvents.filter(reg => 
      reg.status === 'registered' && new Date(reg.event.date) > new Date()
    );
  };

  const getPastEvents = () => {
    return registeredEvents.filter(reg => 
      reg.status === 'registered' && new Date(reg.event.date) <= new Date()
    );
  };

  const getStats = () => {
    const total = registeredEvents.length;
    const upcoming = getUpcomingEvents().length;
    const past = getPastEvents().length;
    const attended = registeredEvents.filter(reg => reg.attended).length;
    
    return { total, upcoming, past, attended };
  };

  const stats = getStats();

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-6 fw-bold mb-2">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-muted mb-0">
                Manage your events and stay updated with your schedule
              </p>
            </div>
            <Button 
              variant="outline-danger" 
              onClick={handleLogout}
              className="d-flex align-items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body>
              <div className="text-primary mb-2">
                <Bookmark size={24} />
              </div>
              <h3 className="fw-bold">{stats.total}</h3>
              <p className="text-muted mb-0">Total Events</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body>
              <div className="text-success mb-2">
                <Calendar size={24} />
              </div>
              <h3 className="fw-bold">{stats.upcoming}</h3>
              <p className="text-muted mb-0">Upcoming</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body>
              <div className="text-info mb-2">
                <Clock size={24} />
              </div>
              <h3 className="fw-bold">{stats.past}</h3>
              <p className="text-muted mb-0">Past Events</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body>
              <div className="text-warning mb-2">
                <User size={24} />
              </div>
              <h3 className="fw-bold">{stats.attended}</h3>
              <p className="text-muted mb-0">Attended</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabs */}
      <Tabs 
        activeKey={activeTab} 
        onSelect={(k) => setActiveTab(k)} 
        className="mb-4"
      >
        <Tab eventKey="overview" title="Overview">
          <Row>
            <Col lg={8} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">Student Information</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                      <p><strong>Email:</strong> {user?.email}</p>
                    </Col>
                    <Col md={6}>
                      <p><strong>Student ID:</strong> {user?.studentId}</p>
                      <p><strong>Department:</strong> {user?.department || 'Not specified'}</p>
                    </Col>
                  </Row>
                  <Button variant="outline-primary" size="sm">
                    <Settings size={16} className="me-2" />
                    Edit Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">Quick Actions</h5>
                </Card.Header>
                <Card.Body className="d-grid gap-2">
                  <Button 
                    variant="outline-primary" 
                    onClick={() => navigate('/events')}
                  >
                    <Calendar size={16} className="me-2" />
                    Browse Events
                  </Button>
                  <Button variant="outline-success">
                    <Tag size={16} className="me-2" />
                    Join Club
                  </Button>
                  <Button variant="outline-info">
                    <Clock size={16} className="me-2" />
                    My Schedule
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="events" title="My Events">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-3">Loading your events...</p>
            </div>
          ) : error ? (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          ) : (
            <>
              {/* Upcoming Events */}
              {getUpcomingEvents().length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-3">Upcoming Events</h4>
                  <Row>
                    {getUpcomingEvents().map(registration => (
                      <Col key={registration._id} lg={4} md={6} className="mb-3">
                        <EventCard
                          event={registration.event}
                          onUnregister={handleUnregister}
                          showActions={true}
                          isRegistered={true}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              {/* Past Events */}
              {getPastEvents().length > 0 && (
                <div>
                  <h4 className="mb-3">Past Events</h4>
                  <Row>
                    {getPastEvents().map(registration => (
                      <Col key={registration._id} lg={4} md={6} className="mb-3">
                        <EventCard
                          event={registration.event}
                          showActions={false}
                          isRegistered={true}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              {/* No Events */}
              {registeredEvents.length === 0 && (
                <div className="text-center py-5">
                  <Calendar size={64} className="text-muted mb-3" />
                  <h4>No events registered yet</h4>
                  <p className="text-muted">
                    Start exploring and register for events to see them here
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/events')}
                  >
                    Browse Events
                  </Button>
                </div>
              )}
            </>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
}



export default StudentDashboard;
