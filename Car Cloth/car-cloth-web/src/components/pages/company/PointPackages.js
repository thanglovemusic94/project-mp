import React, {useContext, useEffect, useState} from "react";
import PaymentService from "../../../services/PaymentService";
import {MemberInfoContext} from "../../../context/member/MemberInforProvider";
import Format from "../../../utils/Format";
import {getMemberInfor} from "../../../context/member/MemberAction";
import ErrorCommon from "../../popups/ErrorCommon";
import {AppContext} from "../../../App";
import {Toast} from "react-bootstrap";

export default function PointPackages() {

    const {state, dispatch} = useContext(MemberInfoContext)
    const {showNoticePopup} = useContext(AppContext);
    const [showToast, setShowToast] = useState(false);
    const listPoint = [100, 5000, 10000, 30000, 50000, 100000]
    const [refreshPoint, setRefreshPoint] = useState(false)
    var IMP = window.IMP;
    IMP.init("imp44005021"); // merchantID

    useEffect(() => {
        getMemberInfor(dispatch).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshPoint])

    function handlePay(points) {
        PaymentService.initPayment(points).then((resp) => {
            if (resp.status === 201) {
                const {orderId, points, amount} = resp.data;

                IMP.request_pay(
                    {
                        // pg: "html5_inicis",
                        pg: "paypal",
                        pay_method: "card",
                        //currency: "",
                        merchant_uid: orderId,
                        name: "충전포인트 " + points + "원",
                        amount: amount,
                        //buyer_email: "johndoe@gmail.com",
                        //buyer_name: "John Doe",
                        //buyer_tel: "010-4242-4242",
                        //buyer_addr: "Shinsa-dong, Gangnam-gu, Seoul",
                        //buyer_postcode: "01181",
                    },
                    (rsp) => {
                        if (rsp.success) {
                            PaymentService.finishPayment({
                                impUid: rsp.imp_uid,
                                merchantUid: rsp.merchant_uid
                            }).then((resp) => {
                                if (resp.status === 200) {
                                    // console.log("Purchase is completed.");
                                    setShowToast(!showToast)
                                }
                            }).catch(e => ErrorCommon(showNoticePopup, e));
                        } else {
                            console.log("payment failed");
                        }
                    }
                );
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));
    }

    return (
        <>
            <div className="cc-body mx-n3 d-flex flex-column vh-100 bg-blue-50-op-30">
                <div className="pointpackage-section p-3 font-spoqa h-100 overflow-auto">
                    <div className="bg-white cc-shadow p-12px">
                        <div className="text-center border-bottom py-4">
                            <p className="fs-14 mb-0 text-black-600">보유 포인트</p>
                            <div className="text-blue-500 fw-bold mb-40px">
                                <span className="fs-30">{Format.money(state?.point, '')}</span>
                                <span className="fs-25">P</span>
                            </div>
                            <div className="text-start">
                                <ul className="fs-12 text-black-700 fw-light mb-1">
                                    <li>
                                        견적서 전달 시 건당{" "}
                                        <span className="text-danger">{Format.money(state?.deliveryCost, '')}P</span> 차감
                                    </li>
                                    <li>
                                        업체 메뉴 30일 이용{" "}
                                        <span className="text-danger">{Format.money(state?.fee, '')}P</span> 차감
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="my-4">
                            {
                                listPoint.map((value, index) => {
                                    return (
                                        <div key={index}>
                                            <ItemSelectPoint point={value} handlePay={()=>handlePay(value)}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                className="position-fixed start-50 translate-middle-x rounded-pill text-center text-green-400 w-75 mx-auto shadow-sm bg-white"
                style={{ bottom: "80px" }}
                onClose={() => {
                    setShowToast(!showToast)
                    setRefreshPoint(!refreshPoint)
                }}
                show={showToast}
                delay={2000}
                autohide
            >
                <Toast.Body className="fs-14 py-6px">
                    구매 완료되었습니다.
                </Toast.Body>
            </Toast>
        </>
    );
}

const ItemSelectPoint = ({point, handlePay}) => {

    return (
        <div
            className="d-flex justify-content-around align-items-center border border-blue-500 p-15px mb-3"
            onClick={handlePay}>
                                <span className="font-gmarket fs-15 fw-bold text-blue-500 lh-1">
                                    {point} Point
                                </span>
            <span className="point-divider"></span>
            <span className="font-gmarket fs-15 fw-bold text-blue-500 lh-1">
                                    {point}원
                                </span>
        </div>
    )
}


