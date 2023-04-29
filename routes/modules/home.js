const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

// 根目錄
router.get("/", (req, res) => {
  // 默認用name排序
  const index = req.query.sortBy || "name";
  // 與user連動
  const userId = req.user._id;

  const order = Number(req.query.sortOrder) === 1 ? "asc" : "desc";
  Restaurant.find({ userId })
    .lean()
    .sort({ [index]: order })
    .then((restaurants) => {
      const restaurantsAll = restaurants;
      res.render("index", { restaurants, restaurantsAll });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const categorySelected = req.query.category;

  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      const restaurantsAll = restaurants;
      let filterRestaurant = restaurants.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword.trim().toLowerCase()) ||
          data.name_en.toLowerCase().includes(keyword.trim().toLowerCase()) ||
          data.category.toLowerCase().includes(keyword.trim().toLowerCase())
      );
      filterRestaurant =
        categorySelected === "所有分類"
          ? filterRestaurant
          : filterRestaurant.filter((restaurant) =>
              restaurant.category.includes(categorySelected)
            );
      if (filterRestaurant.length === 0) {
        res.render("notFound", { keyword });
      } else
        res.render("index", {
          restaurants: filterRestaurant,
          keyword,
          restaurantsAll,
          categorySelected,
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
