import {API} from "../utils/ApiUtils";
import {POINT_ROUTER} from "../constants/RouterConstant";

const PointService = {
    getAll,
    create,
    edit,
    remove
}


function getAll(query) {
    return API.get(POINT_ROUTER.API_POINT, {
        params: query,
    })
}

function create(name) {
    return API.post(POINT_ROUTER.API_POINT, {name: name});
}

function edit(data) {
    return API.put(POINT_ROUTER.API_POINT, data);
}

function remove(id) {
    return API.delete(POINT_ROUTER.API_POINT + '/' + id);
}

export default PointService
