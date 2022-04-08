import API from "../utils/API";

export const TutorService = {
    applyTutor,
    getTutor
}

const BASE_CLASS_API_URL = "/tutors"

function applyTutor(data) {
    return API.post(`${BASE_CLASS_API_URL}`, data)
}

function getTutor(id) {
    return API.get(`${BASE_CLASS_API_URL}/${id}/application`)
}
