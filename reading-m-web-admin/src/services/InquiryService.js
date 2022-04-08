import API from "../utils/API";

export const InquiryService = {
    getInquiry,
    postAnswer,
    getInquiryId,
}

const BASE_CLASS_API_URL = "/inquiries"
const queryString = require('query-string');

function getInquiry(query) {
    console.log(query)
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

function getInquiryId(id)
{
    return API.get(`${BASE_CLASS_API_URL}/${id}`)
}

function postAnswer(data) {
    return API.post(`${BASE_CLASS_API_URL}/${data.id}/answer`, data)
}
