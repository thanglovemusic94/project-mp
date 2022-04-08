import {API} from '../utils/ApiUtils'
import {MEMBERS_ROUTER} from "../constants/RouterConstant";
import {stringify} from "../utils/QueryUtil";

export const MemberService = {
    getMembers,
    getMember,
    edit,
    forceWithdraw
}

function getMembers(query) {
    return API.get(MEMBERS_ROUTER.API_MEMBER, {
        params: query,
        paramsSerializer: query => stringify(query)
    });
}

function getMember(id) {
    return API.get(MEMBERS_ROUTER.API_MEMBER + "/" + id, {
        params: {
            id: id
        }
    });
}

function edit(data, id) {
    return API.patch(MEMBERS_ROUTER.API_MEMBER + "/" + id, data);
}

function forceWithdraw(id) {
    return API.delete(MEMBERS_ROUTER.API_MEMBER + "/" + id, {
        params: {
            id: id
        }
    });
}
