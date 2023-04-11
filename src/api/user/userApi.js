import {noAuthInstance, user} from "../index";

export function signUpUser(userData) {
    return noAuthInstance.post('/sign-up', userData);
}

export function noAuthExistsUsername(username) {
    return noAuthInstance.get(`users/username/${username}/exists`);
}

export function existsEmail(email) {
    return noAuthInstance.get(`users/email/${email}/exists`);
}

export function existsUsername(username) {
    return user.get(`/username/${username}/exists`);
}

export function getUserInfo(username) {
    return user.get(`/${username}/info`);
}

export function getMyProfile() {
    return user.get(`/my-profile`);
}

export function changeName(nameData) {
    return user.put(`/username`, nameData);
}

export function changePassword(passwordData) {
    return user.put(`/password`,passwordData);
}

export function resetPassword(resetPasswordData) { //**
    return noAuthInstance.put(`/password/reset`, resetPasswordData);
}

export function changeProfileImage(profileImage) {
    return user.put(`/profile-image`,
        {image: profileImage},
        {headers: {'Content-Type': 'multipart/form-data'}}
    );
}

export function deactivateAccount(password) { //**
    return user.delete(`/me`, password);
}

export function deleteProfileImage() {
    return user.delete(`/profile-image`);
}





