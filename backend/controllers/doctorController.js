// controllers/doctorController.js
const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');

// Apply as Doctor
const applyAsDoctor = async (req, res) => {
  try {
    const { specialization, experience, phone, address, availableTime } = req.body;
    const doctorExists = await Doctor.findOne({ user: req.user._id });

    if (doctorExists) {
      return res.status(400).json({ message: 'You have already applied or are a doctor' });
    }

    const newDoctor = await Doctor.create({
      user: req.user._id,
      specialization,
      experience,
      phone,
      address,
      availableTime,
    });

    res.status(201).json(newDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: true }).populate('user', 'name email');
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};

// Get Doctor by User ID
const getDoctorByUserId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id }).populate('user', 'name email');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin Approves Doctor
const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    doctor.isApproved = true;
    await doctor.save();

    const user = await User.findById(doctor.user);
    user.isApproved = true;
    await user.save();

    res.status(200).json({ message: 'Doctor approved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Approval failed' });
  }
};

module.exports = {
  applyAsDoctor,
  getAllDoctors,
  getDoctorByUserId,
  approveDoctor,
};
