import {API} from "../utils/ApiUtils";
import {NOTIFICATION_ROUTER} from "../constants/RouterConstant";

export const NoticeService = {
    findByQuery,
    create,
    getById,
    save,
    remove
}

function findByQuery(query) {
    return API.get(NOTIFICATION_ROUTER.API_NOTICE, {
        params: query
    })
}

function create(data) {
    return API.post(NOTIFICATION_ROUTER.API_NOTICE, data);
}

function getById(id) {
    return API.get(NOTIFICATION_ROUTER.API_NOTICE+'/'+id);
}

function save(data, id) {
    return API.put(NOTIFICATION_ROUTER.API_NOTICE+'/'+id, data);
}

function remove(id){
    return API.delete(NOTIFICATION_ROUTER.API_NOTICE+'/'+id);
}
