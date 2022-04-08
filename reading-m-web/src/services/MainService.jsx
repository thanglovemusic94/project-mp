import API from "../utils/API";

export const MainService = {
  getAllBanner,
  getAllMagazine,
  getMagazineDetail,
  getTutorsOfMonth
}

function getAllBanner() {
  return API.get(`/web/banner`)
}

function getAllMagazine(params) {
  return API.get(`/web/magazine`, {params})
}

function getMagazineDetail(id) {
  return API.get(`/web/magazine/${id}`)
}

function getTutorsOfMonth() {
  return API.get("/web/tutor-of-month")
}


