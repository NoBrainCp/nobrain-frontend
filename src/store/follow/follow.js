import {createStore} from "vuex";

export const followStore = createStore({
    state: {
        status: Boolean,
        cardStatus: Boolean,
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