export const RefundStatus = {
    REFUND_REQUEST: {
        value: 'REFUND_REQUEST',
        label: '환불 신청',
    },
    REFUND_COMPLETION: {
        value: 'REFUND_COMPLETION',
        label: '환불 완료',
    },
    NON_REFUNDABLE: {
        value: 'NON_REFUNDABLE',
        label: '환불 불가',
    },
}


export default function convertRefundStatus(str) {
    if (str === RefundStatus.REFUND_REQUEST.value) {
        return RefundStatus.REFUND_REQUEST.label;
    } else if (str === RefundStatus.REFUND_COMPLETION.value) {
        return RefundStatus.REFUND_COMPLETION.label;
    } else if (str === RefundStatus.NON_REFUNDABLE.value) {
        return RefundStatus.NON_REFUNDABLE.label;
    } else {
        return str;
    }
}