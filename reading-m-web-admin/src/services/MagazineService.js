import API from "../utils/API";

export const MagazineService = {
    getAll,
    getById,
    post,
    patch,
    deletes,
}

const BASE_API_URL = "/magazine"

function getAll(params) {
    return API.get(`${BASE_API_URL}`, {params})
}

function getById(id) {
    return API.get(`${BASE_API_URL}/${id}`)
}

function post(data) {
    return API.post(`${BASE_API_URL}`, data)
}

function patch(data, id) {
    return API.patch(`${BASE_API_URL}/${id}`, data)
}

function deletes(ids) {
    const queryString = require('query-string');
    const url = queryString.stringify({ids:ids});
    return API.delete(`${BASE_API_URL}?`+ url)
}
