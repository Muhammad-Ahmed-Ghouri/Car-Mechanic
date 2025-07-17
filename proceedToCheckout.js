import { itemCount, observer } from "./products.js";

const nameField = document.getElementById("myName");
const phoneField = document.getElementById("myPhone");
const cityField = document.getElementById("myCity");
const areaField = document.getElementById("myArea");
const destinationMark = document.getElementById("destination-mark");
const addressField = document.getElementById("myAddress");
const submitBtn = document.querySelector(".user-details-btn");
const productsQuantity = document.querySelector(".content1-text2");
const productsSubtotal = document.querySelector(".content2-text2");
const customerTotal = document.querySelector(".content4-text2");
const animateHeading = document.querySelectorAll(".scaleAnimation");
const animateLogo = document.querySelectorAll(".animated-logo");
const selectedProducts = JSON.parse(localStorage.getItem("cart"));

const orderDetails = JSON.parse(localStorage.getItem("orderSummary"));

if (orderDetails) {
  productsQuantity.textContent = orderDetails.totalItems;
  productsSubtotal.textContent = `PKR ${orderDetails.itemsSubtotal}`;
  customerTotal.textContent = `PKR ${orderDetails.totalAmount}`;
  itemCount(orderDetails.items.length);
}

// for animatioon

animateHeading.forEach((heading) => observer.observe(heading));
animateLogo.forEach((logo) => observer.observe(logo));

// check input values

function checkFields() {
  if (
    nameField.value.length >= 3 &&
    phoneField.value.length === 10 &&
    areaField.value.length >= 3 &&
    destinationMark.value.length >= 3 &&
    addressField.value.length >= 3
  ) {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "#2e72cc";
    submitBtn.style.cursor = "pointer";
  } else {
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "rgb(203, 199, 199)";
  }
}

nameField.addEventListener("input", checkFields);
phoneField.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }
  checkFields();
});

areaField.addEventListener("input", checkFields);
destinationMark.addEventListener("input", checkFields);
addressField.addEventListener("input", checkFields);
cityField.addEventListener("input", checkFields);

// Post data to server

async function post(data) {
  try {
    const response = await fetch("https://abc.com", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

submitBtn.addEventListener("click", async () => {
  orderDetails.fullName = nameField.value;
  orderDetails.phone = phoneField.value;
  orderDetails.city = cityField.value;
  orderDetails.area = areaField.value;
  orderDetails.houseNo = destinationMark.value;
  orderDetails.fullAddress = addressField.value;

  try {
    const response = await post(orderDetails);
    console.log("Server response:", response);

    // remove carts data

    localStorage.removeItem("orderSummary");
    localStorage.removeItem("cart");

    // remove count from cart
    itemCount(0);

    // Clear all input fields from UI
    nameField.value = "";
    phoneField.value = "";
    cityField.value = "";
    areaField.value = "";
    destinationMark.value = "";
    addressField.value = "";

    // Disable button again
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "rgb(203, 199, 199)";
    checkFields();
  } catch (error) {
    console.error("Submit failed:", error);
    alert("Something went wrong while sending data.");
  }
});
