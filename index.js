import { productsList, itemCount, observer } from "./products.js";

const container = document.getElementById("product-container");
const message = document.querySelector(".show-message");
const messageContent = document.querySelector(".show-message-text");

// products which have selected
const selectedProducts = JSON.parse(localStorage.getItem("cart")) || [];
itemCount(selectedProducts.length);
console.log(selectedProducts);

// creating carts on home page
productsList.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card", `card${item.id}`, "cardScaleAnimation");

  card.innerHTML = `
    <div class="card-section1">
        <img class="card-section1-image" src="${item.image}" alt="${item.product}" />
    </div>
    <div class="card-section2">
      <p class="card-section2-content1">${item.product}</p>
      <p class="card-section2-content3">PKR ${item.price}</p>
      <a href="#" data-id = "${item.id}" class="card-section2-btn">Add to cart</a>
    </div>
  `;

  container.appendChild(card);
});

// add items in carts summary
function addItems(event) {
  event.preventDefault();
  const clickedElement = event.target;
  const cartId = clickedElement.dataset.id;

  const product = productsList.find(
    (product) => product.id === parseInt(cartId)
  );
  const existingItem = selectedProducts.find(
    (item) => item.id === parseInt(cartId)
  );

  if (existingItem) {
    existingItem.quantity += 1; // increase quantity if already exist
    existingItem.subtotal = existingItem.price * existingItem.quantity;
  } else {
    selectedProducts.push({
      id: product.id,
      product: product.product,
      price: product.price,
      image: product.image,
      quantity: 1,
      subtotal: product.price,
    });
  }

  localStorage.setItem("cart", JSON.stringify(selectedProducts));
  // counting items which have selected
  itemCount(selectedProducts.length);
}

container.addEventListener("click", function (event) {
  if (event.target.classList.contains("card-section2-btn")) {
    event.preventDefault(); // stop anchor default action
    addItems(event); // pass the event to use dataset.id
    message.style.opacity = "1";
    messageContent.innerHTML = `You have added ${selectedProducts.length} cart successfully!`;

    setTimeout(() => {
      message.style.opacity = "0";
    }, 3000);
  }
});

// for animation

const animateHeading = document.querySelectorAll(".scaleAnimation");
const animateLogo = document.querySelectorAll(".animated-logo");

animateHeading.forEach((heading) => observer.observe(heading));
animateLogo.forEach((logo) => observer.observe(logo));
