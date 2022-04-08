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
    },
    ALL: {
        value: "",
        label: '수업 종류 전체',
    },
}

export default function checkClassType(str) {
    if (str === ClassType.TextBookClass.value) {
        return ClassType.TextBookClass.label;
    }
    if (str === ClassType.GoalClass.value) {
        return ClassType.GoalClass.label;
    }
    if (str === ClassType.DavinciClass.value) {
        return ClassType.DavinciClass.label;
    }
    return str;
}