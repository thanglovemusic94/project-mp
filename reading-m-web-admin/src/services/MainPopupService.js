import API from '../utils/API'

export const MainPopupSerivce = {
    registerPopup,
    getDetail
};

const BASE_API_URL = "/main-popup";

function registerPopup(data) {
    return API.post(`${BASE_API_URL}`, data)
}

function getDetail() {
    return API.get(BASE_API_URL)
}