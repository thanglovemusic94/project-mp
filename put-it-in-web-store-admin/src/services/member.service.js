import API from "../utils/API";

export const MemberService = {
    searchMember,
    deleteAllMember,
    lstMember,
}

const SEARCH_URL = "/admin/user/searchUser"
const DEFAULT_URL = "/admin/user"

function searchMember(filter, page) {
    return API.get(SEARCH_URL + '?term=' + filter.term
        + '&page=' + page.pageNumber
        + '&size=' + page.pageSize)
}

function deleteAllMember(ids) {
    return API.delete(DEFAULT_URL, {data:ids})
}

function lstMember(page) {
    return API.get(DEFAULT_URL
        + '?page=' + page.pageNumber
        + '&size=' + page.pageSize)
}