import "bootstrap";
import "./controller";

window.addEventListener("keydown", function () {
  document.querySelector("#inputUsername").focus();
});

window.addEventListener("load", function () {
  const togglers = document.querySelectorAll(".menu-toggle");

  togglers.forEach(function (toggler) {
    toggler.addEventListener("click", function () {
      document.getElementById("wrapper").classList.toggle("toggled");
    });
  });
});
