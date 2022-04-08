import API from "../utils/API";

export const UserService = {
    getAllUserByRole,
    logout,
    login,
    loginByRefreshToken,
    requestRestPassword,
    resetPassword,
    getUserByRole,
    getUserByRoleAndQuery
}

const BASE_API_URL = "/users"

function getAllUserByRole(role) {
    return API.get(`${BASE_API_URL}` + "/byRole", {
        params: {
            role: role
        }
    })
}

function getUserByRole(params) {
    return API.get(`${BASE_API_URL}/byRole/paging`, { params });
}

function getUserByRoleAndQuery(params) {
    return API.get(`${BASE_API_URL}/byRole/paging/query`, { params });
}

function logout() {

    return API.post(`${BASE_API_URL}/logout`);
}

function login(username, password) {
    let body = {
        "email": username,
        "grantType": "CLIENT_CREDENTIALS",
        "password": password,
    }

    return API.post(`${BASE_API_URL}/authenticate/admin`, body);
}

function loginByRefreshToken(token) {
    let body = {
        "grantType": "REFRESH_TOKEN",
        "refreshToken": token
    }

    return API.post(`${BASE_API_URL}/authenticate/admin`, body);
}

function requestRestPassword(email) {
    const hostUrl = window.location.origin;

    const params = {
        email: email,
        resetPasswordUrl: `${hostUrl}/resetpassword`
    }
    
    return API.post(`${BASE_API_URL}/resetPass/byEmail`, params);
}

function resetPassword(sig, newPassword) {
    return API.post(`${BASE_API_URL}/resetPass/byEmail/confirm`, {}, {
        params: {
            sig: sig,
            newPassword: newPassword
        }
    })
}
