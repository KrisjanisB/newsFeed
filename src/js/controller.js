import "regenerator-runtime/runtime";
import * as model from "./model";
import feedView from "../views/feedView";
import bookmarksView from "../views/bookmarksView";
import channelsView from "../views/channelsView";

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

const controlChannels = function () {
  // Render available channels buttons
  channelsView.render(model.state.channels);
};

const controlFilters = function (filter) {
  model.filter(filter);
  feedView.render(model.state.feed);
};

const controlBookmarks = function () {
  // Render bookmarks if in state
  bookmarksView.render(model.state.bookmarks);
  if (model.state.bookmarks.length === 0) bookmarksView.renderMessage();
};

const controlFeedScroll = function (hash) {
  feedView.scrollToView(hash);
};

const controlAddBookmark = function (id) {
  let index = model.state.bookmarks.findIndex((article) => article.id === +id);
  if (index == -1) {
    model.addBookmark(id);
  } else {
    model.deleteBookmark(id);
  }

  bookmarksView.render(model.state.bookmarks);

  if (model.state.bookmarks.length === 0) bookmarksView.renderMessage();

  feedView.render(model.state.feed);
};

const init = function () {
  channelsView.addHandlerRender(controlChannels);
  bookmarksView.addHandlerRender(controlBookmarks);
  feedView.addHandlerAddBookmark(controlAddBookmark);
  channelsView.addHandlerFilter(controlFilters);
  bookmarksView.addHandlerScrollInToView(controlFeedScroll);
  controlFeed();
};

init();
