import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const sampleProducts = [
  { title: "Wheat", price: 999, image: "/images/wheat.jpg" },
  { title: "Jowar", price: 199, image: "/images/jowar.jpg" },
  { title: "Baragu", price: 299, image: "/images/baragu.jpg" },
  { title: "Ragi", price: 79, image: "/images/ragi.jpg" },
  { title: "Sajji", price: 49, image: "/images/sajji.jpg" },
  { title: "Oodhalu", price: 399, image: "/images/oodhalu.jpg" },
  { title: "Araka", price: 15, image: "/images/araka.jpg" },
  { title: "Samai", price: 25, image: "/images/samai.jpg" },
  { title: "Navane", price: 10, image: "/images/navane.jpg" },
  { title: "Korale", price: 35, image: "/images/korale.jpg" }
];

// Images are served from the backend static folder at /images
// The product API will return absolute URLs based on the current host.
// Example: http://localhost:5000/images/wheat.jpg

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected to MongoDB");
  
  // Clear existing products
  await Product.deleteMany({});
  console.log("Cleared existing products");
  
  // Insert sample products
  const created = await Product.insertMany(sampleProducts);
  console.log(`✅ Added ${created.length} sample products`);
  
  process.exit(0);
}).catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
