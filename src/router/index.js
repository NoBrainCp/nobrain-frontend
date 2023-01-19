import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import Bookmark from "../components/Bookmark.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/:username",
      name: "main",
      component: MainView,
      props: true
    },
    {
      path: "/:username/:category",
      name: "main",
      component: MainView
    },
  ],
});

export default router;