import {user} from "../index";


export function existsUsername(username) {
    return user.get(`/username/${username}/exists`);
}

export function existsLoginId(loginId) {
    return user.get(`/login-id/${loginId}/exists`);
}

export function getUserInfo(username) {
    return user.get(`/${username}/info`);
}

export function getMyProfile() {
    return user.get(`/my-profile`);
}

export function changeName(userId, username) {
    return user.put(`/${userId}/username/${username}`);
}





