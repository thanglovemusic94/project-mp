import {API} from "../utils/ApiUtils";

const ChatService = {
    getTokenFirebase,
    checkAvailable,
    getPresignedUrl,
    getConfig,
    setupConfig,
    pushNotice,
    getNameInfo,
    getUrlByObjectKey
}

const baseUrl = '/chat'

function getTokenFirebase() {
    return API.get(`${baseUrl}/token`)
}

function checkAvailable(channelId) {
    return API.get(`${baseUrl}/${channelId}/check-available`)
}

function getPresignedUrl(channelId) {
    return API.get(`${baseUrl}/presigned-url/${channelId}`)
}

function getConfig(channelId) {
    return API.get(`${baseUrl}/config/${channelId}`)
}

function setupConfig(data, channelId) {
    return API.put(`${baseUrl}/config/${channelId}`, data)
}

function pushNotice(channelId, isFirstMess) {
    return API.post(`${baseUrl}/${channelId}/push-notice`, {firstMess: isFirstMess})
}

function getNameInfo(channelId) {
    return API.get(`${baseUrl}/${channelId}/name-info-chat`)
}

function getUrlByObjectKey(objectKey) {
    return API.get(`${baseUrl}/get-url-by-object-key?objectKey=${objectKey}`)
}

export default ChatService
