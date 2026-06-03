// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get Current User Info
router.get('/me', protect, getCurrentUser);

module.exports = router;
