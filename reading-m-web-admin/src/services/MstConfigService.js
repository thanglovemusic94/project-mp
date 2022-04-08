import API from '../utils/API'

export const MstConfigSerivce = {
    getByKey,
    updateConfigByKey
};

const BASE_MST_CONFIG_API_URL = "/admin/mstConfig";

function getByKey(key) {
    return API.get(BASE_MST_CONFIG_API_URL, {
        params: {
            key: key
        },
        responseType: 'text'
    });
}

function updateConfigByKey(key, value) {
    return API.patch(BASE_MST_CONFIG_API_URL, {}, {
        params: {
            key: key,
            value: value
        }
    })
}
