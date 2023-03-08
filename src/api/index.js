import axios from 'axios';
import {setInterceptors} from "./common/interceptors";

function createInstance(url) {
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_APP_API_URL}${url}`,
    });

    return setInterceptors(instance);
}

const instance = createInstance();

export function signUpUser(userData) {
    return instance.post('/api/sign-up', userData);
}

export function signInUser(userData) {
    return instance.post("/api/sign-in", userData);
}

export const user = createInstance('/api/user');
