import {API} from "../utils/ApiUtils";

const ReviewService = {
    getExistedReview,
    createReview,
    editReview,
    listReviewByCompanyId
}

function getExistedReview(quotationId) {
    return API.get('/reviews/exists-by-id', {
        params: {quotationId}
    })
}

function createReview(data) {
    return API.post('/reviews', data)
}

function editReview(id, data) {
    return API.put('/reviews/' + id, data)
}

function listReviewByCompanyId(companyId, params) {
    return API.get('/reviews/company/' + companyId, {
        params: params
    })
}

export default ReviewService
