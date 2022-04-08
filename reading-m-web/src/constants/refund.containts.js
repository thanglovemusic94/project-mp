export const refundStatus = [
    {
        name: '환불 신청',
        value: 'REFUND_REQUEST',
        className: 'text-m500'
    },
    {
        name: '환불 완료',
        value: 'REFUND_COMPLETION',
        className: ''
    },
    {
        name: '환불 불가',
        value: 'NON_REFUNDABLE',
        className: 'text-danger'
    },
]



export default function checkRefundStatus(str){
    let status = refundStatus.filter(item => {
        return item.value === str
    })
    return status[0];

}
