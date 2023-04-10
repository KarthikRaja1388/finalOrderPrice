let btnProduct1 = document.querySelector(".product-one");
let btnProduct2 = document.querySelector(".product-two");
let btnViewCart = document.querySelector(".btn-view-cart");
let cartContainer = document.querySelector(".cart");
let btnClose = document.querySelector(".btn-close");
let cartList = document.querySelector(".cart-list");
let prodImg1Element = document.querySelector(".prodImgOne");
let prodImg2Element = document.querySelector(".prodImgTwo");
let prodImg1 = prodImg1Element.getAttribute("src");
let prodImg2 = prodImg2Element.getAttribute("src");
let badge = document.querySelector(".badge");
let totalAmount = document.querySelector(".total");

const cart = [];

class Product {
  constructor(productId, productName, productPrice, prodImg) {
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.prodImg = prodImg;
  }
}

btnProduct1.addEventListener("click", (event) => {
  let parent = btnProduct1.parentNode;
  let children = parent.children;
  let product1 = new Product(
    1,
    children[0].textContent,
    children[1].textContent,
    prodImg1
  );
  cart.push(product1);
  let li = createProductContainer(
    product1.productId,
    product1.productName,
    product1.productPrice,
    product1.prodImg
  );
  cartList.appendChild(li);
  if (cart.length > 0) {
    badge.textContent = cart.length;
    badge.style.display = "block";
  }
});

btnProduct2.addEventListener("click", (event) => {
  let parent = btnProduct2.parentNode;
  let children = parent.children;
  let product2 = new Product(
    2,
    children[0].textContent,
    children[1].textContent,
    prodImg2
  );
  cart.push(product2);
  let li = createProductContainer(
    product2.productId,
    product2.productName,
    product2.productPrice,
    product2.prodImg
  );
  cartList.appendChild(li);
  if (cart.length > 0) {
    badge.textContent = cart.length;
    badge.style.display = "block";
  }
});

//display cart
btnViewCart.addEventListener("click", () => {
  cartContainer.classList.add("show-cart");
  if (cart.length !== 0) {
    calculateOrderTotal();
  } else {
    totalAmount.innerHTML = "No items in your cart.";
  }
});

//close cart
btnClose.addEventListener("click", () => {
  cartContainer.classList.remove("show-cart");
});

//function to create the list items and append it to the ul
let createProductContainer = function createProductDetailContainer(
  id,
  name,
  price,
  prodImg
) {
  let listItem = document.createElement("li");
  listItem.setAttribute("class", "list-item");

  let productDetails = document.createElement("div");
  productDetails.setAttribute("class", "product-details-container");

  let productImage = document.createElement("img");
  productImage.setAttribute("src", prodImg);
  productDetails.appendChild(productImage);

  let contentContainer = document.createElement("div");
  contentContainer.setAttribute("class", "product-content");

  let productName = document.createElement("p");
  productName.textContent = name;
  contentContainer.appendChild(productName);

  let productPrice = document.createElement("p");
  productPrice.textContent = "$" + price;
  contentContainer.appendChild(productPrice);

  let btnRemove = document.createElement("a");
  btnRemove.setAttribute("href", "#");

  btnRemove.setAttribute("data-id", id);
  btnRemove.setAttribute("class", "btn-remove");

  btnRemove.innerHTML =
    "<i class='fa-regular fa-trash-can' onClick=removeItem(event)></i>";

  productDetails.appendChild(contentContainer);
  productDetails.appendChild(btnRemove);

  listItem.appendChild(productDetails);
  return listItem;
};

//Remove the items on click
function removeItem(event) {
  let target = event.target;
  let parent = target.parentNode;
  let grandParent = parent.parentNode;
  let rootParent = grandParent.parentNode;

  let clickedProductId = parent.getAttribute("data-id");
  let product = cart.findIndex(
    (product) => product.productId == clickedProductId
  );
  if (product !== -1) {
    cart.splice(product, 1);
  }
  badge.innerHTML = cart.length;
  if (cart.length !== 0) {
    calculateOrderTotal();
  } else {
    totalAmount.innerHTML = "No items in your cart.";
  }
  rootParent.remove();
}

//calculate total of the order
function calculateOrderTotal() {
  let total = 0;
  if (cart.length !== 0) {
    cart.forEach((element) => {
      total += parseInt(element.productPrice);
      if (cart.length > 0) {
        totalAmount.innerHTML = "Total: $" + total;
        totalAmount.style.display = "block";
      } else {
        totalAmount.innerHTML = "No items in your cart.";
      }
    });
  } else {
    totalAmount.innerHTML = "No items in your cart.";
  }
}
