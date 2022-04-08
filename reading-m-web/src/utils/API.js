import axios from "axios";
import { SHOW_ERROR_POPUP, CLOSE_ERROR_POPUP } from "../constants/action.type.constants";
import store from "../store";
import { UserStorage } from "storages/UserStorage";
import { LoginService } from "services/LoginService";


const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    /*headers: authHeader(),*/
    responseType: "json",
})

/*function authHeader() {
    const item = localStorage.getItem("token")
    if (item !== "undefined") {
        const jwt = JSON.parse(localStorage.getItem("token"))

        if (jwt && jwt.accessToken)
            return {"Authorization": "Bearer " + jwt.accessToken}
        else return {}
    }
}*/

API.interceptors.request.use(
    config => {
        dispatch({ type: CLOSE_ERROR_POPUP })

        const accessToken = UserStorage.getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    error => Promise.reject(error)
)

API.interceptors.response.use(
    response => {
        return response
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/users/authenticate" && err.response) {
            if (err.response.status === 401 && err.response.data.code === 12008
                && !originalConfig._retry) {

                originalConfig._retry = true;
                UserStorage.delAccessToken();
                const refreshToken = UserStorage.getRefreshToken();

                try {
                    const rs = await LoginService.login({ refreshToken: refreshToken, grantType: 'REFRESH_TOKEN' });

                    if (rs.status === 200) {
                        //Success: get and save new accessToken + refresToken
                        UserStorage.delRefreshToken();
                        UserStorage.saveUserLocal(rs.data);
                        return API(originalConfig);
                    } else {
                        //Failed: remove freshedToken and back to login page
                        UserStorage.delRefreshToken();
                        window.location.href = '/login';
                    }

                } catch (_error) {
                    //Error: remove freshedToken and back to login page
                    UserStorage.delRefreshToken();
                    window.location.href = '/login';
                }

            } else {
                dispatch({ type: SHOW_ERROR_POPUP, contents: err.response.data.message })
            }
        }
    }
)

const { dispatch } = store

export default API
