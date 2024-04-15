require("dotenv").config();

module.exports = {
  databaseUrl:
    process.env.DB_URL ||
    "mongodb+srv://thitiklinpon:kvdkRIapo4eYrTmV@cluster0.vxj9lmm.mongodb.net/amazon",
  secret: "mysecretkey",
};
