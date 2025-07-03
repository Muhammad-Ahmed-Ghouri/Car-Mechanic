import { itemCount } from "./products.js";

const itemsCountText = document.querySelector(".items-count-text");
const cartsContainer = document.querySelector(".carts-section1");
const totalItems = document.querySelector(".item-count");

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
                <button data-id="${item.id}" class="cart-content1-button">
                  <img src="./assets/trash-bin.png" alt="" class="button-icon">
                  <p class="button-text">DELETE</p>
                </button>
              </div>

              <div class="cart-content2">

                <div class="cart-content2-quantity">
                  <p class="quantity-text">Quantity:</p>
                  <div class="quantity-calculator">
                    <img src="./assets/minus-sign.png" alt="" class="quantity-subtract">
                    <input name="quantity" class="quantity-calculator-field" type="number">
                    <img src="./assets/plus-sign.png" alt="" class="quantity-addition">
                  </div>
                </div>

                <div class="cart-content2-subtotal">
                  <p class="subtotal-text">item subtotal: <strong>PKR ${item.price}</strong></p>
                </div>
              </div>

          </div>`;
  cartsContainer.appendChild(carts);
});

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
}

document.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".cart-content1-button");
  if (deleteButton) {
    const id = parseInt(deleteButton.dataset.id);
    removeProduct(id);
  }
});
