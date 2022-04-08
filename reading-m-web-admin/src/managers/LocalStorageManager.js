
export const LocalStorageManager = {
    saveToken,
    getAccessToken,
    getRefreshToken,
    removeAccessToken,
    removeRefreshToken
}

const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'

function saveToken(data) {

    if (data) {
        localStorage.setItem(ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
    }
}

function getAccessToken() {

    return localStorage.getItem(ACCESS_TOKEN);
}

function getRefreshToken() {

    return localStorage.getItem(REFRESH_TOKEN);
}

function removeAccessToken() {

    localStorage.removeItem(ACCESS_TOKEN);
}

function removeRefreshToken() {

    localStorage.removeItem(REFRESH_TOKEN);
}