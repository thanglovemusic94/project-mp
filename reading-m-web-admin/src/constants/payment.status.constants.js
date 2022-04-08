export const PaymentStatus = {
    COMPLETED: {
        value: 'COMPLETED',
        label: '결제 완료',
    },
    ALL: {
        value: "",
        label: '결제 상태 전체',
    },
}


export default function convertPaymentStatus(str) {
    if (str === PaymentStatus.COMPLETED.value) {
        return PaymentStatus.COMPLETED.label;
    } else {
        return str;
    }
}