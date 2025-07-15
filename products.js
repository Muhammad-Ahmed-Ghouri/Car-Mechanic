const countELements = document.querySelectorAll(".item-count");
const hamburger = document.getElementById("hamburger-navbar");
const hamburgerIcon = document.querySelector(".hamburger-container");
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
    product: "Osaka",
    price: 755,
    image: "./assets/battery3.jpeg",
  },
  {
    id: 7,
    product: "Volta",
    price: 870,
    image: "./assets/battery1.jpg",
  },
  {
    id: 8,
    product: "Daewoo",
    price: 990,
    image: "./assets/battery2.webp",
  },
  {
    id: 9,
    product: "SF Sonic",
    price: 650,
    image: "./assets/battery3.jpeg",
  },
  {
    id: 10,
    product: "AGS (Atlas Group)",
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

const spinContainer = document.querySelectorAll(".cart-update-loader");

export function spinLoad() {
  spinContainer.forEach((loader) => {
    loader.style.visibility = "visible";
    loader.style.opacity = "1";
  });
}

export function hideLoad() {
  spinContainer.forEach((loader) => {
    loader.style.visibility = "hidden";
    loader.style.opacity = "0";
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
