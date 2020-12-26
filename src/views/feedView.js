import View from "./view";

class FeedView extends View {
  _wrapper = document.getElementById("wrapper");
  _parentElement = document.querySelector(".feed");
  _error = "Diemžēl nav izdevies iegūt datus";

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark-btn");
      if (!btn) return;

      handler(btn.dataset.id);
    });
  }

  scrollToView(id) {
    if (this._wrapper.classList.contains("toggled")) {
      this._wrapper.classList.remove("toggled");
    }
    if (id > 0) var top = document.getElementById(id).offsetTop;
    document.getElementById("feed-container").scrollTo(0, top - 100);
  }

  _generateHtml() {
    this._parentElement.innerHTML = "";
    return this._data.map(this._generateString).join("");
  }

  _generateString(article) {
    if (!article.filter)
      return `
    <article class="py-3 " id="${article.id}">
        <div class="card  no-gutter" >
          <div class="row ">
            <div class="col-lg-4 d-flex justify-content-center ">
              <img  src="${article.pictures.preview}"
              alt="${article.pictureAlt} class="card-img" >

            </div>
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text pt-3">${article.lead}</p>
                <a href="${
                  article.url
                }" class="btn btn-light btn-sm btn-block" target="_blank">
                  Lasīt vairāk
                </a>
              </div>
            </div>
          </div>
            <span class="bookmark-btn" title="Sagalbāt" data-id="${article.id}">
            <i class="fa${article.bookmarked ? "s" : "r"} fa-bookmark"></i>
          </span>
      </div>
    </article>`;
  }
}

export default new FeedView();
