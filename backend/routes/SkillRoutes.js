const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

// GET Skills Route
router.get("/", async (req, res) => {
  try {
    const [skills] = await pool.query("SELECT * FROM skills");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// POST New Skill Route (Protected)
router.post("/", authenticateToken, async (req, res) => {
  const { title, description, src } = req.body;

  try {
    await pool.query(
      "INSERT INTO skills (title, description, src) VALUES (?, ?, ?)",
      [title, description, src]
    );
    res.status(201).json({ message: "Skill added successfully" });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Failed to add skill" });
  }
});

module.exports = router;
