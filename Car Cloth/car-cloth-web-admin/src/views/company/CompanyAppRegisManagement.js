import {CButton, CContainer, CForm, CFormInput, CHeader, CHeaderBrand} from "@coreui/react";
import {useEffect, useState} from "react";
import { useLocation } from "react-router";
import AutoTable, {AutoTableCellType} from "../../commons/AutoTable";
import CFSelect from "../../commons/CFSelect";
import Pagination from "../../commons/Pagination";
import REGISTRATION_STATUS from "../../constants/RegistrationStatus";
import CompanyService from "../../services/CompanyService";
import {handleChange, handlePageChange} from "../../utils/StateUtils";


const PROCESSING_STATUS = ['', 'WAITING', 'APPROVE', 'REJECT'];
const SEARCH_OPTIONS = ['APPLICANT_ID', 'COMPANY_NAME'];

/* MAIN COMPONENT */
function CompanyAppRegisManagement() {
    const location = useLocation()

    const [filter, setFilter] = useState({
        'processingStatus': 0,
        'searchOption': 0,
        'searchValue': '',
        'inSearchOptions': {
            'processingStatus': 0,
            'searchOption': 0,
            'searchValue': '',
        }
    });

    const tableConfigs = [
        {
            'header': '업체명',
            'type': AutoTableCellType.URL,
            'bindingKey': 'companyCode',
            'bindingUrlMask': 'companyName',
            'baseURL': "/companies/registration/:companyCode/details"
        },
        { 'header': '신청자 ID', 'type': AutoTableCellType.Text, 'bindingKey': 'applicantId' },
        { 'header': '신청자 이름', 'type': AutoTableCellType.Text, 'bindingKey': 'applicantName' },
        { 'header': '연락처', 'type': AutoTableCellType.Text, 'bindingKey': 'contact' },
        {
            'header': '처리상태',
            'type': AutoTableCellType.Custom,
            'bindingKey': 'processingStatus',
            'render': (status) => {
                return REGISTRATION_STATUS[status];
            }
        },
        { 'header': '접수일', 'type': AutoTableCellType.DateTime, 'bindingKey': 'accessDate', 'format': 'YYYY.MM.DD' }
    ];

    const [data, setData] = useState({
        'content': [],
        'totalPages': 0
    });

    const [paging, setPaging] = useState({
        'page': 0,
        'size': 10,
        sort: ['id,desc']
    });

    useEffect(() => {
        const filterValue = generateFilterValue(filter.inSearchOptions);

        CompanyService.getCompanyRegistrationApplications(paging, filterValue).then(res => {

            if (res.status === 200) {

                setData(res.data);
            }
        });
        // eslint-disable-next-line
    }, [paging]);

    function generateFilterValue(base) {
        const status = base.processingStatus !== '' ? PROCESSING_STATUS[parseInt(base.processingStatus)] : '';
        const searchOpt = base.searchOption !== '' ? SEARCH_OPTIONS[parseInt(base.searchOption)] : '';

        const filterValue = {
            'processingStatus': status,
            'optionSearch': searchOpt,
            'term': base.searchValue
        }

        return filterValue;
    }

    function syncSearchOptions() {
        const { inSearchOptions, ...options } = filter;

        setFilter({ ...filter, "inSearchOptions": { ...options } });
    }


    function handleFilterSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        syncSearchOptions();

        setPaging({ ...paging, 'page': 0 });
    }


    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>업체 등록 신청 목록</CHeaderBrand>
            </CHeader>

            <FilterBar
                options={filter}
                onOptionsChange={setFilter}
                onFilterSubmit={handleFilterSubmit}
            />

            <AutoTable
                configs={tableConfigs}
                source={data.content}
            />

            <Pagination
                url={location.pathname}
                name="page"
                selectedPage={paging.page}
                onPageChange={(e, v) => handlePageChange(e, v, paging, setPaging)}
                totalPages={data.totalPages}
            />
        </CContainer >
    );
}

function FilterBar({ options, onOptionsChange, onFilterSubmit }) {
    const filterOptions = {
        processingStatus: ['전체', '대기', '완료​', '반려'],
        searchOptions: ['신청자 ID', '업체명​']
    }

    return (
        <CForm className="d-flex mt-3" noValidate onSubmit={onFilterSubmit}>
            <div className="w-25"></div>
            <div className="d-flex w-75 justify-content-end">
                <div className="d-flex w-25 me-3">
                    <span className="align-self-center text-end me-1">처리상태</span>
                    <CFSelect
                        className="w-50"
                        name="processingStatus"

                        options={filterOptions.processingStatus}
                        onChange={(e) => handleChange(e, options, onOptionsChange)}
                    />
                </div>
                <div className="d-flex w-50">
                    <CFSelect
                        className="w-25 me-1"
                        name="searchOption"

                        options={filterOptions.searchOptions}
                        onChange={(e) => handleChange(e, options, onOptionsChange)}
                    />
                    <CFormInput
                        className="w-50 me-3"
                        name="searchValue"
                        type="search"
                        placeholder="검색"

                        value={options.searchValue}
                        onChange={(e) => handleChange(e, options, onOptionsChange)}
                    />
                    <CButton className="w-25" type="submit" color="dark" >
                        검색
                    </CButton>
                </div>
            </div>
        </CForm>
    );
}

export default CompanyAppRegisManagement;
