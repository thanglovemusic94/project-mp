import API from "../utils/API";
import APIFile from "../utils/APIFile";

const BRANCH_REST_API_URL = "/admin/branches"

class BranchService {

    listBranch(term, page) {
        return API.get(`${BRANCH_REST_API_URL}/?page=${page.pageNumber}&size=${page.pageSize}${term != null ? "&term=" + term : ""}`)
    }

    getBranch(id) {
        return API.get(`${BRANCH_REST_API_URL}/${id}`)
    }

    deleteBranch(id) {
        return API.delete(`${BRANCH_REST_API_URL}/${id}`)
    }

    deleteListBranch(listId) {
        return API.delete(`${BRANCH_REST_API_URL}`, {data:listId})
    }

    saveBranch(branch) {
        if (branch.id == null) {
            return API.post(`${BRANCH_REST_API_URL}`, branch)
        } else {
            return API.patch(`${BRANCH_REST_API_URL}/${branch.id}`, branch)
        }
    }

    download(term) {
        return APIFile.get(BRANCH_REST_API_URL + '/download/?term=' + term)
    }
}

export default new BranchService()
