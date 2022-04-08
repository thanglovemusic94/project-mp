export const Grade = {
    GRADE_0: { value: 'GRADE_0', label: '7세' },
    GRADE_1: { value: 'GRADE_1', label: '1학년' },
    GRADE_2: { value: 'GRADE_2', label: '2학년' },
    GRADE_3: { value: 'GRADE_3', label: '3학년' },
    GRADE_4: { value: 'GRADE_4', label: '4학년' },
    GRADE_5: { value: 'GRADE_5', label: '5학년' },
    GRADE_6: { value: 'GRADE_6', label: '6학년' }
}

export const School = {
    ELEMENTARY: { value: 'ELEMENTARY', label: '초등학교' },
    SECONDARY: { value: 'SECONDARY', label: '중학교' }
}

export function convertGrade(str) {
    if (str === Grade.GRADE_0.value) {
        return Grade.GRADE_0.label
    }

    if (str === Grade.GRADE_1.value) {
        return Grade.GRADE_1.label
    }

    if (str === Grade.GRADE_2.value) {
        return Grade.GRADE_2.label
    }

    if (str === Grade.GRADE_3.value) {
        return Grade.GRADE_3.label
    }

    if (str === Grade.GRADE_4.value) {
        return Grade.GRADE_4.label
    }

    if (str === Grade.GRADE_5.value) {
        return Grade.GRADE_5.label
    }

    if (str === Grade.GRADE_6.value) {
        return Grade.GRADE_6.label
    }

    return str;
}

export function convertSchool(str) {
    if (str === School.ELEMENTARY.value) {
        return School.ELEMENTARY.label
    }

    if (str === School.SECONDARY.value) {
        return School.SECONDARY.label
    }

    return str;
}