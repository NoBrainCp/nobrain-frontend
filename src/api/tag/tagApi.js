import {tag} from "../index";

export function getTags(username) {
    return tag.get(`users/${username}`);
}

export function getTagsByBookmarkId(username, bookmarkId) {
    return tag.get(`users/${username}/bookmark/${bookmarkId}`);
}


