import API from "../utils/API";

export const PointPaymentService = {
    getPointPayments,
    createPointPayment,
    getPointPayment,
    deletePointPayment,
    updatePointPayment
}

const BASE_CLASS_API_URL = "/admin/point"

function getPointPayments(pageable) {
    //exclude sort object, as param conversion does not work
    const {sort, ...params} = pageable;
    return API.get(`${BASE_CLASS_API_URL}`, {params});
}

function createPointPayment(data) {
    return API.post(`${BASE_CLASS_API_URL}`, data);
}

function getPointPayment(id) {
    return API.get(`${BASE_CLASS_API_URL}/${id}`);
}

function deletePointPayment(ids) {
    let deleteParams = ""

    for (let i = 0; i < ids.length; i++) {
        deleteParams += `ids=${ids[i]}`

        if (i + 1 < ids.length) deleteParams += "&"
    }

    return API.delete(`${BASE_CLASS_API_URL}?${deleteParams}`);
}

function updatePointPayment(data) {
    return API.patch(`${BASE_CLASS_API_URL}/${data.id}`, data);
}