import {bookmark} from "../index";

export function getAllBookmarks(username) {
    return bookmark.get(`/${username}/bookmarks`);
}

export function getBookmarks(username, categoryName) {
    return bookmark.get(`/${username}/${categoryName}/bookmarks`);
}

// export function