import {oauth} from "../index";

export function SignInWithGoogle(socialLoginType, code) {
    return oauth.get(`/accounts/auth/${socialLoginType}/callback?code=${code}`);
}