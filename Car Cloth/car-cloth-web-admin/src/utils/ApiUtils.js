import axios from "axios"
import {LocalStorageManager} from "../managers/LocalStorageManager";
import {LoginService} from "../services/LoginService";
import {stringify} from "./QueryUtil";

export const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
    paramsSerializer: params => stringify(params)
})


API.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem("user_token"));
        if (token) {
            config.headers.Authorization = `Bearer ${token['accessToken']}`;
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
        if (originalConfig.url !== "/auth/admin/login" && err.response) {
            if (err.response.status === 401) {
                const key = LocalStorageManager.getRefreshToken()
                if (LocalStorageManager.exitTokenUser()) {
                    await LoginService.refreshToken(key).then((res) => {
                        LocalStorageManager.saveUserToken(res.data)
                        window.location.reload()
                    }).catch((e) => {
                        //case refresh token other not exit in server
                        LocalStorageManager.removeUserToken()
                        window.location.href = '/login';
                    })
                }
            }
        }

        return Promise.reject(err);
    }
)


// export function extractParams(source) {
//     let params = "";
//
//     Object.entries(source).forEach((item, index) => {
//
//         if (item[1] !== undefined && item[1] !== null && item[1] !== '') {
//             if (index > 0)
//                 params += '&';
//
//             params += `${item[0]}=${item[1]}`;
//         }
//     });
//
//     return params;
// }
