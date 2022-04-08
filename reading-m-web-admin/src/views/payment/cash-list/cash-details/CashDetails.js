import React, {useEffect, useState} from 'react'
import {CButton, CCard, CCardBody, CCol, CRow,} from '@coreui/react'
import {useParams} from "react-router-dom";
import {CashRequirementService} from "../../../../services/CashRequirementService";
import {DateUtils} from "../../../../utils/DateUtils";
import ModalCashQuestion from "../../../common/ModalCashQuestion";
import NumberFormat from "react-number-format";
import {convertCashStatus} from "../../../../constants/cash.status.constants";

const CashDetails = () => {
    const [changeCashStatus, setChangeCashStatus] = useState(false)
    const [changeNoCashStatus, setChangeNoCashStatus] = useState(false)
    const [status, setStatus] = useState('')

    const [dataDetail, setDataDetail] = useState();
    let {id} = useParams();
    const refreshGetById = () => CashRequirementService.getById(id)
        .then(response => {
            setDataDetail(response.data)
        })
        .catch(e => {
            console.log(e);
        });

    useEffect(() => {
        refreshGetById();
    }, [id]);
    // console.log(dataDetail)

    return (
        <>
            <h2 className="mb-4">현금 신청 상세</h2>
            <CCard>
                <CCardBody>
                    {
                        dataDetail &&
                            <>
                                {dataDetail.status === 'CASH_REQUEST' &&
                                    <div className="d-flex justify-content-end mb-3">
                                    <div className="btn-group-custom-1">
                                        <CButton
                                            color="secondary"
                                            size="md"
                                            className="mr-2"
                                            onClick={() => {
                                                setStatus('CASH_COMPLETE');
                                                setChangeCashStatus(!changeCashStatus)
                                            }
                                            }
                                        >
                                            환불 완료
                                        </CButton>
                                        <CButton
                                            color="secondary"
                                            size="md"
                                            onClick={() => {
                                                setStatus('NON_CASH');
                                                setChangeNoCashStatus(!changeNoCashStatus)
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
                                        <td className="tdfull" colSpan="4">
                                            현금 신청 정보
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="td203">현금 신청 일시</td>
                                        <td>{DateUtils.toLocalDateTime(dataDetail.requirementTime)}</td>
                                    </tr>
                                    <tr>
                                        <td className="td203">완료 일시</td>
                                        <td>{dataDetail.completionTime ? DateUtils.toLocalDateTime(dataDetail.completionTime) : ""}</td>
                                    </tr>
                                    <tr>
                                        <td className="td203">상태</td>
                                        <td>{convertCashStatus(dataDetail.status)}</td>
                                    </tr>
                                    <tr>
                                        <td className="td203">ID</td>
                                        <td>{dataDetail.user.memberId}</td>
                                    </tr>
                                    <tr>
                                        <td className="td203">이름</td>
                                        <td>{dataDetail.user.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="td203">현금 신청 포인트</td>
                                        <td>
                                            <NumberFormat value={dataDetail.point} thousandSeparator={true}
                                                          displayType={'text'}/> 포인트
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="td203">은행</td>
                                        <td>{dataDetail.bank}</td>
                                    </tr>
                                    <tr>
                                        <td className="td203">계좌번호</td>
                                        <td>{dataDetail.accountNumber}</td>
                                    </tr>
                                    <tr>
                                        <td className="td203">예금주</td>
                                        <td>{dataDetail.accountName}</td>
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
                                to="/payment/cash-list/cashs"
                            >
                                목록으로
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>

            <ModalCashQuestion show={changeCashStatus}
                               setShow={setChangeCashStatus}
                               data={dataDetail}
                               content={'환불 완료 상태로 변경하시겠습니까?'}
                               childModel={true}
                               refeshGetByid={refreshGetById}
                               status={status}
            />

            <ModalCashQuestion show={changeNoCashStatus}
                               setShow={setChangeNoCashStatus}
                               data={dataDetail}
                               content={'환불 불가 상태로 변경하시겠습니까?'}
                               childModel={true}
                               refeshGetByid={refreshGetById}
                               status={status}
            />

            {/*<ModelRefundQuestion show={changeCashStatus}*/}
            {/*               setShow={setChangeCashStatus}*/}
            {/*               data={dataDetail}*/}
            {/*               content={'현금 완료 상태로 변경하시겠습니까?'}*/}
            {/*               childModel={true}*/}
            {/*               refeshGetByid={refeshGetByid}*/}
            {/*               status={status}*/}
            {/*/>*/}

            {/*<ModelRefundQuestion show={changeNoCashStatus}*/}
            {/*               setShow={setChangeNoCashStatus}*/}
            {/*               data={dataDetail}*/}
            {/*               content={'현금 불가 상태로 변경하시겠습니까?'}*/}
            {/*               childModel={true}*/}
            {/*               refeshGetByid={refeshGetByid}*/}
            {/*               status={status}*/}
            {/*/>*/}

            {/*<CModal*/}
            {/*    show={changeCashStatus}*/}
            {/*    onClose={() => setCashStatus(!changeCashStatus)}*/}
            {/*    centered*/}
            {/*    size="sm"*/}
            {/*>*/}
            {/*    <CModalBody className="text-center">*/}
            {/*        <p>현금 완료 상태로 변경하시겠습니까?</p>*/}
            {/*        <CButton*/}
            {/*            variant="outline"*/}
            {/*            color="dark"*/}
            {/*            onClick={() => setCashStatus(!changeCashStatus)}*/}
            {/*            className="mx-2"*/}
            {/*        >*/}
            {/*            취소*/}
            {/*        </CButton>*/}
            {/*        <CButton*/}
            {/*            color="dark"*/}
            {/*            onClick={() => setCashStatusDone(!doneCashStatus)}*/}
            {/*            className="mx-2"*/}
            {/*        >*/}
            {/*            확인*/}
            {/*        </CButton>*/}
            {/*    </CModalBody>*/}
            {/*</CModal>*/}
            {/*<CModal*/}
            {/*    show={doneCashStatus}*/}
            {/*    onClose={() => setCashStatusDone(!doneCashStatus)}*/}
            {/*    centered*/}
            {/*    size="sm"*/}
            {/*>*/}
            {/*    <CModalBody className="text-center">*/}
            {/*        <p>현금 완료 상태로 변경되었습니다.</p>*/}

            {/*        <CButton*/}
            {/*            color="dark"*/}
            {/*            onClick={() => setCashStatusDone(!doneCashStatus)}*/}
            {/*            className="mx-2"*/}
            {/*        >*/}
            {/*            확인*/}
            {/*        </CButton>*/}
            {/*    </CModalBody>*/}
            {/*</CModal>*/}
            {/*<CModal*/}
            {/*    show={changeNoCashStatus}*/}
            {/*    onClose={() => setNoCashStatus(!changeNoCashStatus)}*/}
            {/*    centered*/}
            {/*    size="sm"*/}
            {/*>*/}
            {/*    <CModalBody className="text-center">*/}
            {/*        <p>현금 불가 상태로 변경하시겠습니까?</p>*/}
            {/*        <CButton*/}
            {/*            variant="outline"*/}
            {/*            color="dark"*/}
            {/*            onClick={() => setNoCashStatus(!changeNoCashStatus)}*/}
            {/*            className="mx-2"*/}
            {/*        >*/}
            {/*            취소*/}
            {/*        </CButton>*/}
            {/*        <CButton*/}
            {/*            color="dark"*/}
            {/*            onClick={() => setNoCashStatusDone(!doneNoCashStatus)}*/}
            {/*            className="mx-2"*/}
            {/*        >*/}
            {/*            확인*/}
            {/*        </CButton>*/}
            {/*    </CModalBody>*/}
            {/*</CModal>*/}
            {/*<CModal*/}
            {/*    show={doneNoCashStatus}*/}
            {/*    onClose={() => setNoCashStatusDone(!doneNoCashStatus)}*/}
            {/*    centered*/}
            {/*    size="sm"*/}
            {/*>*/}
            {/*    <CModalBody className="text-center">*/}
            {/*        <p>현금 불가 상태로 변경되었습니다.</p>*/}

            {/*        <CButton*/}
            {/*            color="dark"*/}
            {/*            onClick={() => setNoCashStatusDone(!doneNoCashStatus)}*/}
            {/*            className="mx-2"*/}
            {/*        >*/}
            {/*            확인*/}
            {/*        </CButton>*/}
            {/*    </CModalBody>*/}
            {/*</CModal>*/}


        </>
    )
}

export default CashDetails
