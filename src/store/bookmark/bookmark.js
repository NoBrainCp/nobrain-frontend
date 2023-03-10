import {createStore} from "vuex";

export const bookmarkStore = createStore({
    state: {
        bookmark: {},
        bookmarks: [],
    },

    mutations: {
        setBookmark(state, bookmark) {
            state.bookmark = bookmark;
        },
        setBookmarks(state, bookmarks) {
            state.bookmarks = bookmarks;
        }
    },
})
