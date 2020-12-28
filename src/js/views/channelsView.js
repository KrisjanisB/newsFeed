import { CHANNELS } from "../config";

import View from "./view";
class ChannelsView extends View {
  _parentElement = document.querySelector(".channels");

  addHandlerFilter(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn ");
      if (!btn) return;

      this._toggleActiveClass(btn);

      handler(btn.dataset.filter);
    });
  }

  _generateHtml() {
    this._parentElement.innerHTML = "";
    return this._data.map(this._generateString).join("");
  }

  _generateString(filter) {
    return `
    <li class="nav-item mr-2 mt-md-0" title="Atlasīt rakstus">
    <button
      class="btn btn-sm btn-light filter-btn "
      data-filter="${filter}"
    >
    ${CHANNELS[filter] ?? CHANNELS[999]}
    </button>
  </li>`;
  }

  resetChannel() {
    const btn = document.querySelector("[data-filter='0']");

    this._toggleActiveClass(btn);
  }

  _toggleActiveClass(btn) {
    // Remove active class from siblings
    [...btn.parentElement.parentElement.children].forEach((sib) =>
      sib.children[0].classList.remove("active")
    );
    btn.classList.add("active");
  }
}

export default new ChannelsView();
