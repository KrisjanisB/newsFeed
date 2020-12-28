export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateHtml();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  spinner() {
    const markup = `
    <div class="spinner-grow text-primary mr-3 mr-md-5" role="status">
    </div>
    <div class="spinner-grow text-secondary mr-3 mr-md-5" role="status">
    </div>
    <div class="spinner-grow text-success mr-3 mr-md-5" role="status">
    </div>
    <div class="spinner-grow text-danger mr-3 mr-md-5" role="status">
    </div>
    <div class="spinner-grow text-warning mr-3 mr-md-5" role="status">
    </div>
    <div class="spinner-grow text-info mr-3 mr-md-5" role="status">
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

  renderError(message = this._error) {
    const markup = `
    <p class="text-center">${message}</p>`;

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
