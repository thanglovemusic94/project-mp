import { API } from "../utils/ApiUtils";

const ProductInfoService = {
    getAllCategory,
    getAllBrandByCategoryId,
    getBrandDetail,
    getBrands,
    getModelByBrandId,
    getModelDetailById,
    getModelByName,
    registerCar
}

function getAllCategory() {
    return API.get('car/category')
}

function getAllBrandByCategoryId(pageable, categoryId) {
    return API.get('car/' + categoryId + '/brand', { params: pageable })
}

function getBrands(pageNumber, pageSize, sortPropertyName, sortOrder) {
    return API.get(`car/brand?page=${pageNumber}&size=${pageSize}&sort=${sortPropertyName},${sortOrder}`);
}

function getBrandDetail(id) {
    return API.get('car/brand/' + id)
}

function getModelByBrandId(id, pageNumber, pageSize) {
    return API.get(`car/${id}/model?page=${pageNumber}&size=${pageSize}`);
}

function getModelDetailById(id, pageNumber, pageSize) {
    return API.get(`car/${id}/detail-model?page=${pageNumber}&size=${pageSize}`);
}

function getModelByName(searchText, pageNumber, pageSize) {
    return API.get(`car/model?page=${pageNumber}&size=${pageSize}&term=${searchText}`);
}

function registerCar(carNumber, carTypeId) {
    const body = {
        carNumber,
        carTypeId
    };

    return API.post(`car/my-car`, body);
}

export default ProductInfoService
