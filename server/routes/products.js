import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const router = express.Router();
const defaultImage = "https://via.placeholder.com/400x300?text=Product+Image";

const formatProducts = (products, host) => products.map(product => {
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${host}${product.image}`
    : defaultImage;

  return {
    ...product,
    image: imageUrl
  };
});

router.get("/", async (req,res)=>{
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected" });
  }
  const host = `${req.protocol}://${req.get("host")}`;
  const products = await Product.find().lean();
  res.json(formatProducts(products, host));
});

router.get("/whole-millet", async (req,res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected" });
  }
  const host = `${req.protocol}://${req.get("host")}`;
  const products = await Product.find({ category: /whole-millet/i }).lean();
  res.json(formatProducts(products, host));
});
router.get("/flour-millet", async (req,res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected" });
  }
  const host = `${req.protocol}://${req.get("host")}`;
  const products = await Product.find({ category: /flour-millet/i }).lean();
  res.json(formatProducts(products, host));
});
router.get("/category/:category", async (req,res)=>{
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected" });
  }
  const host = `${req.protocol}://${req.get("host")}`;
  const category = req.params.category;
  const products = await Product.find({ category: new RegExp(`^${category}$`, "i") }).lean();
  res.json(formatProducts(products, host));
});

router.post("/", async (req,res)=>{
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected" });
  }
  const p = await Product.create(req.body);
  res.json(p);
});

export default router;
