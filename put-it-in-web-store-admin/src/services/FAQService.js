import API from "../utils/API"

export const FAQService = {
    getBoardFAQ,
    postFAQ,
    deleteFAQ,
    updateFAQ,
    searchFAQ,
    deleteListFAQ,
    getFAQDetail,
}

const FAQ_REST_API_URL = "/admin/boardFAQ/"
const SEARCH_FAQ_REST_API_URL = "/admin/boardFAQ/searchBoardFAQ"


function getBoardFAQ(page) {
    return API.get(`${FAQ_REST_API_URL}?page=${page.pageNumber}&size=${page.pageSize}`)
}

function postFAQ(answer, id, question) {
    return API.post(FAQ_REST_API_URL, {
        answer, id, question
    })
}

function deleteFAQ(id) {
    return API.delete(FAQ_REST_API_URL + id)
}

function deleteListFAQ(listId) {
    return API.delete(FAQ_REST_API_URL, {
        headers:{"Content-type" :"application/json"}, data:listId
    })
}

function updateFAQ(answer, id, question) {
    return API.patch(FAQ_REST_API_URL + id, {
        answer, id, question
    })
}

function searchFAQ(offset, number, size, term) {
    return API.get(SEARCH_FAQ_REST_API_URL + "?offset=" + offset + "&page=" + number + "&size=" + size + "&temr" + term)
}

function getFAQDetail(id) {
    return API.get(FAQ_REST_API_URL + id)
}


