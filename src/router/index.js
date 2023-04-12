import {createRouter, createWebHistory} from "vue-router";

import SignUp from "../views/SignUpView.vue";
import MainView from "../views/MainView.vue";
import Find from "../views/FindView.vue";
import LoginPage from "../views/LoginView.vue";
import OauthSignIn from "../components/login/OauthSignIn.vue"
import NotFoundView from "../views/NotFoundView.vue";
import {getAccessTokenFromStorage, getUsernameFromStorage} from "../utils/storage";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "loginPage",
            component: LoginPage,
        },
        {
            path: "/sign-up",
            name: "signup",
            component: SignUp,
        },
        {
            path: "/find",
            name: "Find",
            component: Find,
        },
        {
            path: "/:username",
            name: "main",
            alias: "/:username/:category?",
            component: MainView,
            props: true,
        },
        {
            path: "/oauth2/:provider",
            name: "oauth",
            component: OauthSignIn,
            props: true,
        },
        {
            path:"/not-found",
            name: "notFound",
            component: NotFoundView,
        }
    ],
});

router.beforeEach(async (to, from, next) => {
    /**
     * to: 이동할 url 정보가 담긴 라우터 객체
     * from: 현재 url 정보가 담긴 라우터 객체
     * next: to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
     * next() 가 호출되기 전까지 화면 전환되지 않음
     */
    if (!to.params.username && !to.fullPath.includes('not-found')) {
        if (getAccessTokenFromStorage()) {
            await router.replace(`${getUsernameFromStorage()}`);
        }
    }

    return next();
})

export default router;
