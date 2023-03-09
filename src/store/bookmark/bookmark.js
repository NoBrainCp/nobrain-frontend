import {createStore} from "vuex";

export const bookmarkStore = createStore({
    state: {
        bookmarks: [],
    },

    mutations: {
        setBookmarks(state, bookmarks) {
            state.bookmarks = bookmarks;
        }
    },
})
