import API from "../utils/API";

export const ClassQAService = {
    getClassQAs,
    createClassQA,
    deleteClassQA,
    getClassQAByStudent,
    getClassQAsTutor,
    replyQA
}

const BASE_CLASS_API_URL = "/classqas"

function getClassQAs(data) {

    return API.get(`${BASE_CLASS_API_URL}/qalist?classId=${data.id}&page=${data.pageNumber}&size=${data.pageSize}&sort=${data.sort}`);
}

function createClassQA(data) {
    const { id, ...params } = data

    return API.post(`${BASE_CLASS_API_URL}/${id}`, params);
}

function deleteClassQA(id) {
    return API.delete(`${BASE_CLASS_API_URL}/${id}`);
}

function getClassQAByStudent(params) {

    return API.get(`${BASE_CLASS_API_URL}/qalistByStudent`, { params })
}

function getClassQAsTutor(pageable) {
    const { page, size } = pageable;

    return API.get(`${BASE_CLASS_API_URL}/qalist/by-tutor?page=${page}&size=${size}`);
}

function replyQA(id, answer) {

    return API.patch(`${BASE_CLASS_API_URL}/${id}`, answer, {
        "headers": {
            "Content-Type": "text/plain"
        }
    });
}