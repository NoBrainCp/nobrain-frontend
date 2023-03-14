import {createStore} from "vuex";

export const categoryStore = createStore({
    state: {
        category: {},
        categories: [],
        status: false,
    },

    mutations: {
        setCategory(state, category) {
            state.category = category;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
    },
})
