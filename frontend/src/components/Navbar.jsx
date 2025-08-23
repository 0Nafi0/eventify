import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Menu, X, Settings, Calendar } from 'lucide-react';
import logo from '../assets/images/logo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const navbarStyles = {
    navbar: {
      backgroundColor: '#000000',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '0.8rem 1.5rem',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      zIndex: '1000',
      height: '70px', 
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '1200px',
      margin: '0 auto',
      height: '100%', 
      position: 'relative', 
    },
    brandLogo: {
      height: '60px',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    desktopButtons: {
      display: 'flex',
      gap: '0.8rem',
      alignItems: 'center',
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
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      position: 'relative',
    },
    userAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#f8b700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: '2px solid #f8b700',
      transition: 'all 0.3s ease',
    },
    userAvatarHover: {
      borderColor: '#fff',
      transform: 'scale(1.05)',
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      color: '#fff',
      paddingRight: '10px',
    },
    userName: {
      fontSize: '1rem',
      fontWeight: '700',
      color: '#f8b700',
    },
    userRole: {
      fontSize: '0.9rem',
      color: '#ccc',
      textTransform: 'capitalize',
    },
    // UPDATED POPUP MENU STYLES
    userMenu: {
      position: 'absolute',
      top: 'calc(100% + 10px)',
      right: '0',
      backgroundColor: '#1a1a1a',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px rgba(248, 183, 0, 0.2)',
      padding: '0.75rem',
      minWidth: '220px',
      zIndex: '1001',
      display: showUserMenu ? 'block' : 'none',
      overflow: 'hidden',
      border: '1px solid rgba(248, 183, 0, 0.15)',
    },
    userMenuHeader: {
      padding: '0.75rem 1rem',
      borderBottom: '1px solid rgba(248, 183, 0, 0.2)',
      marginBottom: '0.5rem',
    },
    userMenuHeaderName: {
      color: '#f8b700',
      fontWeight: '600',
      fontSize: '1rem',
      marginBottom: '0.25rem',
    },
    userMenuHeaderEmail: {
      color: '#aaa',
      fontSize: '0.8rem',
    },
    userMenuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.85rem 1rem',
      color: '#ddd',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      borderRadius: '8px',
      fontSize: '0.95rem',
      margin: '0.15rem 0',
    },
    userMenuItemHover: {
      backgroundColor: 'rgba(248, 183, 0, 0.15)',
      color: '#f8b700',
      transform: 'translateX(2px)',
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
        {/* Menu button on left */}
        <button 
          style={navbarStyles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Centered logo */}
        <Link to="/" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
          <img src={logo} alt="Eventify Logo" style={navbarStyles.brandLogo} />
        </Link>

        {/* Desktop buttons */}
        <div style={navbarStyles.desktopButtons} className="d-none d-md-flex">
          {isAuthenticated ? (
            <div style={navbarStyles.userSection}>
              <div style={navbarStyles.userInfo}>
                <span style={navbarStyles.userName}>
                  {user?.firstName} {user?.lastName}
                </span>
                <span style={navbarStyles.userRole}>
                  {user?.role === 'club_admin' ? 'Club Admin' : 'Student'}
                </span>
              </div>
              
              <div 
                style={navbarStyles.userAvatar}
                onClick={toggleUserMenu}
                onMouseOver={(e) => handleMouseOver(e, navbarStyles.userAvatarHover)}
                onMouseOut={(e) => handleMouseOut(e, navbarStyles.userAvatar)}
              >
                <User size={20} color="#000" />
              </div>

              {/* UPDATED USER DROPDOWN MENU */}
              {showUserMenu && (
                <div style={navbarStyles.userMenu}>
                  <div style={navbarStyles.userMenuHeader}>
                    <div style={navbarStyles.userMenuHeaderName}>
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div style={navbarStyles.userMenuHeaderEmail}>
                      {user?.email}
                    </div>
                  </div>
                  
                  <div 
                    style={navbarStyles.userMenuItem}
                    onClick={() => {
                      navigate(user?.role === 'club_admin' ? '/admin-dashboard' : '/student-dashboard');
                      setShowUserMenu(false);
                    }}
                    onMouseOver={(e) => handleMouseOver(e, navbarStyles.userMenuItemHover)}
                    onMouseOut={(e) => handleMouseOut(e, {})}
                  >
                    <User size={18} />
                    Dashboard
                  </div>
                  
                  <div 
                    style={navbarStyles.userMenuItem}
                    onClick={() => {
                      navigate('/my-events');
                      setShowUserMenu(false);
                    }}
                    onMouseOver={(e) => handleMouseOver(e, navbarStyles.userMenuItemHover)}
                    onMouseOut={(e) => handleMouseOut(e, {})}
                  >
                    <Calendar size={18} />
                    My Events
                  </div>
                  
                  <div 
                    style={navbarStyles.userMenuItem}
                    onClick={() => {
                      navigate('/settings');
                      setShowUserMenu(false);
                    }}
                    onMouseOver={(e) => handleMouseOver(e, navbarStyles.userMenuItemHover)}
                    onMouseOut={(e) => handleMouseOut(e, {})}
                  >
                    <Settings size={18} />
                    Settings
                  </div>
                  
                  <div 
                    style={navbarStyles.userMenuItem}
                    onClick={handleLogout}
                    onMouseOver={(e) => handleMouseOver(e, navbarStyles.userMenuItemHover)}
                    onMouseOut={(e) => handleMouseOut(e, {})}
                  >
                    <LogOut size={18} />
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                style={navbarStyles.loginButton}
                onMouseOver={(e) => handleMouseOver(e, navbarStyles.loginButtonHover)}
                onMouseOut={(e) => handleMouseOut(e, navbarStyles.loginButton)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                style={navbarStyles.signupButton}
                onMouseOver={(e) => handleMouseOver(e, navbarStyles.signupButtonHover)}
                onMouseOut={(e) => handleMouseOut(e, navbarStyles.signupButton)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Invisible spacer for layout balance */}
        <div style={{ width: '40px', visibility: 'hidden' }} className="d-md-none">
          <Menu size={24} />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div style={navbarStyles.mobileMenu}>
          <button 
            style={navbarStyles.closeButton}
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          
          <Link to="/" style={navbarStyles.mobileNavLink} onClick={handleMenuClick}>
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to={user?.role === 'club_admin' ? '/admin-dashboard' : '/student-dashboard'} 
                style={navbarStyles.mobileNavLink} 
                onClick={handleMenuClick}
              >
                Dashboard
              </Link>
              
              {/* Mobile user info */}
              <div style={{ padding: '1rem 0', borderBottom: '1px solid rgba(248, 183, 0, 0.3)' }}>
                <div style={{ color: '#f8b700', fontSize: '1.1rem', fontWeight: '600' }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                  {user?.role === 'club_admin' ? 'Club Admin' : 'Student'}
                </div>
              </div>
              
              {/* Mobile sign out */}
              <div style={navbarStyles.mobileButtons}>
                <button 
                  style={navbarStyles.mobileLoginButton}
                  onClick={() => {
                    handleLogout();
                    handleMenuClick();
                  }}
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div style={navbarStyles.mobileButtons}>
              <Link 
                to="/login" 
                style={navbarStyles.mobileLoginButton}
                onClick={handleMenuClick}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                style={navbarStyles.mobileSignupButton}
                onClick={handleMenuClick}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;