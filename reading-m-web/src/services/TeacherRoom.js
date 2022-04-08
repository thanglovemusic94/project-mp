import API from "../utils/API";

export const TeacherRoomService = {
    getConsultation,
    getChildren,
    createConsultation,
    removeConsultation,
    replyConsultation,
    getClassByStudentId,
    getClassByTutor
}

const queryString = require('query-string');

function getConsultation(param) {
    return API.get(`/classConsultation`, {
        params: param,
        paramsSerializer: (param) => queryString.stringify(param),
    })
}

function createConsultation(data) {
    return API.post(`/classConsultation`, data)
}

function removeConsultation(id) {
    return API.delete(`/classConsultation/${id}`)
}

function replyConsultation(answer, id) {
    return API.patch(`/classConsultation/${id}`, {}, {
        params: {
            answer: answer
        }
    })
}

function getChildren() {
    return API.get(`/parent/children`)
}

function getClassByStudentId(id) {
    return API.get(`/classConsultation/getClassByStudentId`, {
        params: {
            studentId: id
        }
    })
}

function getClassByTutor() {
    return API.get(`/classConsultation/getClassByTutor`)
}







