import API from "../utils/API";

export const TutorApplicationService = {
    getTutorApplications,
    confirmTutorApplication
}

const BASE_CLASS_API_URL = "/tutorApplications"
const queryString = require('query-string');

function getTutorApplications(query) {
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

function confirmTutorApplication(id, data) {
    return API.post(`${BASE_CLASS_API_URL}/${id}/approve`, data)
}
