import { API } from "../utils/ApiUtils";

const CompanyService = {
    companyExtenSion,
    getCompanyInfo,
    register,
    getSaleTotalAmount,
    getSaleInfo,
    getHistoryRegister,
    cancelRegister,
    reApply,
    updateCompanyInfor,
    withdraw,
    getCompanyNotification
}

const baseUrl = '/company'

function companyExtenSion(){
    return API.put(`${baseUrl}/extension`)
}

function getCompanyInfo(id) {
    return API.get(`${baseUrl}/` + id)
}

function register(data) {
    return API.post('company/register', data)
}

function getHistoryRegister() {
    return API.get(`${baseUrl}/register/history`)
}

function cancelRegister() {
    return API.put(`${baseUrl}/register/cancel`)
}

function reApply(data) {
    return API.put(`${baseUrl}/register/re-apply`, data)
}

function getSaleInfo(startDate, endDate, page, size, sort) {
    return API.get(`${baseUrl}/sales/info?start=${startDate}&end=${endDate}&page=${page}&size=${size}&sort=${sort}`)
}

function getSaleTotalAmount(startDate, endDate) {
    return API.get(`${baseUrl}/sales/total?start=${startDate}&end=${endDate}`)
}

function getCompanyNotification(params) {
    return API.get(`${baseUrl}/notification`, {
        params: params
    })
}

function updateCompanyInfor(data) {
    return API.put(`${baseUrl}/update`, data)
}

function withdraw() {
    return API.delete(`${baseUrl}/withdraw`)
}

export default CompanyService;
