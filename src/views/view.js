export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateHtml();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  spinner() {
    const markup = `
    <div class="spinner-grow text-primary" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-secondary" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-success" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-danger" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-warning" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-info" role="status">
    <span class="sr-only">Loading...</span>
    </div>`;
    this._parentElement.innerHtml = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <li class="text-center">${message}</li>
   `;

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
