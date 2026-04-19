import express from "express";
import Product from "../models/Product.js";

const router = express.Router();
const defaultImage = "https://via.placeholder.com/400x300?text=Product+Image";

router.get("/", async (req,res)=>{
  const host = `${req.protocol}://${req.get("host")}`;
  const products = await Product.find().lean();
  const productsWithImages = products.map(product => {
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
  res.json(productsWithImages);
});

router.post("/", async (req,res)=>{
  const p = await Product.create(req.body);
  res.json(p);
});

export default router;
