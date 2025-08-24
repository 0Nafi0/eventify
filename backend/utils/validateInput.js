const { body, validationResult } = require('express-validator');

// Validation rules for user registration
const validateRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('role')
    .isIn(['student', 'club_admin'])
    .withMessage('Role must be either student or club_admin'),
  
  body('studentId')
    .if(body('role').equals('student'))
    .notEmpty()
    .withMessage('Student ID is required for students')
    .isLength({ min: 3, max: 20 })
    .withMessage('Student ID must be between 3 and 20 characters'),
  
  body('clubName')
    .if(body('role').equals('club_admin'))
    .notEmpty()
    .withMessage('Club name is required for club admins')
    .isLength({ min: 2, max: 100 })
    .withMessage('Club name must be between 2 and 100 characters'),
  
  body('department')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Department must be between 2 and 100 characters'),
  
  body('phone')
    .optional()
    .matches(/^[\]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number')
];

// Validation rules for user login
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for password update
const validatePasswordUpdate = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Validation rules for event creation and update
const validateEventCreation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Event title is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Event title must be between 2 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Event description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Event description must be between 10 and 1000 characters'),
  
  body('date')
    .isISO8601()
    .toDate()
    .withMessage('Valid event date is required')
    .custom((value, { req }) => {
      if (new Date(value) < new Date()) {
        throw new Error('Event date cannot be in the past');
      }
      return true;
    }),
  
  body('startTime')
    .trim()
    .notEmpty()
    .withMessage('Event start time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/) // HH:MM format
    .withMessage('Start time must be in HH:MM format'),
  
  body('endTime')
    .trim()
    .notEmpty()
    .withMessage('Event end time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/) // HH:MM format
    .withMessage('End time must be in HH:MM format')
    .custom((value, { req }) => {
      const start = req.body.startTime;
      const end = value;
      // Simple time comparison, assumes same day
      if (start && end && end <= start) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Event location is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Event location must be between 3 and 200 characters'),
  
  body('maxAttendees')
    .isInt({ min: 1 })
    .withMessage('Maximum attendees must be a number greater than 0'),
  
  body('category')
    .isIn([
      "academic",
      "social",
      "sports",
      "cultural",
      "technical",
      "workshop",
      "seminar",
      "other",
    ])
    .withMessage('Please select a valid event category'),
  
  body('registrationDeadline')
    .isISO8601()
    .toDate()
    .withMessage('Valid registration deadline is required')
    .custom((value, { req }) => {
      if (new Date(value) < new Date()) {
        throw new Error('Registration deadline cannot be in the past');
      }
      if (new Date(value) >= new Date(req.body.date)) {
        throw new Error('Registration deadline must be before the event date');
      }
      return true;
    }),
  
  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((value) => {
      if (value && value.some(tag => typeof tag !== 'string' || tag.trim().length === 0)) {
        throw new Error('All tags must be non-empty strings');
      }
      return true;
    }),
  
  body('requirements')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Requirements cannot exceed 500 characters'),
  
  body('contactInfo.name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Contact name must be between 2 and 100 characters'),
  
  body('contactInfo.email')
    .optional()
    .isEmail()
    .withMessage('Contact email must be a valid email address'),
  
  // Removed contactInfo.phone validation
];

// Function to check validation results
const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validatePasswordUpdate,
  validateEventCreation,
  checkValidationResult
};