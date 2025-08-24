import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Table } from 'react-bootstrap';
import { PlusCircle, Edit, Trash2, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import eventService from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';

function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role === 'club_admin') {
      fetchAdminEvents();
    } else {
      navigate('/login'); // Redirect if not admin
    }
  }, [user, navigate]);

  const fetchAdminEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.getAdminEvents();
      setEvents(response.data.events);
    } catch (err) {
      setError(err.message || 'Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(eventId);
        fetchAdminEvents(); // Refresh the list
      } catch (err) {
        setError(err.message || 'Failed to delete event.');
      }
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/admin/events/edit/${eventId}`);
  };

  const handleViewAttendees = (eventId) => {
    navigate(`/admin/events/${eventId}/attendees`);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your events...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="display-5 fw-bold mb-0">
            <Calendar className="me-3 text-primary" />
            Manage Your Events
          </h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => navigate('/admin/events/new')}>
            <PlusCircle size={20} className="me-2" />
            Create New Event
          </Button>
        </Col>
      </Row>

      {events.length === 0 ? (
        <div className="text-center py-5">
          <Calendar size={64} className="text-muted mb-3" />
          <h4>No events created yet</h4>
          <p className="text-muted">
            Start by creating your first event!
          </p>
          <Button variant="primary" onClick={() => navigate('/admin/events/new')}>
            <PlusCircle size={20} className="me-2" />
            Create Event
          </Button>
        </div>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Attendees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{eventService.formatDate(event.date)}</td>
                <td>{event.location}</td>
                <td>{event.currentAttendees}/{event.maxAttendees}</td>
                <td>{event.isActive ? 'Active' : 'Inactive'}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(event._id)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="success" size="sm" className="me-2" onClick={() => handleViewAttendees(event._id)}>
                    <Users size={16} />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(event._id)}>
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ManageEventsPage;
