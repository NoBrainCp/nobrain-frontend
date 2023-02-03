import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import SignUp from "../components/sign/SignUp.vue";
import SignIn from "../components/sign/SignIn.vue";
import ForgetPassword from "../components/find/ForgetPassword.vue";
import ForgetId from "../components/find/ForgetId.vue";
import FindByPassword from "../components/find/FIndByPassword.vue";

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
