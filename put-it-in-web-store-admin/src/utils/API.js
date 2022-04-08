import axios from "axios"
import {history} from "./store"

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
        if (!config.headers.Authorization) {
            const token = JSON.parse(localStorage.getItem("token"));

            if (token) {
                config.headers.Authorization = `Bearer ${token.accessToken}`;
            }
        }

        return config;
    },
    error => Promise.reject(error)
);

API.interceptors.response.use(
    response => {
        return response
    },

    error => {
        console.log(error.response)
        if (error.response && error.response.status === 403) {
            history.push("/login")
            return Promise.reject(error)
        } else {
            return Promise.reject(error)
        }
    }
)

export default API
