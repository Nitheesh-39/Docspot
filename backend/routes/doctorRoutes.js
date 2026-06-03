// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllDoctors,
  getDoctorByUserId,
  applyAsDoctor,
  approveDoctor
} = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

// Apply as a new doctor
router.post('/apply', protect, applyAsDoctor);

// Get all doctors (admin or public view)
router.get('/', getAllDoctors);

// Get doctor by user ID (doctor dashboard)
router.get('/me', protect, getDoctorByUserId);

// Approve doctor (admin only)
router.put('/approve/:id', protect, approveDoctor);

module.exports = router;
