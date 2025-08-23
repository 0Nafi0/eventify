const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  logoutUser,
  refreshToken
} = require('../controllers/authController');

const {
  validateRegistration,
  validateLogin,
  validatePasswordUpdate,
  checkValidationResult
} = require('../utils/validateInput');

const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', validateRegistration, checkValidationResult, registerUser);
router.post('/login', validateLogin, checkValidationResult, loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/change-password', protect, validatePasswordUpdate, checkValidationResult, changePassword);
router.post('/logout', protect, logoutUser);
router.post('/refresh', protect, refreshToken);

module.exports = router;
