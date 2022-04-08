import API from "utils/API"

export const FaqService = {
    findAll
}

function findAll(pageable) {
    return API.get("/faqs", {params: pageable})
}