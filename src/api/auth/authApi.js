import {auth, noAuthInstance} from "../index";

export function login(loginData) {
    return noAuthInstance.post(`/auth/login`, loginData);
}

export function logout(refreshToken) {
    return auth.post(`/logout`, refreshToken);
}
export function generateAccessToken(refreshToken) {
    return noAuthInstance.post(`/auth/access-token`, refreshToken);
}

export function sendAuthenticationEmail(email) {
    return noAuthInstance.get(`/mails/${email}/auth-code`);
}

export function sendEmailAndLoginId(email, authCode) {
    return noAuthInstance.post(`/mails/${email}/auth-code/login-id`, {
        code: authCode
    });
}

export function sendMailAndPassword(email, authCode) {
    return noAuthInstance.post(`mails/${email}/auth-code/password`, {
        code: authCode
    });
}
export function sendAuthenticationPhoneNumber(phoneNumber) {
    return noAuthInstance.get(`/phone/${phoneNumber}/auth-code`);
}

export function sendMessageAndLoginId(phoneNumber, authCode) {
    return noAuthInstance.post(`phone/${phoneNumber}/auth-code/login-id`, {
        code: authCode
    });
}

export function sendMessageAndPassword(phoneNumber, authCode) {
    return noAuthInstance.post(`phone/${phoneNumber}/auth-code/password`, {
        code: authCode
    });
}




