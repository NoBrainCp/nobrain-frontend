import {category} from "../index";

export function getCategory(categoryId) {
    return category.get(`/category/${categoryId}`);
}

export function getCategories(username) {
    return category.get(`/user/${username}/categories`);
}

export function getCategoryByBookmarkId(bookmarkId) {
    return category.get(`/bookmark/${bookmarkId}/categoryName`);
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