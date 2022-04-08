import { API } from "../utils/ApiUtils"

const SmsService = {
    reqVerifyPhoneCode,
    verifyPhoneCode
}

function reqVerifyPhoneCode(phoneNo){
    return API.get('/auth/request-to-verify', {
        params: {
            phoneNo: phoneNo
        }
    })
}

function verifyPhoneCode(data){
    return API.post('/auth/verify-code', data)
}

export default SmsService