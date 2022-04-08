import API from "../utils/API";

export const BannerService = {
    getAll,
    getById,
    post,
    update,
    deletes,
    show,
    hide
}

const BASE_API_URL = "/banner"


function getAll(params) {
    return API.get(`${BASE_API_URL}`, {params})
}

function getById(id) {
    return API.get(`${BASE_API_URL}/${id}`)
}

function post(data) {
    return API.post(`${BASE_API_URL}`, data)
}

function update(data, id) {
    return API.post(`${BASE_API_URL}/${id}`, data, {headers: {
            "Content-Type": "multipart/form-data",
        }})
}

function deletes(ids) {
    const queryString = require('query-string');
    const url = queryString.stringify({ids: ids});
    return API.delete(`${BASE_API_URL}?` + url)
}

function show(id) {
    return API.patch(`${BASE_API_URL}/show/${id}`)
}

function hide(id) {
    return API.patch(`${BASE_API_URL}/hide/${id}`)
}
