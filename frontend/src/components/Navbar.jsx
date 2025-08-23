// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarStyles = {
    navbar: {
      backgroundColor: '#000000',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '0.8rem 1.5rem',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      zIndex: '1000',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    brand: {
      fontWeight: '800',
      fontSize: '1.8rem',
      color: '#f8b700',
      textDecoration: 'none',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      textTransform: 'lowercase',
    },
    desktopButtons: {
      display: 'flex',
      gap: '0.8rem',
    },
    loginButton: {
      backgroundColor: 'transparent',
      border: '2px solid #f8b700',
      color: '#f8b700',
      borderRadius: '25px',
      padding: '0.5rem 1.2rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      fontSize: '0.9rem',
    },
    loginButtonHover: {
      backgroundColor: '#f8b700',
      color: '#000',
    },
    signupButton: {
      backgroundColor: '#f8b700',
      border: '2px solid #f8b700',
      color: '#000',
      borderRadius: '25px',
      padding: '0.5rem 1.2rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      fontSize: '0.9rem',
    },
    signupButtonHover: {
      backgroundColor: 'transparent',
      color: '#f8b700',
    },
    menuButton: {
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '1.8rem',
      cursor: 'pointer',
      color: '#f8b700',
      padding: '0.3rem',
      borderRadius: '4px',
      display: 'flex',
    },
    mobileMenu: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      padding: '5rem 2rem 2rem',
      display: isMenuOpen ? 'block' : 'none',
      zIndex: '999',
      overflowY: 'auto',
    },
    closeButton: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '2rem',
      cursor: 'pointer',
      color: '#f8b700',
    },
    mobileNavLink: {
      display: 'block',
      padding: '1rem 0',
      color: '#f8b700',
      textDecoration: 'none',
      borderBottom: '1px solid rgba(248, 183, 0, 0.3)',
      fontSize: '1.2rem',
      fontWeight: '500',
      transition: 'padding-left 0.3s ease',
    },
    mobileNavLinkHover: {
      paddingLeft: '1rem',
    },
    mobileButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '2rem',
      paddingTop: '2rem',
      borderTop: '2px solid rgba(248, 183, 0, 0.3)',
    },
    mobileLoginButton: {
      backgroundColor: 'transparent',
      border: '2px solid #f8b700',
      color: '#f8b700',
      borderRadius: '25px',
      padding: '0.8rem',
      textDecoration: 'none',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
    },
    mobileSignupButton: {
      backgroundColor: '#f8b700',
      border: '2px solid #f8b700',
      color: '#000',
      borderRadius: '25px',
      padding: '0.8rem',
      textDecoration: 'none',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
    },
  };

  const handleMouseOver = (e, style) => {
    Object.keys(style).forEach(key => {
      e.target.style[key] = style[key];
    });
  };

  const handleMouseOut = (e, originalStyle) => {
    Object.keys(originalStyle).forEach(key => {
      e.target.style[key] = originalStyle[key];
    });
  };

  return (
    <nav style={navbarStyles.navbar}>
      <div style={navbarStyles.container}>
        {/* Three dots menu button - ALWAYS VISIBLE on left */}
        <button 
          style={navbarStyles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ⋯
        </button>

        {/* Centered brand */}
        <Link to="/" style={navbarStyles.brand}>
          eventify
        </Link>

        {/* Desktop buttons - visible only on larger screens */}
        <div style={navbarStyles.desktopButtons} className="d-none d-md-flex">
          <Link 
            to="/login" 
            style={navbarStyles.loginButton}
            onMouseOver={(e) => handleMouseOver(e, navbarStyles.loginButtonHover)}
            onMouseOut={(e) => handleMouseOut(e, navbarStyles.loginButton)}
          >
            Login
          </Link>
          <Link 
            to="/register-event" 
            style={navbarStyles.signupButton}
            onMouseOver={(e) => handleMouseOver(e, navbarStyles.signupButtonHover)}
            onMouseOut={(e) => handleMouseOut(e, navbarStyles.signupButton)}
          >
            Sign Up
          </Link>
        </div>

        {/* Invisible spacer for layout balance on mobile */}
        <div style={{ width: '40px', visibility: 'hidden' }} className="d-md-none">
          ⋯
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div style={navbarStyles.mobileMenu}>
          <button 
            style={navbarStyles.closeButton}
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ×
          </button>
          
          <Link 
            to="/" 
            style={navbarStyles.mobileNavLink}
            onMouseOver={(e) => handleMouseOver(e, navbarStyles.mobileNavLinkHover)}
            onMouseOut={(e) => handleMouseOut(e, navbarStyles.mobileNavLink)}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/charter" 
            style={navbarStyles.mobileNavLink}
            onMouseOver={(e) => handleMouseOver(e, navbarStyles.mobileNavLinkHover)}
            onMouseOut={(e) => handleMouseOut(e, navbarStyles.mobileNavLink)}
            onClick={toggleMenu}
          >
            Charter
          </Link>
          <Link 
            to="/create-trip" 
            style={navbarStyles.mobileNavLink}
            onMouseOver={(e) => handleMouseOver(e, navbarStyles.mobileNavLinkHover)}
            onMouseOut={(e) => handleMouseOut(e, navbarStyles.mobileNavLink)}
            onClick={toggleMenu}
          >
            Create Trip
          </Link>
          <Link 
            to="/find-rides" 
            style={navbarStyles.mobileNavLink}
            onMouseOver={(e) => handleMouseOver(e, navbarStyles.mobileNavLinkHover)}
            onMouseOut={(e) => handleMouseOut(e, navbarStyles.mobileNavLink)}
            onClick={toggleMenu}
          >
            Find Rides
          </Link>
          <Link 
            to="/my-rides" 
            style={navbarStyles.mobileNavLink}
            onMouseOver={(e) => handleMouseOver(e, navbarStyles.mobileNavLinkHover)}
            onMouseOut={(e) => handleMouseOut(e, navbarStyles.mobileNavLink)}
            onClick={toggleMenu}
          >
            My Rides
          </Link>
          <Link 
            to="/my-events" 
            style={navbarStyles.mobileNavLink}
            onMouseOver={(e) => handleMouseOver(e, navbarStyles.mobileNavLinkHover)}
            onMouseOut={(e) => handleMouseOut(e, navbarStyles.mobileNavLink)}
            onClick={toggleMenu}
          >
            My Events
          </Link>
          
          {/* Mobile buttons - only visible in mobile menu on mobile screens */}
          <div style={navbarStyles.mobileButtons} className="d-md-none">
            <Link 
              to="/login" 
              style={navbarStyles.mobileLoginButton}
              onMouseOver={(e) => handleMouseOver(e, navbarStyles.loginButtonHover)}
              onMouseOut={(e) => handleMouseOut(e, navbarStyles.mobileLoginButton)}
              onClick={toggleMenu}
            >
              Login
            </Link>
            <Link 
              to="/register-event" 
              style={navbarStyles.mobileSignupButton}
              onMouseOver={(e) => handleMouseOver(e, navbarStyles.signupButtonHover)}
              onMouseOut={(e) => handleMouseOut(e, navbarStyles.mobileSignupButton)}
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
