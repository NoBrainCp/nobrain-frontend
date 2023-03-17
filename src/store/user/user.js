import {createStore} from "vuex";

export const userStore = createStore({
    state: {
        username: "",
        profileImage: "",
        status: false,
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },

        setProfileImage(state, profileImage) {
            state.profileImage = profileImage;
        }
    },
})
