import API from '../utils/API'

export const VideoSerivce = {
    saveURL,
    getSavedURL
};

const BASE_API_URL = "/video-registration";

function getSavedURL() {

    return API.get(`${BASE_API_URL}`);
}

function saveURL(url) {
    const params = {
        "videoUrl": url
    }

    return API.post(`${BASE_API_URL}`, params);
}
