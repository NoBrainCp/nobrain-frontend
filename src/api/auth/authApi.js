import {instance} from "../index";

export function sendAuthenticationPhoneNumber(phoneNumber) {
    return instance.get(`/phone/${phoneNumber}/auth-code`);
}

export function sendAuthenticationEmail(email) {
    return instance.get(`/mail/${email}/auth-code`);
}

export function sendEmailAndLoginId(email, authCode) {
    return instance.post(`/mail/${email}/auth-code/login-id`, {
        code: authCode
    });
}

export function sendMessageAndLoginId(phoneNumber, authCode) {
    return instance.post(`phone/${phoneNumber}/auth-code/login-id`, {
        code: authCode
    });
}

export function sendMailAndPassword(email, authCode) {
    return instance.post(`mail/${email}/auth-code/password`, {
        code: authCode
    });
}

export function sendMessageAndPassword(phoneNumber, authCode) {
    return instance.post(`phone/${phoneNumber}/auth-code/password`, {
        code: authCode
    });
}
