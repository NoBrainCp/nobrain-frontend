import axios from 'axios';
import {setAuthInterceptors, setInterceptors} from "./common/interceptors";

function createInstance(url) {
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_APP_API_URL}${url}`,
    });

    return setInterceptors(instance);
}

function createAuthInstance(url) {
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_APP_API_URL}${url}`,
    });

    return setAuthInterceptors(instance);
}

function temp(url) {
    return axios.create({
        baseURL: `${import.meta.env.VITE_APP_API_URL}${url}`,
    });
}

const authInstance = createAuthInstance('/api');

export const instance = createInstance('/api');
export const user = createAuthInstance('/api/user');
export const category = authInstance;
export const bookmark = authInstance;
export const tag = authInstance;
export const follow = authInstance;
export const mail = createAuthInstance('/api/mail');
export const oauth = createInstance('/app');