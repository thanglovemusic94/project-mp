import API from "../utils/API"

export const AnnouncementService = {
    getBoardAnnouncement,
    postAnnouncement,
    deleteAnnouncement,
    updateAnnouncement,
    searchAnnouncement,
    deleteListAnnouncement,
    getAnnouncementDetail,
}

const ANNOUNCEMENT_REST_API_URL = "/admin/boardAnnouncement/"
const SEARCH_ANNOUNCEMENT_REST_API_URL = "/admin/boardAnnouncement/searchBoardAnnouncement"


function getBoardAnnouncement(page) {
    return API.get(`${ANNOUNCEMENT_REST_API_URL}?page=${page.pageNumber}&size=${page.pageSize}`)
}

function postAnnouncement(contents, id, title) {
    return API.post(ANNOUNCEMENT_REST_API_URL, {
        contents, id, title
    })
}

function deleteAnnouncement(id) {
    return API.delete(ANNOUNCEMENT_REST_API_URL + id)
}

function deleteListAnnouncement(listId) {
    return API.delete(ANNOUNCEMENT_REST_API_URL, {
        headers:{"Content-type" :"application/json"}, data:listId
    })
}

function updateAnnouncement(contents, id, title) {
    return API.patch(ANNOUNCEMENT_REST_API_URL + id, {
        contents,
        id,
        title
    })
}

function searchAnnouncement(offset, number, size, term) {
    return API.get(SEARCH_ANNOUNCEMENT_REST_API_URL + "?offset=" + offset + "&page=" + number + "&size=" + size + "&temr" + term)
}

function getAnnouncementDetail(id) {
    return API.get(ANNOUNCEMENT_REST_API_URL + id)
}


