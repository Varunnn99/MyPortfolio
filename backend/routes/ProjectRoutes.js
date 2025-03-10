const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Ensure this file exists
const authenticateToken= require("../middleware/authMiddleware"); // Ensure this file exists

// GET Projects Route
router.get("/", async (req, res) => {
  try {
    const [projects] = await pool.query("SELECT * FROM projects");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// POST New Project Route (Protected)
router.post("/", authenticateToken, async (req, res) => { 
    const { title, description, link, src } = req.body;
    try {
      await pool.query(
        "INSERT INTO projects (title, description, link, src) VALUES (?, ?, ?, ?)", 
        [title, description, link, src]
      );
      res.status(201).json({ message: "Project added" });
    } catch (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: "Failed to add project" });
    }
  });
  
module.exports = router;
