import { navbarVisibility } from "./products.js";
import { closeVisibility } from "./products.js";
import { productsList } from "./products.js";
import { itemCount } from "./products.js";

const container = document.getElementById("product-container");

// products which have selected
const selectedProducts = JSON.parse(localStorage.getItem("cart")) || [];
itemCount(selectedProducts.length);
console.log(selectedProducts);

window.navbarVisibility = navbarVisibility;
window.closeVisibility = closeVisibility;

// creating carts on home page
productsList.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card", `card${item.id}`);

  card.innerHTML = `
    <div class="card-section1">
        <img class="card-section1-image" src="${item.image}" alt="${item.product}" />
    </div>
    <div class="card-section2">
      <p class="card-section2-content1">${item.product}</p>
      <p class="card-section2-content3">PKR ${item.price}</p>
      <a href="#" data-id = "${item.id}" onclick = "addItems(event)" class="card-section2-btn">Add to cart</a>
    </div>
  `;

  container.appendChild(card);
});

// collecting data from every cart
window.addItems = function (event) {
  event.preventDefault();
  const clickedElement = event.target;
  const cartDetails = clickedElement.dataset.id;

  productsList.forEach((i) => {
    if (cartDetails === i.id.toString()) {
      selectedProducts.push({
        id: i.id,
        product: i.product,
        price: i.price,
        image: i.image,
      });
    }
  });
  localStorage.setItem("cart", JSON.stringify(selectedProducts));
  // counting items which have selected
  itemCount(selectedProducts.length);
  console.log(selectedProducts);
};
