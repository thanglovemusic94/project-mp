import { API } from "../utils/ApiUtils";

const NoticeSettingService = {
    getNoticeSettings,
    setNoticeSettings,
    getTerm,
    getPrivacy,
    getAccountInfo,
}

const baseUrl = '/my-page/setting'

function getNoticeSettings() {
    return API.get("/my-page/setting/notice")
}

function setNoticeSettings(settings) {
    return API.put("/my-page/setting/notice", settings)
}

function getTerm() {
    return API.get(baseUrl + "/term-of-use")
}

function getPrivacy() {
    return API.get(baseUrl + "/privacy-policy")
}

function getAccountInfo() {
    return API.get(baseUrl + "/account")
}

export default NoticeSettingService
