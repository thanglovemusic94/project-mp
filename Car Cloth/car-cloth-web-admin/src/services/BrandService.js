import {BRAND_ROUTER} from "../constants/RouterConstant";
import {API} from "../utils/ApiUtils";

const BrandService = {
    findAll,
    register,
    update,
    remove
}

function findAll(query, search) {
    const queryNew = {...query, ...search}
    return API.get(BRAND_ROUTER.API_BRAND, {
            params: queryNew,
        }
    )
}

function register(data) {
    return API.post(BRAND_ROUTER.API_BRAND, data)
}

function update(data) {
    return API.put(BRAND_ROUTER.API_BRAND, data)
}

function remove(id) {
    return API.delete(BRAND_ROUTER.API_BRAND + "/" + id)
}


export default BrandService
