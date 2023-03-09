import {user} from "../index";


export function existsUsername(username) {
    return user.get(`/username/${username}/exists`);
}

export function existsLoginId(loginId) {
    return user.get(`/login-id/${loginId}/exists`);
}

export function getUserInfo(userId) {
    return user.get(`/${userId}/info`);
}



