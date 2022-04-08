import jwtDecode from "jwt-decode";

export const LocalStorageManager = {
    saveUserToken,
    getTokenUser,
    removeUserToken,
    getPayloadToken,
    exitTokenUser,
    getRefreshToken,
    getAccessDate,
    removeAccessDate
}

export const USER_TOKEN = "user_token"
export const ACCESS_DATE = "access_date"

function getPayloadToken() {
    const token = localStorage.getItem(USER_TOKEN);
    if (token){
        const accessToken = JSON.parse(token).accessToken
        return jwtDecode(accessToken)
    }
    return null;
}

function getRefreshToken() {
    const token = localStorage.getItem(USER_TOKEN);
    if (token){
        return JSON.parse(token).refreshToken
    }
    return null;
}

function saveUserToken(token) {
    localStorage.setItem(USER_TOKEN, JSON.stringify(token));
}

function getTokenUser() {
    const token = localStorage.getItem(USER_TOKEN);
    if (token) return JSON.parse(token);
    return null;
}

function exitTokenUser() {
    const token = localStorage.getItem(USER_TOKEN);
    if (token) return true
    return false
}

function removeUserToken() {
    localStorage.removeItem(USER_TOKEN);
}

function getAccessDate() {
    if (localStorage.getItem("access_date") === null || localStorage.getItem("access_date") === undefined){
        localStorage.setItem("access_date", new Date().toString())
        return localStorage.getItem("access_date")
    }else {
        return localStorage.getItem("access_date")
    }
}

function removeAccessDate() {
    localStorage.removeItem(ACCESS_DATE);
}




