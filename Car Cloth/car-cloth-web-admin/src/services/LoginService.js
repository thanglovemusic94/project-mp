import {API} from "../utils/ApiUtils";
import axios from "axios";

export const LoginService = {
    login,
    refreshToken
}

const BASE_URL = "/auth/admin/login"

const GRANT_TYPE = {
    CLIENT_CREDENTIALS: "CLIENT_CREDENTIALS",
    REFRESH_TOKEN: "REFRESH_TOKEN"
}

function login(username, password) {

    let body = {
        "grantType": GRANT_TYPE.CLIENT_CREDENTIALS,
        "memberId": `${username}`,
        "password": `${password}`,
        "refreshToken": ""
    }

    return API.post(BASE_URL, body);
}

function refreshToken(keyRefresh) {
    return axios.create({baseURL: process.env.REACT_APP_API_URL}).post(BASE_URL, {
        refreshToken: keyRefresh,
        grantType: GRANT_TYPE.REFRESH_TOKEN,
        memberId: null,
        password: null,
    })
}
