import View from "./view";

class UserView extends View {
  _parentElement = document.querySelector(".username");
  _loginForm = document.querySelector(".login");

  addHandlerLogin(handler) {
    this._loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      $("#UsernameModal").modal("hide");
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateHtml() {
    this._parentElement.innerHTML = "";
    return `<span>Sveiks, ${this._data} !</span>`;
  }
}

export default new UserView();
