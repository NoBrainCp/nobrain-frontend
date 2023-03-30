function saveUserIdToCookie(userId) {
    document.cookie = `userId=${userId}`;
}

function saveUsernameToCookie(username) {
    document.cookie = `username=${username}`;
}

function saveEmailToCookie(email) {
    document.cookie = `email=${email}`;
}

function saveLoginIdToCookie(loginId) {
    document.cookie = `loginId=${loginId}`;
}

function saveCategoryId(categoryId) {
    document.cookie = `categoryId=${categoryId}`;
}

function saveAccessTokenToCookie(accessToken) {
    let expirationSeconds = 1800; // 30 minutes
    let d = new Date();
    d.setTime(d.getTime() + (expirationSeconds * 1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = `accessToken=${accessToken};${expires}`;
}

function saveRefreshTokenToCookie(refreshToken) {
    document.cookie = `refreshToken=${refreshToken}`;
}

function saveUserInfoToCookie(userInfo) {
    saveUserIdToCookie(userInfo.userId);
    saveEmailToCookie(userInfo.email);
    saveUsernameToCookie(userInfo.username);
    saveAccessTokenToCookie(userInfo.accessToken);
}


function getUserIdFromCookie() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

function getUsernameFromCookie() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

function getEmailFromCookie() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

function getLoginIdFromCookie() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)loginId\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

function getCategoryIdFromCookie() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)categoryId\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

function getAccessTokenFromCookie() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

function getRefreshTokenFromCookie() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

function deleteUsernameFromCookie() {
    document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function deleteCategoryIdFromCookie() {
    document.cookie = `categoryId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function deleteAccessTokenFromCookie() {
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function deleteCookie(value) {
    document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function clearCookie() {
    const cookieToClear = [`userId`, `username`, `email`,`accessToken`];
    cookieToClear.find(cookie => {
        document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    })
}

export {
    saveUserIdToCookie,
    saveUsernameToCookie,
    saveEmailToCookie,
    saveLoginIdToCookie,
    saveCategoryId,
    saveAccessTokenToCookie,
    saveRefreshTokenToCookie,
    saveUserInfoToCookie,

    getUserIdFromCookie,
    getUsernameFromCookie,
    getEmailFromCookie,
    getLoginIdFromCookie,
    getCategoryIdFromCookie,
    getAccessTokenFromCookie,
    getRefreshTokenFromCookie,

    deleteUsernameFromCookie,
    deleteCategoryIdFromCookie,
    deleteAccessTokenFromCookie,
    deleteCookie,
    clearCookie
};