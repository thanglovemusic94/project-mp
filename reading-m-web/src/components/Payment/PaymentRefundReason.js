import React from 'react'
import { Form } from 'react-bootstrap'
import Currency from "../common/Currency";

export default function PaymentRefundReason({paymentInfo,handleInputChange, error}) {
    return (
        <>
            <section className="payment__refund">
                <h3 className="payment__title">환불 정보</h3>
                <div className="payment__box-gray">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>환불 금액</th>
                            <td><Currency amount = {paymentInfo.finalAmount} /></td>
                        </tr>
                        <tr>
                            <th>환불 현금 포인트</th>
                            <td><Currency amount = {paymentInfo.cashPoint} /></td>
                        </tr>
                        <tr>
                            <th>환불 이벤트 포인트</th>
                            <td><Currency amount = {paymentInfo.eventPoint} /></td>
                        </tr>
                        <tr>
                            <th>환불 수단</th>
                            <td>{paymentInfo.method}</td>
                        </tr>
                        <tr>
                            <th className="align-middle">환불 사유</th>
                            <td className="pt-3">
                                <div className="ipw-488">
                                        <Form.Control
                                            type="text"
                                            placeholder="환불 사유 입력"
                                            onChange={handleInputChange}
                                            name={'reason'}
                                        />
                                        {error.reason && <p className={'text-danger'}>환불 사유를 입력해주세요.</p>}
                                        {/*<Form.Control.Feedback type="invalid">*/}
                                        {/*    환불 사유를 입력해주세요.*/}
                                        {/*</Form.Control.Feedback>*/}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
