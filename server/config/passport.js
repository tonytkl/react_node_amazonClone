const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          let user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          let isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect credentials" });
          }
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (err) {
        done(null, false, { error: err });
      }
      done(null, user);
    });
  });
};
