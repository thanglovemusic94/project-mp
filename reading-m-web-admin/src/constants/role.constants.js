export const UserRole = {
    TUTOR: {
        value: "TUTOR",
        label: "지도교사"
    },
    ADMIN: {
        value: "ADMIN",
        label: "관리자"
    },
    STUDENT: {
        value: "STUDENT",
        label: "학생"
    },
    PARENT: {
        value: "PARENT",
        label: "학부모"
    },
    ALL: {
        value: "",
        label: "회원 유형 전체"
    }
}

export function convertRole(str) {
    if (str === UserRole.TUTOR.value) {
        return UserRole.TUTOR.label;
    } else if (str === UserRole.ADMIN.value) {
        return UserRole.ADMIN.label;
    } else if (str === UserRole.STUDENT.value) {
        return UserRole.STUDENT.label;
    } else if (str === UserRole.PARENT.value) {
        return UserRole.PARENT.label;
    } else {
        return str;
    }
}