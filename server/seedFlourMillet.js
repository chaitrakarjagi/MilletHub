import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

console.log("Starting seed script...");
dotenv.config();
console.log("Loaded dotenv");

const flourMilletProducts = [
  { title: "Araka Flour", price: 200, image: "http://localhost:5000/images/arakaflour.jpg", category: "flour-millet" },
  { title: "Baragu Flour", price: 200, image: "http://localhost:5000/images/baraguflour.jpg", category: "flour-millet" },
  { title: "Broken Jowara", price: 200, image: "http://localhost:5000/images/brokenjowar.jpg", category: "flour-millet" },
  { title: "Broken Wheat", price: 200, image: "http://localhost:5000/images/brokenwheat.jpg", category: "flour-millet" },
  { title: "Jowar Flour", price: 200, image: "http://localhost:5000/images/JowarFlour.jpg", category: "flour-millet" },
  { title: "Navane Flour", price: 200, image: "http://localhost:5000/images/navaneflour.jpg", category: "flour-millet" },
  { title: "Ragi Flour", price: 200, image: "http://localhost:5000/images/ragiflour.jpg", category: "flour-millet" },
  { title: "Sajji Flour", price: 200, image: "http://localhost:5000/images/sajjiflour.jpg", category: "flour-millet" },
  { title: "Wheat Flour", price: 200, image: "http://localhost:5000/images/wheatflour.jpeg", category: "flour-millet" }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    console.log("MONGO_URI:", process.env.MONGO_URI);

    await Product.deleteMany({ category: "flour-millet" });
    console.log("Cleared existing flour-millet products");

    const created = await Product.insertMany(flourMilletProducts);
    console.log(`✅ Added ${created.length} flour-millet products`);

    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err.message);
    console.error("Full error:", err);
    process.exit(1);
  });
