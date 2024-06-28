const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/database");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const Product = require("./models/product");
const Banner = require("./models/banner");

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
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);

app.get("/", async (req, res) => {
  let banner = [];
  try {
    banner = await Banner.find();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.json({ banner });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
