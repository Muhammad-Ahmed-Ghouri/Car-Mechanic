import { navbarVisibility } from "./products.js";
import { closeVisibility } from "./products.js";
import { itemCount } from "./products.js";

const itemsCountText = document.querySelector(".items-count-text");
const cartsContainer = document.querySelector(".carts-section1");

window.navbarVisibility = navbarVisibility;
window.closeVisibility = closeVisibility;

const selectedProducts = JSON.parse(localStorage.getItem("cart"));

localStorage.setItem("cart", JSON.stringify(selectedProducts));

console.log(selectedProducts);

function itemsCountTextUpdate(selectedProducts) {
  itemsCountText.innerHTML = `<strong>${selectedProducts} item </strong> in your cart.`;
}

itemsCountTextUpdate(selectedProducts.length);

itemCount(selectedProducts.length);

// creating carts on cart summary page
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
                <button class="cart-content1-button">
                  <img src="./assets/trash-bin.png" alt="" class="button-icon">
                  <p class="button-text">DELETE</p>
                </button>
              </div>

              <div class="cart-content2">

                <div class="cart-content2-quantity">
                  <p class="quantity-text">Quantity:</p>
                  <div class="quantity-calculator">
                    <img src="./assets/minus-sign.png" alt="" class="quantity-subtract">
                    <input id="quantity-calculator-field" type="number">
                    <img src="./assets/plus-sign.png" alt="" class="quantity-addition">
                  </div>
                </div>

                <div class="cart-content2-subtotal">
                  <p class="subtotal-text">item subtotal: <strong>PKR 120</strong></p>
                </div>
              </div>

          </div>`;
  cartsContainer.appendChild(carts);
});
