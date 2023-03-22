import {store} from "../../store";

export function setInterceptors(axiosService) {
    axiosService.interceptors.request.use(
        function (config) {
            // 요청 전
            config.headers.Authorization = store.state.accessToken;
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
            console.log("RESPONSE ERROR: " + error);
            return Promise.reject(error);
    });

    return axiosService;
}