import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  const user = await User.create({...req.body, password:hash});
  res.json(user);
});

router.post("/login", async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).json({error:"User not found"});
  
  const valid = await bcrypt.compare(req.body.password, user.password);
  if(!valid) return res.status(400).json({error:"Invalid password"});

  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
  res.json({user, token});
});

export default router;
