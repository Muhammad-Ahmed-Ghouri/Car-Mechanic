const countELements = document.querySelectorAll(".item-count");
const hamburger = document.getElementById("hamburger-navbar");
const hamburgerIcon = document.querySelector(".hamburger-container");

export const productsList = [
  {
    id: 1,
    name: "VoltEdge ProCell 3000",
    price: 320,
    image: "./assets/battery1.jpg",
  },
  {
    id: 2,
    name: "LithioMax Power+",
    price: 320,
    image: "./assets/battery2.webp",
  },
  {
    id: 3,
    name: "Energix UltraCharge",
    price: 80,
    image: "./assets/battery3.jpeg",
  },
  {
    id: 4,
    name: "PowerNest TurboCore",
    price: 100,
    image: "./assets/battery1.jpg",
  },
  {
    id: 5,
    name: "ZenVolt SmartCell",
    price: 120,
    image: "./assets/battery2.webp",
  },
  {
    id: 6,
    name: "Osaka",
    price: 755,
    image: "./assets/battery3.jpeg",
  },
  {
    id: 7,
    name: "Volta",
    price: 870,
    image: "./assets/battery1.jpg",
  },
  {
    id: 8,
    name: "Daewoo",
    price: 990,
    image: "./assets/battery2.webp",
  },
  {
    id: 9,
    name: "SF Sonic",
    price: 650,
    image: "./assets/battery3.jpeg",
  },
  {
    id: 10,
    name: "AGS (Atlas Group)",
    price: 240,
    image: "./assets/battery1.jpg",
  },
];

document.addEventListener("click", (e) => {
  if (hamburgerIcon.contains(e.target) || hamburger.contains(e.target)) {
    hamburger.classList.toggle("active");
  } else {
    hamburger.classList.remove("active");
  }
});

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

export const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      } else {
        entry.target.classList.remove("animate");
      }
    });
  },
  {
    threshold: 0.3,
  }
);
