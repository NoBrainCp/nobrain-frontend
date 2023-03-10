import {bookmark} from "../index";

export function getAllBookmarks(username) {
    return bookmark.get(`/${username}/bookmarks`);
}

export function getBookmarks(username, categoryName) {
    return bookmark.get(`/${username}/${categoryName}/bookmarks`);
}

export function addBookmark(username, bookmarkData) {
    return bookmark.post(`/${username}/bookmark`, bookmarkData);
}

export function deleteBookmark(bookmarkId) {
    return bookmark.delete(`/bookmark/${bookmarkId}`);
}
// export function