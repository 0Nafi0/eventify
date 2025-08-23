// src/components/Footer.jsx

import React from 'react';

function Footer() {
  const footerStyles = {
    footer: {
      backgroundColor: '#000000',
      padding: '3rem 0 1rem',
      marginTop: '4rem',
      fontFamily: "'Inter', sans-serif",
      color: '#ffffff',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 -15px',
    },
    column: {
      flex: '0 0 25%',
      maxWidth: '25%',
      padding: '0 15px',
      marginBottom: '2rem',
      boxSizing: 'border-box',
    },
    footerBrand: {
      fontWeight: '800',
      color: '#f8b700',  // Yellow color
      fontSize: '1.8rem',
      marginBottom: '1.25rem',
      textTransform: 'lowercase',  // Lowercase text for 'eventify'
    },
    heading: {
      fontWeight: '600',
      marginBottom: '1.25rem',
      color: '#ffffff',
      fontSize: '1.1rem',
    },
    list: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    listItem: {
      marginBottom: '0.75rem',
    },
    link: {
      color: '#cccccc',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      fontSize: '0.95rem',
    },
    linkHover: {
      color: '#f8b700',  // Yellow color on hover
    },
    footerBottom: {
      textAlign: 'center',
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #333333',
    },
    copyright: {
      color: '#cccccc',
      fontSize: '0.9rem',
      margin: '0',
    },
  };

  const handleMouseOver = (e) => {
    e.target.style.color = footerStyles.linkHover.color;
  };

  const handleMouseOut = (e) => {
    e.target.style.color = footerStyles.link.color;
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <div style={footerStyles.row}>
          <div style={footerStyles.column}>
            <h5 style={footerStyles.footerBrand}>eventify</h5>
            <ul style={footerStyles.list}>
              <li style={footerStyles.listItem}><a href="/find-events" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Find Events</a></li>
              <li style={footerStyles.listItem}><a href="/create-events" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Create Events</a></li>
              <li style={footerStyles.listItem}><a href="/venues" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Venues</a></li>
              <li style={footerStyles.listItem}><a href="/cities" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Cities</a></li>
              <li style={footerStyles.listItem}><a href="/organizers" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Organizers</a></li>
              <li style={footerStyles.listItem}><a href="/teams" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Teams</a></li>
            </ul>
          </div>
          
          <div style={footerStyles.column}>
            <h5 style={footerStyles.heading}>Learn More</h5>
            <ul style={footerStyles.list}>
              <li style={footerStyles.listItem}><a href="/about-rewards" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>About Rewards</a></li>
              <li style={footerStyles.listItem}><a href="/reviews" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Reviews</a></li>
              <li style={footerStyles.listItem}><a href="/group-tickets" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Group Tickets</a></li>
            </ul>
          </div>
          
          <div style={footerStyles.column}>
            <h5 style={footerStyles.heading}>Help</h5>
            <ul style={footerStyles.list}>
              <li style={footerStyles.listItem}><a href="/faq" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>FAQ Contact</a></li>
              <li style={footerStyles.listItem}><a href="/invest" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Invest</a></li>
            </ul>
          </div>
          
          <div style={footerStyles.column}>
            <h5 style={footerStyles.heading}>Details</h5>
            <ul style={footerStyles.list}>
              <li style={footerStyles.listItem}><a href="/terms" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Terms & Conditions</a></li>
              <li style={footerStyles.listItem}><a href="/privacy" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Privacy Policy</a></li>
              <li style={footerStyles.listItem}><a href="/download-apps" style={footerStyles.link} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Download Apps</a></li>
            </ul>
          </div>
        </div>
        
        <div style={footerStyles.footerBottom}>
          <p style={footerStyles.copyright}>2025 © Eventify</p>
        </div>
      </div>
      
      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 992px) {
            .footer-column {
              flex: 0 0 50%;
              max-width: 50%;
            }
          }
          @media (max-width: 576px) {
            .footer-column {
              flex: 0 0 100%;
              max-width: 100%;
            }
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
