import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VModal from "vue-universal-modal";

loadFonts();

const app = createApp(App)
  .use(router)
  .use(vuetify)
  .use(VModal, {
    teleportTarget: "#my-modals",
    modalComponent: "Modal",
  })
  .mount("#app");
