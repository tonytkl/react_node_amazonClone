const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Cart = require("../models/cart");

const verifyToken = require("../utils/utils");

router
  .route("/")
  .get(verifyToken, async (req, res) => {
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
  })
  .post(verifyToken, async (req, res) => {
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
