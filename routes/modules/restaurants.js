const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

// 餐廳新增頁面
router.get("/new", (req, res) => {
  return res.render("new");
});

// 資料庫新增資料
router.post("/", (req, res) => {
  const userId = req.user._id;
  const restaurantData = { ...req.body, userId };
  Restaurant.create(restaurantData)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// 詳細資料
router.get("/:restaurant_id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.restaurant_id;
  // 找對應id的餐廳
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      res.render("show", { restaurant });
    })
    .catch((error) => console.log(error));
});

// 修改資料頁面
router.get("/:restaurant_id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.restaurant_id;
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

// 修改資料庫資料
router.put("/:restaurant_id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.restaurant_id;
  return Restaurant.findByIdAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.log(error));
});

// 刪除資料
router.delete("/:restaurant_id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.restaurant_id;
  return Restaurant.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
