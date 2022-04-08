import API from "../utils/API";

export const EventBannerService = {
    getBannerUrl,
    saveBanner,
    editBanner
}

const BASE_CLASS_API_URL = "/event-banner";

function getBannerUrl() {
    return API.get(`${BASE_CLASS_API_URL}`);
}

function saveBanner(urlImagePc, urlImageMb) 
{
    let body = {
        "pcImgName": urlImagePc,
        "mobileImgName": urlImageMb
    }

    return API.post(`${BASE_CLASS_API_URL}`, body);
}

function editBanner(urlImagePc, urlImageMb) {
    let body = {
        "pcImgName": urlImagePc,
        "mobileImgName": urlImageMb
    }

    return API.patch(`${BASE_CLASS_API_URL}`, body);
}