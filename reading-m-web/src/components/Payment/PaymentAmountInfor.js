import Currency from 'components/common/Currency'
import React from "react";
import { methodLabel } from 'constants/payment.method.constants';

export default function PaymentAmountInfor({ paymentInfo, curriculum, classType }) {

    return (
        <>  {paymentInfo.amount &&
            <section className="payment__amount">
                <h3 className="payment__title">결제 정보</h3>
                <div className="payment__box-gray">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>결제 예정 금액</th>
                                <td>
                                    <Currency amount={paymentInfo.amount} /> <br />
                                    {
                                        classType !== "DavinciClass" &&
                                        <span>(
                                            {curriculum && curriculum.map((item, index) => {
                                                return <> {(index > 0 ? ", " : "") + (index + 1) + "주차"} </>
                                            })}
                                            )
                                        </span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th>할인 쿠폰</th>
                                <td><Currency amount={paymentInfo.discount} /></td>
                            </tr>
                            <tr>
                                <th>현금 포인트</th>
                                <td><Currency amount={paymentInfo.cashPoint} /></td>
                            </tr>
                            <tr>
                                <th>이벤트 포인트</th>
                                <td><Currency amount={paymentInfo.eventPoint} /></td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <th className="pt-3">최종 결제 금액</th>
                                <td className="pt-3">
                                    <Currency amount={paymentInfo.finalAmount} className={'text-danger'} />
                                </td>
                            </tr>
                            <tr>
                                <th>결제 수단</th>
                                <td>{methodLabel(paymentInfo.method)}</td>
                            </tr>
                            {/* <tr>
                            <th>결제 상태</th>
                            <td>결제 완료</td>
                        </tr> */}
                        </tbody>
                    </table>
                </div>
            </section>
        }
        </>
    )
}
