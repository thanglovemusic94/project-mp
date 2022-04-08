import {API} from "../utils/ApiUtils";
import {CATEGORY_ROUTER} from "../constants/RouterConstant";

const CategoryService = {
    getAll,
    changeOrder,
    remove,
    register,
    update
}

function getAll() {
    return API.get(CATEGORY_ROUTER.API_CATEGORY)
}

function changeOrder(listOrder) {
    return API.put(CATEGORY_ROUTER.API_CATEGORY + "/order", listOrder)
}

function remove(id) {
    return API.delete(CATEGORY_ROUTER.API_CATEGORY + "/" + id)
}

function register(data) {
    return API.post(CATEGORY_ROUTER.API_CATEGORY, data)
}

function update(data) {
    return API.put(CATEGORY_ROUTER.API_CATEGORY + "/edit", data)
}

export default CategoryService
