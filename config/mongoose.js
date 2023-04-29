// 連線資料庫
const mongoose = require("mongoose");

// 僅在非正式環境使用dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 設定mongoose連線至mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// 取得連線狀態
const db = mongoose.connection;
// 異常偵測
db.on("error", () => {
  console.log("mongodb error");
});
// 成功偵測
db.once("open", () => {
  console.log("mongodb connected");
});

module.exports = db;
