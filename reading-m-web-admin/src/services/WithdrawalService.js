import API from "../utils/API";

export const WithdrawalService = {
    getWithdrawals,
    requestWithdrawal,
    approveWithdrawal
}

const BASE_CLASS_API_URL = "/withdrawal"

function getWithdrawals(pageable) {
    //exclude sort object, as param conversion does not work
    const {sort, ...params} = pageable
    return API.get(`${BASE_CLASS_API_URL}`, {params})
}

function requestWithdrawal(data) {
    return API.post(`${BASE_CLASS_API_URL}`, data)
}

function approveWithdrawal(id) {
    return API.patch(`${BASE_CLASS_API_URL}?id=${id}`)
}