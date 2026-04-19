import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String
});

export default mongoose.model("User", schema);
