// Define the shopping cart object
var shoppingCart = (function () {
  var cart = [];

  function Item(sku, name, price, count) {
    this.sku = sku;
    this.name = name;
    this.price = price;
    this.count = count;
  }

  function saveCart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];
  }

  loadCart();

  var obj = {};

  obj.addItemToCart = function (sku, name, price, count) {
    for (var item in cart) {
      if (cart[item].sku == sku) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(sku, name, price, count);
    cart.push(item);
    saveCart();
  };

  obj.setCountForItem = function (sku, count) {
    for (var i in cart) {
      if (cart[i].sku == sku) {
        cart[i].count = count;
        break;
      }
    }
    saveCart();
  };

  obj.removeItemFromCart = function (sku) {
    for (var item in cart) {
      if (cart[item].sku == sku) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  obj.removeItemFromCartAll = function (sku) {
    for (var item in cart) {
      if (cart[item].sku == sku) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  obj.listCart = function () {
    var cartCopy = [];
    for (var i in cart) {
      item = cart[i];
      itemCopy = {};
      for (var p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };

  return obj;
})();

// Update the addToCart function to use shoppingCart object
function addToCart(SKU) {
  var selectedProduct = list.find((product) => product.SKU === SKU);
  shoppingCart.addItemToCart(
    selectedProduct.SKU,
    selectedProduct.Name,
    selectedProduct.price,
    1
  );
  displayCart();
}

// Update the displayCart function to display shopping cart contents
function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
    var minusButton =
      cartArray[i].count > 1
        ? "<button class='minus-item input-group-addon btn btn-primary' data-sku='" +
          cartArray[i].sku +
          "' data-name='" +
          cartArray[i].name +
          "'>-</button>"
        : "<button class='delete-item btn btn-danger' data-sku='" +
          cartArray[i].sku +
          "' data-name='" +
          cartArray[i].name +
          "'><i class='fa fa-trash'></i></button>";
    output +=
      "<tr>" +
      "<td class='cartTd'>" +
      cartArray[i].name +
      "</td>" +
      "<td><div class='input-group'>" +
      minusButton +
      "<input type='number' class='item-count form-control' data-sku='" +
      cartArray[i].sku +
      "' data-name='" +
      cartArray[i].name +
      "' value='" +
      cartArray[i].count +
      "'>" +
      "<button class='plus-item btn btn-primary input-group-addon' data-sku='" +
      cartArray[i].sku +
      "' data-name='" +
      cartArray[i].name +
      "'>+</button></div></td>" +
      "<td>" +
      cartArray[i].total +
      "</td>" +
      "</tr>";
  }
  $(".show-cart").html(output);
  $(".total-cart").html(shoppingCart.totalCart());
  $(".total-count").html(shoppingCart.totalCount());
}

// Clear items
$(".clear-cart").click(function () {
  shoppingCart.clearCart();
  displayCart();
});

$(".show-cart").on("click", ".delete-item", function (event) {
  var sku = $(this).data("sku");
  shoppingCart.removeItemFromCartAll(sku);
  displayCart();
});

$(".show-cart").on("click", ".minus-item", function (event) {
  var sku = $(this).data("sku");
  shoppingCart.removeItemFromCart(sku);
  displayCart();
});

$(".show-cart").on("click", ".plus-item", function (event) {
  var sku = $(this).data("sku");
  shoppingCart.addItemToCart(sku);
  displayCart();
});

$(".show-cart").on("change", ".item-count", function (event) {
  var sku = $(this).data("sku");
  var count = Number($(this).val());
  shoppingCart.setCountForItem(sku, count);
  displayCart();
});

// Initial display of cart
displayCart();
