import {
    CButton,
    CContainer,
    CForm,
    CFormCheck,
    CFormLabel,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CImage,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow
} from "@coreui/react";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {Link} from "react-router-dom";
import FormattedDateTime from "../../commons/FormattedDateTime";
import {CONSTRUCTION_ROUTER} from "../../constants/RouterConstant";
import {ConstructionService} from "../../services/ConstructionService";


function ConstructionExampleDetails() {
    const { id } = useParams();
    const history = useHistory();

    const [data, setData] = useState({
        "status": "",
        "quotation": {
            "company": {
                "companyName": ""
            },
            "transaction": {
                "id": ""
            }
        },
        "content": "",
        "writer": {
            "memberId": "",
            "name": ""
        },
        "createdOn": "",
        "updatedOn": "",
        "images": [
            {
                "fileName": "",
                "objectKey": ""
            }
        ],
        "transaction": ""
    });

    const [exposure, setExposure] = useState(true);

    // eslint-disable-next-line
    useEffect(() => fetchData(), [])

    function fetchData() {

        ConstructionService.getConstructionExample(id).then((res) => {

            if (res.status === 200) {

                setData(res.data);
                setExposure(res.data['status'] === 'SHOW');
            }
        });
    }

    function handleBackToList() {
        history.push("/constructions/examples");
    }

    function handleExposureChange() {
        let updateItem = {
            'id': id,
            'status': exposure === true ? 'SHOW' : 'HIDE'
        };

        ConstructionService.updateExampleStatus([updateItem]).then((res) => {

            if (res.status === 200) {

                history.push(CONSTRUCTION_ROUTER.EXAMPLES);
            }
        });
    }

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>
                    시공 사례 상세
                </CHeaderBrand>
                <CHeaderNav className="w-50 justify-content-end">
                    <CButton className="w-25 me-3" color="dark"   onClick={handleBackToList}>목록​</CButton>
                    <CButton className="w-25" color="dark"   onClick={handleExposureChange}>저장</CButton>
                </CHeaderNav>
            </CHeader>

            <CTable className="mt-3" bordered>
                <CTableBody>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">작성자 ID</div>
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
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">등록일</div>
                                    <div className="w-75 h-100 p-2 border-end"><FormattedDateTime source={data.createdOn}
                                    format="YYYY.MM.DD" /></div>
                                </div>
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">수정일</div>
                                    <div className="w-75 h-100 p-2"><FormattedDateTime source={data.updatedOn}
                                    format="YYYY.MM.DD" /></div>
                                </div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex ">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">시공 업체명</div>
                                    <div className="w-75 h-100 p-2 border-end">{data.quotation.company.companyName}</div>
                                </div>
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">거래번호</div>
                                    <div className="w-75 h-100 p-2">
                                        <Link to={`/transactions/${data.quotation.transaction.id}/details`}>
                                            {data.quotation.transaction.id}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="w-100 fw-semibold bg-light p-2 text-center">내용</div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>
                            <div className="w-100 p-3">
                                <div className="mb-3">
                                    <p>{data.content}</p>
                                </div>
                                {
                                    data.images.map((item, index) => {

                                        return (
                                            <div key={`construction-content-image-${index}`} className="mb-3">
                                                <CImage src={item.objectKey} alt={item.fileName} />
                                            </div>
                                        );
                                    })
                                }
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
                                            <CFormCheck
                                                id="exposeRadioShow"
                                                name="exposeRadio"
                                                type="radio"
                                                checked={exposure === true}
                                                onChange={() => setExposure(true)}
                                            />
                                            <CFormLabel className="mx-2" htmlFor="exposeRadioShow">노출</CFormLabel>
                                            <CFormCheck
                                                id="exposeRadioHide"
                                                name="exposeRadio"
                                                type="radio"
                                                checked={exposure === false}
                                                onChange={() => setExposure(false)}
                                            />
                                            <CFormLabel className="ms-2" htmlFor="exposeRadioHide">숨김</CFormLabel>
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

export default ConstructionExampleDetails;
