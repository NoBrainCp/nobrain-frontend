import {bookmark} from "../index";

export function getAllBookmarks(username) {
    return bookmark.get(`/users/${username}`);
}

export function getBookmarks(username, categoryName) {
    return bookmark.get(`/users/${username}/categories/${categoryName}`);
}

export function getStarredBookmarks(username) {
    return bookmark.get(`/starred/users/${username}`);
}

export function getStarredBookmarksCount(username) {
    return bookmark.get(`/starred/count/users/${username}`);
}

export function getPrivateBookmarks() {
    return bookmark.get(`/private`);
}

export function getPrivateBookmarksCount() {
    return bookmark.get(`/private/count`);
}

export function searchBookmark(keyword, condition) {
    return bookmark.get(`/search`, {
        params: {keyword: keyword, condition: condition}
    })
}

export function addBookmark(bookmarkData) {
    return bookmark.post(``, bookmarkData);
}

export function updateBookmark(bookmarkId, bookmarkData) {
    return bookmark.put(`/${bookmarkId}`, bookmarkData);
}

export function updatePublic(bookmarkId, isPublic) {
    return bookmark.put(`/${bookmarkId}/public?isPublic=${isPublic}`);
}

export function updateStarred(bookmarkId, isStarred) {
    return bookmark.put(`/${bookmarkId}/starred?isStarred=${isStarred}`);
}

export function updateAllBookmarksToPrivate(categoryName) {
    return bookmark.put(`/private/categories/${categoryName}`);
}

export function deleteBookmarkById(bookmarkId) {
    return bookmark.delete(`/${bookmarkId}`);
}
