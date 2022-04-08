import API from '../utils/API'

export const InquiryService = {
    findByQuestioner,
    deleteById,
    getTypes,
    createInquiry
}

const BASE_API_BASE_URL = '/inquiries'

function findByQuestioner(params) {
    return API.get(`${BASE_API_BASE_URL}/byQuestioner`, { params });
}

function deleteById(id) {
    return API.delete(`${BASE_API_BASE_URL}/${id}`);
}

function getTypes() {
    return API.get(`${BASE_API_BASE_URL}/types`);
}

function createInquiry(data) {
    return API.post(`${BASE_API_BASE_URL}`, data);
}

