import API from "../utils/API";

export const NoticeService = {
    findByQuery,
    create,
    edit,
    getDetailsById,
    deleteByIdIn,
}

const NOTICE_API_BASE_URL = "/notices"
const queryString = require('query-string')

function findByQuery(params) {

    let search = {};
    for (let [key, value] of Object.entries(params)) {
        if (params.hasOwnProperty(key)) {
            search[key] = value
        }
    }

    return API.get(`${NOTICE_API_BASE_URL}`, {
        params: search,
        paramsSerializer: (search) => queryString.stringify(search),
    })
}

function create(notice) {
    return API.post(`${NOTICE_API_BASE_URL}`, notice)
}

function edit(notice, noticeId) {
    return API.patch(`${NOTICE_API_BASE_URL}/${noticeId}`, notice)
}

function getDetailsById(noticeId) {
    return API.get(`${NOTICE_API_BASE_URL}/${noticeId}`)
}

function deleteByIdIn(lstId) {
    return API.delete(`${NOTICE_API_BASE_URL}`, { data: lstId })
}
