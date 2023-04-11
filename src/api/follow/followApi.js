import {user} from "../index";

export function getFollowCount(username) {
    return user.get(`/${username}/follow-cnt`);
}

export function isFollow(toUserId) {
    return user.get(`/${toUserId}/is-follow`);
}

export function getFollowerList(username) {
    return user.get(`/${username}/follower-cards`);
}

export function getFollowingList(username) {
    return user.get(`/${username}/following-cards`);
}

export function followAndUnfollow(toUserId) {
    return user.post(`/${toUserId}/follow`);
}

