import {
    CButton,
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow
} from "@coreui/react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AutoTable, {AutoTableCellType} from "../../commons/AutoTable";
import {COMPANY_ROUTER} from "../../constants/RouterConstant";
import {TransactionService} from "../../services/TransactionService";
import {useParams} from "react-router";
import {TRANSACTION_STATUS} from "../../constants/TransactionStatus";
import FormattedDateTime from "../../commons/FormattedDateTime";
import {ConstructionTypeConstant} from "../../constants/ConstructionTypeConstant";
import {QuoteType} from "../../constants/QuoteType";
import QuotePopup from "./QuotePopup";
import {ConstructionPartConstant} from "../../constants/ConstructionPartConstant";

function TransactionDetails() {
    const [quotePopup, setQuotePopup] = useState(false);

    const {id} = useParams()
    const [detail, setDetail] = useState();
    const [idQuote, setIdQuote] = useState();
    const tableConfigs = [
        {
            'header': '업체명',
            'type': AutoTableCellType.URL,
            'bindingKey': 'id',
            'bindingUrlMask': 'company.companyName',
            'baseURL': COMPANY_ROUTER.DETAILS
        },
        {
            'header': '진행상태',
            'type': AutoTableCellType.Custom,
            'bindingKey': 'status',
            render: (status) => {
                return QuoteType[status]
            }
        },
        {
            'header': '견적서 정보',
            'type': AutoTableCellType.Button,
            'name': '상세정보​',
            'bindingKey': 'id',
            'action': (id) => {
                setIdQuote(id)
                setQuotePopup(!quotePopup);
            }
        }
    ];

    const getConstructionPart = (arr) => {
        let str = '';
        arr.map((v, index) => {
            str += ConstructionPartConstant[v]
            if (index + 1 < arr.length ){
                str +=  ", "
            }
            return v
        })
        return str;
    }

    useEffect(() => {
        TransactionService.getDetail(id).then(r => {
            setDetail(r.data)
        })
    }, [id])


    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>
                    거래 상세
                </CHeaderBrand>
                <CHeaderNav className="w-50 justify-content-end">
                    <CButton className="w-25" color="dark">목록</CButton>
                </CHeaderNav>
            </CHeader>

            {
                detail &&
                <CTable className="my-5" bordered>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell className="p-0">
                                <div className="w-100 fw-semibold bg-light p-2 text-center">견적 요청 내역</div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className="p-0">
                                <div className="d-flex">
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">거래번호</div>
                                        <div className="w-75 h-100 p-2 border-end">{detail.id}</div>
                                    </div>
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">진행상태</div>
                                        <div
                                            className="w-75 h-100 p-2">{TRANSACTION_STATUS[detail.status]}</div>
                                    </div>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className="p-0">
                                <div className="d-flex">
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">요청 회원 ID
                                        </div>
                                        <div className="w-75 h-100 p-2 border-end"><Link
                                            to={"/members/" + detail.id + "/details"}>{detail.requester.memberId}</Link>
                                        </div>
                                    </div>
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">신청 회원 이름
                                        </div>
                                        <div className="w-75 h-100 p-2">{detail.requester.name}</div>
                                    </div>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className="p-0">
                                <div className="d-flex">
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">차종</div>
                                        <div className="w-75 h-100 p-2 border-end">{detail.carType}</div>
                                    </div>
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">차 번호</div>
                                        <div className="w-75 h-100 p-2">{detail.carNumber}</div>
                                    </div>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className="p-0">
                                <div className="d-flex">
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">희망 시공 날짜
                                        </div>
                                        <div className="w-75 h-100 p-2 border-end">
                                            <FormattedDateTime source={detail.desiredDate} format={'YYYY.MM.DD'}/>
                                        </div>
                                    </div>
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">희망 시공 지역
                                        </div>
                                        <div
                                            className="w-75 h-100 p-2">{detail.address.addressDetail + "," + detail.address.address}</div>
                                    </div>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className="p-0">
                                <div className="d-flex">
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">보험 유/무
                                        </div>
                                        <div
                                            className="w-75 h-100 p-2 border-end">{detail.insurance ? "보험건" : "무건"}</div>
                                    </div>
                                    <div className="d-flex w-50">
                                        <div className="w-25 fw-semibold bg-light p-2 border-end text-center">시공유형</div>
                                        <div
                                            className="w-75 h-100 p-2">{ConstructionTypeConstant[detail.constructionType]}</div>
                                    </div>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className="p-0">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 text-center border-end">시공부위</div>
                                    <div className="w-75 p-2">
                                        {getConstructionPart(detail.constructionPart)}
                                    </div>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className="p-0">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 text-center border-end">기타 요청사항</div>
                                    <div className="w-75 p-2">{detail.otherRequest}</div>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className="p-0">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 text-center border-end">첨부사진</div>
                                    <div className="w-75 p-2">
                                        {
                                            detail.attachImages.map((v, index) => {
                                                return <a key={index} className="me-2"
                                                          href={v.objectKey}>{v.fileName}</a>
                                            })
                                        }


                                    </div>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            }

            <span className="fw-semibold">견적 전달 업체</span>

            {
                detail?.quotation?.length > 0 &&
                <AutoTable
                    configs={tableConfigs}
                    source={detail.quotation}
                />
            }

            <QuotePopup show={quotePopup} setShow={setQuotePopup} id={idQuote}/>

        </CContainer>
    );
}


export default TransactionDetails;
