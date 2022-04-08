export const CashStatus = {
    CASH_REQUEST: {
        value: 'CASH_REQUEST',
        label: '현금 신청',
    },
    CASH_COMPLETE: {
        value: 'CASH_COMPLETE',
        label: '현금 완료',
    },
    NON_CASH: {
        value: 'NON_CASH',
        label: '현금 불가',
    },
}

export function convertCashStatus(str) {
    if (str === CashStatus.CASH_REQUEST.value) {
        return CashStatus.CASH_REQUEST.label;
    } else if (str === CashStatus.CASH_COMPLETE.value) {
        return CashStatus.CASH_COMPLETE.label;
    } else if (str === CashStatus.NON_CASH.value) {
        return CashStatus.NON_CASH.label;
    } else {
        return str;
    }
}