import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard.jsx";
import { Link } from "react-router-dom";
import HeroImage from "../assets/images/iron_man.jpg";
import StudentImage from "../assets/images/students_09.jpg";
import WebImage from "../assets/images/web.webp";
import eventService from "../services/eventService";
import { Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // ChatGPT related states
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const { isAuthenticated, user } = useAuth();

  // Hero slider data
  const heroSlides = [
    {
      image: HeroImage,
      title: "Let's Explore",
      subtitle: "Search for events",
      tagline:
        "Eventify lightens - your go-to platform for organizing and joining university events together.",
    },
    {
      image: StudentImage,
      title: "Connect with Peers",
      subtitle: "Join student communities",
      tagline:
        "Find like-minded students and participate in events that match your interests.",
    },
    {
      image: WebImage,
      title: "Web Platform",
      subtitle: "Access anywhere, anytime",
      tagline:
        "Our responsive web platform works seamlessly on all your devices.",
    },
  ];

  // FAQ data
  const faqCategories = [
    {
      title: "Eventify - Top 15 FAQs",
      questions: [
        "Do you have service to/from ___?",
        "Where's my event located?",
        "How do I create an event?",
        "Can I join events as a guest?",
        "How do I find events near me?",
      ],
    },
  ];

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventService.getUpcomingEvents({ limit: 3 });
        setEvents(response.data.events);
      } catch (err) {
        setError(err.message || "Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();

    if (isAuthenticated && user?.role === "student") {
      fetchRegisteredEvents();
    }
  }, [isAuthenticated, user]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleSendMessage = async () => {
    if (userMessage.trim() === "") return;

    // Add user message to chat
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");
    setIsLoadingResponse(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chatgpt/chat`,
        {
          prompt: userMessage,
        }
      );

      setMessages([
        ...newMessages,
        { sender: "chatgpt", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Error:", error.response || error.message);
      setMessages([
        ...newMessages,
        {
          sender: "chatgpt",
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoadingResponse(false);
    }
  };

  // Handle clicking on FAQ questions
  const handleFAQClick = (question) => {
    setUserMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const homeStyles = {
    heroSection: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      backgroundColor: "var(--bs-body-bg)",
      padding: "2rem 0",
      position: "relative",
      overflow: "hidden",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "4rem",
      position: "relative",
      zIndex: 2,
    },
    leftContent: {
      flex: "1",
      maxWidth: "600px",
    },
    rightContent: {
      flex: "1",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    heroImage: {
      width: "100%",
      maxWidth: "500px",
      height: "400px",
      objectFit: "cover",
      borderRadius: "20px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    },
    arrowFeature: {
      position: "absolute",
      right: "-30px",
      bottom: "50px",
      width: "80px",
      height: "80px",
      backgroundColor: "#f8b700",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 25px rgba(248, 183, 0, 0.3)",
      transform: "rotate(-15deg)",
    },
    heroTitle: {
      fontSize: "3.5rem",
      fontWeight: "800",
      marginBottom: "1rem",
      color: "#f8b700",
      lineHeight: "1.2",
    },
    heroSubtitle: {
      fontSize: "1.5rem",
      fontWeight: "400",
      marginBottom: "1.5rem",
      color: "var(--bs-body-color)",
      opacity: "0.9",
    },
    heroTagline: {
      fontSize: "1.1rem",
      fontWeight: "300",
      marginBottom: "2.5rem",
      lineHeight: "1.6",
      color: "var(--bs-body-color)",
    },
    searchContainer: {
      marginBottom: "2rem",
    },
    searchBox: {
      display: "flex",
      borderRadius: "50px",
      overflow: "hidden",
      boxShadow: "0 5px 15px var(--bs-box-shadow)",
      maxWidth: "500px",
    },
    searchInput: {
      flex: "1",
      border: "none",
      padding: "1.2rem 1.5rem",
      fontSize: "1rem",
      outline: "none",
      backgroundColor: "var(--bs-card-bg)",
      color: "var(--bs-body-color)",
    },
    searchButton: {
      backgroundColor: "#f8b700",
      border: "none",
      color: "#000",
      padding: "1.2rem 2rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      minWidth: "120px",
    },
    searchButtonHover: {
      backgroundColor: "#ffcc00",
    },
    ctaButtons: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
    },
    ctaPrimary: {
      backgroundColor: "#f8b700",
      border: "none",
      color: "#000",
      borderRadius: "25px",
      padding: "1rem 2rem",
      fontSize: "1rem",
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
      border: "2px solid #f8b700",
      color: "#f8b700",
      borderRadius: "25px",
      padding: "1rem 2rem",
      fontSize: "1rem",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.3s ease",
      display: "inline-block",
    },
    ctaSecondaryHover: {
      backgroundColor: "#f8b700",
      color: "#000",
    },
    featuredEvents: {
      padding: "5rem 0",
      backgroundColor: "var(--bs-body-bg)",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "3rem",
      color: "var(--bs-body-color)",
      textAlign: "center",
    },
    eventGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "2rem",
    },
    sliderDots: {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      bottom: "20px",
      left: "0",
      right: "0",
      zIndex: 3,
    },
    dot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      margin: "0 5px",
      backgroundColor: "rgba(255,255,255,0.5)",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    activeDot: {
      backgroundColor: "#f8b700",
      transform: "scale(1.2)",
    },
    // Chat widget styles
    chatWidget: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 1000,
      transition: "all 0.3s ease",
      width: isChatOpen ? "350px" : "60px",
      height: isChatOpen ? "500px" : "60px",
      backgroundColor: "#fff",
      borderRadius: isChatOpen ? "12px" : "50%",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    chatHeader: {
      backgroundColor: "#f8b700",
      color: "#000",
      padding: "15px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
    },
    chatHeaderTitle: {
      fontSize: "16px",
      fontWeight: "700",
    },
    chatHeaderClose: {
      fontSize: "18px",
      cursor: "pointer",
    },
    chatBody: {
      flex: "1",
      padding: "15px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
    },
    chatIntro: {
      marginBottom: "15px",
      fontSize: "14px",
      color: "#666",
    },
    faqSection: {
      marginTop: "10px",
      marginBottom: "15px",
    },
    faqTitle: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#333",
    },
    faqList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    faqItem: {
      padding: "8px 0",
      borderBottom: "1px solid #eee",
      fontSize: "14px",
      color: "#444",
      cursor: "pointer",
      transition: "color 0.2s ease",
    },
    faqItemHover: {
      color: "#f8b700",
    },
    chatMessages: {
      flex: "1",
      overflowY: "auto",
      marginBottom: "15px",
      maxHeight: "200px",
    },
    userMessage: {
      padding: "8px 12px",
      backgroundColor: "#e3f2fd",
      borderRadius: "18px 18px 5px 18px",
      margin: "5px 0",
      alignSelf: "flex-end",
      maxWidth: "80%",
      wordWrap: "break-word",
    },
    chatGptMessage: {
      padding: "8px 12px",
      backgroundColor: "#f1f1f1",
      borderRadius: "18px 18px 18px 5px",
      margin: "5px 0",
      alignSelf: "flex-start",
      maxWidth: "80%",
      wordWrap: "break-word",
    },
    chatInputContainer: {
      display: "flex",
      gap: "8px",
    },
    chatInput: {
      flex: "1",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "20px",
      fontSize: "14px",
      outline: "none",
    },
    chatSendButton: {
      padding: "10px 15px",
      backgroundColor: "#f8b700",
      color: "#000",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      fontWeight: "600",
    },
    chatFooter: {
      padding: "10px 15px",
      borderTop: "1px solid #eee",
      fontSize: "12px",
      color: "#999",
      textAlign: "center",
    },
    chatButton: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#f8b700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    chatIcon: {
      fontSize: "24px",
      color: "#000",
    },
    loadingSpinner: {
      display: "inline-block",
      width: "12px",
      height: "12px",
      border: "2px solid #f3f3f3",
      borderTop: "2px solid #f8b700",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginLeft: "5px",
    },
  };

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

  const handleRegister = (eventId) => {
    setRegisteredEvents((prev) => new Set([...prev, eventId]));
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
    setEvents((prev) =>
      prev.map((event) =>
        event._id === eventId
          ? { ...event, currentAttendees: event.currentAttendees - 1 }
          : event
      )
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    // Clear messages when closing chat
    if (isChatOpen) {
      setMessages([]);
      setUserMessage("");
    }
  };

  return (
    <div>
      {/* Chat Widget */}
      <div style={homeStyles.chatWidget}>
        {isChatOpen ? (
          <>
            <div style={homeStyles.chatHeader} onClick={toggleChat}>
              <div style={homeStyles.chatHeaderTitle}>Chat with EventBot</div>
              <div style={homeStyles.chatHeaderClose}>×</div>
            </div>
            <div style={homeStyles.chatBody}>
              <div style={homeStyles.chatIntro}>
                <strong>AI Assistant</strong>
                <br />
                Hi! I'm here to help with any questions about events.
              </div>

              <div style={homeStyles.faqSection}>
                <h3 style={homeStyles.faqTitle}>Quick Questions</h3>
                <ul style={homeStyles.faqList}>
                  {faqCategories[0].questions.map((question, qIndex) => (
                    <li
                      key={qIndex}
                      style={homeStyles.faqItem}
                      onClick={() => handleFAQClick(question)}
                      onMouseOver={(e) => (e.target.style.color = "#f8b700")}
                      onMouseOut={(e) => (e.target.style.color = "#444")}
                    >
                      {question}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={homeStyles.chatMessages}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    style={
                      msg.sender === "user"
                        ? homeStyles.userMessage
                        : homeStyles.chatGptMessage
                    }
                  >
                    {msg.text}
                  </div>
                ))}
                {isLoadingResponse && (
                  <div style={homeStyles.chatGptMessage}>
                    Thinking... <span style={homeStyles.loadingSpinner}></span>
                  </div>
                )}
              </div>

              <div style={homeStyles.chatInputContainer}>
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  style={homeStyles.chatInput}
                  disabled={isLoadingResponse}
                />
                <button
                  onClick={handleSendMessage}
                  style={homeStyles.chatSendButton}
                  disabled={isLoadingResponse || userMessage.trim() === ""}
                >
                  Send
                </button>
              </div>
            </div>
            <div style={homeStyles.chatFooter}>Powered by OpenAI GPT</div>
          </>
        ) : (
          <div style={homeStyles.chatButton} onClick={toggleChat}>
            <span style={homeStyles.chatIcon}>💬</span>
          </div>
        )}
      </div>

      <section style={homeStyles.heroSection}>
        <div style={homeStyles.container}>
          {/* Left Side - Text Content */}
          <div style={homeStyles.leftContent}>
            <h1 style={homeStyles.heroTitle}>
              {heroSlides[currentSlide].title}
            </h1>
            <h2 style={homeStyles.heroSubtitle}>
              {heroSlides[currentSlide].subtitle}
            </h2>
            <p style={homeStyles.heroTagline}>
              {heroSlides[currentSlide].tagline
                .split("lightens")
                .map((part, i) =>
                  i === 0 ? (
                    part
                  ) : (
                    <React.Fragment key={i}>
                      <strong style={{ color: "#f8b700" }}>lightens</strong>
                      {part}
                    </React.Fragment>
                  )
                )}
            </p>

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

            <div style={homeStyles.ctaButtons}>
              <Link
                to="/events"
                style={homeStyles.ctaPrimary}
                onMouseOver={(e) =>
                  handleMouseOver(e, homeStyles.ctaPrimaryHover)
                }
                onMouseOut={(e) => handleMouseOut(e, homeStyles.ctaPrimary)}
              >
                Browse Events
              </Link>
              <Link
                to="/register"
                style={homeStyles.ctaSecondary}
                onMouseOver={(e) =>
                  handleMouseOver(e, homeStyles.ctaSecondaryHover)
                }
                onMouseOut={(e) => handleMouseOut(e, homeStyles.ctaSecondary)}
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Side - Image Slider with Arrow Feature */}
          <div style={homeStyles.rightContent}>
            <img
              src={heroSlides[currentSlide].image}
              alt="Event showcase"
              style={homeStyles.heroImage}
            />
            <div style={homeStyles.arrowFeature}>
              <span
                style={{ fontSize: "2rem", color: "#000", fontWeight: "bold" }}
              >
                →
              </span>
            </div>
          </div>
        </div>

        {/* Slider dots */}
        <div style={homeStyles.sliderDots}>
          {heroSlides.map((_, index) => (
            <div
              key={index}
              style={{
                ...homeStyles.dot,
                ...(index === currentSlide ? homeStyles.activeDot : {}),
              }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      <section style={homeStyles.featuredEvents}>
        <div style={{ ...homeStyles.container, flexDirection: "column" }}>
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
              <Alert variant="danger" className="w-100">
                {error}
              </Alert>
            ) : events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  showActions={isAuthenticated && user?.role === "student"}
                  isRegistered={registeredEvents.has(event._id)}
                  onRegister={handleRegister}
                  onUnregister={handleUnregister}
                />
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

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 968px) {
            .hero-container {
              flex-direction: column;
              text-align: center;
            }
            
            .left-content, .right-content {
              max-width: 100%;
            }
            
            .right-content {
              margin-top: 3rem;
            }
            
            .arrow-feature {
              right: 20px;
              bottom: -20px;
            }
            
            .chat-widget {
              right: 10px;
              bottom: 10px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default HomePage;
