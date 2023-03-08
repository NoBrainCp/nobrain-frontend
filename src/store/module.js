import axios from 'axios'
import router from '../router/index.js'

const state = {
    accessToken: null,
    userId: null,
    loginId: null,
    username: null,
    userEmail: null,
    // role: null,
}

const getters = {
    currentId(state) {
        return state.userId;
    },
    currentEmail(state) {
        return state.userEmail;
    },
    currentName(state) {
        return state.username;
    },
    currentAccessToken(state) {
        return state.accessToken;
    },
    isLogin(state) {
        return state.username !== '';
    }
}

const mutations = {
    setToken(state, payload) {
        state.userId = payload.userId;
        state.loginId = payload.loginId;
        state.accessToken = payload.accessToken;
    },
    setUserInfo(state, payload) {
        state.username = payload.username;
        state.userEmail = payload.userEmail;
    },
    setUsername(state, username) {
        state.username = username;
    },
    setAccessToken(state, accessToken) {
        state.accessToken = accessToken;
    }
    // logout (state) {
    //     state.token = null
    //     state.id = null
    //     state.role = null
    //     state.email = null
    //     state.nickname = null
    // }
}

const actions = {
    // login ({commit}, {id, password}) {
    //     const params = {
    //         "email": id,
    //         "password": password
    //     }
    //     axios.post("/api/signin/", JSON.stringify(params), {
    //         headers: { 'content-type': 'application/json'}
    //     }).then(res => {
    //         commit('login', res)
    //         router.push('main')
    //     }).catch(e => {
    //         console.log(e)
    //         alert("로그인 요청에 문제가 발생했습니다.")
    //     })
    // },
    // signIn({commit}, id, password) {
    //     const params = {
    //         loginId: id,
    //         password: password
    //     }
    //     axios.post("/api/sign-in",JSON.stringify(params), {
    //     }).then(res => {
    //         commit('login', res.data.data.accessToken, res.data.data.userId, res.data.data.username);
    //     }).catch(err => {
    //         console.log(err);
    //         console.log(id);
    //         console.log(password);
    //         alert("로그인 요청에 문제가 발생했습니다.")
    //     })

    // },
    logout ({commit}) {
        commit('logout')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}