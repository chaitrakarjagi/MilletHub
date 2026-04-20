import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req,res)=>{
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected" });
  }
  const hash = await bcrypt.hash(req.body.password,10);
  const user = await User.create({...req.body, password:hash});
  res.json(user);
});

router.post("/login", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: "Database not connected" });
    }

    // Validate input
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log(`❌ Login failed: User not found for email ${req.body.email}`);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      console.log(`❌ Login failed: Invalid password for ${req.body.email}`);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(`✅ Login successful for ${req.body.email}`);
    res.json({ user: { id: user._id, email: user.email }, token });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
