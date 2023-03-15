import {follow} from "../index";
import {store} from "../../store";

export function getFollowCount(username) {
    return follow.get(`/user/${username}/follow-cnt`);
}

export function followAndUnfollow(toUserId) {
    return follow.post(`/user/${toUserId}/follow`);
}

export function getFollowerList(username) {
    return follow.get(`/user/${username}/followers`);
}

export function getFollowingList(username) {
    return follow.get(`/user/${username}/followings`);
}