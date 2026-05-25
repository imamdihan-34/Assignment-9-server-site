const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tutorId: { type: String, required: true },
  tutorName: { type: String, required: true },
  subject: { type: String, required: true },
  timeSlot: { type: String },
  hourlyFee: { type: Number },
  location: { type: String },
  userEmail: { type: String, required: true },
  studentName: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, default: "confirmed" }, 
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);