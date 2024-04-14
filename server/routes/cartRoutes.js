const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/product");

const verifyToken = require("../utils/utils");
const e = require("express");

router.route("/").get(verifyToken, async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ userId: req.user.id });
    if (!existingCart) {
      const newCart = new Cart({
        userId: req.user.id,
        products: [],
      });
      await newCart.save();
    } else {
      let products = existingCart.products.map(async (product) => {
        const productDetails = await Product.findById(product.productId);
        return {
          id: productDetails._id,
          title: productDetails.title,
          price: productDetails.price,
          image: productDetails.thumbnail,
          qty: product.qty,
        };
      });

      res.json({ products: await Promise.all(products) });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/qty").get(verifyToken, async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ userId: req.user.id });
    if (!existingCart) {
      const newCart = new Cart({
        userId: req.user.id,
        products: [],
      });
      await newCart.save();
    } else {
      let sumQty = 0;
      existingCart.products.length > 0
        ? existingCart.products.forEach((product) => {
            sumQty += product.qty;
          })
        : (sumQty = 0);
      res.json({ sumQty: sumQty });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post(verifyToken, async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ userId: req.user.id });
    if (!existingCart) {
      const newCart = new Cart({
        userId: req.user.id,
        products: [req.body],
      });
      await newCart.save();
    } else {
      existingCart.products.push(req.body);
      await existingCart.save();
    }
    res.json("Product added to cart");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
