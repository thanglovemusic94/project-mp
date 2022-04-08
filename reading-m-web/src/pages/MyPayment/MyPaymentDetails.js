import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { ParentService } from "../../services/ParentService";
import PaymentClassInfor from "../../components/Payment/PaymentClassInfor";
import PaymentAmountInfor from "../../components/Payment/PaymentAmountInfor";
import PaymentPayerInfor from "../../components/Payment/PaymentPayerInfor";


export default function MyPaymentDetails() {
    const { id } = useParams()
    const [item, setItem] = useState();

    useEffect(() => {
        ParentService.getPaymentDetail(id).then(res => {
            setItem(res.data)
        })
    }, [id])

    return (
        <>
            <div className="mypaymentdetails-body">
                <h2 className="page-title mb-4">결제 상세</h2>
                <div className="text-right">
                    <Button
                        variant="b500"
                        className="btw-184 btn-outline btn-square btn-sm"
                        as={Link}
                        to={{
                            pathname: "/my-payment/payment-refund",
                            state: { item, id }
                        }}
                    >
                        환불 신청
                    </Button>
                </div>
                {
                    item &&
                    <>
                        <PaymentClassInfor classInfo={item.classInfo} />
                        <PaymentAmountInfor paymentInfo={item.paymentInfo} classType={item.classInfo.type} curriculum={item.classInfo.curriculum} />
                        <PaymentPayerInfor payer={item.payerInfo} />
                    </>
                }


                <div className="text-center mt-5">
                    <Button
                        variant="b500"
                        as={Link}
                        className="btw-386"
                        to="/my-payment"
                    >
                        결제 리스트로 가기
                    </Button>
                </div>
            </div>
        </>
    )
}
