import { itemCount, observer } from "./products.js";

// DOM elements
const nameField = document.getElementById("myName");
const phoneField = document.getElementById("myPhone");
const addressField = document.getElementById("myAddress");
const submitBtn = document.querySelector(".user-details-btn");
const productsQuantity = document.querySelector(".content1-text2");
const productsSubtotal = document.querySelector(".content2-text2");
const customerTotal = document.querySelector(".content4-text2");
const animateHeading = document.querySelectorAll(".scaleAnimation");
const animateLogo = document.querySelectorAll(".animated-logo");

const orderDetails = JSON.parse(localStorage.getItem("orderSummary"));

// Summary content
if (orderDetails) {
  productsQuantity.textContent = orderDetails.totalItems;
  productsSubtotal.textContent = `PKR ${orderDetails.itemsSubtotal}`;
  customerTotal.textContent = `PKR ${orderDetails.totalAmount}`;
  itemCount(orderDetails.items.length);
}

// Animations
animateHeading.forEach((heading) => observer.observe(heading));
animateLogo.forEach((logo) => observer.observe(logo));

// check input fields
function checkFields() {
  if (
    nameField.value.length >= 3 &&
    phoneField.value.length === 10 &&
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

// input listeners
nameField.addEventListener("input", checkFields);
phoneField.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }
  checkFields();
});
addressField.addEventListener("input", checkFields);

// taking html file through fetch
let finalHmtl = "";
let htmlTemplate = "";

fetch("emailTemplate.html")
  .then((res) => res.text())
  .then((htmlContent) => {
    htmlTemplate = htmlContent;

    // call submit listner after html is ready
    submitBtn.addEventListener("click", submitOrder);
  })
  .catch((err) => {
    console.error("Failed to load email template:", err);
  });

// Post function
async function post(data) {
  try {
    const response = await fetch(
      "https://portaldemo-001-site6.ctempurl.com/api/Emails/SendWithSendGrid",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Auth-key": "BDtrViy2aobXEgjjhK13ObAZtrnnw4mkmorQJw9noJ4=",
          "Content-Type": "application/json",
        },
      }
    );

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

// Submit order function
async function submitOrder() {
  const products = orderDetails.items;
  let productsRows = "";

  products.forEach((product) => {
    productsRows += `
    <tr>
    <td style="border: 1px solid #ddd;">${product.name}</td>
    <td style="border: 1px solid #ddd; text-align: center;">${
      product.quantity
    }</td>
    <td style="border: 1px solid #ddd; text-align: right;">${product.price.toLocaleString()}</td>
    <td style="border: 1px solid #ddd; text-align: right;">${product.subtotal.toLocaleString()}</td>
    </tr>
    `;
  });

  const data = {
    CustomerName: nameField.value,
    MobileNo: phoneField.value,
    Address: addressField.value,
    SubTotal: orderDetails.itemsSubtotal,
    OrderRows: productsRows,
  };

  finalHmtl = htmlTemplate.replace(/{{(.*?)}}/g, (_, key) => data[key] || "");

  const submitDetails = {
    emailAddress: "muhammadahmed7274@gmail.com",
    fromEmailAddress: "noreply@carclinic4u.com",
    message: finalHmtl,
    subject: "New Order",
    timezone: new Date().toUTCString(),
  };

  try {
    const response = await post(submitDetails);

    // Clear local storage
    localStorage.removeItem("orderSummary");
    localStorage.removeItem("cart");
    itemCount(0);

    // Clear form
    nameField.value = "";
    phoneField.value = "";
    addressField.value = "";

    // Disable submit again
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "rgb(203, 199, 199)";
    checkFields();
  } catch (error) {
    console.error("Submit failed:", error);
    alert("Something went wrong while sending data.");
  }
}
