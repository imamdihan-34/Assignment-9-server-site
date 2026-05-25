const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://your-vercel-app.vercel.app"],
  credentials: true,
}));
app.use(express.json());

// Routes
const tutorRoutes = require("./routes/tutors");
const bookingRoutes = require("./routes/bookings");
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
app.use("/tutors", tutorRoutes);
app.use("/bookings", bookingRoutes);

// Root
app.get("/", (req, res) => {
  res.send("MediQueue Server is running!");
});

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4,
})
  .then(() => {
    console.log("✅ MongoDB Connected!");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));