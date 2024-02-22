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
      <a href="product-details.html" id="${category.id}">
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

function openPopup(clickedElement) {
  var popupContainer = document.getElementById("popupContainer");
  var popupImage = document.getElementById("popupImage");
  var popupDescription = document.getElementById("popupDescription");

  // Get the background image and description from the clicked item
  var backgroundImage = clickedElement.style.backgroundImage;
  var description = "Product Description"; // Set your product description here

  // Extracting the URL from the background-image property
  var imageUrl = backgroundImage.replace('url("', "").replace('")', "");

  // Set the image source and description in the popup
  popupImage.src = imageUrl;
  popupDescription.textContent = description;

  // Display the popup
  popupContainer.style.display = "block";
}

function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";
}
