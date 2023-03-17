import {mail} from "../index";

export function sendAuthenticationMail(email) {
    return mail.get(`/${email}/auth-code`);
}

export function sendEmailAndCode(email, code) {
    return mail.post(`/${email}/auth-code/password`, {
        code: code
    });
}