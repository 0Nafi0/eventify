import React from "react";
import { Modal, Button, Table, Badge } from "react-bootstrap";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format, parse } from "date-fns";

function ScheduleModal({ show, onHide, events }) {
  const sortedEvents = [...events]
    .filter((reg) => reg.status === "registered")
    .sort((a, b) => new Date(a.event.date) - new Date(b.event.date));

  const formatDate = (date) => {
    try {
      return format(new Date(date), "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const formatTime = (time) => {
    try {
      // Handle cases where time might be undefined or null
      if (!time) return "TBA";

      // Check if time is already in HH:mm format
      if (time.match(/^\d{2}:\d{2}$/)) {
        const parsedTime = parse(time, "HH:mm", new Date());
        return format(parsedTime, "hh:mm a");
      }

      // If time is in different format or invalid, return as is
      return time;
    } catch (error) {
      console.error("Error formatting time:", error);
      return time || "TBA";
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>My Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {sortedEvents.length === 0 ? (
          <div className="text-center py-4">
            <Calendar size={48} className="text-muted mb-3" />
            <h5>No upcoming events</h5>
            <p className="text-muted">
              You haven't registered for any events yet.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedEvents.map((registration) => (
                  <tr key={registration._id}>
                    <td>{registration.event.title}</td>
                    <td>
                      <Calendar size={14} className="me-1" />
                      {formatDate(registration.event.date)}
                    </td>
                    <td>
                      <Clock size={14} className="me-1" />
                      {formatTime(registration.event.startTime)}
                    </td>
                    <td>
                      <MapPin size={14} className="me-1" />
                      {registration.event.location}
                    </td>
                    <td>
                      {new Date(registration.event.date) > new Date() ? (
                        <Badge bg="primary">Upcoming</Badge>
                      ) : (
                        <Badge bg="secondary">Past</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ScheduleModal;
