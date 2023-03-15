import {bookmark, tag} from "../index";

export function getAllBookmarks(username) {
    return bookmark.get(`/${username}/bookmarks`);
}

export function getBookmarks(username, categoryName) {
    return bookmark.get(`/${username}/${categoryName}/bookmarks`);
}

export function searchBookmark(keyword, condition) {
    return bookmark.get(`/bookmark/search`, {
        params: {keyword: keyword, condition: condition}
    })
}

export function addBookmark(username, bookmarkData) {
    return bookmark.post(`/${username}/bookmark`, bookmarkData);
}

export function updateBookmark(bookmarkId, bookmarkData) {
    return bookmark.put(`/bookmark/${bookmarkId}`, bookmarkData);
}

export function deleteBookmarkById(bookmarkId) {
    return bookmark.delete(`/bookmark/${bookmarkId}`);
}
// export function