const express = require("express");
const router = express.Router();
const {
  getUpcomingEvents,
  getEventById,
  registerForEvent,
  unregisterFromEvent,
  getStudentRegisteredEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getClubAdminEvents,
  getEventAttendees,
} = require("../controllers/eventController");
const { protect, authorize, isClubAdmin } = require("../middleware/auth");
const { validateEventCreation, checkValidationResult } = require('../utils/validateInput');

// Public routes
router.get("/", getUpcomingEvents);
router.get("/:id", getEventById);

// Protected routes (students only)
router.get(
  "/student/registered",
  protect,
  authorize("student"),
  getStudentRegisteredEvents
);
router.post("/:id/register", protect, authorize("student"), registerForEvent);
router.delete(
  "/:id/register",
  protect,
  authorize("student"),
  unregisterFromEvent
);

// Protected routes (Club Admins only)
router.post(
  "/admin",
  protect,
  isClubAdmin,
  validateEventCreation,
  checkValidationResult,
  createEvent
);
router.put(
  "/admin/:id",
  protect,
  isClubAdmin,
  validateEventCreation,
  checkValidationResult,
  updateEvent
);
router.delete("/admin/:id", protect, isClubAdmin, deleteEvent);
router.get("/admin/my-events", protect, isClubAdmin, getClubAdminEvents);
router.get("/admin/:id/attendees", protect, isClubAdmin, getEventAttendees);

module.exports = router;
