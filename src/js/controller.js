import "regenerator-runtime/runtime";
import * as model from "./model";
import feedView from "../views/feedView";
import bookmarksView from "../views/bookmarksView";

const controlFeed = async function () {
  try {
    // Load spinner while wait for data
    feedView.spinner();
    // Load data
    await model.loadFeed();
    // Push to view

    feedView.render(model.state.feed);
  } catch (error) {
    console.log(error);
  }
};

const controlFeedScroll = function (hash) {
  feedView.scrollToView(hash);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
  if (model.state.bookmarks.length === 0) bookmarksView.renderMessage();
};

const controlAddBookmark = function (id) {
  let index = model.state.bookmarks.findIndex((article) => article.id === +id);
  if (index == -1) {
    model.addBookmark(id);
  } else {
    model.deleteBookmark(id);
  }

  // Push to view
  bookmarksView.render(model.state.bookmarks);

  if (model.state.bookmarks.length === 0) bookmarksView.renderMessage();

  // Updated article
  feedView.render(model.state.feed);
};

const controlFilters = async function (filter) {
  model.filter(filter);
  feedView.render(model.state.feed);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  feedView.addHandlerAddBookmark(controlAddBookmark);
  feedView.addHandlerFilter(controlFilters);
  bookmarksView.addHandlerScrollInToView(controlFeedScroll);
  controlFeed();
};

init();
