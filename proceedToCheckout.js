import { itemCount, observer } from "./products.js";

const productsQuantity = document.querySelector(".content1-text2");
const productsSubtotal = document.querySelector(".content2-text2");
const customerTotal = document.querySelector(".content4-text2");
const animateHeading = document.querySelectorAll(".scaleAnimation");
const animateLogo = document.querySelectorAll(".animated-logo");

const orderDetails = JSON.parse(localStorage.getItem("orderSummary"));
console.log(orderDetails);

if (orderDetails) {
  productsQuantity.textContent = orderDetails.totalItems;
  productsSubtotal.textContent = `PKR ${orderDetails.itemsSubtotal}`;
  customerTotal.textContent = `PKR ${orderDetails.totalAmount}`;
  itemCount(orderDetails.items.length);
}

// for animatioon

animateHeading.forEach((heading) => observer.observe(heading));
animateLogo.forEach((logo) => observer.observe(logo));
