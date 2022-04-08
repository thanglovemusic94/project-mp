import API from '../utils/API'

export const TutorService = {
    applyForTutor,
    getTutorApplyById,
    updateApplyTutor,
    getTutorApply
}

const BASE_CLASS_API_URL = '/tutors'

function applyForTutor(data) {
    return API.post(`${BASE_CLASS_API_URL}`, data)
}

function getTutorApplyById(tutorId) {
    return API.get(`${BASE_CLASS_API_URL}/${tutorId}/application`)
}

function getTutorApply() {
    return API.get(`${BASE_CLASS_API_URL}/application`)
}

function updateApplyTutor(data, tutorId) {
    return API.patch(`${BASE_CLASS_API_URL}`, data, {
        params:{
            id: tutorId
        }
    })
}



