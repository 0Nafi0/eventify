import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Calendar, Clock, MapPin, Users, Tag, Info, Image as ImageIcon, FileText } from 'lucide-react';
import eventService from '../../services/eventService'; // For category display names

const EventForm = ({ event: initialEvent, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    maxAttendees: '',
    category: 'academic', // Default category
    registrationDeadline: '',
    image: '',
    tags: '', // Comma-separated string
    requirements: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialEvent) {
      // Format date and registration deadline for input fields (YYYY-MM-DD)
      const eventDate = initialEvent.date ? new Date(initialEvent.date).toISOString().split('T')[0] : '';
      const regDeadline = initialEvent.registrationDeadline ? new Date(initialEvent.registrationDeadline).toISOString().split('T')[0] : '';

      setFormData({
        title: initialEvent.title || '',
        description: initialEvent.description || '',
        date: eventDate,
        startTime: initialEvent.startTime || '',
        endTime: initialEvent.endTime || '',
        location: initialEvent.location || '',
        maxAttendees: initialEvent.maxAttendees || '',
        category: initialEvent.category || 'academic',
        registrationDeadline: regDeadline,
        image: initialEvent.image || '',
        tags: initialEvent.tags ? initialEvent.tags.join(', ') : '',
        requirements: initialEvent.requirements || '',
        contactInfo: {
          name: initialEvent.contactInfo?.name || '',
          email: initialEvent.contactInfo?.email || '',
          phone: initialEvent.contactInfo?.phone || '',
        },
      });
    }
  }, [initialEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contactInfo.')) {
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error for the field being changed
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.startTime) errors.startTime = 'Start time is required';
    if (!formData.endTime) errors.endTime = 'End time is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.maxAttendees || formData.maxAttendees <= 0) errors.maxAttendees = 'Max attendees must be a positive number';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.registrationDeadline) errors.registrationDeadline = 'Registration deadline is required';

    // Date and time comparisons
    const eventDate = new Date(formData.date);
    const regDeadline = new Date(formData.registrationDeadline);
    const now = new Date();

    if (eventDate < now && !initialEvent) errors.date = 'Event date cannot be in the past';
    if (regDeadline < now && !initialEvent) errors.registrationDeadline = 'Registration deadline cannot be in the past';
    if (regDeadline >= eventDate) errors.registrationDeadline = 'Registration deadline must be before event date';

    // Time comparison (simple, assumes same day)
    if (formData.startTime && formData.endTime) {
      const [startHour, startMinute] = formData.startTime.split(':').map(Number);
      const [endHour, endMinute] = formData.endTime.split(':').map(Number);
      if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
        errors.endTime = 'End time must be after start time';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit = {
        ...formData,
        maxAttendees: parseInt(formData.maxAttendees, 10),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      };
      onSubmit(dataToSubmit);
    }
  };

  const categories = [
    { value: "academic", label: "Academic" },
    { value: "social", label: "Social" },
    { value: "sports", label: "Sports" },
    { value: "cultural", label: "Cultural" },
    { value: "technical", label: "Technical" },
    { value: "workshop", label: "Workshop" },
    { value: "seminar", label: "Seminar" },
    { value: "other", label: "Other" },
  ];

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">{initialEvent ? 'Edit Event' : 'Create New Event'}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label><Info size={16} className="me-1" /> Event Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                isInvalid={!!formErrors.title}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{formErrors.title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label><FileText size={16} className="me-1" /> Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!formErrors.description}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Form.Group as={Col} md={6} className="mb-3" controlId="date">
                <Form.Label><Calendar size={16} className="me-1" /> Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  isInvalid={!!formErrors.date}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">{formErrors.date}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6} className="mb-3" controlId="registrationDeadline">
                <Form.Label><Calendar size={16} className="me-1" /> Registration Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  isInvalid={!!formErrors.registrationDeadline}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">{formErrors.registrationDeadline}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md={6} className="mb-3" controlId="startTime">
                <Form.Label><Clock size={16} className="me-1" /> Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  isInvalid={!!formErrors.startTime}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">{formErrors.startTime}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6} className="mb-3" controlId="endTime">
                <Form.Label><Clock size={16} className="me-1" /> End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  isInvalid={!!formErrors.endTime}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">{formErrors.endTime}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label><MapPin size={16} className="me-1" /> Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                isInvalid={!!formErrors.location}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{formErrors.location}</Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Form.Group as={Col} md={6} className="mb-3" controlId="maxAttendees">
                <Form.Label><Users size={16} className="me-1" /> Max Attendees</Form.Label>
                <Form.Control
                  type="number"
                  name="maxAttendees"
                  value={formData.maxAttendees}
                  onChange={handleChange}
                  isInvalid={!!formErrors.maxAttendees}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">{formErrors.maxAttendees}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6} className="mb-3" controlId="category">
                <Form.Label><Tag size={16} className="me-1" /> Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  isInvalid={!!formErrors.category}
                  disabled={loading}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{formErrors.category}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label><ImageIcon size={16} className="me-1" /> Image URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                isInvalid={!!formErrors.image}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="tags">
              <Form.Label><Tag size={16} className="me-1" /> Tags (Comma-separated, Optional)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                isInvalid={!!formErrors.tags}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{formErrors.tags}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="requirements">
              <Form.Label><FileText size={16} className="me-1" /> Requirements (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                isInvalid={!!formErrors.requirements}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{formErrors.requirements}</Form.Control.Feedback>
            </Form.Group>

            <h4 className="mt-4 mb-3">Contact Information (Optional)</h4>
            <Form.Group className="mb-3" controlId="contactInfo.name">
              <Form.Label><Info size={16} className="me-1" /> Contact Name</Form.Label>
              <Form.Control
                type="text"
                name="contactInfo.name"
                value={formData.contactInfo.name}
                onChange={handleChange}
                isInvalid={!!formErrors['contactInfo.name']}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{formErrors['contactInfo.name']}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactInfo.email">
              <Form.Label><Info size={16} className="me-1" /> Contact Email</Form.Label>
              <Form.Control
                type="email"
                name="contactInfo.email"
                value={formData.contactInfo.email}
                onChange={handleChange}
                isInvalid={!!formErrors['contactInfo.email']}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{formErrors['contactInfo.email']}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactInfo.phone">
              <Form.Label><Info size={16} className="me-1" /> Contact Phone</Form.Label>
              <Form.Control
                type="tel"
                name="contactInfo.phone"
                value={formData.contactInfo.phone}
                onChange={handleChange}
                isInvalid={!!formErrors['contactInfo.phone']}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{formErrors['contactInfo.phone']}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Saving...
                </>
              ) : (
                'Save Event'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EventForm;
