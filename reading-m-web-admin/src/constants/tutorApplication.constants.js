

export const CLASS_CATEGORY = [
    { name: '국어 독서 논술', value: 'ESSAY' },
    { name: '영수사과', value: 'SUBJECT' },
    { name: '학교수행', value: 'SCHOOL_EXEC' },
    { name: '상담기타', value: 'CONSUL_N_OTHERS' },
]

export const CLASS_LEVEL = [
    { name: '최상', value: 'TOP' },
    { name: '중상', value: 'ADVANCED' },
    { name: '중하', value: 'INTERMEDIATE' },
    { name: '최하', value: 'LOW' },
    { name: '무관', value: 'NONE' },
]

export const WorkingPeriodType = [
    { "name": "재직중", "value": "WORKING" },
    { "name": "휴직중", "value": "LEAVING" },
    { "name": "퇴사", "value": "LEFT" }
]

export const LicenseCertPassCategory = [
    {"name": "1차 합격", "value": "First"},
    {"name": "2차 합격", "value": "Second"},
    {"name": "필기 합격", "value": "Writing"},
    {"name": "실기 합격", "value": "Practice"},
    {"name": "최종 합격", "value": "Final"}
]

export const UniversityType = [
    { "name": "대학교(4년)", "value": "Y4" },
    { "name": "대학교(6년)", "value": "Y6" }
]

export const EnrollmentPeriodStartType = [
    { "name": "입학", "value": "ADMISSION" },
    { "name": "편입", "value": "TRANSFER" }
]

export const EnrollmentPeriodEndType = [
    { "name": "졸업", "value": "GRADUATED" },
    { "name": "재학중", "value": "STUDY_UNI" },
    { "name": "휴학중", "value": "STUDY_ABOARD" },
    { "name": "수료", "value": "COMPLETED" },
    { "name": "중퇴", "value": "DROP_HALF" },
    { "name": "자퇴", "value": "DROP" },
    { "name": "졸업예정", "value": "SOON_GRADUATED" }
]

export const MajorType = [
    { "name": "주전공", "value": "MAIN" },
    { "name": "부전공", "value": "MINOR" },
    { "name": "복수전공", "value": "MULTIPLE" }
]

export function convertByType(TYPE: any, str){
    let type = TYPE.filter(value => value.value === str)
    if (type.length === 1){
        return type[0].name
    }
}


