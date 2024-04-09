const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.route("/:id").get(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
