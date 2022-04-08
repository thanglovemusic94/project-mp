import { CButton, CCol, CContainer, CForm, CFormInput, CHeader, CHeaderBrand, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AutoTable, { AutoTableCellType } from "../../commons/AutoTable";
import CFSelect from "../../commons/CFSelect";
import Pagination from "../../commons/Pagination";
import CompanyService from "../../services/CompanyService";
import { handleChange, handlePageChange } from "../../utils/StateUtils";


function CompanyManagement() {
    const location = useLocation()
    const [filter, setFilter] = useState({
        usageStatus: '',
        optionSearch: '',
        term: '',
    });

    const [data, setData] = useState({
        'content': [],
        'totalPages': 10
    });

    const [paging, setPaging] = useState({
        'page': 0,
        'size': 10,
        sort: ['id,desc']
    });


    function handleFilterSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        setPaging({ ...paging, 'page': 0 })
    }

    useEffect(() => {
        CompanyService.getCompanies(paging, filter).then(res => {
            if (res.status === 200) {
                setData(res.data);
            }
        }).catch(e => console.log(e));
        // eslint-disable-next-line
    }, [paging]);


    const tableConfigs = [
        { 'header': '업체코드', 'type': AutoTableCellType.Text, 'bindingKey': 'companyCode' },
        { 'header': '사용여부​', 'type': AutoTableCellType.Text, 'bindingKey': 'usageStatus' },
        { 'header': '업체명', 'type': AutoTableCellType.URL, 'bindingKey': 'companyCode', 'bindingUrlMask': 'companyName', 'baseURL': '/companies/:companyCode/details' },
        { 'header': '업체회원 ID', 'type': AutoTableCellType.Text, 'bindingKey': 'companyId' },
        { 'header': '업체 등록일', 'type': AutoTableCellType.TimeZone, 'bindingKey': 'registrationDate', 'format': 'YYYY.MM.DD' },
        { 'header': '이용 만료일', 'type': AutoTableCellType.TimeZone, 'bindingKey': 'expiredDateTime', 'format': 'YYYY.MM.DD' },
        { 'header': '견적 전달 수', 'type': AutoTableCellType.Text, 'bindingKey': 'numberDeliveredQuotes' },
        { 'header': '시공완료 수', 'type': AutoTableCellType.Text, 'bindingKey': 'numberConstructionCompleted' },
        { 'header': '평점', 'type': AutoTableCellType.Text, 'bindingKey': 'rating' },
        { 'header': '후기', 'type': AutoTableCellType.Text, 'bindingKey': 'totalReview' }
    ];


    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>업체 관리</CHeaderBrand>
            </CHeader>

            <FilterBar options={filter} onOptionsChange={setFilter} onFilterSubmit={handleFilterSubmit} />

            <AutoTable configs={tableConfigs} source={data.content} indexColumn={false} />

            {data.content.length > 0 &&
                <Pagination
                    url={location.pathname}
                    name="page"
                    selectedPage={paging.page}
                    onPageChange={(e, v) => handlePageChange(e, v, paging, setPaging)}
                    totalPages={data.totalPages} />}

        </CContainer >
    );
}

function FilterBar({ options, onOptionsChange, onFilterSubmit }) {

    const filterOptions = {
        usageStatus: {
            USE: '사용',
            UNUSED: '미사용'
        },
        optionSearch: {
            COMPANY_NAME: '업체명',
            COMPANY_MEMBER_ID: '업체회원 ID'
        },
        term: ''
    }

    return (
        <CForm noValidate onSubmit={onFilterSubmit} className="my-5">
            <CRow >
                <CCol>
                    <CRow>
                        <CCol>
                            <div className="d-flex">
                                <span className="w-25 align-self-center">사용여부</span>
                                <div className="w-75">
                                    <CFSelect name="usageStatus" options={filterOptions.usageStatus} onChange={(e) => handleChange(e, options, onOptionsChange)} />
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol>
                    <div className="d-flex">
                        <CFSelect className="w-25 me-2" name="optionSearch" options={filterOptions.optionSearch} onChange={(e) => handleChange(e, options, onOptionsChange)} />
                        <div className="w-75">
                            <CFormInput name="term" type="search" placeholder="검색" defaultValue={filterOptions.term} onChange={(e) => handleChange(e, options, onOptionsChange)} />
                        </div>
                    </div>
                </CCol>
                <CCol>
                    <CRow>
                        <CCol>
                            <div className="d-flex justify-content-end">
                                <CButton className="w-25" type="submit" color="dark" >
                                    검색
                                </CButton>
                            </div>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </CForm>
    );
}

export default CompanyManagement;
