const navbar = document.getElementById("hamburger-navbar");

function navbarVisibility() {
  navbar.style.display = "flex";
}

function closeVisibility() {
  navbar.style.display = "none";
}

const productsList = [
  {
    id: 1,
    product: "Rh20 1.5 Liter pet (pack of 6)",
    price: 320,
    image: "./assets/battery1.jpg",
  },
  {
    id: 2,
    product: "Rh20 500 ml pet (pack of 12)",
    price: 320,
    image: "./assets/battery2.webp",
  },
  {
    id: 3,
    product: "Classic purified(19 Liters)",
    price: 80,
    image: "./assets/battery3.jpeg",
  },
  {
    id: 4,
    product: "Premium Mineral Boosted(19 Liters)",
    price: 100,
    image: "./assets/battery1.jpg",
  },
  {
    id: 5,
    product: "Ozonated Mineral Boosted(19 Liters)",
    price: 120,
    image: "./assets/battery2.webp",
  },
  {
    id: 6,
    product: "Ozonated Mineral Boosted(19 Liters)",
    price: 120,
    image: "./assets/battery3.jpeg",
  },
];

const container = document.getElementById("product-container");

productsList.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card", `card${item.id}`);

  card.innerHTML = `
    <div class="card-section1">
      <div class="card-section1-image">
        <img src="${item.image}" alt="${item.product}" />
        </div>
    </div>
    <div class="card-section2">
      <p class="card-section2-content1">${item.product}</p>
      <p class="card-section2-content3">₨ ${item.price}</p>
      <a href="#" class="card-section2-btn">Add to cart</a>
    </div>
  `;

  container.appendChild(card);
});
