import API from "../utils/API";

export const ClassGoalService = {
    getApplications,
    createApplication,
    deleteApplication,
    replyApplication,
    getUserApplication
}

const BASE_CLASS_API_URL = "/goalClassApplication"
const queryString = require('query-string');

function getApplications(data) {
    const { category, paging } = data

    return API.get(`${BASE_CLASS_API_URL}?category=${category}&page=${paging.pageNumber}&size=${paging.pageSize}&sort=${paging.sort}`);
}

function createApplication(data) {
    const { category, title, content } = data

    return API.post(`${BASE_CLASS_API_URL}?category=${category}&title=${title}&content=${content}`);
}

function deleteApplication(id) {

    return API.delete(`${BASE_CLASS_API_URL}/${id}`);
}

function replyApplication(data) {
    const { id, answer } = data

    return API.patch(`${BASE_CLASS_API_URL}/${id}?answer=${answer}`);
}

function getUserApplication(param) {
    return API.get(`${BASE_CLASS_API_URL}/byApplicant`, {
        params: param,
        paramsSerializer: (param) => queryString.stringify(param),
    });
}
