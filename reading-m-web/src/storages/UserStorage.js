import jwt from 'jwt-decode'

export const UserStorage = {
    saveUserLocal,
    delUserLocal,
    getUserLocal,
    hasUserLocal,
    getLocalUserId,
    getLocalUserRole,
    saveSkipMainPopup,
    hasSkipMainPopup,
    delSkipMainPopup,
    getAccessToken,
    getRefreshToken,
    delAccessToken,
    delRefreshToken
}

// const LOCAL_USER_KEY = 'token'
const LOCAL_ACCESS_TOKEN = 'accessToken'
const LOCAL_REFRESH_TOKEN = 'refreshToken'
const LOCAL_SKIP_MAIN_POPUP = 'skipMainPopup'

let userLocal = null

function saveUserLocal(token) {

    if (token) {
        localStorage.setItem(LOCAL_ACCESS_TOKEN, token.accessToken)
        localStorage.setItem(LOCAL_REFRESH_TOKEN, token.refreshToken)

        userLocal = jwt(token.accessToken)
    }
}

function getUserLocal() {
    if (userLocal === null) {
        const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN)
        if (accessToken) userLocal = jwt(accessToken)
    }

    return userLocal
}

function delUserLocal() {
    userLocal = null
}

function getAccessToken() {

    return localStorage.getItem(LOCAL_ACCESS_TOKEN)
}

function getRefreshToken() {

    return localStorage.getItem(LOCAL_REFRESH_TOKEN)
}

function delAccessToken() {
    localStorage.removeItem(LOCAL_ACCESS_TOKEN)
}

function delRefreshToken() {
    localStorage.removeItem(LOCAL_REFRESH_TOKEN)
}

function hasUserLocal() {

    return getUserLocal() !== null
}

function getLocalUserId() {
    if (getUserLocal() === null) return -1

    return getUserLocal().sub
}

function getLocalUserRole() {
    if (getUserLocal() === null) return ''

    return getUserLocal().scopes
}


function saveSkipMainPopup() {
    localStorage.setItem(LOCAL_SKIP_MAIN_POPUP, JSON.stringify(new Date()))
}

function hasSkipMainPopup() {
    const item = JSON.parse(localStorage.getItem(LOCAL_SKIP_MAIN_POPUP));

    if (item) {
        const skipDate = new Date(item);
        const today = new Date();

        const isSameDay = today.getDate() === skipDate.getDate();
        const isSameMonth = today.getMonth() === skipDate.getMonth();
        const isSameYear = today.getFullYear() === skipDate.getFullYear();

        if (isSameDay === true && isSameMonth === true && isSameYear === true)
            return true;
    }

    return false;
}

function delSkipMainPopup() {
    localStorage.removeItem(LOCAL_SKIP_MAIN_POPUP);
}