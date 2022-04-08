import API from "../utils/API";

export const EventBannerService = {
    getBannerUrl
}

const BASE_CLASS_API_URL = "/event-banner";

function getBannerUrl() {
    return API.get(`${BASE_CLASS_API_URL}`);
}