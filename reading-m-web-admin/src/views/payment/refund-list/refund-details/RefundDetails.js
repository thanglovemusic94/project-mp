import React, {useEffect, useState} from 'react'
import {CButton, CCard, CCardBody, CCol, CRow,} from '@coreui/react'
import {useParams} from "react-router-dom";
import {RefundService} from "../../../../services/RefundService";
import {DateUtils} from "../../../../utils/DateUtils";

import DateTime from "../../../../common/DateTime";
import ModelRefundQuestion from "../../../common/ModalRefundQuestion";
import NumberFormat from "react-number-format";
import {classDateFormat} from "../../../../constants/datetime.constants";
import convertRefundStatus from "../../../../constants/refund.status.constants";
import checkClassType from "../../../../constants/class.constants";
import {checkGrader} from "../../../../constants/schoolgrade.constants";
import convertPaymentMethod from "../../../../constants/payment.method.constants";

const RefundDetails = () => {
    const [changeRefundStatus, setChangeRefundStatus] = useState(false)
    const [changeNoRefundStatus, setChangeNoRefundStatus] = useState(false)
    const [dataDetail, setDataDetail] = useState()
    const [curriculum, setCurriculum] = useState([])
    const [status, setStatus] = useState('REFUND_REQUEST')


    const refeshGetByid = () => RefundService.getById(id)
        .then(response => {
            setDataDetail(response.data)
            setCurriculum(response.data.payment.classInformation.curriculum)
        })
        .catch(e => {
            console.log(e);
        });

    let {id} = useParams();
    useEffect(() => {
        refeshGetByid();
    }, [id]);


    return (
        <>
            <h2 className="mb-4">환불 상세 </h2>
            <CCard>
                <CCardBody>
                    {
                        dataDetail &&
                        <>
                            {
                                dataDetail.status === 'REFUND_REQUEST' &&
                                <div className="d-flex justify-content-end mb-3">
                                    <div className="btn-group-custom-1">
                                        <CButton
                                            color="secondary"
                                            size="md"
                                            className="mr-2"
                                            onClick={() => {
                                                setStatus('REFUND_COMPLETION')
                                                setChangeRefundStatus(!changeRefundStatus)
                                            }
                                            }
                                        >
                                            환불 완료
                                        </CButton>
                                        <CButton
                                            color="secondary"
                                            size="md"
                                            onClick={() => {
                                                setStatus('NON_REFUNDABLE')
                                                setChangeNoRefundStatus(!changeNoRefundStatus)
                                            }
                                            }
                                        >
                                            환불 불가
                                        </CButton>
                                    </div>
                                </div>
                            }
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td className="td203">결제일시</td>
                                    <td colSpan="3"><DateTime format={'YYYY.MM.DD hh:mm:ss'}
                                                              date={dataDetail.payment.paymentTime}/></td>
                                </tr>
                                <tr>
                                    <td className="td203">환불일시</td>
                                    <td><DateTime format={'YYYY.MM.DD hh:mm:ss'}
                                                  date={DateUtils.toLocalDateTime(dataDetail.refundTime)}/></td>
                                    <td className="td203">환불 상태</td>
                                    <td>{convertRefundStatus(dataDetail.status)}</td>
                                </tr>
                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        결제 수업 정보
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">수업 정보</td>
                                    <td colSpan="3">{checkClassType(dataDetail.payment.classInformation.type)}</td>
                                </tr>
                                <tr>
                                    <td className="td203">대상 학생</td>
                                    <td>{checkGrader(dataDetail.payment.classInformation.targetStudentGrade)}</td>
                                    <td className="td203">수업 준비</td>
                                    <td>{dataDetail.payment.classInformation.materials}</td>
                                </tr>
                                <tr>
                                    <td className="td203">수업일시</td>
                                    <td colSpan="3">

                                        {curriculum && curriculum.length > 0 &&


                                        <div>
                                            {curriculum.map((v, i) => {
                                                return (
                                                    <div key={i}>
                                                        {classDateFormat(new Date(v.start), new Date(v.end))}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        }

                                    </td>
                                </tr>
                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        결제 정보
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">결제 예정 금액</td>
                                    <td><NumberFormat value={dataDetail.payment.amount} thousandSeparator={true} displayType={'text'}/> 원</td>
                                    <td className="td203">할인 금액</td>
                                    <td><NumberFormat value={dataDetail.payment.discount} thousandSeparator={true} displayType={'text'}/> 원</td>
                                </tr>
                                <tr>
                                    <td className="td203">현금 포인트</td>
                                    <td><NumberFormat value={dataDetail.payment.cashPoint} thousandSeparator={true} displayType={'text'}/> 포인트</td>
                                    <td className="td203">이벤트 포인트</td>
                                    <td><NumberFormat value={dataDetail.payment.eventPoint} thousandSeparator={true} displayType={'text'}/> 포인트</td>
                                </tr>
                                <tr>
                                    <td className="td203">최종 결제 금액</td>
                                    <td><NumberFormat value={dataDetail.payment.payValue} thousandSeparator={true} displayType={'text'}/> 원</td>
                                    <td className="td203">결제 수단</td>
                                    <td>{convertPaymentMethod(dataDetail.payment.method)}</td>
                                </tr>
                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        환불 정보
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">환불 금액</td>
                                    <td><NumberFormat value={dataDetail.amount} thousandSeparator={true} displayType={'text'}/> 원</td>
                                    <td className="td203">결제 수단</td>
                                    <td>{convertRefundStatus(dataDetail.status)}</td>
                                </tr>
                                <tr>
                                    <td className="td203">환불 현금 포인트</td>
                                    <td><NumberFormat value={dataDetail.cashPoint} thousandSeparator={true} displayType={'text'}/> 포인트</td>
                                    <td className="td203">환불 이벤트 포인트</td>
                                    <td><NumberFormat value={dataDetail.eventPoint} thousandSeparator={true} displayType={'text'}/> 포인트</td>
                                </tr>
                                <tr>
                                    <td className="td203">환불 사유</td>
                                    <td colSpan="3">{dataDetail.reason}</td>
                                </tr>
                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        결제자 정보
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">이름</td>
                                    <td>{dataDetail.payment.payer.name}</td>
                                    <td className="td203">휴대폰 번호</td>
                                    <td>{dataDetail.payment.payer.phone}</td>
                                </tr>
                                <tr>
                                    <td className="td203">이메일</td>
                                    <td>{dataDetail.payment.payer.email}</td>
                                    <td className="td203">자녀 정보</td>
                                    <td>{dataDetail.payment.childrenName}</td>
                                </tr>
                                </tbody>
                            </table>
                        </>
                    }


                    <CRow className="justify-content-center mt-5">
                        <CCol md="3">
                            <CButton
                                block
                                color="dark"
                                to="/payment/refund-list/refunds"
                            >
                                목록으로
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>

            <ModelRefundQuestion show={changeRefundStatus}
                           setShow={setChangeRefundStatus}
                           data={dataDetail}
                           content={'환불 완료 상태로 변경하시겠습니까?'}
                           childModel={true}
                           refeshGetByid={refeshGetByid}
                           status={status}
            />

            <ModelRefundQuestion show={changeNoRefundStatus}
                           setShow={setChangeNoRefundStatus}
                           data={dataDetail}
                           content={'환불 불가 상태로 변경하시겠습니까?'}
                           childModel={true}
                           refeshGetByid={refeshGetByid}
                           status={status}
            />

        </>
    )
}

export default RefundDetails
