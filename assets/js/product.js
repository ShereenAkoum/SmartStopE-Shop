var list = [];
var fileTitle = "";

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var categoryId = urlParams.get("categoryId");

  var url = "./Json/";
  if (categoryId == 1) {
    fileTitle = "home";
    $("#categoryName").text("- Home Care");
  } else if (categoryId == 2) {
    fileTitle = "personal";
    $("#categoryName").text("- Personal Care");
  } else if (categoryId == 3) {
    fileTitle = "teeth";
    $("#categoryName").text("- Teeth Care");
  } else if (categoryId == 4) {
    fileTitle = "baby";
    $("#categoryName").text("- Baby Care");
  } else if (categoryId == null) {
    window.location.href = "index.html";
  }

  $.getJSON((url += fileTitle + "CareProductList.json"), function (data) {
    var productContainer = $("#productContainer");

    list = data.list;

    list.forEach((product) => {
      if (product.active) {
        var productHTML = ` <div class="col-lg-2 col-6">
      <div class="item product-item" onclick="openPopup('${
        product.SKU
      }')" style="background-image: url(assets/images/products/${fileTitle}Care/${
          product.src
        });">
        <div class="thumb">
          ${
            product.discountedPrice !== 0
              ? `<span class="price price-discount"><em>${product.currency}${product.price}</em>$${product.discountedPrice}</span>`
              : `<span class="price">${product.currency}${product.price}</span>`
          }
        </div>
        <div class="down-content">
          <a><i class="fa fa-shopping-bag"></i></a>
          <a>${product.SKU}</a>
        </div>
      </div>
    </div>`;
        productContainer.append(productHTML);
      }
    });
  }).fail(function () {
    console.log("An error has occurred.");
  });
});

function openPopup(SKU) {
  var popupContainer = document.getElementById("popupContainer");
  var popupImage = document.getElementById("popupImage");
  var popupDescription = document.getElementById("popupDescription");

  for (const product of list) {
    if (product.SKU == SKU) {
      var Description = "Product Description";

      var imageUrl = `assets/images/products/${fileTitle}Care/${product.src}`;
      popupImage.src = imageUrl;
      popupImage.classList.add("modal-content");

      popupDescription.textContent = Description;
      popupContainer.style.display = "block";

      return;
    }
  }
}

function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";
}
