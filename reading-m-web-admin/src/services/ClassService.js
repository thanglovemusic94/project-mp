import API from '../utils/API'

export const ClassService = {
    getLiveClassBy,
    getVodClassBy,
    postClass,
    patchClass,
    getClassById,
    getAttendById,
    putDavinciClassEdit,
    getChangeTextBookWeek,
    getDavincilog,
    deleteDavinciClass
}

const BASE_CLASS_API_URL = '/classes'
const queryString = require('query-string')

function getLiveClassBy(query) {
    let search = {};
    for (let [key, value] of Object.entries(query)) {
        if (query.hasOwnProperty(key)) {
            if (!(typeof value === 'string' && value.trim().length <= 0)) {
                search[key] = value;
            }
        }
    }

    return API.get(`${BASE_CLASS_API_URL}/live`, {
        params: search,
        paramsSerializer: (search) => queryString.stringify(search),
    })
}

function getVodClassBy(query, pageable) {
    let params = pageable

    if (query.term !== '') {
        params = { ...params, query: query.term }
    }
    return API.get(`${BASE_CLASS_API_URL}/vod`, { params })
}

function postClass(data) {
    return API.post(`${BASE_CLASS_API_URL}`, data)
}

function patchClass(data) {
    return API.patch(
        `${BASE_CLASS_API_URL}/{data.id}/reviews/{data.userId}/{data.state}`
    )
}

function getClassById(classId) {
    return API.get(`${BASE_CLASS_API_URL}/${classId}`)
}

function getAttendById(classId) {
    return API.get(`${BASE_CLASS_API_URL}/attendance/${classId}`)
}

function putDavinciClassEdit(classId, data) {
    return API.put(`${BASE_CLASS_API_URL}/${classId}/davinci`, data);
}

function getChangeTextBookWeek(params) {
    return API.get(`${BASE_CLASS_API_URL}/change-week-history`, {
        params: params
    })
}

function getDavincilog(params) {
    return API.get(`/davincies/log`, {
        params: params
    })
}

function deleteDavinciClass(ids) {
    return API.delete(`/davincies`, {
        params: {
            ids: ids
        },
        paramsSerializer: ids => queryString.stringify(ids)
    })
}