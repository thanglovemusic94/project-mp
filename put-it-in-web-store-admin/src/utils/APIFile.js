import axios from "axios"

const APIFile = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // headers: authHeader(),
    responseType: 'blob'
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

APIFile.interceptors.request.use(
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

export default APIFile
