import API from "../utils/API";

export const ReservationService = {
    search,
    list,
    updateStatus,
    deleteAllMember
}

const BASE_URL = "/admin/reservation"

function search(filter) {
    return API.get(BASE_URL + '/searchReservation?term=' + filter.term
        + '&page=' + filter.page
        + '&size=' + filter.size)
}

function list(filter, page) {
    return API.get(BASE_URL + '?usageStatus=' + filter.status
        + '&page=' + page.pageNumber
        + '&size=' + page.pageSize)
}

function updateStatus(id, value) {
    return API.patch(BASE_URL + '/' + id, {status: value})
}

function deleteAllMember(ids) {
    return API.delete(BASE_URL, {
        data:ids
    })
}