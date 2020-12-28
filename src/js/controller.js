import "regenerator-runtime/runtime";
import * as model from "./model";
import feedView from "./views/feedView";
import bookmarksView from "./views/bookmarksView";
import channelsView from "./views/channelsView";

const controlFeed = async function () {
  try {
    // Load spinner while wait for data
    feedView.spinner();
    // Load data to state
    await model.loadFeed();

    // Push to view
    feedView.render(model.state.feed);
    // Render Channel filters in nav
    channelsView.render(model.state.channels);
    channelsView.resetChannel();
  } catch (error) {
    console.log(error);
    feedView.renderError();
  }
};
/////////////////////////////////////////
// Filteer feed according to channel

const controlFilters = function (filter) {
  model.filter(filter);
  feedView.render(model.state.feed);
};
/////////////////////////////////////////
// Render bookmarks if in state
const controlBookmarks = function () {
  if (model.state.bookmarks.length === 0) bookmarksView.renderMessage();
  else bookmarksView.render(model.state.bookmarks);
};

/////////////////////////////////////////
const controlFeedScroll = function (hash) {
  model.resetFilter();
  channelsView.resetChannel();
  feedView.render(model.state.feed);
  feedView.scrollToView(hash);
};
/////////////////////////////////////////
// Add or Remove bookmarks
const controlAddBookmark = function (id) {
  let index = model.state.bookmarks.findIndex((article) => article.id === +id);
  if (index === -1) model.addBookmark(id);
  else model.deleteBookmark(id);

  if (model.state.bookmarks.length === 0) bookmarksView.renderMessage();
  else bookmarksView.render(model.state.bookmarks);

  feedView.render(model.state.feed);
};
/////////////////////////////////////////
// Clear Local Storage from all Bookamrk data
const controlClearStorage = function () {
  model.clearLocalStorage();
  bookmarksView.render(model.state.bookmarks);
  feedView.render(model.state.feed);
  feedView.scrollToView(0);
};
/////////////////////////////////////////
// Initiate App
const init = function () {
  controlFeed();
  bookmarksView.addHandlerRender(controlBookmarks);
  bookmarksView.addHandlerScrollInToView(controlFeedScroll);
  bookmarksView.addHandlerClearStorage(controlClearStorage);
  feedView.addHandlerAddBookmark(controlAddBookmark);
  channelsView.addHandlerFilter(controlFilters);
};

init();
