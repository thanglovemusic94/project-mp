import API from "../utils/API";

export const FaqService = {
    getFaqs,
    postFaq,
    patchFaq,
    deleteFaq,
    getFaqDetail,
}

const BASE_CLASS_API_URL = "/faqs"
const queryString = require('query-string');

function getFaqs(query) {
    let search = {};
    for (let [key, value] of Object.entries(query)) {
        if (query.hasOwnProperty(key)) {
            if (typeof value === 'string' && value.trim().length <= 0) {
            } else search[key] = value;
        }
    }

    return API.get(`${BASE_CLASS_API_URL}`, {
        params: search,
        paramsSerializer: (search) => queryString.stringify(search),
    })
}


function getFaqDetail(id) {
    return API.get(`${BASE_CLASS_API_URL}/${id}`)
}

function postFaq(data) {
    return API.post(`${BASE_CLASS_API_URL}`, data)
}

function patchFaq(data) {
    return API.patch(`${BASE_CLASS_API_URL}/${data.id}`, data)
}

function deleteFaq(ids) {
    return API.delete(`${BASE_CLASS_API_URL}`, {
        params: {
            ids:ids
        },
        paramsSerializer: ids => queryString.stringify(ids)
    })
}
