import View from "./view";

class FeedView extends View {
  _wrapper = document.getElementById("wrapper");
  _parentElement = document.querySelector(".feed");

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark-btn");
      if (!btn) return;

      handler(btn.dataset.id);
    });
  }

  scrollToView(id) {
    var top = document.getElementById(id).offsetTop;
    if (this._wrapper.classList.contains("toggled")) {
      this._wrapper.classList.remove("toggled");
    }
    document.getElementById("feed-container").scrollTo(0, top - 100);
  }

  _generateHtml() {
    this._parentElement.innerHTML = "";
    return this._data.map(this._generateString).join("");
  }

  _generateString(article) {
    if (!article.filter)
      return `
    <article class="col-xs-12 col-md-6 col-xl-3 py-3" id="${article.id}">
      <div class="card card-hover-shadow h-100">
        <img
          class="card-img-top"
          src="${article.pictures.preview}"
          alt="${article.picturesAlt}"
        />
        <span class="bookmark-btn" title="Sagalbāt" data-id="${article.id}">
          <i class="fa${article.bookmarked ? "s" : "r"} fa-bookmark"></i>
        </span>
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${article.title}</h5>
          <p class="d-none">${article.lead}</p>
          <a href="${
            article.url
          }" class="btn btn-light btn-sm btn-block" target="_blank">
            Lasīt vairāk
          </a>
        </div>
      </div>
    </article>`;
  }
}

export default new FeedView();
