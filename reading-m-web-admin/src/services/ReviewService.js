import API from "../utils/API";

export const ReviewService = {
    getReviews,
    toggleShow
}

const BASE_CLASS_API_URL = "/classReviews"
const queryString = require('query-string');

function getReviews(query) {
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

function toggleShow(classId, userId, state){
    return API.patch(`/classes/${classId}/reviews/${userId}/${state}`)
}
