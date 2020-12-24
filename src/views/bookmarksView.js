import View from "./view";
class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmark-list");
  _message = "Vieta Jūsu favorītiem";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerScrollInToView(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark-item");
      if (!btn) return;

      handler(btn.dataset.hash);
    });
  }

  _generateHtml() {
    this._parentElement.innerHTML = "";
    return this._data.map(this._generateString).join("");
  }

  _generateString(article) {
    return `
   <li class="bookmark-item list-group-item list-group-item-action bg-light d-flex justify-content-between align-items-center clickable"
    data-hash="${article.id}">
      <img
        src="${article.pictures.thumb}"
        alt=""
        class="pr-2"
      />
      <p class="bookmark-title flex-grow-1">
      ${article.title}
      </p>
    </li>`;
  }
}

export default new BookmarksView();
