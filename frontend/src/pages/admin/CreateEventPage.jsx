import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import eventService from '../../services/eventService';
import { Container, Alert } from 'react-bootstrap';

function CreateEventPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (eventData) => {
    try {
      setLoading(true);
      setError(null);
      await eventService.createEvent(eventData);
      navigate('/admin/events'); // Redirect to manage events page
    } catch (err) {
      console.error('Error creating event:', err); // Log the full error object

      if (err.response && err.response.errors && Array.isArray(err.response.errors)) {
        // If the error has a 'response' object with 'errors' array (from backend validation)
        const validationErrors = err.response.errors.map(e => e.message).join(', ');
        setError(`Validation failed: ${validationErrors}`);
      } else if (err.message) {
        // For other errors (e.g., network issues, or generic messages from backend)
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      {/* Removed the h2 tag here */}
      {error && <Alert variant="danger">{error}</Alert>}
      <EventForm onSubmit={handleSubmit} loading={loading} error={error} />
    </Container>
  );
}

export default CreateEventPage;
