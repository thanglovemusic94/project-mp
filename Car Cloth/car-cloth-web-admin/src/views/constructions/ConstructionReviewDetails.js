import {
    CButton,
    CCol,
    CContainer,
    CForm,
    CFormCheck,
    CFormLabel,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow
} from "@coreui/react";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {Link} from "react-router-dom";
import FormattedDateTime from '../../commons/FormattedDateTime';
import {CONSTRUCTION_ROUTER} from "../../constants/RouterConstant";
import {ConstructionService} from '../../services/ConstructionService';


function ConstructionReviewDetails() {
    const history = useHistory();
    const { id } = useParams();

    const [data, setData] = useState({
        "content": "",
        "quality": "",
        "kindness": "",
        "productExplain": "",
        "writer": {
            "memberId": "",
            "name": ""
        },
        "company": {
            "companyName": ""
        },
        "quotation": {
            "transaction": {
                "id": ""
            }
        },
        "status": "",
        "createdOn": "",
        "updatedOn": ""
    });

    const [exposure, setExposure] = useState(true);

    useEffect(() => {

        ConstructionService.getConstructionReview(id).then(res => {

            if (res.status === 200) {

                setData(res.data);
                setExposure(res.data['status'] === 'SHOW');
            }
        });
        // eslint-disable-next-line
    }, [])

    function handleUpdate() {
        let updateItem = {
            'id': id,
            'status': exposure === true ? 'SHOW' : 'HIDE'
        };

        ConstructionService.updateReviewStatus([updateItem]).then((res) => {

            if (res.status === 200) {

                history.push(CONSTRUCTION_ROUTER.REVIEWS);
            }
        });
    }

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>
                    시공 후기 상세
                </CHeaderBrand>
                <CHeaderNav className="w-50 justify-content-end">
                    <CButton className="w-25 me-3" color="dark"   href={CONSTRUCTION_ROUTER.REVIEWS}>목록​</CButton>
                    <CButton className="w-25" color="dark"   onClick={handleUpdate}>저장​</CButton>
                </CHeaderNav>
            </CHeader>

            <CTable className="mt-3" bordered>
                <CTableBody>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">작성자 ID​</div>
                                    <div className="w-75 h-100 p-2 border-end">{data.writer.memberId}</div>
                                </div>
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">작성자 이름</div>
                                    <div className="w-75 h-100 p-2">{data.writer.name}</div>
                                </div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">등록일​</div>
                                    <div className="w-75 h-100 p-2 border-end"><FormattedDateTime source={data.createdOn} format="YYYY.MM.DD" /></div>
                                </div>
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">수정일​</div>
                                    <div className="w-75 h-100 p-2"><FormattedDateTime source={data.updatedOn} format="YYYY.MM.DD" /></div>
                                </div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex ">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">시공 업체명​</div>
                                    <div className="w-75 h-100 p-2 border-end">{data.company.companyName}</div>
                                </div>
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">거래번호</div>
                                    <div className="w-75 h-100 p-2"><Link to={`/transactions/${data.quotation.transaction.id}/details`}>{data.quotation.transaction.id}</Link></div>
                                </div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="w-100 fw-semibold bg-light p-2 text-center">별점​</div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <CRow xs={{ gutter: 0 }}>
                                <CCol><div className="h-100 fw-semibold bg-light p-2 border-end text-center">시공 퀄리티</div></CCol>
                                <CCol><div className="h-100 p-2 border-end">{data.quality}</div></CCol>
                                <CCol><div className="h-100 fw-semibold bg-light p-2 border-end text-center">친절도</div></CCol>
                                <CCol><div className="h-100 p-2 border-end">{data.kindness}</div></CCol>
                                <CCol><div className="h-100 fw-semibold bg-light p-2 border-end text-center">제품에 대한 설명</div></CCol>
                                <CCol><div className="h-100 p-2">{data.productExplain}</div></CCol>
                            </CRow>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="w-100 fw-semibold bg-light p-2 text-center">후기 내용</div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>
                            <div className="w-100 p-3">
                                <p>{data.content}</p>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex w-50">
                                <div className="w-25 fw-semibold bg-light p-2 text-center border-end">노출상태</div>
                                <div className="w-75 p-2">
                                    <CForm>
                                        <div className="d-flex">
                                            <span className="mx-1"></span>
                                            <CFormCheck
                                                id="exposeRadioShow"
                                                type="radio"
                                                name="exposeRadio"
                                                checked={exposure === true}
                                                onChange={() => setExposure(true)}
                                            />
                                            <CFormLabel className="ms-2" htmlFor="exposeRadioShow">노출</CFormLabel>
                                            <span className="mx-1"></span>
                                            <CFormCheck
                                                id="exposeRadioHide"
                                                type="radio"
                                                name="exposeRadio"
                                                checked={exposure === false}
                                                onChange={() => setExposure(false)}
                                            />
                                            <CFormLabel className="ms-2" htmlFor="exposeRadioHide">숨김​</CFormLabel>
                                        </div>
                                    </CForm>
                                </div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
        </CContainer>
    );
}

export default ConstructionReviewDetails;
