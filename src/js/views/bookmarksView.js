import View from "./view";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmark-list");
  _storageBtn = document.querySelector(".delete-storage");
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

  addHandlerClearStorage(handler) {
    this._storageBtn.addEventListener("click", function () {
      handler();
    });
  }

  _generateHtml() {
    this._clearParentElement();
    return this._data.map(this._generateString).join("");
  }

  _generateString(article) {
    return `
   <li class="bookmark-item list-group-item list-group-item-action d-flex align-items-center clickable pr-1"
    data-hash="${article.id}">
    <div class="col-auto img-loading pl-0 pr-2 ">
      <img
        src="${article.pictures.thumb}"
        alt="${article.pictureAlt}"
        class=""
      />
      </div>
     <div class="col-8  pr-0"> <p class="bookmark-title p-0 m-0">
      ${article.title}
      </p></div>
    </li>`;
  }

  _clearParentElement() {
    this._parentElement.innerHTML = "";
  }
}

export default new BookmarksView();
