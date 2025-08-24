// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import HeroImage from "../assets/images/iron_man.jpg";
import eventService from "../services/eventService";
import { Spinner, Alert } from "react-bootstrap";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventService.getUpcomingEvents({ limit: 3 }); // Fetch top 3 events
        setEvents(response.data.events);
      } catch (err) {
        setError(err.message || "Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  const homeStyles = {
    heroSection: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${HeroImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      padding: "6rem 0",
      textAlign: "center",
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 15px",
    },
    heroTitle: {
      fontSize: "3.5rem",
      fontWeight: "800",
      marginBottom: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "2px",
    },
    heroSubtitle: {
      fontSize: "1.8rem",
      fontWeight: "400",
      marginBottom: "2rem",
      opacity: "0.9",
    },
    heroTagline: {
      fontSize: "1.2rem",
      fontWeight: "300",
      marginBottom: "3rem",
      maxWidth: "600px",
      marginLeft: "auto",
      marginRight: "auto",
      lineHeight: "1.6",
    },
    searchContainer: {
      maxWidth: "700px",
      margin: "0 auto 3rem",
      position: "relative",
    },
    searchBox: {
      display: "flex",
      borderRadius: "50px",
      overflow: "hidden",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    },
    searchInput: {
      flex: "1",
      border: "none",
      padding: "1.2rem 1.5rem",
      fontSize: "1.1rem",
      outline: "none",
    },
    searchButton: {
      backgroundColor: "#f8b700",
      border: "none",
      color: "#000",
      padding: "1.2rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    searchButtonHover: {
      backgroundColor: "#ffcc00",
    },
    scrollDownButton: {
      marginTop: "30px",
      fontSize: "2rem",
      color: "#f8b700",
      cursor: "pointer",
      animation: "bounce 2s infinite",
    },
    ctaButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      flexWrap: "wrap",
      marginTop: "2rem",
    },
    ctaPrimary: {
      backgroundColor: "#f8b700",
      border: "none",
      color: "#000",
      borderRadius: "25px",
      padding: "1rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.3s ease",
      display: "inline-block",
    },
    ctaPrimaryHover: {
      backgroundColor: "#ffcc00",
      transform: "translateY(-2px)",
    },
    ctaSecondary: {
      backgroundColor: "transparent",
      border: "2px solid #fff",
      color: "#fff",
      borderRadius: "25px",
      padding: "1rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.3s ease",
      display: "inline-block",
    },
    ctaSecondaryHover: {
      backgroundColor: "#fff",
      color: "#000",
    },
    featuredEvents: {
      padding: "5rem 0",
      backgroundColor: "#f8f9fa",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "3rem",
      color: "#212529",
      textAlign: "center",
    },
    eventGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "2rem",
    },
  };

  // Handle hover effects
  const handleMouseOver = (e, style) => {
    Object.keys(style).forEach((key) => {
      e.target.style[key] = style[key];
    });
  };

  const handleMouseOut = (e, originalStyle) => {
    Object.keys(originalStyle).forEach((key) => {
      e.target.style[key] = originalStyle[key];
    });
  };

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={homeStyles.heroSection}>
        <div style={homeStyles.container}>
          <h1 style={homeStyles.heroTitle}>Let's Explore</h1>
          <h2 style={homeStyles.heroSubtitle}>Search for events</h2>
          <p style={homeStyles.heroTagline}>
            Eventify <strong>lightens</strong> - your go-to platform for
            organizing and joining university events together.
          </p>

          {/* Search Bar */}
          <div style={homeStyles.searchContainer}>
            <div style={homeStyles.searchBox}>
              <input
                type="text"
                placeholder="Search for events, venues, or teams..."
                style={homeStyles.searchInput}
              />
              <button
                style={homeStyles.searchButton}
                onMouseOver={(e) =>
                  handleMouseOver(e, homeStyles.searchButtonHover)
                }
                onMouseOut={(e) => handleMouseOut(e, homeStyles.searchButton)}
              >
                Search
              </button>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div onClick={scrollDown} style={homeStyles.scrollDownButton}>
            ↓
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section style={homeStyles.featuredEvents}>
        <div style={homeStyles.container}>
          <h2 style={homeStyles.sectionTitle}>Popular Events</h2>
          <div style={homeStyles.eventGrid}>
            {loading ? (
              <div className="text-center w-100">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading events...</span>
                </Spinner>
                <p className="mt-2">Loading events...</p>
              </div>
            ) : error ? (
              <Alert variant="danger" className="w-100">{error}</Alert>
            ) : events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event._id} event={event} showActions={false} />
              ))
            ) : (
              <div className="text-center w-100">
                <h4>No upcoming events found.</h4>
                <p>Check back later for exciting new events!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Animation styles */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default HomePage;
