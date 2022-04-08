import API from "../utils/API";

export const PaymentService = {
    getAll,
    getById,
    download
}

const BASE_API_URL = "/payment"
const queryString = require('query-string');


function getAll(params) {

    let search = {};
    for (let [key, value] of Object.entries(params)) {
        if (params.hasOwnProperty(key)) {
            if (typeof value === 'string' && value.trim().length > 0) {
                search[key] = value
            }
            if (typeof value === 'number') {
                search[key] = value
            }
        }
    }

    return API.get(`${BASE_API_URL}` ,{
        params:search,
        paramsSerializer:(search) => queryString.stringify(search),
    })
}

function getById(id) {
    return API.get(`${BASE_API_URL}/${id}`)
}

function download(ids) {
    return API.get(`${BASE_API_URL}/download`,
        {
            params: {ids: ids},
            paramsSerializer:(ids) => queryString.stringify(ids),
            responseType: "blob"
        }
    )
};

