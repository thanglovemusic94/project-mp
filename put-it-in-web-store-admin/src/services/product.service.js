import API from "../utils/API";
import APIFile from "../utils/APIFile";

export const ProductService = {
    search,
    deleteAll,
    download,
    detail,
    create,
    update
}

const BASE_URL = "/admin/product"

function search(filter, page) {
    return API.get(BASE_URL + '/searchProduct/?term=' + filter.term
        + '&page=' + page.pageNumber
        + '&size=' + page.pageSize)
}

function detail(id) {
    return API.get(BASE_URL + '/' + id)
}

function deleteAll(ids) {
    return API.delete(BASE_URL + "/", {
        headers:{"Content-type" :"application/json"}, data:ids
    })
}

function download(filter) {
    return APIFile.get(BASE_URL + '/download/?term=' + filter.term)
}

function create(data) {
    console.log(JSON.stringify(data))
    return API.post(BASE_URL, data)
}

function update(id, data) {
    return API.patch(BASE_URL + '/' + id, data)
}