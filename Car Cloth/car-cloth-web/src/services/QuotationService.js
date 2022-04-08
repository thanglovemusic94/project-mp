import {API} from "../utils/ApiUtils";

const QuotationService = {
    checkNewNotice,
    getAllQuotes,
    getAllQuotesByTransactionId,
    getRequestQuoteDetail,
    createQuote,
    getDeliveredDetail,
    confirmNewRequestQuote,
    companyChangeStatusQuote
}

const baseUrl = '/quote'

function checkNewNotice() {
    return API.get(`${baseUrl}/check-new-notice`)
}

function getAllQuotes(params) {
    return API.get(baseUrl + '/get-all', {
        params: params
    })
}

function getAllQuotesByTransactionId(id) {
    return API.get(baseUrl + "/by-transaction/" + id)
}

function getRequestQuoteDetail(id) {
    return API.get(baseUrl + "/" + id + "/request")
}

function createQuote(data) {
    return API.post(baseUrl + "/deliver", data)
}

function getDeliveredDetail(id) {
    return API.get(baseUrl + "/" + id + "/delivered")
}

function confirmNewRequestQuote(id) {
    return API.put(baseUrl + "/confirm-request/" + id)
}

function companyChangeStatusQuote(id, data) {
    return API.put(baseUrl + "/" + id + "/process", data)
}

export default QuotationService
