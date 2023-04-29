const searchCategories = document.querySelector("#search-categories");

if (searchCategories.dataset.value) {
  searchCategories.value = searchCategories.dataset.value;
}
