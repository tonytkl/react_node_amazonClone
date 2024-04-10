const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const session = require("express-session");

let User = require("../models/user");

router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

router.post("/register", async (req, res) => {
  await check("firstName", "First name is required").notEmpty().run(req);
  await check("lastName", "Last name is required").notEmpty().run(req);
  await check("email", "Email is required").notEmpty().run(req);
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password is required").notEmpty().run(req);
  await check("confirm_password", "Confirm Password is required")
    .notEmpty()
    .run(req);
  await check("confirm_password", "Passwords do not match")
    .equals(req.body.password)
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res, next) => {
  await check("email", "Email is required").notEmpty().run(req);
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password is required").notEmpty().run(req);

  const errors = validationResult(req);
  console.log("login requested");
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.logIn(user, async (err) => {
      console.log("logging in");
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user._id, name: user.name }, "secret", {
        expiresIn: "1h",
      });
      console.log("token", token);
      return res.status(200).json({ token });
    });
  });
  console.log("authenticated");
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
