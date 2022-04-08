import {API} from '../utils/ApiUtils'

export const TransactionService = {
    getTransactions,
    getDetail,
    getDetailQuote
}

const BASE_URL = "/admin/transactions";

function getTransactions(query) {
    return API.get(BASE_URL, {
        params: query
    });
}

function getDetail(id) {
    return API.get(`${BASE_URL}/${id}`);
}

function getDetailQuote(id) {
    return API.get(`${BASE_URL}/quote-history/${id}`);
}
