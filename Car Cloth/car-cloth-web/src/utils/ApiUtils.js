import axios from "axios";
import { SNS_LOGIN_ROUTE } from "../constants/RouteConstants";
import { LocalStorageManager } from "../managers/LocalStorageManager";
import { LoginService } from "../services/LoginService";
import QueryStringUtil from "./QueryStringUtil";

export const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
    paramsSerializer: params => QueryStringUtil.stringify(params)
})


API.interceptors.request.use(
    config => {
        let userToken = LocalStorageManager.getTokenUser();

        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken.accessToken}`;
        }
        // [WARNING] Workaround for API error, need to remove this later
        // else {
        //     /**
        //      * faker token expired time
        //      * "memberId": "user.test1@naver.com",
        //      * "user_id": 2
        //      *
        //      */
        //     const accessToken = "eyJhbGciOiJIUzM4NCJ9.eyJuYW1lIjoidXNlci50ZXN0MUBuYXZlci5jb20iLCJzY29wZXMiOiJNRU1CRVIiLCJzdWIiOiIyIiwiaWF0IjoxNjQxODk2NDI1LCJleHAiOjE2NDI1MDEyMjV9.AqGvK-1FrtAqTMYomb7CP3vhcNjB-YYH0O01we9MrxGaXq9IHxspUJc07jTsnpp-";

        //     config.headers.Authorization = `Bearer ${accessToken}`;
        // }
        
        return config;
    },
    error => Promise.reject(error)
)


API.interceptors.response.use(
    response => {

        return response
    },
    async (err) => {

        if (err.response && err.response.status === 401) {

            if (LocalStorageManager.isTokenUserExisted()) {
                const key = LocalStorageManager.getRefreshToken();

                await LoginService.refreshToken(key).then((res) => {

                    LocalStorageManager.saveUserToken(res.data)
                    window.location.reload()
                }).catch((e) => {

                    // Case refresh token does not exist on server
                    LocalStorageManager.removeUserToken()
                    window.location.href = SNS_LOGIN_ROUTE;
                })
            } else {
                window.location.href = SNS_LOGIN_ROUTE;
            }
        }

        return Promise.reject(err);
    }
)
