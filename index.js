const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ সব origin allow করো
app.use(cors());
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

// MongoDB connect
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
};

// Vercel serverless handler
const handler = async (req, res) => {
  await connectDB();
  return app(req, res);
};

// Local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  });
}

module.exports = handler;