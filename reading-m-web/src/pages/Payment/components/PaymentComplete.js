import PaymentAmountInfor from 'components/Payment/PaymentAmountInfor'
import PaymentClassInfor from 'components/Payment/PaymentClassInfor'
import PaymentPayerInfor from 'components/Payment/PaymentPayerInfor'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PaymentService } from 'services/payment.service'

const PaymentComplete = (props) => {
    const [loading, setLoading] = useState(true)
    const [paymentInfo, setPaymentInfo] = useState({ classInfo: {}, paymentInfo: {}, payer: {} })

    useEffect(() => {
        if (props.match.params.status === "success") {
            const query = new URLSearchParams(props.location.search)
            PaymentService.transact(query.get("orderId"), query.get("paymentKey"), query.get("amount")).then(res => {
                setPaymentInfo(res.data)
                setLoading(false)
            })
        }
    }, [])

    return (
        <>
            <section className="payment__status">
                <div className="text-center">
                    <span className="ps-done">결제하기</span>
                    <span className="current">결제완료</span>
                </div>
            </section>
            {
                loading === false && 
                <div className="paymentcomplete-body">
                    <PaymentClassInfor classInfo={{ ...paymentInfo.classInfo, videoInPays: paymentInfo.videoInPays }} />
                    <PaymentAmountInfor paymentInfo={paymentInfo.paymentInfo} curriculum={paymentInfo.classInfo.curriculum}
                        classType={paymentInfo.classInfo.type}
                    />
                    <PaymentPayerInfor payer={paymentInfo.payerInfo} />

                    <div className="text-center mt-5">
                        <Button variant="b500" as={Link} className="btw-386" to="/">
                            메인으로 가기
                        </Button>
                    </div>
                </div>
            }        
        </>
    )
}

export default PaymentComplete
