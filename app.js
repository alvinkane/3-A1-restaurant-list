// 導入express及handlebars
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
// 載入method-override
const methodOverride = require("method-override");

// 設定參數
const port = 3000;

// 載入路由
const routes = require("./routes");

// 載入mongoose
require("./config/mongoose");

// 設定樣板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 設定靜態網站
app.use(express.static("public"));

// 設定 body-parser
app.use(express.urlencoded({ extended: true }));

// 使用method-override
app.use(methodOverride("_method"));

// 使用路由
app.use(routes);

// 監聽
app.listen(port, (req, res) => {
  console.log(`This is listening on http://localhost:${port}`);
});
