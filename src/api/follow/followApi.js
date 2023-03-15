import {follow} from "../index";
import {store} from "../../store";

export function getFollowCount(username) {
    return follow.get(`/user/${username}/follow-cnt`);
}

export function followAndUnfollow(toUserId) {
    follow.defaults.headers.common['Authorization'] = store.state.accessToken;
    console.log(store.state.accessToken);
    return follow.get(`/user/${toUserId}/follow`);
}

export function getFollowerList(username) {
    return follow.get(`/user/${username}/followers`);
}

export function getFollowingList(username) {
    return follow.get(`/user/${username}/followings`);
}