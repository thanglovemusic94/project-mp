import {API} from "../utils/ApiUtils";

const ConstructionService = {
    register,
    getList,
    getDetail,
    edit
}
const baseUrl = '/construction-example'

function register(data) {
    return API.post(baseUrl, data)
}

function getList(params) {
    return API.get(baseUrl, {params: params})
}

function getDetail(id) {
    return API.get(baseUrl+"/"+id)
}

function edit(id, data) {
    return API.patch(baseUrl+"/"+id, data)
}

export default ConstructionService
