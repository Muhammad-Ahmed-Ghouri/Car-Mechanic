const countELements = document.querySelectorAll(".item-count");
const hamburger = document.getElementById("hamburger-navbar");
const openNav = document.querySelector(".hamburger-container");
const closeNav = document.getElementById("close-image");

export const productsList = [
  {
    id: 1,
    product: "VoltEdge ProCell 3000",
    price: 320,
    image: "./assets/battery1.jpg",
  },
  {
    id: 2,
    product: "LithioMax Power+",
    price: 320,
    image: "./assets/battery2.webp",
  },
  {
    id: 3,
    product: "Energix UltraCharge",
    price: 80,
    image: "./assets/battery3.jpeg",
  },
  {
    id: 4,
    product: "PowerNest TurboCore",
    price: 100,
    image: "./assets/battery1.jpg",
  },
  {
    id: 5,
    product: "ZenVolt SmartCell",
    price: 120,
    image: "./assets/battery2.webp",
  },
  {
    id: 6,
    product: "TitanCore FusionX",
    price: 120,
    image: "./assets/battery3.jpeg",
  },
];

export function navbarVisibility() {
  hamburger.style.display = "flex";
}

openNav.addEventListener("click", navbarVisibility);

export function closeVisibility() {
  hamburger.style.display = "none";
}

closeNav.addEventListener("click", closeVisibility);

export function itemCount(selectedProducts) {
  countELements.forEach((count) => {
    if (selectedProducts === 0) {
      count.style.visibility = "hidden";
    } else {
      count.style.visibility = "visible";
      count.innerHTML = selectedProducts;
    }
  });
}
