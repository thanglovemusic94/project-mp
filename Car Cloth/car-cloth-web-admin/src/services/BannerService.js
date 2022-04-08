import {API} from "../utils/ApiUtils";
import {BANNER_ROUTER} from "../constants/RouterConstant";

const BannerService = {
    list,
    upload
}

function list() {
    return API.get(BANNER_ROUTER.API_BANNER)
}

function upload(data) {
    return API.patch(BANNER_ROUTER.API_BANNER, data)
}

export default BannerService
