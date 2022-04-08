export const InquiryType = {
    CLASS: {
        value: "CLASS",
        label: "수업"
    },
    PAYMENT_REFUND: {
        value: "PAYMENT_REFUND",
        label: "결제/환불"
    },
    SETTLEMENT: {
        value: "SETTLEMENT",
        label: "정산"
    },
    OTHERS: {
        value: "OTHERS",
        label: "기타"
    }
}

export function convertInquiryType(str) {
    if (str === InquiryType.CLASS.value) {
        return InquiryType.CLASS.label;
    } else if (str === InquiryType.PAYMENT_REFUND.value) {
        return InquiryType.PAYMENT_REFUND.label;
    } else if (str === InquiryType.SETTLEMENT.value) {
        return InquiryType.SETTLEMENT.label;
    } else if (str === InquiryType.OTHERS.value) {
        return InquiryType.OTHERS.label;
    } else {
        return str;
    }
}