$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var categoryId = urlParams.get('categoryId');

  var url = "./Json/";
  if (categoryId == 1) {
    url += "homeCareProductList.json";
  } else if (categoryId == null) {
    window.location.href = "index.html";
  }

  $.getJSON(url, function (data) {
    var productContainer = $("#productContainer");

    var list = data.list;

    list.forEach((product) => {
      console.log(product.sku);
      console.log(product.name);

      var productHTML = `<div class="col-lg-2 col-6 p-3">
      <div>
      <div class="item product-item" onclick="openPopup(this)" style="background-image: url(assets/images/products/${product.src});">
        <div class="thumb">
          ${product.discountedPrice !== 0 ?
          `<span class="price price-discount"><em>$${product.price}</em>$${product.discountedPrice}</span>` :
          `<span class="price">$${product.price}</span>`
        }
        </div>
        <div class="down-content">
        <a><i class="fa fa-shopping-bag"></i></a>
      </div>
        </div>
        </div>
      <div class="sku-container">${product.sku}</div>

    </div>`;
      productContainer.append(productHTML);

    });
  }).fail(function () {
    console.log("An error has occurred.");
  });
});

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
  popupImage.classList.add("modal-content");
  popupDescription.textContent = description;

  // Display the popup
  popupContainer.style.display = "block";
}

function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";
}

