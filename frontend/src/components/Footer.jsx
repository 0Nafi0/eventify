import React from 'react';

function Footer() {
  const footerStyles = {
    footer: {
      backgroundColor: 'var(--bs-footer-bg)',
      padding: '3rem 0 1rem',
      marginTop: '0',
      fontFamily: "'Inter', sans-serif",
      color: 'var(--bs-body-color)',
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
      color: '#f8b700',
      fontSize: '1.8rem',
      marginBottom: '1.25rem',
      textTransform: 'lowercase',
    },
    heading: {
      fontWeight: '600',
      marginBottom: '1.25rem',
      color: 'var(--bs-body-color)',
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
      color: 'var(--bs-body-color)',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      fontSize: '0.95rem',
    },
    linkHover: {
      color: 'var(--brand)',
    },
    footerBottom: {
      textAlign: 'center',
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid var(--bs-border-color)',
    },
    copyright: {
      color: 'var(--bs-body-color)',
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
          <div className="footer-column" style={footerStyles.column}>
            <h5 style={footerStyles.footerBrand}>eventify</h5>
            <ul style={footerStyles.list}>
              {["Find Events", "Create Events", "Venues", "Cities", "Organizers", "Teams"].map((label, i) => (
                <li key={i} style={footerStyles.listItem}>
                  <a
                    href={`/${label.toLowerCase().replace(' ', '-')}`}
                    style={footerStyles.link}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column" style={footerStyles.column}>
            <h5 style={footerStyles.heading}>Learn More</h5>
            <ul style={footerStyles.list}>
              {["About Rewards", "Reviews", "Group Tickets"].map((label, i) => (
                <li key={i} style={footerStyles.listItem}>
                  <a
                    href={`/${label.toLowerCase().replace(' ', '-')}`}
                    style={footerStyles.link}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column" style={footerStyles.column}>
            <h5 style={footerStyles.heading}>Help</h5>
            <ul style={footerStyles.list}>
              {["FAQ Contact", "Invest"].map((label, i) => (
                <li key={i} style={footerStyles.listItem}>
                  <a
                    href={`/${label.toLowerCase().replace(' ', '-')}`}
                    style={footerStyles.link}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column" style={footerStyles.column}>
            <h5 style={footerStyles.heading}>Details</h5>
            <ul style={footerStyles.list}>
              {["Terms & Conditions", "Privacy Policy", "Download Apps"].map((label, i) => (
                <li key={i} style={footerStyles.listItem}>
                  <a
                    href={`/${label.toLowerCase().replace(/ & | /g, '-').replace('--', '-')}`}
                    style={footerStyles.link}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={footerStyles.footerBottom}>
          <p style={footerStyles.copyright}>2025 © Eventify</p>
        </div>
      </div>

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
