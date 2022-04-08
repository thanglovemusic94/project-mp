export const PointType = {
    CASH_POINT: {
        value: 'CASH_POINT',
        label: '현금 포인트',
    },
    EVENT_POINT: {
        value: 'EVENT_POINT',
        label: '이벤트 포인트',
    },
    ALL: {
        value: '',
        label: '구분 전체',
    },
}

export function convertPointType(str) {
    if (str === PointType.CASH_POINT.value) {
        return PointType.CASH_POINT.label;
    }
    if (str === PointType.EVENT_POINT.value) {
        return PointType.EVENT_POINT.label;
    }
    return str;
}