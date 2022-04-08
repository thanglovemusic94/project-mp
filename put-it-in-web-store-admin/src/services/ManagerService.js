import API from "../utils/API";
import APIFile from "../utils/APIFile";

const MANAGER_REST_API_URL = "/admin/managers"

class ManagerService {

    listManager(term, page) {
        return API.get(`${MANAGER_REST_API_URL}/?page=${page.pageNumber}&size=${page.pageSize}${term != null ? "&term=" + term : ""}`)
    }


    getManager(id) {
        return API.get(`${MANAGER_REST_API_URL}/${id}`)
    }

    deleteManager(id) {
        return API.delete(`${MANAGER_REST_API_URL}/${id}`)
    }

    deleteListManager(listId) {
        return API.delete(`${MANAGER_REST_API_URL}`,{data:listId})
    }

    // createManager(manager) {
    //     return API.post(`${MANAGER_REST_API_URL}`, {manager})
    // }
    //
    // updateManager(manager)
    // {
    //     return API.patch(`${MANAGER_REST_API_URL}/${manager.managerId}`, {manager})
    // }

    saveManager(manager) {
        if (manager.managerId == null) {
            return API.post(`${MANAGER_REST_API_URL}`, manager)
        } else {
            return API.patch(`${MANAGER_REST_API_URL}/${manager.managerId}`, manager)
        }
    }

    download(term) {
        return APIFile.get(MANAGER_REST_API_URL + '/download/?term=' + term)
    }

    searchManager(term) {
        return API.get(`${MANAGER_REST_API_URL}?term=${term}`)
    }
}

export default new ManagerService()
