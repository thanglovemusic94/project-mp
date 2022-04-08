import {CART_TYPE_ROUTER} from "../constants/RouterConstant";
import {API} from "../utils/ApiUtils";

const CarTypeService = {
    findAll,
    findById,
    create,
    update,
    remove,
    getAllBrand,
    getAllModelByBrandId,
    getAllCarTypeByModelId,
    register,
}

function findAll(query, search) {
    const queryNew = {...query, ...search}
    return API.get(CART_TYPE_ROUTER.API_CAR_TYPE,
        {
            params: queryNew,
        })
}

function findById(id) {
    return API.get("/admin/car/" + id + "/car-type")
}

function update(data) {
    return API.put(CART_TYPE_ROUTER.API_CAR_TYPE, data)
}

function register(data) {
    const formData = new FormData();
    formData.append('file',data)
    const config = {
        headers: {
            'content-type': 'application/vnd.ms-excel'
        }
    }

    return API.post(CART_TYPE_ROUTER.API_CAR_TYPE, formData, config)
}

function create(data) {
    return API.put(CART_TYPE_ROUTER.API_CAR_TYPE, data)
}

function remove(id) {
    return API.delete(CART_TYPE_ROUTER.API_CAR_TYPE + "/" + id)
}

function getAllBrand() {
    return API.get("/admin/car/brand/list")
}

function getAllModelByBrandId(id) {
    return API.get("/admin/car/" + id + "/model")
}

function getAllCarTypeByModelId(id) {
    return API.get("/admin/car/" + id + "/car-type")
}

export default CarTypeService
