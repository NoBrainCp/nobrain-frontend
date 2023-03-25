import {instance, user} from "../index";

export function signUpUser(userData) {
    return instance.post('/sign-up', userData);
}

export function signInUser(userData) {
    return instance.post("/sign-in", userData);
}
export function existsUsername(username) {  //**
    return instance.get(`/user/username/${username}/exists`);
}

export function existsLoginId(loginId) {
    return instance.get(`/user/login-id/${loginId}/exists`);
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

export function changePassword(passwordData) {
    return user.put(`/password`,passwordData);
}

export function changeProfileImage(profileImage) {
    return user.put(`/profile-image`,
        {image: profileImage},
        {headers: {'Content-Type': 'multipart/form-data'}}
    );
}

export function deactivateAccount(userId) {
    return user.delete(`/${userId}`);
}

export function deleteProfileImage() {
    return user.delete(`/profile-image`);
}





