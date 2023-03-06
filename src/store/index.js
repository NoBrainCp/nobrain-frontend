import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import module from './module.js'

// const persistedState = createPersistedState({
//     paths: ['token', 'id', 'name', 'role', 'nickname']
// })

export const store = createStore({
    state: module.state,
    getters: module.getters,
    mutations: module.mutations,
    actions: module.actions,
    plugins: [
        createPersistedState({
        })
    ],
})