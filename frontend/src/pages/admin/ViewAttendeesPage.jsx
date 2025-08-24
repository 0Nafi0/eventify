import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../../services/eventService';
import { Container, Alert, Spinner, Table, Row, Col } from 'react-bootstrap';
import { Users, Calendar } from 'lucide-react';

function ViewAttendeesPage() {
  const { id } = useParams(); // Event ID
  const [attendees, setAttendees] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventService.getEventAttendees(id);
        setAttendees(response.data.attendees);
        // Fetch event details to get the title
        const eventResponse = await eventService.getEventById(id);
        setEventTitle(eventResponse.data.event.title);
      } catch (err) {
        setError(err.message || 'Failed to fetch attendees.');
      } finally {
        setLoading(false);
      }
    };
    fetchAttendees();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading attendees...</p>
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
            <Users className="me-3 text-primary" />
            Attendees for "{eventTitle}"
          </h1>
        </Col>
      </Row>

      {attendees.length === 0 ? (
        <div className="text-center py-5">
          <Users size={64} className="text-muted mb-3" />
          <h4>No attendees registered for this event yet.</h4>
          <p className="text-muted">
            Share your event to get more registrations!
          </p>
        </div>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registration Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee._id}>
                <td>{attendee.student.studentId}</td>
                <td>{attendee.student.firstName} {attendee.student.lastName}</td>
                <td>{attendee.student.email}</td>
                <td>{eventService.formatDate(attendee.registrationDate)}</td>
                <td>{attendee.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ViewAttendeesPage;
