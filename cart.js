import { navbarVisibility } from "./products.js";
import { closeVisibility } from "./products.js";

window.navbarVisibility = navbarVisibility;
window.closeVisibility = closeVisibility;

const selectedProducts = JSON.parse(localStorage.getItem("cart"));
