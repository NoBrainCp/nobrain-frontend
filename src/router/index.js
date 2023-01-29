import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import Bookmark from "../components/Bookmark.vue";
import Header from "../components/Header.vue";
import CreateCategory from "../components/CreateCategoryForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
      alias: "/"
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/:username/:category",
      name: "main",
      alias: "/:username",
      component: MainView,
      props: true,
    },
  ],
});

export default router;
