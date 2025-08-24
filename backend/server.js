const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3001",
      "http://localhost:5173", // Vite dev server
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api", routes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

// Start server
const startServer = () => {
  // Use port 3001 by default, or from environment variable
  const PORT = process.env.PORT || 3001;

  console.log(`🚀 Starting Eventify Server on port ${PORT}...`);

  const server = app.listen(PORT, () => {
    console.log(`✅ Eventify Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(
      `🌐 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`
    );
    console.log(`🔗 API URL: http://localhost:${PORT}/api`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  });

  // Handle server errors
  server.on("error", (err) => {
    if (err.code === "EACCES") {
      console.error(`❌ Permission denied for port ${PORT}`);
      console.error(`💡 Try using a different port: PORT=3002`);
      process.exit(1);
    } else if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${PORT} is already in use`);
      console.error(`💡 Try using a different port: PORT=3002`);
      process.exit(1);
    } else {
      console.error(`❌ Server error: ${err.message}`);
      process.exit(1);
    }
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      console.log("Process terminated");
    });
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received. Shutting down gracefully...");
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });
};

// Start the server
startServer();
