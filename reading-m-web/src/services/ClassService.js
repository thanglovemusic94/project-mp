import API from '../utils/API'

export const ClassService = {
    openLiveClass,
    updateLiveClass,
    getClassDetails,
    search,
    getLiveClassBookDetails,
    getLiveClassGoalDetails,
    getLiveClassTutorOverview,
    getDavinciClass,
    getDavinciClassDetail,
    getCurriculumListRAMS,
    getCurriculumBooksRAMS,
    getLiveBookCurriculums,
    getLiveBookCurriculum,
    getFullClassDetails,
    getLiveClassZoomURL,
    getLiveGoalCurriculum,
    getLiveGoalCurriculums,
    isDavinciClassExpired,
    getDaVinciCourses,
    changeStatus,
    getLiveClassActivities,
    updateFullClassDetails,
    addAttachedFile,
    deleteAttachedFile
}

const BASE_API_BASE_URL = '/classes'

function openLiveClass(params) {

    return API.post(`${BASE_API_BASE_URL}`, params)
}

function updateLiveClass(id, params) {

    return API.patch(`${BASE_API_BASE_URL}/${id}`, params);
}

function getClassDetails(id) {

    return API.get(`${BASE_API_BASE_URL}/${id}`)
}

function search(params) {
    const { classType, ...filter } = params
    const filterParams = Object.entries(filter).map((item, index) => { return `&${item[0]}=${item[1]}` }).join("")

    return API.get(`${BASE_API_BASE_URL}/search?classType=${classType}${filterParams}`)
}

function getLiveClassBookDetails(params) {

    const { id, ...filter } = params
    const filterParams = Object.entries(filter).map((item, index) => { return `&${item[0]}=${item[1]}` }).join("")

    return API.get(`${BASE_API_BASE_URL}/getLiveTextBook/byTutor?tutorId=${id}${filterParams}`)
}

function getLiveClassGoalDetails(liveClassId) {

    return API.get(`${BASE_API_BASE_URL}/getLiveGoalDetails/${liveClassId}`)
}

function getLiveClassTutorOverview(liveClassId) {

    return API.get(`${BASE_API_BASE_URL}/getTutorDetails/${liveClassId}`)
}

function getDavinciClass(pageable) {

    const params = { ...pageable }
    return API.get("/davincies", { params })
}

function getDavinciClassDetail(classId) {
    return API.get("/davincies/" + classId)
}

function getCurriculumListRAMS(params) {
    let paramsString = "";

    Object.entries(params).map((item, index) => {

        if (item[1] !== "ALL")
            paramsString += `&${item[0]}=${item[1]}`;
    })

    let requestUrl = "";

    if (paramsString !== "") {
        requestUrl = `${BASE_API_BASE_URL}/textbook/curriculum?${paramsString}`
    } else {
        requestUrl = `${BASE_API_BASE_URL}/textbook/curriculum`
    }

    return API.get(requestUrl);
}

function getCurriculumBooksRAMS(cIdx) {

    return API.get(`${BASE_API_BASE_URL}/textbook/curriculumBooks/${cIdx}`)

}

function getFullClassDetails(id) {

    return API.get(`${BASE_API_BASE_URL}/view-full/${id}`);
}

function updateFullClassDetails(id, curriculumIndex, attachmentData, commonAttachFiles, notification) {
    let body = {
        "attachedFiles": [...attachmentData],
        commonAttachFiles,
        curriculumIndex,
        notification
    }

    return API.patch(`${BASE_API_BASE_URL}/view-full/${id}`, body);
}

function getLiveClassZoomURL(id) {

    return API.get(`${BASE_API_BASE_URL}/join/${id}`, {
        responseType: 'text'
    });
}

function getLiveBookCurriculums(classId, childId) {

    return API.get(`${BASE_API_BASE_URL}/getLiveBookCurriculums/${classId}`, {
        params: {
            studentId: childId
        }
    })
}

function getLiveGoalCurriculums(classId, childId) {

    return API.get(`${BASE_API_BASE_URL}/getLiveGoalCurriculums/${classId}`, {
        params: {
            studentId: childId
        }
    })
}

function getLiveGoalCurriculum(classId, curriculumIndex) {

    return API.get(`${BASE_API_BASE_URL}/getLiveGoalCurriculum/${classId}/${curriculumIndex}`)
}

function isDavinciClassExpired(classId, childId) {

    return API.get(`${BASE_API_BASE_URL}/daVinciClass/isExpired/${classId}`,
        {
            params: {
                childId: childId
            }
        }
    )
}

function getDaVinciCourses(classId, childId, pageable) {

    const params = { ...pageable, childId }

    return API.get(`${BASE_API_BASE_URL}/daVinciCourses/${classId}`, { params })
}

function changeStatus(classId, courseIndex, status) {

    return API.put(`${BASE_API_BASE_URL}/daVinciCourses/${classId}/enrollment/${courseIndex}?status=${status}`)
}

function getLiveClassActivities(pageable) {
    const { page, size } = pageable;

    return API.get(`${BASE_API_BASE_URL}/textbook/activities?page=${page}&size=${size}`);
}

function getLiveBookCurriculum(params) {
    const { classId, curriculumIndex } = params
    return API.get(`${BASE_API_BASE_URL}/getLiveBookCurriculum/${classId}/${curriculumIndex}`, { params })
}

function addAttachedFile(classId, curriculumIndex, fileName) {

    return API.post(`${BASE_API_BASE_URL}/live-class/${classId}/${curriculumIndex}/attachedFile?fileName=${fileName}`);
}

function deleteAttachedFile(classId, curriculumIndex, file) {

    return API.delete(`${BASE_API_BASE_URL}/live-class/${classId}/${curriculumIndex}/attachedFile`, { data: file });
}
