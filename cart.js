import { navbarVisibility } from "./products.js";
import { closeVisibility } from "./products.js";
import { itemCount } from "./products.js";

const itemsCountText = document.querySelector(".items-count-text");

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
