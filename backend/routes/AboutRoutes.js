const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Ensure this file exists
const authenticateToken = require("../middleware/authMiddleware"); // Ensure authentication

// 📌 GET About Me Content
router.get("/", async (req, res) => {
    try {
        const [about] = await pool.query("SELECT * FROM about LIMIT 1");
        if (about.length === 0) {
            return res.status(404).json({ error: "No about me content found" });
        }
        res.json(about[0]); // Return the first row
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// 📌 UPDATE About Me Content (Protected)
router.put("/", authenticateToken, async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    try {
        await pool.query("UPDATE about SET content = ? WHERE id = 1", [content]);
        res.status(200).json({ message: "About Me updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update About Me" });
    }
});

module.exports = router;
