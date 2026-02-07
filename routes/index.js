const express = require("express");
const router = express.Router();
const pool = require("../models/database");
const basicAuth = require("../middleware/auth");
const validate = require("../middleware/validate");
const Joi = require("joi");

// Validation schema for creating a user
const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(100).required()
});

router.get("/health", (req, res) => {
  res.json({ status: "API is running" });
});

router.get("/users", basicAuth, async (req, res) => {
  const [rows] = await pool.query("SELECT id, username, created_at FROM users");
  res.json(rows);
});

// POST endpoint to demonstrate validation
router.post("/users", basicAuth, validate(createUserSchema), async (req, res) => {
  try {
    const { username, password } = req.body;
    const [result] = await pool.query(
      "INSERT INTO users (username, password, created_at) VALUES (?, ?, NOW())", 
      [username, password]
    );
     res.status(201).json({ 
      message: "User created successfully",
      userId: result.insertId,
      user: { 
      id: result.insertId,
      username: username,
      created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ 
      error: "database error", 
      message: error.message 
    });
  }
});

module.exports = router;
