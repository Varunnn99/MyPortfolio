require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
const projectRoutes = require("./routes/ProjectRoutes");
app.use("/api/projects", projectRoutes);

const skillRoutes = require("./routes/SkillRoutes"); // Import skills route
app.use("/api/skills", skillRoutes); // Add skills route

const contactRoutes = require("./routes/ContactRoutes");
app.use("/api/contact", contactRoutes);

const aboutRoutes = require("./routes/AboutRoutes");
app.use("/api/about", aboutRoutes);


// Database Connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise();

// User Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// User Registration
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, hashedPassword, role || "user"]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, role: rows[0].role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected Route Example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.get("/", (req, res) => {
  res.send("Backend is running successfully! 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
