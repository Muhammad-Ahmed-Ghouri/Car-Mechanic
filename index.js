const navbar = document.getElementById("hamburger-navbar");
let counter = 1;

setInterval(() => {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 3) {
    counter = 1;
  }
}, 5000);

function navbarVisibility() {
  navbar.style.display = "flex";
}

function closeVisibility() {
  navbar.style.display = "none";
}
