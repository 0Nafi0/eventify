import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Alert,
  Spinner,
  Pagination,
} from "react-bootstrap";
import { Search, Filter, Calendar } from "lucide-react";
import EventCard from "../components/EventCard";
import eventService from "../services/eventService";
import { useAuth } from "../context/AuthContext";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false); // Changed to false for initial load
  const [initialLoad, setInitialLoad] = useState(true); // Added for first load
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [sortBy, setSortBy] = useState("date-asc");
  const { isAuthenticated, user } = useAuth();

  // Clear registered events when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setRegisteredEvents(new Set());
    }
  }, [isAuthenticated]);

  const sortOptions = [
    { value: "date-asc", label: "Date (Earliest First)" },
    { value: "date-desc", label: "Date (Latest First)" },
    { value: "popularity-desc", label: "Most Popular" },
    { value: "popularity-asc", label: "Least Popular" },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "academic", label: "Academic" },
    { value: "social", label: "Social" },
    { value: "sports", label: "Sports" },
    { value: "cultural", label: "Cultural" },
    { value: "technical", label: "Technical" },
    { value: "workshop", label: "Workshop" },
    { value: "seminar", label: "Seminar" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    const loadData = async () => {
      await fetchEvents();
      if (isAuthenticated && user?.role === "student") {
        await fetchRegisteredEvents();
      }
    };
    loadData();
  }, [
    currentPage,
    selectedCategory,
    searchTerm,
    sortBy,
    isAuthenticated,
    user?.role,
  ]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: 9,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        search: searchTerm.trim() || undefined,
        sort: sortBy,
      };

      const response = await eventService.getUpcomingEvents(params);
      setEvents(response.data.events);
      setPagination(response.data.pagination);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setInitialLoad(false); // Clear initial load state after first fetch
    }
  };

  const fetchRegisteredEvents = async () => {
    try {
      const response = await eventService.getStudentRegisteredEvents();
      const registeredIds = new Set(
        response.data.registrations
          .filter((reg) => reg.status === "registered")
          .map((reg) => reg.event._id)
      );
      setRegisteredEvents(registeredIds);
    } catch (error) {
      console.error("Failed to fetch registered events:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchEvents();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleRegister = (eventId) => {
    setRegisteredEvents((prev) => new Set([...prev, eventId]));
    // Update event attendee count locally
    setEvents((prev) =>
      prev.map((event) =>
        event._id === eventId
          ? { ...event, currentAttendees: event.currentAttendees + 1 }
          : event
      )
    );
  };

  const handleUnregister = (eventId) => {
    setRegisteredEvents((prev) => {
      const newSet = new Set(prev);
      newSet.delete(eventId);
      return newSet;
    });
    // Update event attendee count locally
    setEvents((prev) =>
      prev.map((event) =>
        event._id === eventId
          ? { ...event, currentAttendees: event.currentAttendees - 1 }
          : event
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (!pagination.totalPages || pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (pagination.hasPrevPage) {
      pages.push(
        <Pagination.Prev
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
        />
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Next button
    if (pagination.hasNextPage) {
      pages.push(
        <Pagination.Next
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
        />
      );
    }

    return (
      <Pagination className="justify-content-center mt-4">{pages}</Pagination>
    );
  };

  // Show loading state only on first load or when no events are available
  if ((loading || initialLoad) && events.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading events...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-4 py-3">
        <Col xs={12} className="text-center">
          <h1 className="display-5 fw-bold mb-3">
            <Calendar className="me-2 text-primary d-none d-sm-inline" />
            Upcoming Events
          </h1>
          <p className="text-muted">
            Discover and register for exciting university events
          </p>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row className="mb-4">
        <Col lg={6} md={6} className="mb-3">
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <InputGroup.Text>
                <Search size={20} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search events by title, description, club, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Form.Select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {/* Events Grid */}
      {events.length > 0 ? (
        <>
          <Row className="event-grid g-4">
            {events.map((event) => (
              <Col key={event._id} xs={12} sm={6} lg={4}>
                <EventCard
                  event={event}
                  onRegister={handleRegister}
                  onUnregister={handleUnregister}
                  showActions={isAuthenticated && user?.role === "student"}
                  isRegistered={registeredEvents.has(event._id)}
                />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {renderPagination()}

          {/* Results Info */}
          <div className="text-center text-muted mt-3">
            Showing {events.length} of {pagination.totalEvents || 0} events
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <Calendar size={64} className="text-muted mb-3" />
          <h4>No events found</h4>
          <p className="text-muted">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search criteria or filters"
              : "Check back later for upcoming events"}
          </p>
        </div>
      )}
    </Container>
  );
};

export default EventsPage;
