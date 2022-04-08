import { UserStorage } from 'storages/UserStorage'
import API from '../utils/API'

export const LoginService = {
    login,
    logout,
    logoutBrowser,
    signUp,
    isMemberIdExisted,
    isEmailExisted,
    getPhoneVerificationNumber,
    confirmPhoneVerificationNumber,
    findMemberId,
    resetPassword,
    changePassword,
    getUserDetail,
    getProfile,
    changeProfile,
    verifyEmails
}

const BASE_CLASS_API_URL = '/users'
const queryString = require('query-string')

function login(data) {
    return API.post(`${BASE_CLASS_API_URL}/authenticate`, data)
}

function logoutBrowser() {
    UserStorage.delAccessToken()
    UserStorage.delRefreshToken()
    UserStorage.delUserLocal()
}

function logout() {
    logoutBrowser()
    return API.post(`${BASE_CLASS_API_URL}/logout`)
}

function isMemberIdExisted(id) {
    return API.get(`${BASE_CLASS_API_URL}/search/existsMemberId?memberId=${id}`)
}

function isEmailExisted(email) {
    let params = {
        emails: email
    }
    return API.get(`${BASE_CLASS_API_URL}/verify/emails` , {
        params: params,
        paramsSerializer: (params) => queryString.stringify(params),
    })
}

function signUp(data) {
    return API.post(`${BASE_CLASS_API_URL}`, data)
}

function getPhoneVerificationNumber(phoneNumber) {
    return API.get(
        `${BASE_CLASS_API_URL}/verify/phone?phoneNo=${phoneNumber}`,
        {
            responseType: 'text',
        }
    )
}

function confirmPhoneVerificationNumber(data) {
    return API.post(`${BASE_CLASS_API_URL}/verify/phone`, data)
}

function findMemberId(data) {
    let requestConfig = {
        responseType: 'text',
    }

    return API.get(
        `${BASE_CLASS_API_URL}/search/memberId?name=${data.name}&phoneNo=${data.phone}`,
        requestConfig
    )
}

function resetPassword(data) {
    return API.patch(`${BASE_CLASS_API_URL}/resetPassword`, data)
}

function changePassword(currentPassword, newPassword) {
    return API.patch(
        `${BASE_CLASS_API_URL}/changePassword`,
        {},
        {
            params: {
                currentPassword: currentPassword,
                newPassword: newPassword,
            },
        }
    )
}

function getProfile() {
    return API.get(`${BASE_CLASS_API_URL}/profile`)
}

function changeProfile(data) {
    return API.patch(`${BASE_CLASS_API_URL}/profile`, data)
}

function getUserDetail(id) {
    return API.get(`${BASE_CLASS_API_URL}/${id}`)
}

function verifyEmails(emails) {
    let params = "";

    for (let i = 0; i < emails.length; i++) {
        const prefix = i === 0 ? "?" : "&";

        params += `${prefix}emails=${emails[i]}`
    }

    return API.get(`${BASE_CLASS_API_URL}/verify/emails${params}`)
}
