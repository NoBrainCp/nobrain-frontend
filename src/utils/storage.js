export function saveUserIdToStorage(userId) {
    localStorage.setItem('userId', userId);
}

export function saveUsernameToStorage(username) {
    localStorage.setItem('username', username);
}

export function saveEmailToStorage(email) {
    localStorage.setItem('email', email);
}

export function saveAccessTokenToStorage(accessToken) {
    localStorage.setItem('accessToken', accessToken);
}

export function saveRefreshTokenToStorage(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
}

export function saveLoginUserInfoToStorage(userInfo) {
    saveUserIdToStorage(userInfo.userId);
    saveUsernameToStorage(userInfo.username);
    saveEmailToStorage(userInfo.email);
    saveAccessTokenToStorage(userInfo.tokenDto.accessToken);
    saveRefreshTokenToStorage(userInfo.tokenDto.refreshToken);
}

export function getUserIdFromStorage() {
    return localStorage.getItem('userId');
}

export function getUsernameFromStorage() {
    return localStorage.getItem('username');
}

export function getEmailFromStorage() {
    return localStorage.getItem('email');
}

export function getAccessTokenFromStorage() {
    return localStorage.getItem('accessToken');
}

export function getRefreshTokenFromStorage() {
    return localStorage.getItem('refreshToken');
}

export function getValueFromLocalStorage(key) {
    return localStorage.getItem(key);
}

export function clearStorage() {
    return localStorage.clear();
}
