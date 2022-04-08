import React, {useEffect, useState} from 'react'
import {CButton, CCard, CCardBody, CCol, CRow} from '@coreui/react'
import {useParams} from "react-router-dom";
import {PaymentService} from "../../../../services/PaymentService";
import formatDate, {DateUtils} from "../../../../utils/DateUtils";
import NumberFormat from "react-number-format";
import {checkDayOfWeek, classDateFormat} from "../../../../constants/datetime.constants";
import checkClassType from "../../../../constants/class.constants";
import convertPaymentStatus from "../../../../constants/payment.status.constants";
import convertPaymentMethod from "../../../../constants/payment.method.constants";

const PaymentStatus = () => {
    const [small, setSmall] = useState(false)
    const [dataDetail, setDataDetail] = useState()
    let {id} = useParams();
    useEffect(() => {
        PaymentService.getById(id)
            .then(response => {
                setDataDetail(response.data)
            }).catch(e => {
            console.log(e);
        }) .finally(() => {
        })
    }, [id]);

    return (
        <>
            <h2 className="mb-4">결제 상세</h2>
            <CCard>
                <CCardBody>

                    {
                        dataDetail &&
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td className="td203">결제일시</td>
                                <td>{DateUtils.toLocalDateTime(dataDetail.paymentTime)}</td>
                                <td className="td203">결제 상태</td>
                                <td>{convertPaymentStatus(dataDetail.status)}</td>
                            </tr>
                            <tr>
                                <td className="tdfull" colSpan="4">
                                    결제 수업 정보
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">수업 정보</td>
                                <td colSpan="3">{checkClassType(dataDetail.classInformation.type)}</td>
                            </tr>
                            <tr>
                                <td className="td203">대상 학생</td>
                                <td>{dataDetail.classInformation.targetStudentGrade}</td>
                                <td className="td203">수업 준비</td>
                                <td>{dataDetail.classInformation.materials}</td>
                            </tr>
                            <tr>
                                <td className="td203">수업일시</td>
                                <td colSpan="3">
                                    <tr>
                                        {dataDetail.classInformation.curriculum?.map((v, i) => {
                                            return (
                                                <div>
                                                    {classDateFormat(new Date(v.start), new Date(v.end))}
                                                </div>
                                            )
                                        })}
                                    </tr>
                                </td>
                            </tr>
                            <tr>
                                <td className="tdfull" colSpan="4">
                                    결제 정보
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">결제 예정 금액</td>
                                <td><NumberFormat value={dataDetail.amount} thousandSeparator={true} displayType={'text'}/> 원</td>
                                <td className="td203">할인 금액</td>
                                <td><NumberFormat value={dataDetail.discount} thousandSeparator={true} displayType={'text'}/> 원</td>
                            </tr>
                            <tr>
                                <td className="td203">현금 포인트</td>
                                <td><NumberFormat value={dataDetail.cashPoint} thousandSeparator={true} displayType={'text'}/> 포인트</td>
                                <td className="td203">이벤트 포인트</td>
                                <td><NumberFormat value={dataDetail.eventPoint} thousandSeparator={true} displayType={'text'}/> 포인트</td>
                            </tr>
                            <tr>
                                <td className="td203">최종 결제 금액</td>
                                <td><NumberFormat value={dataDetail.payValue} thousandSeparator={true} displayType={'text'}/> 원</td>
                                <td className="td203">결제 수단</td>
                                <td>{convertPaymentMethod(dataDetail.method)}</td>
                            </tr>
                            <tr>
                                <td className="tdfull" colSpan="4">
                                    결제자 정보
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">이름</td>
                                <td>{dataDetail.payer.name}</td>
                                <td className="td203">휴대폰 번호</td>
                                <td>{dataDetail.payer.phone}</td>
                            </tr>
                            <tr>
                                <td className="td203">이메일</td>
                                <td>{dataDetail.payer.email}</td>
                                <td className="td203">자녀 정보</td>
                                <td>{dataDetail.childrenName}</td>
                            </tr>
                            </tbody>
                        </table>
                    }

                    <CRow className="justify-content-center mt-5">
                        <CCol md="3">
                            <CButton
                                onClick={() => setSmall(!small)}
                                block
                                color="dark"
                                to="/payment/payment-list/payments"
                            >
                                목록으로
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}

export default PaymentStatus
