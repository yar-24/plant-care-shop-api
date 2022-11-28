const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [Object],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);