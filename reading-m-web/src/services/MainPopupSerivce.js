import API from "utils/API"

export const MainPopupSerivce = {
    getDetail
};

const BASE_API_URL = "/main-popup";

function getDetail() {
    return API.get(BASE_API_URL)
}