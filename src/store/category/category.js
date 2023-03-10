import {createStore} from "vuex";

export const categoryStore = createStore({
    state: {
        category: {},
        categories: [],
    },

    mutations: {
        setCategory(state, category) {
            state.category = category;
        },
        setCategories(state, categories) {
            state.categories = categories;
        }
    },
})
