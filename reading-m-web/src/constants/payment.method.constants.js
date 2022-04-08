export const Method = {
    CREDIT_CARD: {
        value: "CREDIT_CARD",
        label: "신용카드",
    },

    BANK_TRANSFER: {
        value: "BANK_TRANSFER",
        label: "계좌이체"
    }
}

export function methodLabel(value) {

    if (value === Method.CREDIT_CARD.value) return Method.CREDIT_CARD.label;
    if (value === Method.BANK_TRANSFER.value) return Method.BANK_TRANSFER.label;
    return value;
}




