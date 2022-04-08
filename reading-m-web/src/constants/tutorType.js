import {InquiryStatus} from "./inquiry.status.containts";

export const TutorType = {
    LIVE_BOOK_TEXT : 'LIVE_BOOK_TEXT',
    LIVE_GOAL: 'LIVE_GOAL',
    ALL: 'ALL'
}

export const Gender = [
    { label: '남자', value: 'MALE' },
    { label: '여자', value: 'FEMALE' },
]

export function convertGenderStatus(value) {
    if (value === 'MALE') {
        return '남자'
    } return '여자'
}
