import API from "../utils/API";

export const MemberService = {
    getMembers,
    getMember,
    download
}

const BASE_API_URL = "/users"
const queryString = require('query-string');

function getMembers(params) {
    return API.get(`${BASE_API_URL}`, {
        params: params
    })
}

function getMember(id) {
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
}