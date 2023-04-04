const searchCategories = document.querySelector("#search-categories");

if (searchCategories.dataset.value) {
  searchCategories.value = searchCategories.dataset.value;
}

// console.log(searchCategories.options);
// searchCategories.options.forEach((option) => {
//   if (option.value === searchCategories.value) {
//     return searchCategories.
//   }
// })
// searchCategories.value = "中東料理";
