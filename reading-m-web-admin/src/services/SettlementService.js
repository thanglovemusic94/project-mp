import API from "../utils/API";

export const SettlementService = {
    getAll,
    download,
    getById,
    updateCompleted
}

const BASE_API_URL = "/settlement"
const queryString = require('query-string');

function getAll(params) {
    let search = {};
    for (let [key, value] of Object.entries(params)) {
        if (params.hasOwnProperty(key)) {
            if (typeof value === 'string' && value.trim().length <= 0) {
            } else search[key] = value;
        }
    }

    return API.get(`${BASE_API_URL}`, {
        params: search,
        paramsSerializer: (search) => queryString.stringify(search),
    })
}

function getById(id) {
    return API.get(`${BASE_API_URL}/detail/${id}`)
}

function updateCompleted(id) {
    console.log(id)
    return API.patch(`${BASE_API_URL}/${id}`)
}

function download(ids) {
    return API.get(`${BASE_API_URL}/download`,
        {
            params: {ids: ids},
            paramsSerializer: (ids) => queryString.stringify(ids),
            responseType: "blob"
        }
    )
};
