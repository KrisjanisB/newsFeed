import "bootstrap";
import "./controller";
console.log("main");
window.addEventListener("load", function () {
  const togglers = document.querySelectorAll(".menu-toggle");

  togglers.forEach(function (toggler) {
    toggler.addEventListener("click", function () {
      document.getElementById("wrapper").classList.toggle("toggled");
    });
  });
});
