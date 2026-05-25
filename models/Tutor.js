const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  tutorName: { type: String, required: true },
  photo: { type: String },
  subject: { type: String, required: true },
  availableDays: { type: String, required: true },
  timeSlot: { type: String, required: true },
  hourlyFee: { type: Number, required: true },
  totalSlot: { type: Number, required: true },
  sessionStartDate: { type: String, required: true },
  institution: { type: String },
  experience: { type: String },
  location: { type: String },
  teachingMode: { type: String },
  userEmail: { type: String, required: true },
  userName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Tutor", tutorSchema);