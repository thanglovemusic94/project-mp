export const GenderType = {
    MALE: {
        value: "MALE",
        label: "남자"
    },
    FEMALE: {
        value: "FEMALE",
        label: "여자"
    },
}

export function convertGenderType(str) {
    if (str === GenderType.MALE.value) {
        return GenderType.MALE.label;
    } else if (str === GenderType.FEMALE.value) {
        return GenderType.FEMALE.label;
    }  else {
        return str;
    }
}