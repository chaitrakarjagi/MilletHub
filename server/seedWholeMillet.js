import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const wholeMilletProducts = [
  { title: "Araka", price: 200, image: "http://localhost:5000/images/araka.jpg", category: "whole-millet" },
  { title: "Baragu", price: 200, image: "http://localhost:5000/images/baragu.jpg", category: "whole-millet" },
  { title: "Jowar", price: 200, image: "http://localhost:5000/images/jowar.jpg", category: "whole-millet" },
  { title: "Korale", price: 200, image: "http://localhost:5000/images/korale.jpg", category: "whole-millet" },
  { title: "Navane", price: 200, image: "http://localhost:5000/images/navane.jpg", category: "whole-millet" },
  { title: "Oodhalu", price: 200, image: "http://localhost:5000/images/oodhalu.jpg", category: "whole-millet" },
  { title: "Ragi", price: 200, image: "http://localhost:5000/images/ragi.jpg", category: "whole-millet" },
  { title: "Sajji", price: 200, image: "http://localhost:5000/images/sajji.jpg", category: "whole-millet" },
  { title: "Samai", price: 200, image: "http://localhost:5000/images/samai.jpg", category: "whole-millet" },
  { title: "Wheat", price: 200, image: "http://localhost:5000/images/wheat.jpg", category: "whole-millet" }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await Product.deleteMany({ category: "whole-millet" });
    console.log("Cleared existing whole-millet products");

    const created = await Product.insertMany(wholeMilletProducts);
    console.log(`✅ Added ${created.length} whole-millet products`);

    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  });