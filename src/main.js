import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Vue3TagsInput from 'vue3-tags-input'

loadFonts();

const app = createApp(App).use(router).use(vuetify).component('vue3-tags-input', Vue3TagsInput).mount("#app");
