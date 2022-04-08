import API from "../utils/API";

export const SettlementService = {
    searchSettlement,
    listSettlement,
    updateStatus,
    deleteAll,
    getFee,
    setFee
}

const BASE_URL = "/admin/settlement"
const SEARCH_URL = "/admin/settlement/searchSettlement"

function searchSettlement(filter, page) {
    return API.get(SEARCH_URL + '?term=' + filter.term + '&dateOrder='
        + '&page=' + page.pageNumber
        + '&size=' + page.pageSize)
}

function listSettlement(filter, page) {
    return API.get(BASE_URL + '?status=' + filter.status + '&isTwoWeek=' + filter.isTwoWeek
        + '&page=' + page.pageNumber
        + '&size=' + page.pageSize)
}

function updateStatus(id, status){
    return API.patch(BASE_URL+"/"+id, {settlementStatus: status})
}

function deleteAll(ids) {
    return API.delete(BASE_URL+"/", {data: ids})
}

function getFee() {
    return API.get(BASE_URL+"/getfee")
}

function setFee(percent) {
    return API.put(BASE_URL+"/setfee", {"fee": percent})
}