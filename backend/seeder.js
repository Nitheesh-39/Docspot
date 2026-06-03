const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/doctorModel'); // adjust if needed

dotenv.config();

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    await Doctor.deleteMany(); // optional

    await Doctor.insertMany([
      {
        name: "Dr. Kavya Komma",
        email: "kavya@example.com",
        phone: "9876543210", // ✅ Required
        specialization: "Pediatrician",
        experience: 7,
        feesPerConsultation: 600,
        timings: ["09:00", "12:00"],
        isApproved: true,
        user: "662b44d5e5c1b2b8434fa777" // ✅ Required — must match a valid user _id
      },
      {
        name: "Dr. Arjun Mehta",
        email: "arjun@example.com",
        phone: "9876501234",
        specialization: "Dermatologist",
        experience: 5,
        feesPerConsultation: 450,
        timings: ["14:00", "17:00"],
        isApproved: true,
        user: "662b44d5e5c1b2b8434fa778"
      }
    ]);

    console.log("Doctors seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDoctors();
