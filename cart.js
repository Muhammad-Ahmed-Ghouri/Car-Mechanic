import { itemCount, spinLoad, hideLoad, observer } from "./products.js";

const itemsCountText = document.querySelector(".items-count-text");
const cartsContainer = document.querySelector(".carts-section1");
const emptyCart = document.querySelector(".no-cards");
const productsQuantity = document.querySelector(".content1-text2");
const productsSubtotal = document.querySelector(".content2-text2");
const customerTotal = document.querySelector(".content4-text2");

const selectedProducts = JSON.parse(localStorage.getItem("cart")) || [];

const payLoad = {
  totalItems: 0,
  itemsSubtotal: 0,
  totalAmount: 0,
  items: selectedProducts,
};

localStorage.setItem("cart", JSON.stringify(selectedProducts));

function itemsCountTextUpdate(selectedProducts) {
  itemsCountText.innerHTML = `<strong>${selectedProducts} item </strong> in your cart.`;
}

itemsCountTextUpdate(selectedProducts.length);

itemCount(selectedProducts.length);

// creating carts on cart summary page
if (selectedProducts.length > 0) {
  selectedProducts.forEach((item) => {
    const carts = document.createElement("div");
    carts.classList.add("carts-content1", `cart${item.id}`);

    carts.innerHTML = `
              <div class="cart">

              <div class="cart-content1">
                <div class="cart-content1-text">
                  <p class="name-text">${item.product}</p>
                  <p class="price-text">PKR ${item.price}</p>
                </div>
                <button data-id="${item.id}" class="cart-content1-button">
                  <img src="./assets/trash-bin.png" alt="" class="button-icon">
                  <p class="button-text">DELETE</p>
                </button>
              </div>

              <div class="cart-content2">

                <div class="cart-content2-quantity">
                  <p class="quantity-text">Quantity:</p>
                  <div class="quantity-calculator">
                    <img data-id="${
                      item.id
                    }" src="./assets/minus-sign.png" alt="" class="quantity-subtract">
                    <input name="quantity" data-id="${item.id}" value="${
      item.quantity
    }" class="quantity-calculator-field" type="number">
                    <img data-id="${
                      item.id
                    }" src="./assets/plus-sign.png" alt="" class="quantity-addition">
                  </div>
                </div>

                <div class="cart-content2-subtotal">
                  <p class="subtotal-text">item subtotal: <strong class="subtotal-price-text" >PKR ${
                    item.price * item.quantity
                  }</strong></p>
                </div>
              </div>

          </div>`;
    cartsContainer.appendChild(carts);
  });
} else {
  emptyCart.style.display = "flex";
}

// for cart summary

function cartSummary(selectedProducts) {
  payLoad.totalItems = 0;
  payLoad.itemsSubtotal = 0;
  payLoad.totalAmount = 0;

  selectedProducts.forEach((product) => {
    payLoad.totalItems += product.quantity;
    payLoad.itemsSubtotal += product.subtotal;
    payLoad.totalAmount += product.subtotal;
  });

  productsQuantity.textContent = payLoad.totalItems;
  productsSubtotal.textContent = `PKR ${payLoad.itemsSubtotal}`;
  customerTotal.textContent = `PKR ${payLoad.totalAmount}`;

  localStorage.setItem("finalSummary", JSON.stringify(payLoad));
}

cartSummary(selectedProducts);
localStorage.setItem("billSummary", JSON.stringify(payLoad));

console.log(payLoad);

function removeProduct(id) {
  const index = selectedProducts.findIndex((product) => {
    return product.id === id;
  });
  if (index != -1) {
    selectedProducts.splice(index, 1);
  }

  const cartElement = document.querySelector(`.cart${id}`);

  cartElement.remove();
  itemsCountTextUpdate(selectedProducts.length);

  itemCount(selectedProducts.length);

  localStorage.setItem("cart", JSON.stringify(selectedProducts));
  cartSummary(selectedProducts);
  console.log(payLoad);
  localStorage.setItem("billSummary", JSON.stringify(payLoad));
}

document.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".cart-content1-button");
  if (deleteButton) {
    const id = parseInt(deleteButton.dataset.id);
    spinLoad();
    setTimeout(() => {
      removeProduct(id);
      hideLoad();

      if (selectedProducts.length === 0) {
        emptyCart.style.display = "flex";
      }
    }, 2000);
  }

  // when click on plus icon
  if (e.target.classList.contains("quantity-addition")) {
    const id = parseInt(e.target.dataset.id);
    const product = selectedProducts.find((product) => product.id === id);
    spinLoad();
    if (product) {
      setTimeout(() => {
        product.quantity += 1;

        // update input value
        const input = e.target.parentElement.querySelector(
          ".quantity-calculator-field"
        );
        input.value = product.quantity;

        // update subtotal value
        const subtotal = e.target
          .closest(".cart-content2")
          .querySelector(".subtotal-price-text");
        let price = product.quantity * product.price;
        subtotal.textContent = `PKR ${price}`;

        // changing subtotal value from array
        product.subtotal = price;

        // set data in web browser
        localStorage.setItem("cart", JSON.stringify(selectedProducts));
        cartSummary(selectedProducts);
        localStorage.setItem("billSummary", JSON.stringify(payLoad));
        console.log(payLoad);
        hideLoad();
      }, 2000);
    }
  }

  // when click on minus icon
  if (e.target.classList.contains("quantity-subtract")) {
    const id = parseInt(e.target.dataset.id);
    const product = selectedProducts.find((product) => product.id === id);
    spinLoad();
    if (product && product.quantity > 1) {
      setTimeout(() => {
        product.quantity -= 1;

        // update input value
        const input = e.target.parentElement.querySelector(
          ".quantity-calculator-field"
        );
        input.value = product.quantity;

        // update subtotal value from UI
        const subtotal = e.target
          .closest(".cart-content2")
          .querySelector(".subtotal-price-text");
        let price = product.quantity * product.price;
        subtotal.textContent = `PKR ${price}`;

        // changing subtotal value from array
        product.subtotal = price;

        // set data in web browser
        localStorage.setItem("cart", JSON.stringify(selectedProducts));
        cartSummary(selectedProducts);
        localStorage.setItem("billSummary", JSON.stringify(payLoad));
        console.log(payLoad);
        hideLoad();
      }, 2000);
      console.log(selectedProducts);
    }
  }
});

// when inputs get changed
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("quantity-calculator-field")) {
    const inputFieldId = parseInt(e.target.dataset.id);
    const product = selectedProducts.find((item) => item.id === inputFieldId);
    spinLoad();

    setTimeout(() => {
      if (product) {
        const subtotal = e.target
          .closest(".cart-content2")
          .querySelector(".subtotal-price-text");

        product.quantity = parseInt(e.target.value);
        let price = product.price * product.quantity;
        subtotal.textContent = `PKR ${price}`;

        // changing subtotal value from array
        product.subtotal = price;

        // set data in web browser
        localStorage.setItem("cart", JSON.stringify(selectedProducts));
        cartSummary(selectedProducts);
        localStorage.setItem("billSummary", JSON.stringify(payLoad));
        console.log(payLoad);
      }

      hideLoad();
    }, 2000);
  }
});

// for animatioon

const animateHeading = document.querySelectorAll(".scaleAnimation");
const animateLogo = document.querySelectorAll(".animated-logo");

animateHeading.forEach((heading) => observer.observe(heading));
animateLogo.forEach((logo) => observer.observe(logo));
