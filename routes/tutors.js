const express = require("express");
const router = express.Router();
const Tutor = require("../models/Tutor");
const verifyToken = require("../middleware/verifyToken");

router.get("/", async (req, res) => {
  try {
    const { search, startDate, endDate } = req.query;

    let query = {};

    if (search) {
      query.tutorName = { $regex: search, $options: "i" };
    }

    if (startDate && endDate) {
      query.sessionStartDate = {
        $gte: startDate,
        $lte: endDate,
      };
    } else if (startDate) {
      query.sessionStartDate = { $gte: startDate };
    } else if (endDate) {
      query.sessionStartDate = { $lte: endDate };
    }

    const tutors = await Tutor.find(query);
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/my-tutors", verifyToken, async (req, res) => {
  try {
    const { email } = req.query;

    if (req.user.email !== email) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const tutors = await Tutor.find({ userEmail: email });
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const tutor = new Tutor(req.body);
    const saved = await tutor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Tutor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Tutor.findByIdAndDelete(req.params.id);
    res.json({ message: "Tutor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
