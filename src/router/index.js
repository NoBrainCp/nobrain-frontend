import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import SignUp from "../views/sign/SignUp.vue";
import SignIn from "../views/sign/SignIn.vue";
import ForgetPassword from "../views/find/ForgetPassword.vue";
import FindById from "../views/find/FindById.vue";
import FindByPassword from "../views/find/FindByPassword.vue";
import ChangePassword from "../views/change/ChangePassword.vue";
import Main from "../views/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/sign-in",
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
      path: "/:username",
      name: "main",
      alias: "/:username/:category",
      component: MainView,
      props: true,
    },
    {
      path: "/forget-password",
      name: "forgetPassword",
      component: ForgetPassword,
    },
    {
      path: "/find-by-id",
      name: "findbyid",
      component: FindById,
    },
    {
      path: "/find-by-password/:loginId",
      name: "findbypassword",
      component: FindByPassword,
      props: true,
    },
    {
      path: "/change-password/:loginId",
      name: "changepassword",
      component: ChangePassword,
      props: true,
    },
    {
      path: "/main",
      name: "mainn",
      component: Main,
    }
  ],
});

export default router;
