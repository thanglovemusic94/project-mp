import {
    CButton,
    CCol,
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import FormattedDateTime from "../../commons/FormattedDateTime";
import { COMPANY_ROUTER, CONSTRUCTION_ROUTER } from "../../constants/RouterConstant";
import CompanyService from "../../services/CompanyService";
import { downloadImg } from "../../utils/DowloadUtil";

function CompanyDetails() {
    const history = useHistory();
    const { id } = useParams();

    const [data, setData] = useState({
        "companyName": "",
        "companyId": "",
        "registrationDate": "",
        "expiredDateTime": "",
        "numberDeliveredQuotes": "",
        "numberConstructionCompleted": "",
        "review": "",
        "usageStatus": "",
        "address": {
            "address": "",
            "addressDetail": ""
        },
        "workingTime": "",
        "constructableType": "",
        "entryDate": "",
        "representativeName": "",
        "contact": "",
        "attachFile": {
            "fileName": "",
            "objectKey": ""
        },
        "introduction": "",
        "totalPaymentAmount": "",
        "constructionQuality": "",
        "kindness": "",
        "explainProduct": "",
        "companyCode": "",
        "rating": ""
    });

    useEffect(() => {

        CompanyService.getCompany(id).then(res => {

            if (res.status === 200) {

                setData(res.data);
            }
        });
        // eslint-disable-next-line
    }, [])

    function handleGoBack() {
        history.push(COMPANY_ROUTER.MANAGEMENT);
    }

    function handleGotoConstructionExample() {

        history.push(`${CONSTRUCTION_ROUTER.EXAMPLES}?companyName=${data.companyName}`);
    }

    function handleGotoConstructionReview() {
        history.push(`${CONSTRUCTION_ROUTER.REVIEWS}?companyName=${data.companyName}`);
    }


    return (
        <>
            <CContainer fluid>
                <CHeader>
                    <CHeaderBrand className={'fw-bold'}>업체 상세​</CHeaderBrand>
                    <CHeaderNav className="w-50 justify-content-between">
                        <CButton className="w-25" color="dark" onClick={handleGoBack}>목록</CButton>
                        <CButton className="w-25" color="dark" onClick={handleGotoConstructionReview}>시공 후기​</CButton>
                        <CButton className="w-25" color="dark" onClick={handleGotoConstructionExample}>시공 사례​</CButton>
                    </CHeaderNav>
                </CHeader>

                <CRow className="mt-3" xs={{ gutter: 0 }}>
                    <CCol>
                        <CTable className="mb-0" bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">업체코드</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">{data.companyCode}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">업체명</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">{data.companyName}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                    <CCol>
                        <CTable className="mb-0" bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">사용여부</CTableHeaderCell>
                                    <CTableDataCell className="w-75">{data.usageStatus}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">업체회원 ID</CTableHeaderCell>
                                    <CTableDataCell className="w-75">{data.companyId}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                </CRow>
                <CRow xs={{ gutter: 0 }}>
                    <CCol>
                        <CTable className="mb-0" bordered>
                            <CTableBody>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row" >업체 주소</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">{`${data.address.addressDetail} ${data.address.address}`}</CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row" >영업 시간</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">{data.workingTime}</CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row" >시공가능유형</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">{data.constructableType}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                    <CCol>
                        <CTable className="mb-0" bordered>
                            <CTableBody>
                                <CTableRow className="border-top-0">
                                    <CTableDataCell className="border-start-0 border-end">&nbsp;</CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableDataCell className="border-start-0 border-end">&nbsp;</CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableDataCell className="border-start-0 border-end">&nbsp;</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                </CRow>
                <CRow xs={{ gutter: 0 }}>
                    <CCol>
                        <CTable className="mb-0" bordered>
                            <CTableBody>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">입점일</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">
                                        <FormattedDateTime source={data.entryDate} format="YYYY.MM.DD" isTimeZone={true}/>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">대표자 이름</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">{data.representativeName}</CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">견적전달 수</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">{data.numberDeliveredQuotes}</CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">결제 총액</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">{data.totalPaymentAmount}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                    <CCol>
                        <CTable className="mb-0" bordered>
                            <CTableBody>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">이용 기간​ 만료일시</CTableHeaderCell>
                                    <CTableDataCell className="w-75">
                                        <FormattedDateTime source={data.expiredDateTime} format="YYYY.MM.DD HH:MM" isTimeZone={true}/>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">연락처</CTableHeaderCell>
                                    <CTableDataCell className="w-75">{data.contact}</CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">시공완료 수</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">{data.numberConstructionCompleted}</CTableDataCell>
                                </CTableRow>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-25 text-center" color="secondary" scope="row">사업자등록증</CTableHeaderCell>
                                    <CTableDataCell className="w-75 border-end-0">
                                        {/* <a href={data.attachFile.objectKey}  onClick={()=> downloadImg(data.attachFile.objectKey, data.attachFile.fileName)}>{data.attachFile.fileName}</a> */}
                                        <a href={'#'}  onClick={()=> downloadImg(data.attachFile.objectKey, data.attachFile.fileName)}>{data.attachFile.fileName}</a>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                </CRow>
                <CRow xs={{ gutter: 0 }}>
                    <CTable className="mb-0" bordered>
                        <CTableBody>
                            <CTableRow className="border-top-0">
                                <CTableHeaderCell className="text-center" color="secondary" scope="row">별점 (평균 {data.rating})</CTableHeaderCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CRow>
                <CRow xs={{ gutter: 0 }}>
                    <CCol>
                        <CTable className="mb-0" bordered>
                            <CTableBody>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-50 text-center" color="secondary" scope="row">시공 퀄리티</CTableHeaderCell>
                                    <CTableDataCell className="w-50 border-end-0">{data.constructionQuality}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                    <CCol>
                        <CTable className="mb-0" bordered>
                            <CTableBody>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-50 text-center border-end-0" color="secondary" scope="row">친절도</CTableHeaderCell>
                                    <CTableDataCell className="w-50 border-end-0">{data.kindness}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                    <CCol>
                        <CTable className="mb-0" bordered>
                            <CTableBody>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="w-50 text-center" color="secondary" scope="row">제품에 대한 설명</CTableHeaderCell>
                                    <CTableDataCell className="w-50">{data.explainProduct}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                </CRow>
                <CRow xs={{ gutter: 0 }}>
                    <CCol>
                        <CTable bordered>
                            <CTableBody>
                                <CTableRow className="border-top-0">
                                    <CTableHeaderCell className="text-center" color="secondary" scope="row">업체 소개글</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell className="pb-5">{data.introduction}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                </CRow>
            </CContainer>
        </>
    );
}

export default CompanyDetails;
