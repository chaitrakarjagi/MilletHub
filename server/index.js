import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import paymentRoutes from "./routes/payment.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "assets", "images")));

// Connect to MongoDB if URI is provided and valid
if (process.env.MONGO_URI && process.env.MONGO_URI.startsWith("mongodb")) {
  mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB connected"))
    .catch(err => console.log("MongoDB connection error:", err.message));
} else {
  console.log("MongoDB URI not configured - database features disabled");
}

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(5000, ()=>console.log("Server running on 5000"));
