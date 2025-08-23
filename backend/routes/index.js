const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const eventRoutes = require('./eventRoutes');

// Use route modules
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Eventify API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

module.exports = router;
