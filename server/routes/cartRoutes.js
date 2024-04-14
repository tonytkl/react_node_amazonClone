const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Cart = require("../models/cart");
const User = require("../models/user");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = decoded;
    next();
  });
}

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
        console.log(existingCart);
        let sumQty = 0;
        existingCart.products.length > 0
          ? existingCart.products.forEach((product) => {
              sumQty += product.qty;
            })
          : (sumQty = 0);
        console.log(sumQty);
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
