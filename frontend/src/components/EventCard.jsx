// src/components/EventCard.jsx

import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Calendar, Clock, MapPin, Users, Tag } from "lucide-react";
import eventService from "../services/eventService";

const EventCard = ({
  event,
  onRegister,
  onUnregister,
  showActions = true,
  isRegistered = false,
}) => {
  if (!event) return null;
  const handleRegister = async () => {
    try {
      await eventService.registerForEvent(event._id);
      onRegister && onRegister(event._id);
    } catch (error) {
      console.error("Registration error:", error);
      // You can add toast notification here
    }
  };

  const handleUnregister = async () => {
    try {
      await eventService.unregisterFromEvent(event._id);
      onUnregister && onUnregister(event._id);
    } catch (error) {
      console.error("Unregistration error:", error);
      // You can add toast notification here
    }
  };

  const getStatusBadge = () => {
    if (event.isFull) {
      return <Badge bg="danger">Full</Badge>;
    }
    if (!event.isRegistrationOpen) {
      return <Badge bg="warning">Registration Closed</Badge>;
    }
    if (isRegistered) {
      return <Badge bg="success">Registered</Badge>;
    }
    return <Badge bg="primary">Open</Badge>;
  };

  const getActionButton = () => {
    if (!showActions) return null;

    if (event.isFull && !isRegistered) {
      return (
        <Button variant="secondary" disabled size="sm">
          Event Full
        </Button>
      );
    }

    if (!event.isRegistrationOpen && !isRegistered) {
      return (
        <Button variant="secondary" disabled size="sm">
          Registration Closed
        </Button>
      );
    }

    if (isRegistered) {
      return (
        <Button variant="outline-danger" size="sm" onClick={handleUnregister}>
          Unregister
        </Button>
      );
    }

    return (
      <Button variant="success" size="sm" onClick={handleRegister}>
        Register
      </Button>
    );
  };

  // Don't show registered badge if not authenticated
  const renderStatusBadge = () => {
    if (!showActions && !isRegistered) {
      return event.isFull ? (
        <Badge bg="danger">Full</Badge>
      ) : !event.isRegistrationOpen ? (
        <Badge bg="warning">Registration Closed</Badge>
      ) : (
        <Badge bg="primary">Open</Badge>
      );
    }
    return getStatusBadge();
  };

  return (
    <Card className="event-card h-100 shadow-sm">
      {event.image && (
        <Card.Img
          variant="top"
          src={event.image}
          alt={event.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          {renderStatusBadge()}
          <Badge
            bg="light"
            text="dark"
            className="ms-2"
            style={{
              backgroundColor:
                eventService.getCategoryColor(event.category) + "20",
              color: eventService.getCategoryColor(event.category),
              border: `1px solid ${eventService.getCategoryColor(
                event.category
              )}`,
            }}
          >
            {eventService.getCategoryDisplayName(event.category)}
          </Badge>
        </div>

        <Card.Title className="h5 mb-3">{event.title}</Card.Title>

        <Card.Text className="text-muted mb-3 flex-grow-1">
          {event.description.length > 120
            ? `${event.description.substring(0, 120)}...`
            : event.description}
        </Card.Text>

        <div className="event-details mb-3">
          <div className="d-flex align-items-center mb-2">
            <Calendar size={16} className="me-2 text-primary" />
            <small>{eventService.formatDate(event.date)}</small>
          </div>

          <div className="d-flex align-items-center mb-2">
            <Clock size={16} className="me-2 text-primary" />
            <small>
              {event.startTime} - {event.endTime}
            </small>
          </div>

          <div className="d-flex align-items-center mb-2">
            <MapPin size={16} className="me-2 text-primary" />
            <small>{event.location}</small>
          </div>

          <div className="d-flex align-items-center mb-2">
            <Users size={16} className="me-2 text-primary" />
            <small>
              {event.currentAttendees}/{event.maxAttendees} attendees
            </small>
          </div>

          <div className="d-flex align-items-center">
            <Tag size={16} className="me-2 text-primary" />
            <small>{event.clubName}</small>
          </div>
        </div>

        {showActions && <div className="mt-auto">{getActionButton()}</div>}
      </Card.Body>
    </Card>
  );
};

export default EventCard;
