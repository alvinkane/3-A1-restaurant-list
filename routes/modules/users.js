const express = require("express");
const router = express.Router();

const User = require("../../models/user");

// 密碼雜湊
const bcrytpt = require("bcryptjs");

const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("warning_msg", "請輸入帳號及密碼!");
      return res.redirect("/users/login");
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  // 將註冊資料取出
  const { name, email, password, confirmPassword } = req.body;
  // 填寫錯誤
  const errors = [];
  if (!email || !password || !confirmPassword) {
    errors.push({ message: "Email及Password必填!" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符!" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
      errors,
    });
  }
  // 從資料庫使用email找尋
  User.findOne({ email })
    .then((user) => {
      // 如果存在就返回register
      if (user) {
        errors.push({ message: "這個Email已經註冊過了!" });
        return res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        // 如果不存在就建立資料並且回到login
        return bcrytpt
          .genSalt(10)
          .then((salt) => bcrytpt.hash(password, salt))
          .then((hash) =>
            User.create({
              name,
              email,
              password: hash,
            })
          )
          .then(() => res.redirect("/users/login"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "您已經成功登出~");
  res.redirect("/users/login");
});

module.exports = router;
