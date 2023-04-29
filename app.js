// 導入express及handlebars
const express = require("express");

const exphbs = require("express-handlebars");
// 載入method-override
const methodOverride = require("method-override");
// 載入express-session
const session = require("express-session");
const usePassport = require("./config/passport");

// 載入mongoose
require("./config/mongoose");

// 設定參數
const port = 3000;

// 載入路由
const routes = require("./routes");

// 載入helpers
const helpers = require("./helper");

// 載入flash
const flash = require("connect-flash");

const app = express();

// 設定樣板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main", helpers: helpers }));
app.set("view engine", "handlebars");

// 設定靜態網站
app.use(express.static("public"));

// 設定session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// 設定 body-parser
app.use(express.urlencoded({ extended: true }));

// 使用method-override
app.use(methodOverride("_method"));

// 呼叫passport
usePassport(app);

// 使用flash
app.use(flash());

// 設定變數
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

// 使用路由
app.use(routes);

// 監聽
app.listen(port, () => {
  console.log(`This is listening on http://localhost:${port}`);
});
