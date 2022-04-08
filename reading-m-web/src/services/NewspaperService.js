import API from '../utils/API'

export const NewspaperService = {
    getNewspapers,
    getNewspapersWithFilter,
    getNewspaper,
    getByCurriculum
};

const BASE_URL = "/new-paper";

function getNewspapers(pageable) {
    const { page, size } = pageable;

    return API.get(`${ BASE_URL }?page=${page}&size=${size}`);
}

function getNewspapersWithFilter(pageable, filter) {
    const { page, size } = pageable;

    let filterParams = ""

    for (const [key, value] of Object.entries(filter)) {
        
        // Hard-coded Korean here, need to change later
        if (value !== "" && value !== "전체") {
            filterParams += `&${key}=${value}`
        }
    }

    return API.get(`${ BASE_URL }?page=${page}&size=${size}${filterParams}`);
}

function getNewspaper(id) {
    return API.get(`${ BASE_URL }/${id}`);
}

function getByCurriculum(classId, studentId, curriculumIndex) {
    return API.get(`${BASE_URL}/by-curriculum`, {
        params: {
            classId: classId,
            studentId: studentId,
            curriculumIndex: curriculumIndex
        }
    })
}