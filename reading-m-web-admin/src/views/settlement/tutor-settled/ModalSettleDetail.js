import React, {useEffect, useState} from 'react'
import {CButton, CCol, CModal, CModalBody, CRow} from '@coreui/react'
import DateTime from "../../../common/DateTime"
import {SettlementService} from "../../../services/SettlementService"
import NumberFormat from "react-number-format"
import {trackPromise} from 'react-promise-tracker'
import {checkAmPm, checkDayOfWeek, classDateFormat} from "../../../constants/datetime.constants";
import checkClassType from "../../../constants/class.constants";


const ModalSettleDetail = (props) => {
    const {settlementId, show, setShow, refreshdata} = props
    const [settlementQuestion, setSettlementQuestion] = useState(false)
    const [statusDone, setStatusDone] = useState(false)
    const [data, setData] = useState()

    const updateStatus = () => SettlementService.updateCompleted(settlementId)
        .then(() => {
            setShow(!show)
            setStatusDone(!statusDone)
            setSettlementQuestion(!settlementQuestion)
            refreshdata()
            SettlementService.getById(settlementId).then((res) => {
                setData(res.data)
            }).catch((err) => console.log(err))
        })
        .catch((err) => {
            console.log(err)
        })

    useEffect(() => {
        if (settlementId > 0) {
            trackPromise(
                SettlementService.getById(settlementId).then((res) => {
                    setData(res.data)
                }).catch((err) => console.log(err))
            )
        }
    }, [settlementId])

    return (
        <>
            <CModal
                show={show}
                onClose={() => setShow(false)}
                centered
                size="lg"
            >
                <CModalBody>
                    <h3 className="text-center mt-2 mb-4">정산 상세</h3>
                    {
                        (data && data.settlement) &&
                        <table className="table table-bordered mb-5 ">
                            <tbody>
                            <tr>
                                <td className="tdfull" colSpan="4">
                                    정산 내역
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">정산상태</td>
                                <td>
                                    {
                                        (() => {
                                            switch (data.settlement.status) {
                                                case 'UN_SETTLED':
                                                    return (
                                                        <span>미정산</span>
                                                    )
                                                case 'SETTLEMENT_COMPLETED':
                                                    return (
                                                        <span>정산 완료</span>
                                                    )

                                                default:
                                                    return (
                                                        <span></span>
                                                    )
                                            }
                                        })()
                                    }

                                </td>
                                <td className="td203">정산 완료일</td>
                                <td>{data.settlement.settledDate && DateTime({
                                    format: 'YYYY.MM.DD',
                                    date: data.settlement.settledDate
                                })}</td>
                            </tr>
                            <tr>
                                <td className="td203">수업 개설일</td>
                                <td>
                                    {DateTime({format: 'YYYY.MM.DD', date: data.settlement.liveClass.openDate})}
                                </td>
                                <td className="td203">지도교사 이름</td>
                                <td>{data.settlement.liveClass.tutor.name}</td>
                            </tr>
                            <tr>
                                <td className="td203">수업 종류</td>
                                <td>{checkClassType(data.settlement.liveClass.type)}</td>
                                <td className="td203">수업명</td>
                                <td>{data.settlement.liveClass.name}</td>
                            </tr>
                            <tr>
                                <td className="td203">교육비</td>
                                <td>
                                    <NumberFormat value={data.settlement.liveClass.tuitionFee} thousandSeparator={true}
                                                  displayType={'text'}/> 원
                                </td>
                                <td className="td203">결제 인원</td>
                                <td>
                                    <NumberFormat value={data.settlement.payerNumber} thousandSeparator={true}
                                                  displayType={'text'}/> 명
                                </td>
                            </tr>

                            <tr>
                                <td className="td203">수수료</td>
                                <td>
                                    <NumberFormat value={data.settlement.fee} thousandSeparator={true}
                                                  displayType={'text'}/> 원
                                </td>
                                <td className="td203">세금</td>
                                <td>
                                    <NumberFormat value={data.settlement.tax} thousandSeparator={true}
                                                  displayType={'text'}/> 원
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">PG사 수수료</td>
                                <td>
                                    <NumberFormat value={data.settlement.pgFee} thousandSeparator={true}
                                                  displayType={'text'}/> 원
                                </td>
                                <td className="td203">정산금액</td>
                                <td>
                                    <NumberFormat value={data.settlement.amount} thousandSeparator={true}
                                                  displayType={'text'}/> 원
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">은행</td>
                                <td>{data.settlement.liveClass.tutor.bank}</td>
                                <td className="td203">계좌번호</td>
                                <td>{data.settlement.liveClass.tutor.bankAccount}</td>
                            </tr>
                            </tbody>
                        </table>
                    }
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td className="tdfull" colSpan="4">
                                수업 내역
                            </td>
                        </tr>
                        <tr>
                            <td className="td203">수업일시</td>
                            <td className="td203">지도교사 수업 여부</td>
                            <td className="td203">학생명</td>
                            <td className="td203">학생 출석 여부</td>
                        </tr>
                        {data && data.attend.map((item, index) => (
                            <>
                                <tr key={index}>
                                    <td rowSpan={item.students.length + 1} className="align-middle text-center">
                                        {classDateFormat(new Date(item.startTime), new Date(item.endTime))}
                                    </td>
                                    <td rowSpan={item.students.length + 1} className="align-middle text-center">
                                        {item.tutorPresent ? "예" : "아니"}
                                    </td>
                                </tr>
                                {item.students.map((std, idx) => (
                                    <>
                                        <tr key={idx}>
                                            <td className="align-middle text-center">{std.name}</td>
                                            <td className="align-middle text-center">{std.present ? "예" : "아니"}</td>
                                        </tr>
                                    </>
                                ))}

                            </>
                        ))
                        }
                        </tbody>
                    </table>
                    <CRow className="justify-content-center mt-5 mb-2">
                        <CCol md="3">
                            <CButton
                                block
                                variant="outline"
                                color="dark"
                                onClick={() =>
                                    setShow(false)
                                }
                            >
                                취소
                            </CButton>
                        </CCol>

                        <CCol md="3">
                            <CButton
                                block
                                color="dark"
                                disabled={data && data.attend.length === 0}
                                onClick={() => setSettlementQuestion(!settlementQuestion)}
                            >
                                정산 완료
                            </CButton>
                        </CCol>

                    </CRow>
                </CModalBody>
            </CModal>
            <CModal
                show={settlementQuestion}
                onClose={() => setSettlementQuestion(!settlementQuestion)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>정산 완료 상태로 변경하시겠습니까?</p>
                    <CButton
                        variant="outline"
                        color="dark"
                        onClick={() => setSettlementQuestion(!settlementQuestion)}
                        className="mx-2"
                    >
                        취소
                    </CButton>
                    <CButton
                        color="dark"
                        onClick={updateStatus}
                        className="mx-2"
                    >
                        확인
                    </CButton>

                </CModalBody>
            </CModal>
            <CModal
                show={statusDone}
                onClose={() => {
                    setStatusDone(!statusDone)
                }
                }
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>정산 완료 상태로 변경되었습니다.</p>

                    <CButton
                        color="dark"
                        onClick={() => {
                            setStatusDone(!statusDone)
                            setShow(false)
                        }}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

export default ModalSettleDetail
