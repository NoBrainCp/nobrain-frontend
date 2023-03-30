import { createStore } from 'vuex'
import {
    getAccessTokenFromCookie,
    getEmailFromCookie,
    getLoginIdFromCookie, getRefreshTokenFromCookie, getUserIdFromCookie,
    getUsernameFromCookie,
    saveAccessTokenToCookie, saveUserInfoToCookie,
    saveUsernameToCookie
} from "../utils/cookies";
import {signInUser} from "../api/user/userApi";

export const store = createStore({
    state: {
        userId: getUserIdFromCookie() || '',
        username: getUsernameFromCookie() || '',
        email: getEmailFromCookie() || '',
        loginId: getLoginIdFromCookie() || '',
        accessToken: getAccessTokenFromCookie() || '',
        refreshToken: getRefreshTokenFromCookie() || '',
        window: '',
    },

    getters: {
      isLogin(state) {
          return state.username !== '';
      }
    },

    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setUsername(state, username) {
            state.username = username;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setLoginId(state, loginId) {
            state.loginId = loginId;
        },
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
        },
        setUserInfo(state, userInfo) {
            state.userId = userInfo.userId;
            state.email = userInfo.email;
            state.username = userInfo.username;
            state.accessToken = userInfo.accessToken;
        },
        setWindow(state, window) {
            state.window = window;
        }
    },

    actions: {
        async signIn({commit} , userData) {
            try {
                const { data } = await signInUser(userData);
                commit('setUserInfo', data.data);
                saveUserInfoToCookie(data.data);
                return data.data;
            } catch (error) {
                throw error;
            }
        }
    }
})