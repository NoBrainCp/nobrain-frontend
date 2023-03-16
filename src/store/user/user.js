import {createStore} from "vuex";

export const userStore = createStore({
    state: {
        username: "",
        status: false,
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
    },
})
