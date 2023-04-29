const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = (app) => {
  // initailize
  app.use(passport.initialize());
  app.use(passport.session());
  // strtegy
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            // 錯誤處理
            if (!user) {
              return done(null, false);
            }
            if (user.password !== password) {
              return done(null, false);
            }
            return done(null, user);
          })
          .catch((err) => done(err, false));
      }
    )
  );
  // 序列化和反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
