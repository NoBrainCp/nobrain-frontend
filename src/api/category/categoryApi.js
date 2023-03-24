import {category} from "../index";

export function getCategory(username, categoryName) {
    return category.get(`user/${username}/category/${categoryName}`);
}

export function getCategories(username) {
    return category.get(`/user/${username}/categories`);
}

export function getCategoryByBookmarkId(bookmarkId) {
    return category.get(`/bookmark/${bookmarkId}/category`);
}

export function getCategoryIsPublic(userId, categoryName) {
    return category.get(`/user/${userId}/category/${categoryName}/public`);
}

export function addCategory(username, categoryData) {
    return category.post(`/${username}/category`, categoryData);
}

export function updateCategory(username, categoryName, categoryData) {
    return category.put(`/${username}/category/${categoryName}`, categoryData);
}

export function deleteCategory(username, categoryName) {
    return category.delete(`/${username}/category/${categoryName}`);
}