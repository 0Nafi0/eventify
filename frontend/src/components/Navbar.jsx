import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { User, LogOut, Menu, X, Moon, Sun, Settings, Calendar } from "lucide-react";
import logo from "../assets/images/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
      // Force a page refresh after logout to clear all states
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const navbarStyles = {
    navbar: {
      background: "linear-gradient(to right, #000000, #1a1a1a)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      padding: "0.8rem 1.5rem",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      zIndex: "1000",
      height: "75px",
      borderBottom: "1px solid rgba(248, 183, 0, 0.1)",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "1200px",
      margin: "0 auto",
      height: "100%",
      position: "relative",
      padding: "0 1rem",
    },
    brandLogo: {
      height: "55px",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      transition: "transform 0.3s ease",
      filter: "drop-shadow(0 2px 4px rgba(248, 183, 0, 0.2))",
    },
    desktopButtons: {
      display: "flex",
      gap: "0.8rem",
      alignItems: "center",
    },
    themeToggleButton: {
      backgroundColor: 'transparent',
      border: '2px solid #f8b700',
      color: '#f8b700',
      borderRadius: '25px',
      padding: '0.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      marginRight: '0.8rem',
    },
    themeToggleButtonHover: {
      backgroundColor: '#f8b700',
      color: '#000',
    },
    loginButton: {
      background: "transparent",
      border: "2px solid rgba(248, 183, 0, 0.8)",
      color: "#f8b700",
      borderRadius: "30px",
      padding: "0.6rem 1.4rem",
      textDecoration: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: "600",
      fontSize: "0.95rem",
      boxShadow: "0 0 15px rgba(248, 183, 0, 0.1)",
      backdropFilter: "blur(8px)",
    },
    loginButtonHover: {
      background: "linear-gradient(135deg, #f8b700, #ffd700)",
      color: "#000",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(248, 183, 0, 0.3)",
    },
    signupButton: {
      background: "linear-gradient(135deg, #f8b700, #ffd700)",
      border: "2px solid transparent",
      color: "#000",
      borderRadius: "30px",
      padding: "0.6rem 1.4rem",
      textDecoration: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: "600",
      fontSize: "0.95rem",
      boxShadow: "0 4px 15px rgba(248, 183, 0, 0.3)",
    },
    signupButtonHover: {
      background: "transparent",
      borderColor: "#f8b700",
      color: "#f8b700",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 20px rgba(248, 183, 0, 0.2)",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      position: "relative",
    },
    userAvatar: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f8b700, #ffd700)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "2px solid rgba(248, 183, 0, 0.3)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 2px 10px rgba(248, 183, 0, 0.2)",
    },
    userAvatarHover: {
      borderColor: "rgba(255, 255, 255, 0.8)",
      transform: "scale(1.08)",
      boxShadow: "0 4px 15px rgba(248, 183, 0, 0.4)",
    },
    userInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      color: "#fff",
      paddingRight: "10px",
    },
    userName: {
      fontSize: "1rem",
      fontWeight: "700",
      color: "#f8b700",
    },
    userRole: {
      fontSize: "0.9rem",
      color: "#ccc",
      textTransform: "capitalize",
    },
    userMenu: {
      position: "absolute",
      top: "calc(100% + 12px)",
      right: "0",
      background: "linear-gradient(to bottom, #1a1a1a, #0d0d0d)",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(248, 183, 0, 0.2)",
      padding: "0.75rem",
      minWidth: "240px",
      zIndex: "1001",
      display: showUserMenu ? "block" : "none",
      overflow: "hidden",
      border: "1px solid rgba(248, 183, 0, 0.15)",
      backdropFilter: "blur(10px)",
    },
    userMenuHeader: {
      padding: "0.75rem 1rem",
      borderBottom: "1px solid rgba(248, 183, 0, 0.2)",
      marginBottom: "0.5rem",
    },
    userMenuHeaderName: {
      color: "#f8b700",
      fontWeight: "600",
      fontSize: "1rem",
      marginBottom: "0.25rem",
    },
    userMenuHeaderEmail: {
      color: "#aaa",
      fontSize: "0.8rem",
    },
    userMenuItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.85rem 1rem",
      color: "#ddd",
      textDecoration: "none",
      transition: "all 0.2s ease",
      cursor: "pointer",
      borderRadius: "8px",
      fontSize: "0.95rem",
      margin: "0.15rem 0",
      backgroundColor: "transparent",
    },
    userMenuItemHover: {
      backgroundColor: "rgba(248, 183, 0, 0.15)",
      color: "#f8b700",
      transform: "translateX(2px)",
    },
    menuButton: {
      border: "none",
      background: "linear-gradient(135deg, rgba(248, 183, 0, 0.1), rgba(248, 183, 0, 0.05))",
      fontSize: "1.8rem",
      cursor: "pointer",
      color: "#f8b700",
      padding: "0.5rem",
      borderRadius: "12px",
      display: "flex",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 8px rgba(248, 183, 0, 0.1)",
      backdropFilter: "blur(4px)",
    },
    mobileMenu: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, rgba(0, 0, 0, 0.97), rgba(26, 26, 26, 0.97))",
      padding: "5rem 2rem 2rem",
      display: isMenuOpen ? "block" : "none",
      zIndex: "1500",
      overflowY: "auto",
      backdropFilter: "blur(10px)",
    },
    closeButton: {
      position: "absolute",
      top: "1.5rem",
      right: "1.5rem",
      border: "none",
      backgroundColor: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      color: "#f8b700",
    },
    mobileNavLink: {
      display: "block",
      padding: "1rem 0",
      color: "#f8b700",
      textDecoration: "none",
      borderBottom: "1px solid rgba(248, 183, 0, 0.3)",
      fontSize: "1.2rem",
      fontWeight: "500",
      transition: "padding-left 0.3s ease",
    },
    mobileNavLinkHover: {
      paddingLeft: "1rem",
    },
    mobileButtons: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginTop: "2rem",
      paddingTop: "2rem",
      borderTop: "2px solid rgba(248, 183, 0, 0.3)",
    },
    mobileLoginButton: {
      backgroundColor: "transparent",
      border: "2px solid #f8b700",
      color: "#f8b700",
      borderRadius: "25px",
      padding: "0.8rem",
      textDecoration: "none",
      textAlign: "center",
      fontWeight: "600",
      fontSize: "1.1rem",
      transition: "all 0.3s ease",
    },
    mobileSignupButton: {
      backgroundColor: "#f8b700",
      border: "2px solid #f8b700",
      color: "#000",
      borderRadius: "25px",
      padding: "0.8rem",
      textDecoration: "none",
      textAlign: "center",
      fontWeight: "600",
      fontSize: "1.1rem",
      transition: "all 0.3s ease",
    },
    mobileThemeToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem 0",
      borderBottom: "1px solid rgba(248, 183, 0, 0.3)",
      marginBottom: "1rem",
    },
    mobileThemeButton: {
      backgroundColor: "transparent",
      border: "2px solid #f8b700",
      color: "#f8b700",
      borderRadius: "25px",
      padding: "0.6rem 1rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "all 0.3s ease",
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

  return (
    <>
      <style>
        {`
          @keyframes navbarFadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes logoPopIn {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes buttonSlideIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes avatarPulse {
            0% {
              box-shadow: 0 0 0 0 rgba(248, 183, 0, 0.4);
            }
            70% {
              boxShadow: 0 0 0 10px rgba(248, 183, 0, 0);
            }
            100% {
              boxShadow: 0 0 0 0 rgba(248, 183, 0, 0);
            }
          }

          @keyframes menuSlideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes mobileMenuSlide {
            from {
              opacity: 0;
              transform: translateX(-100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .navbar-blur {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        `}
      </style>
      
      <nav style={navbarStyles.navbar} className="navbar-blur">
        <div style={navbarStyles.container}>
          {/* Menu button on left */}
          <button
            style={navbarStyles.menuButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>

          <Link to="/" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <img src={logo} alt="Eventify Logo" style={navbarStyles.brandLogo} />
          </Link>

          <div style={navbarStyles.desktopButtons} className="d-none d-md-flex">
            <button
              style={navbarStyles.themeToggleButton}
              onClick={toggleTheme}
              onMouseOver={(e) => handleMouseOver(e, navbarStyles.themeToggleButtonHover)}
              onMouseOut={(e) => handleMouseOut(e, navbarStyles.themeToggleButton)}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

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
                      onMouseOut={(e) => handleMouseOut(e, navbarStyles.userMenuItem)}
                    >
                      <User size={18} />
                      Dashboard
                    </div>
                    
                    
                    <div 
                      style={navbarStyles.userMenuItem}
                      onClick={handleLogout}
                      onMouseOver={(e) => handleMouseOver(e, navbarStyles.userMenuItemHover)}
                      onMouseOut={(e) => handleMouseOut(e, navbarStyles.userMenuItem)}
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

            <div style={navbarStyles.mobileThemeToggle}>
              <button
                style={navbarStyles.mobileThemeButton}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
            
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
                
                <div style={{ padding: '1rem 0', borderBottom: '1px solid rgba(248, 183, 0, 0.3)' }}>
                  <div style={{ color: '#f8b700', fontSize: '1.1rem', fontWeight: '600' }}>
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                    {user?.role === 'club_admin' ? 'Club Admin' : 'Student'}
                  </div>
                </div>

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
              position: "fixed",
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
    </>
  );
}

export default Navbar;