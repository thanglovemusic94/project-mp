import { school } from "./school.contains"

export const LiveClassType = {
    TextBookClass: {
        value: 'TextBookClass',
        label: 'LiveClass 책글',
    },
    GoalClass: {
        value: 'GoalClass',
        label: 'LiveClass 목적',
    },
    DavinciClass: {
        value: 'DavinciClass',
        label: '과학수학 다빈치',
    },
    LiveClassBook: {
        value: 'LIVE_BOOK',
        label: 'LiveClass 책글',
    },
    LiveClassGoal: {
        value: 'LIVE_GOAL',
        label: 'LiveClass 목적',
    },
    Mathematics: {
        value: 'MATHEMATICS',
        label: '과학수학 다빈치'
    }
}

export const SCHOOL_STAGE = {
    ELEMENTARY: school[0],
    SECONDARY: school[1],
    HIGH: school[2]
}

export const SCHOOL_GRADE = {
    G1: { stage: SCHOOL_STAGE.ELEMENTARY, label: "1학년", value: 1 },
    G2: { stage: SCHOOL_STAGE.ELEMENTARY, label: "2학년", value: 2 },
    G3: { stage: SCHOOL_STAGE.ELEMENTARY, label: "3학년", value: 3 },
    G4: { stage: SCHOOL_STAGE.ELEMENTARY, label: "4학년", value: 4 },
    G5: { stage: SCHOOL_STAGE.ELEMENTARY, label: "5학년", value: 5 },
    G6: { stage: SCHOOL_STAGE.ELEMENTARY, label: "6학년", value: 6 },
    G7: { stage: SCHOOL_STAGE.SECONDARY, label: "1학년", value: 1 },
    G8: { stage: SCHOOL_STAGE.SECONDARY, label: "2학년", value: 2 },
    G9: { stage: SCHOOL_STAGE.SECONDARY, label: "3학년", value: 3 }
}

export const GRADE_RANGE_SELECTIONS = [
    { name: '전체', value: 'ALL' },
    { name: '초등학교 1~3학년', value: 'ONE_TO_THREE' },
    { name: '초등학교 4~6학년', value: 'FOUR_TO_SIX' },
    { name: '중학교 1~3학년', value: 'SEVEN_TO_NINE' }
]

export const SUBJECT_SELECTIONS = [
    { name: '전체', value: '' },
    { name: '국어독서논술', value: 'ESSAY' },
    { name: '영수사과', value: 'SUBJECT' },
    { name: '학교수행', value: 'SCHOOL_EXEC' },
    { name: '상담기타', value: 'CONSUL_N_OTHERS' }
]

export const APPLICATION_CATEGORYS = [
    { name: '카테고리 선택', value: '' },
    { name: '국어독서논술', value: 'ESSAY' },
    { name: '영수사과', value: 'SUBJECT' },
    { name: '학교수행', value: 'SCHOOL_EXEC' },
    { name: '상담기타', value: 'CONSUL_N_OTHERS' }
]

export const SCHOOL_STAGE_SELECTION = [
    { label: '전체', value: 'ALL' },
    { label: '초등학교', value: 'ELEMENTARY' },
    { label: '중학교', value: 'SECONDARY' }
]

export const GRADE_SELECTION = [
    { label: '전체', value: 'ALL' },
    { label: '1학년', value: 'GRADE_0' },
    { label: '2학년', value: 'GRADE_1' },
    { label: '3학년', value: 'GRADE_2' },
    { label: '4학년', value: 'GRADE_3' },
    { label: '5학년', value: 'GRADE_4' },
    { label: '6학년', value: 'GRADE_5' }
]

export const GRADE_SECONDARY = [
    { label: '전체', value: 'ALL' },
    { label: '1학년', value: 'GRADE_0' },
    { label: '2학년', value: 'GRADE_1' },
    { label: '3학년', value: 'GRADE_2' }
]

export const ClassType = {
    TextBookClass: {
        value: 'TextBookClass',
        label: 'LiveClass 책글',
    },
    GoalClass: {
        value: 'GoalClass',
        label: 'LiveClass 목적',
    },
    DavinciClass: {
        value: 'DavinciClass',
        label: '과학수학 다빈치',
    }
}

export function convertClassType(str) {
    if (str === ClassType.TextBookClass.value) {
        return ClassType.TextBookClass.label
    }

    if (str === ClassType.GoalClass.value) {
        return ClassType.GoalClass.label
    }

    if (str === ClassType.DavinciClass.value) {
        return ClassType.DavinciClass.label
    }

    return str;
}

export function convertCategory(str) {
    let item = SUBJECT_SELECTIONS.filter(i => i.value === str);
    return item[0].name;
}

export default function checkClassType(str) {
    if (str === LiveClassType.TextBookClass.value) {
        return LiveClassType.TextBookClass.label;
    }
    if (str === LiveClassType.GoalClass.value) {
        return LiveClassType.GoalClass.label;
    }
    if (str === LiveClassType.DavinciClass.value) {
        return LiveClassType.DavinciClass.label;
    }
    return str;
}


