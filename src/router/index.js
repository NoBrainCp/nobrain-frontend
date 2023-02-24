import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import SignUp from "../views/sign/SignUp.vue";
import SignIn from "../views/sign/SignIn.vue";
import ForgetPassword from "../views/find/ForgetPassword.vue";
import FindById from "../views/find/FindById.vue";
import FindByPassword from "../views/find/FindByPassword.vue";
import ChangePassword from "../views/change/ChangePassword.vue";

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
      path: "/:username",
      name: "main",
      alias: "/:username/:category",
      component: MainView,
      props: true,
    },
    {
      path: "/forgetpassword",
      name: "forgetpassword",
      component: ForgetPassword,
    },
    {
      path: "/findbyid",
      name: "findbyid",
      component: FindById,
    },
    {
      path: "/findbypassword/:loginId",
      name: "findbypassword",
      component: FindByPassword,
      props: true,
    },
    {
      path: "/changepassword/:loginId",
      name: "changepassword",
      component: ChangePassword,
      props: true,
    }
  ],
});

export default router;
