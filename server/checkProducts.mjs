import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const products = await Product.find().lean();
  console.log(products);
  await mongoose.disconnect();
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
