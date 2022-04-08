import API from "../utils/API";

export const ClassReviewService = {
    getReviews,
    getClassReviewByStudent
}

const BASE_CLASS_API_URL = "/classReviews"

function getReviews(data) {
    return API.get(`${BASE_CLASS_API_URL}/${data.id}?page=${data.pageNumber}&size=${data.pageSize}`);
}

function getClassReviewByStudent(params) {
    return API.get(`${BASE_CLASS_API_URL}/byStudent`, { params });
}