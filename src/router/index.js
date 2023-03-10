import {createRouter, createWebHistory} from "vue-router";
import SignUp from "../views/sign/SignUp.vue";
import SignIn from "../views/sign/SignIn.vue";
import ForgetPassword from "../views/find/ForgetPassword.vue";
import FindById from "../views/find/FindById.vue";
import FindByPassword from "../views/find/FindByPassword.vue";
import ChangePassword from "../views/change/ChangePassword.vue";
import MainView from "../views/MainView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/sign-in",
            name: "signin",
            component: SignIn,
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
    ],
});

// router.beforeEach(async (to, from, next) => {
//     /**
//      * to: 이동할 url 정보가 담긴 라우터 객체
//      * from: 현재 url 정보가 담긴 라우터 객체
//      * next: to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
//      * next() 가 호출되기 전까지 화면 전환되지 않음
//      */
//     if (store.state.accessToken === null && store.state.refreshToken !== null) {
//         //refreshToken은 있고 accessToken이 없을 경우 토큰 재발급 요청
//         await store.dispatch('refreshToken');
//     }
//     if (VueCookies.get('accessToken')) {
//         //accessToken이 있을 경우 진행
//         return next();
//     }
//     if (VueCookies.get('accessToken') === null && VueCookies.get('refreshToken') === null) {
//         //2개 토큰이 모두 없을 경우 로그인페이지로
//         return next({name: 'signin'});
//     }
//     return next();
// })

export default router;
