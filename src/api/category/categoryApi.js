import {category} from "../index";

export function getCategories(userId) {
    return category.get(`user/${userId}/categories`);
}

export function addCategory(username, categoryData) {
    return category.post(`${username}/category`, categoryData);
}

export function updateCategory(username, categoryName ,categoryData) {
    return category.put(`${username}/category/${categoryName}`, categoryData);
}

export function deleteCategory(username, categoryName) {
    return category.delete(`${username}/category/${categoryName}`);
}