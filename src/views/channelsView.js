import { CHANNELS } from "../js/config";

import View from "./view";
class ChannelsView extends View {
  _parentElement = document.querySelector(".channels");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
    handler(handler);
  }

  addHandlerFilter(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn ");
      if (!btn) return;

      // Remove active class from siblings
      [...btn.parentElement.parentElement.children].forEach((sib) =>
        sib.children[0].classList.remove("active")
      );
      btn.classList.add("active");
      handler(btn.dataset.filter);
    });
  }

  _generateHtml() {
    this._parentElement.innerHTML = "";
    return this._data.map(this._generateString).join("");
  }

  _generateString(filter) {
    return `
    <li class="nav-item mr-2 mt-md-0">
    <button
      class="btn btn-sm btn-light filter-btn "
      data-filter="${filter}"
    >
    ${CHANNELS[filter] ?? "Cits"}
    </button>
  </li>`;
  }
}

export default new ChannelsView();
