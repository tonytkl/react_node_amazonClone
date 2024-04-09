const mongoose = require("mongoose");
const express = require("express");
const config = require("./config/database");

let Product = require("./models/product");

mongoose.connect(config.databaseUrl);
let db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("error", function (err) {
  console.log("DB Error");
});

app = express();
app.get("/", (req, res) => {
  fetch("https://dummyjson.com/products?limit=0")
    .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    //   res.json(data);
    // });
    .then((data) => {
      Product.insertMany(data.products).then(() => {
        res.send("Data imported");
      });
    });

  //   Product.find({}).then((products) => {
  //     res.json(products);
  //   });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
