import API from "../utils/API";
import APIFile from "../utils/APIFile";

const COMPANY_REST_API_URL = "/admin/companies"

class CompanyService {

    listCompany(term, page) {
        return API.get(`${COMPANY_REST_API_URL}/?page=${page.pageNumber}&size=${page.pageSize}${term != null ? "&term=" + term : ""}`)
    }


    getCompany(id) {
        return API.get(`${COMPANY_REST_API_URL}/${id}`)
    }

    deleteCompany(id) {
        return API.delete(`${COMPANY_REST_API_URL}/${id}`)
    }


    deleteListCompany(listId) {
        return API.delete(`${COMPANY_REST_API_URL}`, { data: listId })
    }

    saveCompany(company) {
        if (company.id == null) {
            return API.post(`${COMPANY_REST_API_URL}`, company)
        } else {
            return API.patch(`${COMPANY_REST_API_URL}/${company.id}`, company)
        }
    }

     searchBrand(term) {
        return API.get(`${COMPANY_REST_API_URL}/searchBrand?term=${term}`)
    }

    fetchBranches(id) {
        return API.get(`${COMPANY_REST_API_URL}/${id}/branches`)
    }
    
    download(term) {
        return APIFile.get(COMPANY_REST_API_URL + '/download/?term=' + term)
    }
}

export default new CompanyService()