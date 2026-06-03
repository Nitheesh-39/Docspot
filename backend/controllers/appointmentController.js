// controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const Doctor = require('../models/doctorModel');

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, symptoms, documents } = req.body;
    const appointment = await Appointment.create({
      user: req.user._id,
      doctor: doctorId,
      date,
      time,
      symptoms,
      documents,
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to book appointment' });
  }
};

// Get appointments for current user
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate('doctor', 'user specialization')
      .sort({ date: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

// Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment || appointment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    appointment.status = 'cancelled';
    await appointment.save();
    res.status(200).json({ message: 'Appointment cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling appointment' });
  }
};

// Get doctor appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });
    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate('user', 'name email')
      .sort({ date: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not retrieve doctor appointments' });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!appointment || appointment.doctor.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    appointment.status = req.body.status;
    await appointment.save();
    res.status(200).json({ message: 'Status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
};
