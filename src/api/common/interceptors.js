import {store} from "../../store";
import router from "../../router";
// import {getAccessTokenFromCookie, getRefreshTokenFromCookie, saveAccessTokenToCookie} from "../../utils/cookies";
import {handleError} from "./common";
import {generateAccessToken} from "../auth/authApi";
import {getAccessTokenFromStorage, getRefreshTokenFromStorage, saveAccessTokenToStorage} from "../../utils/storage";


export function setInterceptors(instance) {
    // Add a request interceptor
    instance.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            config.headers = {
                'Content-Type': 'application/json;charset=utf-8',
            };

            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        },
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            // handleError(error);
            // router.go(-1);
            return Promise.reject(error);
        },
    );
    return instance;
}


export function setAuthInterceptors(axiosService) {
    axiosService.interceptors.request.use(
        async function (config) {
            // 요청 전
            const accessToken = getAccessTokenFromStorage();
            const refreshToken = getRefreshTokenFromStorage();
            // config.headers.Authorization = store.state.accessToken;
            if (accessToken) {
                config.headers.Authorization = 'Bearer '+accessToken;
            } else {
                if (refreshToken) {
                    await generateAccessToken({
                        refreshToken: refreshToken
                    }).then(async (response) => {
                        await saveAccessTokenToStorage('Bearer', response.data.data);
                        config.headers.Authorization = response.data.data;
                    });
                }
                // await router.replace(`/sign-in`);
                // alert("로그인 대기 유효시간이 만료되었습니다.\n다시 로그인을 시도해주시기 바랍니다.");
            }
            return config;
        },
        function (error) {
            // 요청 실패
            console.log("REQUEST ERROR: " + error)
            return Promise.reject(error);
        });

    axiosService.interceptors.response.use(
        function (response) {
            // 서버에 요청을 보내고 나서 응답을 받기 전 처리
            if (response.config.method === 'get' && !['auth-code', 'my-profile', 'follower-cards', 'following-cards', 'follow-cnt'].some(endpoint => response.config.url.includes(endpoint))) {
                store.commit('setWindow', 'book');
            }

            return response;
        },
        function (error) {
            // handleError(error);

            console.log("RESPONSE ERROR: " + error);

            return Promise.reject(error);
        });

    return axiosService;
}
