import { API } from "../utils/ApiUtils"

export const NoticeService = {
    getNotices,
    deleteNotice,
    markAsRead
}

const BASE_URL = "/main-home/notices"

function getNotices(pageNumber, pageSize, sort) {

    return API.get(`${BASE_URL}?page=${pageNumber}&size=${pageSize}&sort=${sort.prop},${sort.order}`);
}

function deleteNotice(id) {

    return API.delete(`${BASE_URL}/${id}`);
}

function markAsRead(id) {
    return API.patch(`${BASE_URL}/${id}`);
}
