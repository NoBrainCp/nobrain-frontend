import {tag} from "../index";

export function getTags(username) {
    return tag.get(`user/${username}/bookmark-tags`);
}

export function getTagsByBookmarkId(username, bookmarkId) {
    return tag.get(`user/${username}/bookmark/${bookmarkId}/tags`);
}

export function getBookmarksByTags(username, tagIds) {
    return tag.get(`user/${username}/bookmark-tags/tags`,{
        params: { tagIds: tagIds.join(',') },
    });
}