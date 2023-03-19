import {createStore} from "vuex";

export const followStore = createStore({
    state: {
        followWindow: '',
        userCardWindow: 'follower',
    },

    mutations: {
        setFollowWindow(state, followWindow) {
            state.followWindow = followWindow;
        },
        setUserCardWindow(state, userCardWindow) {
            state.userCardWindow = userCardWindow;
        }
    },
})