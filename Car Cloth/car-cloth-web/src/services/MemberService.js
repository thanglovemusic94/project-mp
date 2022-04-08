import {API} from "../utils/ApiUtils";

const MemberService = {
    getMemberInfo,
    logout
}

const baseUrl = '/my-page'

function getMemberInfo() {
    return  API.get(baseUrl + '/member-info')
}

function logout() {
    return API.delete(baseUrl + '/logout');
}

export default MemberService
