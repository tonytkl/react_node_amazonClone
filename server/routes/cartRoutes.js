const express = require("express");
const router = express.Router();

const Cart = require("../models/cart");
const User = require("../models/user");

router.get(async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
