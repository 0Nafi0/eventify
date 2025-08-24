const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getAvailableClubs,
  getUserClubs,
  joinClub,
  leaveClub,
  createClub,
} = require("../controllers/clubController");
const { body } = require("express-validator");

// Club validation rules
const clubValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Club name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Club name must be between 3 and 50 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Club description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Club description must be between 10 and 500 characters"),
];

// Get all available clubs
router.get("/available", protect, getAvailableClubs);

// Get user's clubs
router.get("/user", protect, getUserClubs);

// Join a club
router.post("/join/:clubId", protect, joinClub);

// Leave a club
router.post("/leave/:clubId", protect, leaveClub);

// Create a new club (admin only)
router.post("/", protect, clubValidation, createClub);

module.exports = router;
