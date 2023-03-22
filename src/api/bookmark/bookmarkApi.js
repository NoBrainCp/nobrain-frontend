import {bookmark, tag} from "../index";

export function getAllBookmarks(username) {
    return bookmark.get(`/user/${username}/bookmarks`);
}

export function getBookmarks(username, categoryName) {
    return bookmark.get(`/user/${username}/${categoryName}/bookmarks`);
}

export function getStarredBookmarks(username) {
    return bookmark.get(`/user/${username}/starred-bookmarks`);
}

export function getStarredBookmarksCount(username) {
    return bookmark.get(`/user/${username}/starred-bookmarks/count`);
}

export function searchBookmark(keyword, condition) {
    return bookmark.get(`/bookmark/search`, {
        params: {keyword: keyword, condition: condition}
    })
}

export function addBookmark(username, bookmarkData) {
    return bookmark.post(`/user/${username}/bookmark`, bookmarkData);
}

export function updateBookmark(bookmarkId, bookmarkData) {
    return bookmark.put(`/bookmark/${bookmarkId}`, bookmarkData);
}

export function updatePublic(bookmarkId, isPublic) {
    return bookmark.put(`/bookmark/${bookmarkId}/public?isPublic=${isPublic}`);
}

export function updateStarred(bookmarkId, isStarred) {
    return bookmark.put(`/bookmark/${bookmarkId}/starred?isStarred=${isStarred}`);
}

export function deleteBookmarkById(bookmarkId) {
    return bookmark.delete(`/bookmark/${bookmarkId}`);
}
// export function