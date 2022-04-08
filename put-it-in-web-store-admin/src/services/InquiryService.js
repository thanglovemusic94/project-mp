import API from "../utils/API"
import {func} from "prop-types";

export const InquiryService = {
    getBoardInquiry,
    postInquiry,
    postInquiryAnswer,
    deleteInquiry,
    updateInquiry,
    searchInquiry,
    deleteListInquiry,
    getInquiryDetail,
}

const INQUIRY_REST_API_URL = "/admin/inquiry/"
const ANSWER_INQUIRY_REST_API_URL = "/admin/inquiry/createANS"
const SEARCH_Inquiry_REST_API_URL = "/admin/inquiry/searchInquiry"


function getBoardInquiry(page) {
    return API.get(`${INQUIRY_REST_API_URL}?page=${page.pageNumber}&size=${page.pageSize}`)
}

function postInquiry(contents, id, title, userId) {
    return API.post(INQUIRY_REST_API_URL, {
        contents, id, title, userId
    })
}

function postInquiryAnswer(answerContent, answerTitle, inquiryId) {
    return API.post(ANSWER_INQUIRY_REST_API_URL, {
        answerContent, answerTitle, inquiryId
    })
}

function deleteInquiry(id) {
    return API.delete(INQUIRY_REST_API_URL + id)
}

function deleteListInquiry(listId) {
    return API.delete(INQUIRY_REST_API_URL, {
        headers:{"Content-type" :"application/json"}, data:listId
    })
}

function updateInquiry(contents, id, title, userId) {
    return API.patch(INQUIRY_REST_API_URL + id, {
        contents, id, title, userId
    })
}

function searchInquiry(offset, number, size, term) {
    return API.get(SEARCH_Inquiry_REST_API_URL + "?offset=" + offset + "&page=" + number + "&size=" + size + "&temr" + term)
}

function getInquiryDetail(id) {
    return API.get(INQUIRY_REST_API_URL + id)
}
