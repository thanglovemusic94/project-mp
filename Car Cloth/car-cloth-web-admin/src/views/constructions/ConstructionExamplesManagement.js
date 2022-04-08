import {CButton, CCol, CContainer, CForm, CFormInput, CHeader, CHeaderBrand, CRow} from "@coreui/react";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import AutoTable, {AutoTableCellType} from "../../commons/AutoTable";
import CFSelect from "../../commons/CFSelect";
import Pagination from "../../commons/Pagination";
import DISPLAY_STATUS from "../../constants/DisplayStatus";
import {CONSTRUCTION_ROUTER} from "../../constants/RouterConstant";
import {ConstructionService} from "../../services/ConstructionService";
import {handleChange, handlePageChange} from "../../utils/StateUtils";

const EXPOSURE_STATUS = ['', 'SHOW', 'HIDE'];
const SEARCH_OPTIONS = ['writerId', 'writerName'];

/* MAIN COMPONENT */
function ConstructionExamplesManagement() {
    const location = useLocation();
    const paramsSearcher = new URLSearchParams(location.search);

    const [filter, setFilter] = useState({
        'exposureStatus': '',
        'companyName': paramsSearcher.get('companyName') ?? '',
        'searchOption': 0,
        'searchValue': '',
        'inSearchOptions': {
            'exposureStatus': '',
            'companyName': paramsSearcher.get('companyName') ?? '',
            'searchOption': 0,
            'searchValue': '',
        }
    });

    const [paging, setPaging] = useState({
        'page': 0,
        'size': 10
    });

    const [data, setData] = useState({
        'content': [],
        'totalPages': 10
    });

    const [selectedItems, setSelectedItems] = useState(null);

    const tableConfigs = [
        {
            'header': '노출상태​',
            'type': AutoTableCellType.Custom,
            'bindingKey': 'status',
            'render': (item) => {
                return DISPLAY_STATUS[item];
            }
        },
        { 'header': '업체​', 'type': AutoTableCellType.Text, 'bindingKey': 'quotation.company.companyName' },
        { 'header': '내용', 'type': AutoTableCellType.URL, 'bindingKey': 'id', 'bindingUrlMask': 'content', 'baseURL': CONSTRUCTION_ROUTER.EXAMPLES_DETAILS },
        { 'header': '작성자 ID', 'type': AutoTableCellType.Text, 'bindingKey': 'writer.memberId' },
        { 'header': '작성자', 'type': AutoTableCellType.Text, 'bindingKey': 'writer.name' },
        { 'header': '등록일', 'type': AutoTableCellType.DateTime, 'bindingKey': 'createdOn', 'format': 'YYYY.MM.DD' }
    ];

    useEffect(() => {
        const filterValue = generateFilterValue(filter.inSearchOptions);

        ConstructionService.getConstructionExamples(paging, filterValue).then((res) => {

            if (res.status === 200) {

                setData(res.data);

                let presetSelectedItems = [];
                for (let i = 0; i < res.data['content'].length; i++) {
                    presetSelectedItems.push(false);
                }

                setSelectedItems(presetSelectedItems);
            }
        })
        // eslint-disable-next-line
    }, [paging]);

    function generateFilterValue(base) {
        const status = base.exposureStatus !== '' ? EXPOSURE_STATUS[parseInt(base.exposureStatus)] : '';
        const searchOpt = base.searchOption !== '' ? SEARCH_OPTIONS[parseInt(base.searchOption)] : '';

        const filterValue = {
            'status': status,
            'companyName': base.companyName,
            'writerId': searchOpt === 'writerId' ? base.searchValue : '',
            'writerName': searchOpt === 'writerName' ? base.searchValue : ''
        }

        return filterValue;
    }

    function syncSearchOptions() {
        const { inSearchOptions, ...options } = filter;

        setFilter({ ...filter, "inSearchOptions": { ...options } });
    }

    function updateExposures(items) {

        ConstructionService.updateExampleStatus(items).then((res) => {

            if (res.status === 200) {
                window.location.href = CONSTRUCTION_ROUTER.EXAMPLES;
            }
        });
    }

    function handleFilterSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        syncSearchOptions();

        setPaging({ ...paging, 'page': 0 })
    }

    function handleOnCheckBoxChange(selectedIndex) {
        let newSelectedItems = [...selectedItems];

        if (selectedIndex === -1) {
            for (let i = 0; i < newSelectedItems.length; i++) {
                newSelectedItems[i] = true;
            }
        } else {
            newSelectedItems[selectedIndex] = !newSelectedItems[selectedIndex];
        }

        setSelectedItems(newSelectedItems);
    }

    function handleToggleItemExposure(status) {
        let updateItems = [];

        for (let i = 0; i < data.content.length; i++) {

            if (selectedItems[i] === true) {
                const item = {
                    'id': data.content[i].id,
                    'status': status === true ? 'SHOW' : 'HIDE'
                }

                updateItems.push(item);
            }
        }

        if (updateItems.length > 0) {
            updateExposures(updateItems);
        }
    }

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>시공 사례 목록​</CHeaderBrand>
            </CHeader>

            <FilterBar
                options={filter}
                onOptionsChange={setFilter}
                onFilterSubmit={handleFilterSubmit}
            />

            <AutoTable
                configs={tableConfigs}
                source={data.content}
                indexColumn={false}
                checkBoxColumn={true}
                onCheckBoxChange={handleOnCheckBoxChange}
            />

            <div className="w-25">
                <CButton color="dark"   className="w-25" onClick={() => handleToggleItemExposure(false)}>숨김</CButton>
                <CButton color="dark"   className="ms-3 w-25" onClick={() => handleToggleItemExposure(true)}>숨김 해제</CButton>
            </div>

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
        exposureStatus: ['전체', '노출', '숨김'],
        searchOptions: ['작성자 ID​', '작성자 이름']
    }

    return (
        <CForm noValidate onSubmit={onFilterSubmit}>
            <CRow className="mt-2">
                <CCol>
                    <CRow>
                        <CCol className="d-flex justify-content-center">
                            <span className="align-self-center">노출상태</span>
                            <div className="w-50 ms-2">
                                <CFSelect
                                    name="exposureStatus"

                                    options={filterOptions.exposureStatus}
                                    onChange={(e) => handleChange(e, options, onOptionsChange)}
                                />
                            </div>
                        </CCol>
                        <CCol className="d-flex justify-content-center">
                            <span className="align-self-center">업체명</span>
                            <div className="w-50 ms-2">
                                <CFormInput
                                    name="companyName"
                                    type="text"

                                    value={options.companyName}
                                    onChange={(e) => handleChange(e, options, onOptionsChange)}
                                >
                                </CFormInput>
                            </div>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol>
                    <CRow>
                        <CCol xs={10} className="d-flex">
                            <CFSelect
                                name="searchOption"
                                className="w-25 me-2"

                                options={filterOptions.searchOptions}
                                onChange={(e) => handleChange(e, options, onOptionsChange)}
                            />
                            <div className="w-75">
                                <CFormInput
                                    name="searchValue"
                                    type="search"
                                    placeholder="검색"

                                    value={options.searchValue}
                                    onChange={(e) => handleChange(e, options, onOptionsChange)}
                                />
                            </div>
                        </CCol>
                        <CCol>
                            <CButton className="w-100" type="submit" color="dark"  >
                                검색
                            </CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </CForm>
    );
}

export default ConstructionExamplesManagement;
