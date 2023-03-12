import {tag} from "../index";

export function getTags(userId) {
    return tag.get(`user/${userId}/bookmark-tags`);
}

export function getTagsByBookmarkId(username, bookmarkId) {
    return tag.get(`user/${username}/${bookmarkId}/tags`);
}