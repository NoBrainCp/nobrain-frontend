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

export const noAuthInstance = createInstance('/api/v1');
export const user = createAuthInstance('/api/v1/users');
export const category = createAuthInstance('/api/v1/categories');
export const bookmark = createAuthInstance('/api/v1/bookmarks');
export const bookmarkTag = createAuthInstance('/api/v1/bookmark-tags');
export const tag = createAuthInstance('/api/v1/tags');
export const mail = createAuthInstance('/api/v1/mails');
export const auth = createAuthInstance('/api/v1/auth');
export const oauth = createAuthInstance('/api/v1/oauth2');
