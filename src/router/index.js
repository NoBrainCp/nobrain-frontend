import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";

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
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
