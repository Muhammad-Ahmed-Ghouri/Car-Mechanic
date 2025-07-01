import { navbarVisibility } from "./products.js";
import { closeVisibility } from "./products.js";
import { itemCount } from "./products.js";

window.navbarVisibility = navbarVisibility;
window.closeVisibility = closeVisibility;

const selectedProducts = JSON.parse(localStorage.getItem("cart"));

localStorage.setItem("cart", JSON.stringify(selectedProducts));

console.log(selectedProducts);

itemCount(selectedProducts.length);
