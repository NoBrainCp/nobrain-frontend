import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import SignUp from "../views/sign/SignUp.vue";
import SignIn from "../views/sign/SignIn.vue";
import ForgetPassword from "../views/find/ForgetPassword.vue";
import ForgetId from "../views/find/ForgetId.vue";
import FindByPassword from "../views/find/FIndByPassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
      alias: "/",
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/:username/:category",
      name: "main",
      alias: "/:username",
      component: MainView,
      props: true,
    },
    {
      path: "/forgetpassword",
      name: "forgetpassword",
      component: ForgetPassword,
    },
    {
      path: "/forgetid",
      name: "forgetid",
      component: ForgetId,
    },
    {
      path: "/findbyapassword",
      name: "findbypassword",
      component: FindByPassword,
    },
  ],
});

export default router;
