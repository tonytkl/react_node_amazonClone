require("dotenv").config();

module.exports = {
  databaseUrl: process.env.DB_URL,
  secret: "mysecretkey",
};
