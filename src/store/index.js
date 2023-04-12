import {createStore} from 'vuex'

import {login} from "../api/auth/authApi";
import {oauth} from "../api";
import {oauthLogin} from "../api/oauth/OAuthApi";
import {resetPassword} from "../api/user/userApi";
import {
    getAccessTokenFromStorage,
    getEmailFromStorage, getRefreshTokenFromStorage,
    getUserIdFromStorage,
    getUsernameFromStorage, saveLoginUserInfoToStorage
} from "../utils/storage";

export const store = createStore({
    state: {
        userId: getUserIdFromStorage() || '',
        username: getUsernameFromStorage() || '',
        email: getEmailFromStorage() || '',
        accessToken: getAccessTokenFromStorage() || '',
        refreshToken: getRefreshTokenFromStorage() || '',
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
            state.accessToken = userInfo.tokenDto.accessToken;
            state.refreshToken = userInfo.tokenDto.refreshToken;
        },
        setWindow(state, window) {
            state.window = window;
        }
    },

    actions: {
        async signIn({commit}, userData) {
            await login(userData)
                .then((response) => {
                    console.log(response.data.data);
                    commit('setUserInfo', response.data.data);
                    saveLoginUserInfoToStorage(response.data.data);
                    return response.data.data;
                })
        },

        async oauthSignIn({commit}, oauthData) {
            let encodingCode = encodeURI(oauthData.value.code);
            await oauthLogin(oauthData.value.provider, encodingCode).then((response) => {
                commit('setUserInfo', response.data.data);
                saveLoginUserInfoToStorage(response.data.data);
                return response.data;
            });
        }
    }
})
