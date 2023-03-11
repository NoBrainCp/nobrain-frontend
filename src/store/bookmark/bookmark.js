import {createStore} from "vuex";

export const bookmarkStore = createStore({
    state: {
        bookmark: {},
        bookmarks: [],
    },

    getters: {
      getBookmarks(state) {
          return state.bookmarks;
      }
    },

    mutations: {
        setBookmark(state, bookmark) {
            state.bookmark = bookmark;
        },
        setBookmarks(state, bookmarks) {
            state.bookmarks = bookmarks;
        },
        addBookmark(state, bookmark) {
          state.bookmarks.push(bookmark);
        },
        deleteBookmark(state, bookmarkId) {
            state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
        }
    },
})


bookmarkStore.subscribe((mutation, state) => {

})