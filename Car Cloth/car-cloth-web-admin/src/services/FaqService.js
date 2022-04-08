import {FAQ_ROUTER} from "../constants/RouterConstant";
import {API} from "../utils/ApiUtils";

export const FaqService = {
    findAll,
    changeOrder,
    create,
    getById,
    save,
    remove
}

function findAll(query) {
    return API.get("/faqs")
}

function changeOrder(arrDataOrder) {
    return API.patch(FAQ_ROUTER.API_FAQ, arrDataOrder);
}

function create(data) {
    return API.post(FAQ_ROUTER.API_FAQ, data);
}

function getById(id) {
    return API.get(FAQ_ROUTER.API_FAQ+'/'+id);
}

function save(data, id) {
    return API.put(FAQ_ROUTER.API_FAQ+'/'+id, data);
}

function remove(id){
    return API.delete(FAQ_ROUTER.API_FAQ+'/'+id);
}
