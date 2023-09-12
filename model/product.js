const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, min: [0, "Invalid price"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "Invalid min discount"],
    max: [50, "Invalid max discount"],
  },
  rating: {
    type: Number,
    min: [0, "Invalid min discount"],
    max: [5, "Invalid max discount"],
    default: 0,
  },
  stock: { type: String },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});

exports.Product = mongoose.model("Product", productSchema);
