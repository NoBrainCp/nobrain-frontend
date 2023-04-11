import {oauth} from "../index";

export function oauthLogin(socialLoginType, code) {
    return oauth.get(`/login/${socialLoginType}/?code=${code}`);
}
