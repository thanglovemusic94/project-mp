import API from '../utils/API'

export const UserService = {
    getClassesByUserId,
    displayAddressDetails,
    displayConsentEmailSms,
}

const USER_BASE_API_URL = '/users'

function getClassesByUserId(userId, classType, pageable) {
    const params = { ...pageable, classType }
    return API.get(`${USER_BASE_API_URL}/${userId}/classes`, { params })
}

function displayAddressDetails({ addressDetail, roadName }) {
    return `${addressDetail}, ${roadName}`
}

function displayConsentEmailSms({ receivedEmail, receivedSms }) {
    const consentPhrase = '동의'
    const not = '미'

    let dispRes = ''
    if (receivedEmail !== undefined) {
        dispRes += `이메일 수신 ${receivedEmail ? '' : not}${consentPhrase}`
    }

    if (receivedSms !== undefined) {
        if (dispRes !== '') dispRes += ' / '

        dispRes += `SMS 수신 ${receivedSms ? '' : not}${consentPhrase}`
    }

    return dispRes
}
