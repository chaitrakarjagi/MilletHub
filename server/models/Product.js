import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String
});

export default mongoose.model("Product", schema);
