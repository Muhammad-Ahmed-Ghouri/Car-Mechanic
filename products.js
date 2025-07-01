export const productsList = [
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

export function navbarVisibility() {
  document.getElementById("hamburger-navbar").style.display = "flex";
}

export function closeVisibility() {
  document.getElementById("hamburger-navbar").style.display = "none";
}
