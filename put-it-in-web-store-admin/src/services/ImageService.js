import API from "../utils/API";

const REST_API_URL = "/image"

class ImageService {

    listData() {
        return API.get(`${REST_API_URL}/pictogram`)
    }
}

export default new ImageService()