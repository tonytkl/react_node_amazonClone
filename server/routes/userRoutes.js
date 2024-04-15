const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const verifyToken = require("../utils/utils");
require("../config/passport")(passport);

let User = require("../models/user");
const config = require("../config/database");

router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: MongoStore.create({ mongoUrl: config.databaseUrl }),
  })
);

router.route("/").get(verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user._id, name: user.firstName }, "secret", {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, message: "Logged in successfully" });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
