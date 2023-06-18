import {category} from "../index";

export function getCategory(username, categoryName) {
    return category.get(`/${categoryName}/users/${username}`);
}

export function getCategories(username) {
    return category.get(`/users/${username}`);
}

export function getCategoryByBookmarkId(bookmarkId) {
    return category.get(`/bookmarks/${bookmarkId}`);
}

export function getCategoryIsPublic(userId, categoryName) {
    return category.get(`/${categoryName}/public`);
}

export function addCategory(categoryData) {
    return category.post(``, categoryData);
}

export function updateCategory(categoryName, categoryData) {
    return category.put(`/${categoryName}`, categoryData);
}

export function deleteCategory(categoryName) {
    return category.delete(`${categoryName}`);
}
