const mongoose = require("mongoose");

let cartSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
});

let Cart = (module.exports = mongoose.model("Cart", cartSchema));
