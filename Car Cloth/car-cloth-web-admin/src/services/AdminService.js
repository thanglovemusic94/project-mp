import {API} from "../utils/ApiUtils";
import {ADMIN_ACCOUNT_ROUTER} from "../constants/RouterConstant";

const AdminService = {
    changePassWord,
    getPassword
}

function changePassWord(data) {
    return API.patch(ADMIN_ACCOUNT_ROUTER.API_ADMIN_CHANGE_PASS, data)
}

function getPassword() {
    return API.get(ADMIN_ACCOUNT_ROUTER.API_ADMIN_CHANGE_PASS)
}

export default AdminService
