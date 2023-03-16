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

function saveAccessTokenToCookie(accessToken) {
    document.cookie = `accessToken=${accessToken}`;
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

function deleteCookie(value) {
    document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}


export {
    saveUserIdToCookie,
    saveUsernameToCookie,
    saveEmailToCookie,
    saveLoginIdToCookie,
    saveAccessTokenToCookie,
    saveRefreshTokenToCookie,
    saveUserInfoToCookie,

    getUserIdFromCookie,
    getUsernameFromCookie,
    getEmailFromCookie,
    getLoginIdFromCookie,
    getAccessTokenFromCookie,
    getRefreshTokenFromCookie,

    deleteUsernameFromCookie,
    deleteCookie,
};