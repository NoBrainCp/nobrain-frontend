import {bookmarkTag} from "../index";

export function getTags(userId) {
    return bookmarkTag.get(`user/${userId}/bookmark-tags`);
}