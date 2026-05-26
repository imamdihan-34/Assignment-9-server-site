const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://your-client.vercel.app"],
  credentials: true,
}));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const tutorRoutes = require("./routes/tutors");
const bookingRoutes = require("./routes/bookings");

app.use("/auth", authRoutes);
app.use("/tutors", tutorRoutes);
app.use("/bookings", bookingRoutes);

// Root
app.get("/", (req, res) => {
  res.send("MediQueue Server is running!");
});

// ✅ MongoDB connect — serverless এর জন্য
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected!");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

module.exports = app;