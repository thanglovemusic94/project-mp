import { API } from "../utils/ApiUtils"

const FAQService = {
    getFaqList
}

function getFaqList(params) {  
    return API.get("/my-page/faq", {
        params: params
    })
}

export default FAQService