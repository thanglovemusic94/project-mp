import API from '../utils/API'

export const ClassCartService = {
    addToCart,
    getCarts,
    cancelCart
}

const BASE_API_BASE_URL = '/classCart'

function addToCart(liveClassId) {

    return API.post(`${BASE_API_BASE_URL}?classId=${liveClassId}`)
}

function getCarts(params) {

    return API.get(`${BASE_API_BASE_URL}`, { params });
}

function cancelCart(params) {

    return API.delete(`${BASE_API_BASE_URL}`, { params });
}
