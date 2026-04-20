import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  category: {
    type: String,
    default: "general"
  },
  description: {
    type: String,
    default: ""
  }
});

export default mongoose.model("FlourMilletProduct", schema);
