import PaymentAmountInfor from 'components/Payment/PaymentAmountInfor'
import PaymentClassInfor from 'components/Payment/PaymentClassInfor'
import PaymentRefundInfor from 'components/Payment/PaymentRefundInfor'
import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import {ParentService} from "../../services/ParentService";
import PaymentPayerInfor from "../../components/Payment/PaymentPayerInfor";

export default function MyRefundDetails() {
    const {id} = useParams()
    const [item, setItem] = useState();

    useEffect(() => {
        ParentService.getPaymentDetail(id).then(res => {
            setItem(res.data)
        })
    }, [id])
    return (
        <>
            <div className="myrefunddetails-body">
                <h2 className="page-title mb-4">환불 상세</h2>
                {
                    item &&
                    <>
                        <PaymentClassInfor classInfo={item.classInfo}/>
                        <PaymentAmountInfor paymentInfo={item.paymentInfo}  classType={item.classInfo.type} curriculum={item.classInfo.curriculum}/>
                        <PaymentPayerInfor payer={item.payer}/>
                    </>
                }

                <div className="text-center mt-5">
                    <Button
                        variant="b500"
                        as={Link}
                        className="btw-386"
                        to="/my-payment"
                    >
                        환불 리스트로 가기
                    </Button>
                </div>
            </div>
        </>
    )
}
