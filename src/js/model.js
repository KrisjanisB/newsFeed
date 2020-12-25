import { API_URL } from "./config";
export const state = {
  feed: {},
  bookmarks: [],
  channels: [0].sort(),
};

export const loadFeed = async function () {
  try {
    const res = await fetch("./data.json");

    const data = await res.json();
    console.log(data);
    state.feed = data.map((article) => {
      let bookmark = false;
      if (state.bookmarks.length != 0) {
        if (state.bookmarks.some((bookmark) => bookmark.id === article.id))
          bookmark = true;
      }
      // Collect available channals
      if (state.channels.indexOf(+article.channel_id) < 0)
        state.channels.push(+article.channel_id);

      return {
        id: article.id,
        channelID: +article.channel_id,
        lead: article.lead,
        title: article.title,
        url: article.url,
        pictures: {
          thumb: article.pictures["108x62"],
          preview: article.pictures["326x186"],
          full: article.pictures["956x398"],
        },
        pictureAlt: article.picture_alt,
        publishedDate: article.publish_date,
        bookmarked: bookmark,
        filter: false,
      };
    });
    console.log(state);
  } catch (error) {
    console.log(error);
  }
};

export const filter = function (filter) {
  if (filter != 0)
    state.feed.forEach((art) => {
      if (art.channelID != filter) art.filter = true;
      else art.filter = false;
    });
  // state.feed.sort((a, b) => {
  //   if (a.channelID == filter) return -1;
  //   return 0;
  // });
  else
    state.feed.forEach((art) => {
      art.filter = false;
    });
  // state.feed.sort((a, b) => {
  //   if (a.publishedDate > b.publishedDate) return -1;
  //   if (a.publishedDate < b.publishedDate) return 1;
  //   return 0;
  // });
  console.log(state.feed);
};

const persitBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (id) {
  let article = state.feed.find((art) => {
    // Mark article as bookmarked
    if (art.id == id) {
      art.bookmarked = true;
      return art;
    }
  });
  console.log(article);
  // Add bookmark to state
  state.bookmarks.push(article);
  persitBookmark();
};

export const deleteBookmark = function (id) {
  // Delete the bookmark
  const index = state.bookmarks.findIndex((article) => article.id === id);
  state.bookmarks.splice(index, 1);

  // Mark article as not bookmarked
  state.feed.find((art) => {
    if (art.id == id) {
      art.bookmarked = false;
    }
  });

  persitBookmark();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
