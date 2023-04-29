const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// 密碼雜湊
const bcrypt = require("bcryptjs");

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
              return done(
                null,
                false,
                req.flash("warning_msg", "帳號或密碼不正確!")
              );
            }
            return bcrypt
              .compare(password, user.password)
              .then((isMatch) => {
                if (isMatch) {
                  return done(
                    null,
                    false,
                    req.flash("warning_msg", "帳號或密碼不正確!")
                  );
                }
                done(null, user);
              })
              .catch((err) => done(err, false));
          })
          .catch((err) => done(err, false));
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["email", "displayName"],
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json;
        User.findOne({ email }).then((user) => {
          // 如果有了就直接登入
          if (user) return done(null, user);
          const randomPassword = Math.random().toString(36).slice(-8);
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(randomPassword, salt))
            .then((hash) =>
              User.create({
                name,
                email,
                password: hash,
              })
            )
            .then((user) => done(null, user))
            .catch((err) => done(err, false));
        });
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
