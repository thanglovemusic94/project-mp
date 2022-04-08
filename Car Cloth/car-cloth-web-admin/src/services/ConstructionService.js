import {API} from "../utils/ApiUtils"

export const ConstructionService = {
    getConstructionReviews,
    getConstructionReview,
    getConstructionExamples,
    getConstructionExample,
    updateReviewStatus,
    updateExampleStatus
}

const CONSTRUCTION_REVIEWS_BASE_URL = "/admin/reviews";
const CONSTRUCTION_EXAMPLES_BASE_URL = "/admin/construction-ex";

function getConstructionReviews(paging, filter) {
    const paramsObj = {
        ...paging,
        ...filter
    }

    return API.get(`${CONSTRUCTION_REVIEWS_BASE_URL}`, {
        params: paramsObj
    });
}

function getConstructionReview(id) {

    return API.get(`${CONSTRUCTION_REVIEWS_BASE_URL}/${id}`);
}

function updateReviewStatus(items) {

    return API.patch(`${CONSTRUCTION_REVIEWS_BASE_URL}/status`, items)
}

function getConstructionExamples(paging, filter) {
    const paramsObj = {
        ...paging,
        ...filter
    }

    return API.get(`${CONSTRUCTION_EXAMPLES_BASE_URL}`, {params: paramsObj});
}

function getConstructionExample(id) {

    return API.get(`${CONSTRUCTION_EXAMPLES_BASE_URL}/${id}`);
}

function updateExampleStatus(items) {

    return API.patch(`${CONSTRUCTION_EXAMPLES_BASE_URL}`, items)
}
