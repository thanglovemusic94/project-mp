import {API} from "../utils/ApiUtils";
import {USAGE_HISTORY_ROUTER} from "../constants/RouteConstants";

const UsageHistoryService = {
    getAllTransaction,
    getTransactionById,
    getQuotationByTransactionId,
    cancelReservation,
    deleteReservation,
    applyReservation,
    geInfoReservationHistory,
    getQuotationDetail,
    checkApplyReservation,
}

function getAllTransaction(param) {
    return API.get(USAGE_HISTORY_ROUTER.API_USAGE_HISTORY, {
        params: param
    })
}

function getTransactionById(id) {
    return API.get('/usage-history/transaction/' + id)
}

function getQuotationByTransactionId(id) {
    return API.get('/usage-history/transaction/' + id+'/quotations')
}

function cancelReservation(id, data) {
    return API.put('/usage-history/quotation/' + id+'/cancel', {reason: data})
}

function deleteReservation(id) {
    return API.delete('/usage-history/quotation/' + id+'/delete')
}

function applyReservation(id, dateString) {
    return API.put('/usage-history/quotation/' + id+'/apply', null, {
        params: {
            reservationDate : dateString
        }
    })
}


function geInfoReservationHistory(idQuote) {
    return API.get('/usage-history/quotation/' + idQuote +'/reservation-history')
}

function getQuotationDetail(idQuote) {
    return API.get('/usage-history/quotation/' + idQuote )
}

function checkApplyReservation(idQuote) {
    return API.get('/usage-history/quotation/'+ idQuote + '/check-apply')
}

export default UsageHistoryService
