export const InquiryStatus = {
    UNANSWERED: {
        value: "UNANSWERED",
        label: "답변 전"
    },
    ANSWERED: {
        value: "ANSWERED",
        label: "답변 완료"
    },
    ALL: {
        value: "",
        label: "답변여부 전체"
    },
}

export function convertInquiryStatus(str) {
    if (str === InquiryStatus.UNANSWERED.value) {
        return InquiryStatus.UNANSWERED.label;
    } else if (str === InquiryStatus.ANSWERED.value) {
        return InquiryStatus.ANSWERED.label;
    } else {
        return str;
    }
}