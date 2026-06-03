// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getDoctorAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// Book appointment
router.post('/book', protect, bookAppointment);

// Get my appointments (user or doctor)
router.get('/my', protect, getMyAppointments);

// Cancel appointment
router.delete('/:id', protect, cancelAppointment);

// Doctor: Get all appointments
router.get('/doctor', protect, getDoctorAppointments);

// Doctor: Update appointment status
router.put('/status/:id', protect, updateAppointmentStatus);

module.exports = router;
