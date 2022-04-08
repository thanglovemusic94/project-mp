import {
    CCloseButton,
    CContainer,
    CModal,
    CModalBody,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow
} from "@coreui/react";
import {useEffect, useState} from "react";
import {TransactionService} from "../../services/TransactionService";
import {QuoteType} from "../../constants/QuoteType";
import FormattedDateTime from "../../commons/FormattedDateTime";

const QuotePopup = ({show, setShow, id}) =>{
    const [quoteDetail, setQuoteDetail] = useState()
    useEffect(() => {
        if (id){
            TransactionService.getDetailQuote(id).then((r) => {
                setQuoteDetail(r.data)
            })
        }
    }, [id])

    return (
        <CModal
            visible={show}
            onDismiss={() => setShow(false)}
            onClose={() => setShow(false)}
            alignment={"center"}
            fullscreen
        >
            <CModalBody>
                <CContainer fluid>
                    <CTable className="mt-3" bordered>
                        <CTableBody>
                            <CTableRow>
                                <CTableDataCell className="p-0">
                                    <div className="w-100 fw-semibold bg-light p-2 text-center">
                                        견적 전달 내역
                                        <CCloseButton className="float-end"
                                                      onClick={() => setShow(!show)}
                                        />

                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell className="p-0">
                                    <div className="d-flex">
                                        <div className="d-flex w-50">
                                            <div className="w-25 fw-semibold bg-light p-2 border-end text-center">업체명</div>
                                            <div className="w-75 h-100 p-2 border-end">
                                                {quoteDetail?.company?.companyName}
                                            </div>
                                        </div>
                                        <div className="d-flex w-50">
                                            <div className="w-25 fw-semibold bg-light p-2 border-end text-center">진행상태</div>
                                            <div className="w-75 h-100 p-2">
                                                {QuoteType[quoteDetail?.status]}
                                            </div>
                                        </div>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell className="p-0">
                                    <div className="d-flex">
                                        <div className="d-flex w-50">
                                            <div className="w-25 fw-semibold bg-light p-2 border-end text-center">총 시공 비용</div>
                                            <div className="w-75 h-100 p-2 border-end">{quoteDetail?.constructionFee}</div>
                                        </div>
                                        <div className="d-flex w-50">
                                            <div className="w-25 fw-semibold bg-light p-2 border-end text-center">결제 금액</div>
                                            <div className="w-75 h-100 p-2">{quoteDetail?.paymentAmount}</div>
                                        </div>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell className="p-0">
                                    <div className="d-flex">
                                        <div className="d-flex w-50">
                                            <div className="w-25 fw-semibold bg-light p-2 border-end text-center">예상 시공 기간</div>
                                            <div className="w-75 h-100 p-2 border-end">{quoteDetail?.estConstructionPeriod} </div>
                                        </div>
                                        <div className="d-flex w-50">
                                            <div className="w-25 fw-semibold bg-light p-2 border-end text-center">예약일시</div>
                                            <div className="w-75 h-100 p-2">
                                                {quoteDetail?.reservationDate?
                                                <FormattedDateTime source={quoteDetail.reservationDate} format={'YYYY.MM.DD HH:mm'}/>
                                                : "-"
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell className="p-0">
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 text-center border-end">추가 전달사항</div>
                                        <div className="w-75 p-2">{quoteDetail?.notes}</div>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell className="p-0">
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 text-center border-end">예약 취소 사유</div>
                                        <div className="w-75 p-2">{quoteDetail?.reason}</div>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CContainer>
            </CModalBody>
        </CModal>
    );
}

export default QuotePopup
