const Handlebars = require("handlebars");

Handlebars.registerHelper("list", function (items, options) {
  let category = [];
  let categoryHtml = [];
  items.forEach((item) => {
    // html格式會影響includes的功能，所以兩者必須分開
    if (!category.includes(options.fn(item).trim())) {
      category.push(options.fn(item).trim());
      categoryHtml.push(
        `<option value=${options.fn(item)}>` + options.fn(item) + "</option>"
      );
    }
  });
  return categoryHtml.join("\n");
});
