const express = require("express");
const router = express.Router();

const User = require("../../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  // 將註冊資料取出
  const { name, email, password, confirmPassword } = req.body;
  // 填寫錯誤
  if (!email || !password || !confirmPassword) {
    console.log("Email及Password必填!");
    res.render("register", { name, email, password, confirmPassword });
  }
  if (password !== confirmPassword) {
    console.log("密碼與確認密碼不相符!");
    res.render("register", { name, email, password, confirmPassword });
  }
  // 從資料庫使用email找尋
  User.findOne({ email })
    .then((user) => {
      // 如果存在就返回register
      if (user) {
        return res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      }
      // 如果不存在就建立資料並且回到login
      return User.create({
        name,
        email,
        password,
      });
    })
    .then(() => res.redirect("/users/login"))
    .catch((err) => console.log(err));
});

module.exports = router;
