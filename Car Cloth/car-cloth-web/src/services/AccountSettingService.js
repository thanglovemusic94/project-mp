import {API} from "../utils/ApiUtils";

const AccountSettingService = {
    getAccountInfo,
    withdraw
}

function getAccountInfo() {
    return API.get('/my-page/setting/account')
}


function withdraw() {
    return API.delete('/my-page/setting/withdraw')
}

export default AccountSettingService
