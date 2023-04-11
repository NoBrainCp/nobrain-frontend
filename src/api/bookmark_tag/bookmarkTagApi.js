import {bookmarkTag} from "../index";

export function getBookmarksByTags(username, tagIds) {
    return bookmarkTag.get(`/users/${username}/bookmarks`, {
        params: {tagIds: tagIds.join(',')},
    });
}
