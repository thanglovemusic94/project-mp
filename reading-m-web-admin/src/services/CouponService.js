import API from "../utils/API";

export const CouponService = {
    getCoupons,
    createCoupon,
    getCoupon,
    deleteCoupon,
    updateCoupon
}

const BASE_CLASS_API_URL = "/admin/coupon"

function getCoupons(pageable) {
    //exclude sort object, as param conversion does not work
    const {sort, ...params} = pageable;
    return API.get(`${BASE_CLASS_API_URL}`, {params});
}

function createCoupon(data) {
    return API.post(`${BASE_CLASS_API_URL}`, data);
}

function getCoupon(id) {
    return API.get(`${BASE_CLASS_API_URL}/${id}`);
}

function deleteCoupon(ids) {
    let deleteParams = ""

    for (let i = 0; i < ids.length; i++) {
        deleteParams += `ids=${ids[i]}`

        if (i + 1 < ids.length) deleteParams += "&"
    }

    return API.delete(`${BASE_CLASS_API_URL}?${deleteParams}`);
}

function updateCoupon(data) {
    return API.patch(`${BASE_CLASS_API_URL}/${data.id}`, data);
}