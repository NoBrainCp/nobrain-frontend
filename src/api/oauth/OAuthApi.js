import {noAuthInstance} from "../index";

export function oauthLogin(socialLoginType, code) {
    return noAuthInstance.get(`/oauth2/login/${socialLoginType}?code=${code}`);
}
