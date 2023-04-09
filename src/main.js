import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vueCookies from "vue-cookies"
import vuetify from "./plugins/vuetify";
import Vue3TagsInput from 'vue3-tags-input'
import axios from "axios";
import {store} from "./store";

const app = createApp(App)
    .use(router)
    .use(store)
    .use(vueCookies)
    .use(vuetify)
    .component('vue3-tags-input', Vue3TagsInput);

app.config.globalProperties.$axios = axios;
app.mount("#app");
