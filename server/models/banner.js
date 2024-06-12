const mongoose = require("mongoose");

let bannerSchema = mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
});

let Banner = (module.exports = mongoose.model("Banner", bannerSchema));
