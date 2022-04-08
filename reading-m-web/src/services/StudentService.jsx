import API from "../utils/API";

const BASE_API_URL = "/student"

export const StudentService = {
    getDetailStudent,
    getClassValidForReview,
    writeReview,
}

function getDetailStudent(id) {
    return API.get(`/users/${id}`)
}

function getClassValidForReview(params) {

    return API.get(`${BASE_API_URL}/classes/available-for-review`, { params })
}

function writeReview(data) {

    return API.post(`${BASE_API_URL}/review`, data)
}



