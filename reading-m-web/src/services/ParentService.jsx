import API from "../utils/API";

export const ParentService = {
    addChildren,
    existsMemberId,
    getChildren,
    getValidCoupon,
    getSummaryPoints,
    orderPayment,
    getPayment,
    getPaymentDetail,
    requestRefund,
    getRefund,
    getRefundDetail,
    getAllCoupon,
    getPoints,
    summaryPoints,
    createCashRequirement,
    getCashRequirement,
    getClassParents,
    getParentChildrens
}

const BASE_CLASS_API_URL = '/users'
const BASE_API_URL = "/parent"
const queryString = require('query-string')

function addChildren(data) {
    return API.post(`${BASE_CLASS_API_URL}/parent/addChild`, data)
}

function existsMemberId(memberId) {
    return API.get(`${BASE_CLASS_API_URL}/search/existsMemberId`, {
        params: {
            memberId: memberId
        }
    })
}


function getChildren() {
    return API.get(`${BASE_API_URL}/children`)
}

function getValidCoupon(classType) {
    return API.get(`${BASE_API_URL}/coupon/still-valid?classType=${classType}`)
}

function getSummaryPoints() {
    return API.get(`${BASE_API_URL}/point/summary`)
}

function orderPayment(data) {
    return API.post(`${BASE_API_URL}/payment/order`, data)
}

/*page 8.7 to page page 8.8*/

function getPayment(params) {
    return API.get(`${BASE_API_URL}/payment`, {
        params: params,
        paramsSerializer: param => queryString.stringify(param),
    })
}
function getPaymentDetail(id) {
    return API.get(`${BASE_API_URL}/payment/${id}`)
}

function requestRefund(data) {
    return API.post(`${BASE_API_URL}/refund`, data)
}

function getRefund(params) {
    return API.get(`${BASE_API_URL}/refund`, {
        params: params,
        paramsSerializer: param => queryString.stringify(param),
    })
}

function getRefundDetail(id) {
    return API.get(`${BASE_API_URL}/refund/${id}`)
}

function getAllCoupon(params) {
    return API.get(`${BASE_API_URL}/coupon`, {
        params: params,
        paramsSerializer: param => queryString.stringify(param),
    })
}

function getPoints(params) {
    return API.get(`${BASE_API_URL}/point`, {
        params: params,
        paramsSerializer: param => queryString.stringify(param),
    })
}

function summaryPoints(){
    return API.get(`${BASE_API_URL}/point/summary`)
}

function createCashRequirement(data){
    return API.post(`${BASE_API_URL}/cash-requirement`, data)
}

function getCashRequirement(params) {
    return API.get(`${BASE_API_URL}/cash-requirement`, {
        params: params,
        paramsSerializer: param => queryString.stringify(param),
    })
}


function getClassParents(id) {

    return API.get(`${BASE_API_URL}/byClass?classId=${id}`);

}

function getParentChildrens(id) {
    
    return API.get(`${BASE_API_URL}/children/byParentId/${id}`);
}




