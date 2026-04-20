import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

console.log("Starting user seed script...");
dotenv.config();

const testUsers = [
  { email: "test@example.com", password: "password123" },
  { email: "user@example.com", password: "user123456" },
  { email: "admin@example.com", password: "admin12345" }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Clear existing users
    await User.deleteMany({});
    console.log("Cleared existing users");

    // Hash passwords and create users
    const users = await Promise.all(
      testUsers.map(async (user) => {
        const hash = await bcrypt.hash(user.password, 10);
        return { email: user.email, password: hash };
      })
    );

    const created = await User.insertMany(users);
    console.log(`✅ Added ${created.length} test users`);
    console.log("\nTest Credentials:");
    testUsers.forEach(user => {
      console.log(`  Email: ${user.email}, Password: ${user.password}`);
    });

    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  });
