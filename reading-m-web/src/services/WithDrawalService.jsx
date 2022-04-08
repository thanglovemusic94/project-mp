import API from "../utils/API";

export const WithDrawalService = {
    requestWithDrawal
}

function requestWithDrawal(data) {
    return API.post(`/withdrawal`, data, {})
}





