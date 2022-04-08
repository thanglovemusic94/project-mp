export const SettlementStatus = {
    UN_SETTLED: {
        value: 'UN_SETTLED',
        label: '미정산',
    },
    SETTLEMENT_COMPLETED: {
        value: 'SETTLEMENT_COMPLETED',
        label: '정산 완료',
    },
    ALL: {
        value: "",
        label: '정산상태 전체',
    },
}

export default function convertSettlementStatus(str) {
    if (str === SettlementStatus.UN_SETTLED.value) {
        return SettlementStatus.UN_SETTLED.label;
    } else if (str === SettlementStatus.SETTLEMENT_COMPLETED.value) {
        return SettlementStatus.SETTLEMENT_COMPLETED.label;
    } else {
        return str;
    }
}