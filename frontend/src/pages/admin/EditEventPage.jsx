import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import eventService from '../../services/eventService';
import { Container, Alert, Spinner } from 'react-bootstrap';

function EditEventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventService.getEventById(id);
        setEvent(response.data.event);
      } catch (err) {
        setError(err.message || 'Failed to fetch event details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (eventData) => {
    try {
      setLoading(true);
      setError(null);
      await eventService.updateEvent(id, eventData);
      navigate('/admin/events'); // Redirect to manage events page
    } catch (err) {
      setError(err.message || 'Failed to update event.');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading event details...</p>
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

  if (!event) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">Event not found.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Edit Event</h2>
      <EventForm event={event} onSubmit={handleSubmit} loading={loading} error={error} />
    </Container>
  );
}

export default EditEventPage;
