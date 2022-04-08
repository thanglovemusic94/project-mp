
export const LocalStorageManager = {
    hasKeyValue,
    removeKey,
    saveUserToken,
    getTokenUser,
    removeUserToken,
    isTokenUserExisted,
    getRefreshToken,
    setIsUserPhoneVerified,
    isUserPhoneVerified,
    setIsUserCarRegistered,
    isUserCarRegistered,
    clearOnLogout
}

const USER_TOKEN = "user_token"
export const USER_PHONE_AUTH = "user_phone_auth";
export const USER_CAR_REGISTER = "user_car_register";


function getRefreshToken() {
    const userToken = localStorage.getItem(USER_TOKEN);
    
    return userToken['refreshToken'];
}

function saveUserToken(token) {
    localStorage.setItem(USER_TOKEN, JSON.stringify(token));
}

function getTokenUser() {
    const token = localStorage.getItem(USER_TOKEN);

    if (token)
        return JSON.parse(token);

    return null;
}

function isTokenUserExisted() {
    const token = localStorage.getItem(USER_TOKEN);

    if (token)
        return true

    return false
}

function removeUserToken() {
    localStorage.removeItem(USER_TOKEN);
}

function setIsUserPhoneVerified(state) {
    localStorage.setItem(USER_PHONE_AUTH, JSON.stringify(state));
}

function isUserPhoneVerified() {
    const value = localStorage.getItem(USER_PHONE_AUTH);

    return value;
}

function setIsUserCarRegistered(state) {
    localStorage.setItem(USER_CAR_REGISTER, JSON.stringify(state));
}

function isUserCarRegistered() {
    const value = localStorage.getItem(USER_CAR_REGISTER);

    return value;
}

function hasKeyValue(key) {
    const value = localStorage.getItem(key);

    return value !== null;
}

function removeKey(key) {
    localStorage.removeItem(key);
}

function clearOnLogout() {
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(USER_PHONE_AUTH);
    localStorage.removeItem(USER_CAR_REGISTER);
}
