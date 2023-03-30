import {oauth} from "../index";

export function SignInWithGoogle() {
    return oauth.get('/authorization/google');
}