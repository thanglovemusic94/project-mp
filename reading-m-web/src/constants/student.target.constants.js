export const School = {
    PRIMARY: {
        value: "PRIMARY",
        label: "초등학교"
    },
    SECONDARY: {
        value: "SECONDARY",
        label: "중학교"
    },
    ELEMENTARY: {
        value: "ELEMENTARY",
        label: "초등학교"
    }
}

export const Grade = {
    G1: {
        value: "GRADE_1",
        label: "1학년"
    },
    G2: {
        value: "GRADE_2",
        label: "2학년"
    },
    G3: {
        value: "GRADE_3",
        label: "3학년"
    },
    G4: {
        value: "GRADE_4",
        label: "4학년"
    },
    G5: {
        value: "GRADE_5",
        label: "5학년"
    },
    G6: {
        value: "GRADE_6",
        label: "6학년"
    }
}

export const GRADE_MAP = {
    "GRADE_0": "G1",
    "GRADE_1": "G2",
    "GRADE_2": "G3",
    "GRADE_3": "G4",
    "GRADE_4": "G5",
    "GRADE_5": "G6"
}

export const convertSchool = function (value) {
    if (value === School.PRIMARY.value) return School.PRIMARY.label
    if (value === School.ELEMENTARY.value) return School.ELEMENTARY.label
    if (value === School.SECONDARY.value) return School.SECONDARY.label
    return value
}

export const convertGrade = function (value) {
    if (value === Grade.G1.value) return Grade.G1.label
    if (value === Grade.G2.value) return Grade.G2.label
    if (value === Grade.G3.value) return Grade.G3.label
    if (value === Grade.G4.value) return Grade.G4.label
    if (value === Grade.G5.value) return Grade.G5.label
    if (value === Grade.G6.value) return Grade.G6.label
    return value
}