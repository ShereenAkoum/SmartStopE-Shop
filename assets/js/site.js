$(document).ready(function () {
  getCategories();
});

function getCategories() {
  $.getJSON("./Json/categoryList.json", function (data) {
    var categoryContainer = $("#categoryContainer");

    var list = data.list;

    list.forEach((category) => {
      console.log(category.id);
      console.log(category.name);
      var categoryHTML = `
      <div class="col-lg-3 col-6 p-3">
      <a href="#" id="${category.id}">
            <div class="item">
              <div class="image">
                <img
                  src="assets/images/categories/${category.src}"
                  alt="${category.name}"
                  style="max-width: 44px"
                />
              </div>
              <h4 class="category-name">${category.name}</h4>
            </div>
          </a>
        </div>`;

      // Append the HTML to categoryContainer
      categoryContainer.append(categoryHTML);
    });
  }).fail(function () {
    console.log("An error has occurred.");
  });
}
