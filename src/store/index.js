import { createStore } from 'vuex'
import {getUserFromCookie, saveAuthToCookie, saveUserToCookie} from "../utils/cookies";
import {signInUser} from "../api";

export const store = createStore({
    state: {
        username: getUserFromCookie() || '',
        accessToken: getUserFromCookie() || '',
    },

    getters: {
      isLogin(state) {
          return state.username !== '';
      }
    },

    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
    },

    actions: {
        async LOGIN({commit} , userData) {
            const { data } = await signInUser(userData);
            commit('setAccessToken', data.data.accessToken);
            commit('setUsername', data.data.username);
            saveAuthToCookie(data.data.accessToken);
            saveUserToCookie(data.data.username);
            return data.data;
        }
    }
})