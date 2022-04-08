import API from '../utils/API'

export const SettlementService = {
    getTutorSettlement,
    getTutorSettlementDetails,
}

const BASE_API_URL = '/settlement'

function getTutorSettlement(pageable) {
    const { size, page } = pageable;

    return API.get(`${BASE_API_URL}/byTutor?page=${ page }&size=${ size }`);
}

function getTutorSettlementDetails(id) {

    return API.get(`${BASE_API_URL}/detail/${ id }`);
}
