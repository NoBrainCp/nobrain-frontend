import {createStore} from "vuex";

export const categoryStore = createStore({
    state: {
        category: {},
    },

    mutations: {
        setCategory(state, category) {
            state.category = category;
        }
    },
})
