import {noAuthInstance, user} from "../index";

export function signUpUser(userData) { //Api - 경로 변경
    return noAuthInstance.post('/sign-up', userData);
}

export function existsUsername(username) {  //v
    return user.get(`/username/${username}/exists`);
}

export function existsEmail(email) {    //v
    return user.get(`/email/${email}/exists`);
}

export function getUserInfo(username) { //v
    return user.get(`/${username}/info`);
}

export function getMyProfile() {    //v
    return user.get(`/my-profile`);
}

export function changeName(nameData) {  //v
    return user.put(`/username`, nameData);
}

export function changePassword(passwordData) {  //v
    return user.put(`/password`,passwordData);
}

export function resetPassword(resetPasswordData) { //**
    return noAuthInstance.put(`/password/reset`, resetPasswordData);
}

export function changeProfileImage(profileImage) {  //v
    return user.put(`/profile-image`,
        {image: profileImage},
        {headers: {'Content-Type': 'multipart/form-data'}}
    );
}

export function deactivateAccount(password) { //**
    return user.delete(`/me`, password);
}

export function deleteProfileImage() { //v
    return user.delete(`/profile-image`);
}





