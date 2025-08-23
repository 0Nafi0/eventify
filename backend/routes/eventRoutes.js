const express = require("express");
const router = express.Router();
const {
  getUpcomingEvents,
  getEventById,
  registerForEvent,
  unregisterFromEvent,
  getStudentRegisteredEvents,
} = require("../controllers/eventController");
const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getUpcomingEvents);
router.get("/:id", getEventById);

// Protected routes (students only)
router.get("/student/registered", protect, authorize("student"), getStudentRegisteredEvents);
router.post("/:id/register", protect, authorize("student"), registerForEvent);
router.delete("/:id/register", protect, authorize("student"), unregisterFromEvent);

module.exports = router;
