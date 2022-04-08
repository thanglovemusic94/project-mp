import React from 'react'

export default function PaymentRefundInfor() {
    return (
        <>
            <section className="payment__refund">
                <h3 className="payment__title">환불 정보</h3>
                <div className="payment__box-gray">
                    <table className="table">
                        <tr>
                            <th>환불 금액</th>
                            <td>230,000 원</td>
                        </tr>
                        <tr>
                            <th>환불 현금 포인트</th>
                            <td>0 원</td>
                        </tr>
                        <tr>
                            <th>환불 이벤트 포인트</th>
                            <td>0 원</td>
                        </tr>
                        <tr>
                            <th>환불 수단</th>
                            <td>계좌이체</td>
                        </tr>
                        <tr>
                            <th className="pt-4">환불 사유</th>
                            <td className="pt-4">환불 신청합니다.</td>
                        </tr>
                        <tr>
                            <th>환불 상태</th>
                            <td>환불 신청</td>
                        </tr>
                    </table>
                </div>
            </section>
        </>
    )
}
