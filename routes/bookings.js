const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Tutor = require("../models/Tutor");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    const { email } = req.query;

    if (req.user.email !== email) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const bookings = await Booking.find({ userEmail: email });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { tutorId, userEmail } = req.body;

    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    if (tutor.totalSlot <= 0) {
      return res.status(400).json({ message: "No available slots left." });
    }

    const alreadyBooked = await Booking.findOne({ tutorId, userEmail });
    if (alreadyBooked) {
      return res
        .status(400)
        .json({ message: "You already booked this tutor!" });
    }

    const booking = new Booking({
      ...req.body,
      status: "confirmed",
    });
    await booking.save();

    await Tutor.findByIdAndUpdate(tutorId, {
      $inc: { totalSlot: -1 },
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true },
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
