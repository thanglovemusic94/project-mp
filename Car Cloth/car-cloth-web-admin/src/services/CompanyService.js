import {API} from '../utils/ApiUtils';

const CompanyService = {
    getCompanies,
    getCompany,
    getCompanyRegistrationApplications,
    getCompanyRegistrationApplication,
    approveApplication,
    rejectApplication
}

const BASE_URL = '/admin/company';

function getCompanies(paging, filter) {
    let paramsObj = {
        ...paging,
        ...filter
    }

    return API.get(BASE_URL+"/", {
        params: paramsObj
    });
}

function getCompany(id) {

    return API.get(`${BASE_URL}/${id}`);
}

function getCompanyRegistrationApplications(paging, filter) {
    let paramsObj = {
        ...paging,
        ...filter
    };

    return API.get(`${BASE_URL}/applicant`, {
        params: paramsObj
    });
}

function getCompanyRegistrationApplication(id) {

    return API.get(`${BASE_URL}/applicant/${id}`);
}

function approveApplication(id) {

    return API.put(`${BASE_URL}/${id}/process`, {action: "APPROVE"});
}

function rejectApplication(id, rejectingReason) {

    return API.put(`${BASE_URL}/${id}/process`, {action: "REJECT", reason: rejectingReason});
}

export default CompanyService;
