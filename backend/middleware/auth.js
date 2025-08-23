const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes - requires valid JWT token
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: "User account is deactivated",
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided",
    });
  }
};

// Middleware to authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this resource`,
      });
    }

    next();
  };
};

// Middleware to check if user is club admin
const isClubAdmin = authorize("club_admin");

// Middleware to check if user is student
const isStudent = authorize("student");

// Middleware to check if user is either role
const isAuthenticated = protect;

module.exports = {
  protect,
  authorize,
  isClubAdmin,
  isStudent,
  isAuthenticated,
};
