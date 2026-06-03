const mongoose = require('mongoose');

/**
 * Doctor Schema
 * Represents a doctor application/profile tied to a User.
 */
const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Compile model from schema
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
