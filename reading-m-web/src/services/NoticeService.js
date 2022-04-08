import API from '../utils/API'

export const NoticeService = {
    findByQuery,
    getDetailsById,
}

const NOTICE_API_BASE_URL = '/notices'

function findByQuery(pageable) {
    return API.get(`${NOTICE_API_BASE_URL}/byRole`, { params: pageable })
}

function getDetailsById(noticeId) {
    return API.get(`${NOTICE_API_BASE_URL}/${noticeId}`)
}
