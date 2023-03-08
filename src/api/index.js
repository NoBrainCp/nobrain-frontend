import axios from 'axios';
import {setInterceptors} from "./common/interceptors";

function createAxiosService() {
    const axiosService = axios.create({
        baseURL: import.meta.env.VITE_APP_API_URL,
    });

    return setInterceptors(axiosService);
}

const axiosService = createAxiosService();

function signUpUser(userData) {
    return axiosService.post('/api/sign-up', userData);
}

function signInUser(userData) {
    return axiosService.post("/api/sign-in", userData);
}

export { signUpUser, signInUser };