const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/database");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const Product = require("./models/product");

// Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(config.databaseUrl);
let db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});
db.on("error", function (err) {
  console.log("DB Error");
});

// Routes
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.get("/", async (req, res) => {
  let categories = await Product.find().distinct("category");
  // const NUM_CATEGORIES_TO_FETCH = 5;
  const NUM_CATEGORIES_TO_FETCH = categories.length;
  let data = {};
  for (i = 0; i < NUM_CATEGORIES_TO_FETCH; i++) {
    let selectedCategory =
      categories[Math.floor(Math.random() * categories.length)];
    let products = await Product.find({ category: selectedCategory });
    data = { ...data, [selectedCategory]: products };
    categories = categories.filter((category) => category !== selectedCategory);
  }
  res.json(data);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
