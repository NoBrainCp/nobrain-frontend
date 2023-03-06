import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import vueCookies from "vue-cookies"
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Vue3TagsInput from 'vue3-tags-input'
import axios from "axios";

// loadFonts();

const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

const app = createApp(App).use(router)
    .use(vueCookies)
    .use(store)
    .use(vuetify)
    .component('vue3-tags-input', Vue3TagsInput)
app.config.globalProperties.$axios = axios;
app.mount("#app");
