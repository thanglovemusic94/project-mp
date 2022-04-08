import { API } from "../utils/ApiUtils";

export const MainPageService = {
    getInfo
}

const BASE_URL = "/main-home";

function getInfo() {

    return API.get(BASE_URL);
}