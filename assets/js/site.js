$(document).ready(function () {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.style.setProperty("--text-color-light", "red");
    document.documentElement.style.setProperty("--bg-color-light", "white");
  }
  getCategories();
});

function getCategories() {
  $.getJSON("./Json/categoryList.json", function (data) {
    var categoryContainer = $("#categoryContainer");

    var list = data.list;

    list.forEach((category) => {
      //href="product-details.html"
      var categoryHTML = `
      <div class="col-lg-2 col-6 p-3 category-item">
      <a onclick="openProducts(${category.id})" id="${category.id}">
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

function openProducts(categoryId) {
  console.log(categoryId);
  window.location.href = "product-details.html?categoryId=" + categoryId;
}
