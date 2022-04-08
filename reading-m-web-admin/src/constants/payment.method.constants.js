export const PaymentMethod = {
    CREDIT_CARD: {
        value: 'CREDIT_CARD',
        label: '신용카드',
    },
    BANK_TRANSFER: {
        value: 'BANK_TRANSFER',
        label: '계좌이체',
    },
    ALL: {
        value: "",
        label: '결제 수단 전체',
    },
}

export default function convertPaymentMethod(str) {
    if (str === PaymentMethod.CREDIT_CARD.value) {
        return PaymentMethod.CREDIT_CARD.label;
    } else if (str === PaymentMethod.BANK_TRANSFER.value) {
        return PaymentMethod.BANK_TRANSFER.label;
    } else {
        return str;
    }
}