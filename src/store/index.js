import {createStore} from 'vuex'
import {
    getAccessTokenFromCookie,
    getEmailFromCookie,
    getLoginIdFromCookie, getRefreshTokenFromCookie, getUserIdFromCookie,
    getUsernameFromCookie,
    saveUserInfoToCookie,
} from "../utils/cookies";
import {login} from "../api/auth/authApi";
import {oauth} from "../api";
import {oauthLogin} from "../api/oauth/OAuthApi";
import {resetPassword} from "../api/user/userApi";

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
                    saveUserInfoToCookie(response.data.data);
                    return response.data.data;
                })
        },

        async oauthSignIn({commit}, type, code) {
            await oauthLogin(type, code).then((response) => {
                commit('setUserInfo', response.data);
                saveUserInfoToCookie(response.data);
                return response.data;
            });
        }
    }
})
