import API from "../utils/API";

export const RefundService = {
    getAll,
    getById,
    patch
}

const BASE_API_URL = "/admin/refund"

const queryString = require('query-string');

function getAll(query) {
    let search = {};
    for (let [key, value] of Object.entries(query)) {
        if (query.hasOwnProperty(key)) {
            if (typeof value === 'string' && value.trim().length <= 0){}
            else search[key] = value;
        }
    }
    return API.get(`${BASE_API_URL}`, {
        params: search,
        paramsSerializer: (search) => queryString.stringify(search),
    })
}


function getById(id) {
    return API.get(`${BASE_API_URL}/${id}`)
}

function patch(id, status) {
    return API.patch(`${BASE_API_URL}/${id}`, {}, {
        params: {
            status: status
        }
    })
}

