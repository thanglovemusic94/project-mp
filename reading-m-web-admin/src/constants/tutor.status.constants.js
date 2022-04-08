export const TutorStatus = {
    WAITING: {
        value: "WAITING",
        label: "지원"
    },
    APPROVED: {
        value: "APPROVED",
        label: "지원 승인 "
    },
    REFUSED: {
        value: "REFUSED",
        label: "지원 거절"
    },
    ALL: {
        value: "",
        label: "지원 상태 전체"
    }
}

export function convertTutorStatus(str) {
    if (str === TutorStatus.WAITING.value) {
        return TutorStatus.WAITING.label;
    } else if (str === TutorStatus.APPROVED.value) {
        return TutorStatus.APPROVED.label;
    } else if (str === TutorStatus.REFUSED.value) {
        return TutorStatus.REFUSED.label;
    } else {
        return str;
    }
}