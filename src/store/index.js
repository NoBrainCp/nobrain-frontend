import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import module from './module.js'
import {getUserFromCookie, saveAuthToCookie} from "../utils/cookies";
import {signInUser} from "../api";

// const persistedState = createPersistedState({
//     paths: ['token', 'id', 'name', 'role', 'nickname']
// })

// export const store = createStore({
//     state: module.state,
//     getters: module.getters,
//     mutations: module.mutations,
//     actions: module.actions,
//     plugins: [
//         createPersistedState({
//         })
//     ],
// })


// ================

export const store = ({
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
        setToken(state, accessToken) {
            state.accessToken = accessToken;
        }
    },
    actions: {
        async LOGIN({ commit }, userData) {
            const { data } = await signInUser(userData);
            commit('setAccessToken', data.accessToken);
            commit('setUsername', data.username);
            saveAuthToCookie(data.accessToken);
            saveAuthToCookie(data.username);
            return data;
        }
    }
})