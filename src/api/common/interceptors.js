import {store} from "../../store";
import {handleError} from "./common";
import {getAccessTokenFromStorage} from "../../utils/storage";


export function setInterceptors(instance) {
    instance.interceptors.request.use(
        function (config) {
            config.headers = {
                'Content-Type': 'application/json;charset=utf-8',
            };

            return config;
        },
        function (error) {

            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        function (response) {

            return response;
        },
        async function (error) {
            await handleError(error);

            return Promise.reject(error);
        },
    );
    return instance;
}


export function setAuthInterceptors(axiosService) {
    axiosService.interceptors.request.use(
        function (config) {
            config.headers.Authorization = getAccessTokenFromStorage();

            return config;
        },
        function (error) {
            console.log("REQUEST ERROR: " + error);

            return Promise.reject(error);
        });

    axiosService.interceptors.response.use(
        function (response) {
            if (response.config.method === 'get' && !['auth-code', 'my-profile', 'follower-cards', 'following-cards', 'follow-cnt'].some(endpoint => response.config.url.includes(endpoint))) {
                store.commit('setWindow', 'book');
            }

            return response;
        },
        async function (error) {
            await handleError(error);

            console.log("RESPONSE ERROR: " + error);
            return Promise.reject(error);
        });

    return axiosService;
}
