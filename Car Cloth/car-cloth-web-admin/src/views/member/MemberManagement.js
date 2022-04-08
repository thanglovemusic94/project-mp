import { CButton, CCol, CContainer, CForm, CFormInput, CFormSelect, CHeader, CHeaderBrand, CRow } from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import AutoTable, { AutoTableCellType } from "../../commons/AutoTable";
import CFSelect from "../../commons/CFSelect";
import MaskedPhoneLabel from "../../commons/MaskedPhoneLabel";
import Pagination from "../../commons/Pagination";
import { isActiveMember, memberType, TYPE_SNS } from "../../constants/MemberStatus";
import { MEMBERS_ROUTER } from "../../constants/RouterConstant";
import { MemberService } from "../../services/MemberService";
import PointService from "../../services/PointService";
import { handleChange, handlePageChange } from "../../utils/StateUtils";

function MemberManagement() {
    const location = useLocation();
    const [data, setData] = useState();
    const refTerm = useRef();
    const [paging, setPaging] = useState({
        page: 0,
        size: 10,
        sort: ['id,DESC']
    });

    const [filter, setFilter] = useState({
        memberStatus: '',
        companyMember: '',
        companyGroupId: '',
        filter: '', //NUMEBER_ID OR NAME
        term: '', // VALUE OF NUMEBER_ID OR NAME
    });

    const [companyGroup, setCompanyGroup] = useState({})

    const tableConfigs = [
        { 'header': '회원상태', 'type': AutoTableCellType.Custom, 'bindingKey': 'lastLoggedIn', 'render': (lastLoggedIn) => isActiveMember(lastLoggedIn) },
        { 'header': '회원유형', 'type': AutoTableCellType.Custom, 'bindingKey': 'companyMember', render: (value) => memberType(value) },
        {
            'header': '업체 그룹', 'type': AutoTableCellType.Custom, 'bindingKey': 'group', render: (valueKey, dataItem) => {
                if (valueKey) {
                    return valueKey.name;
                } else {
                   if(dataItem.companyMember) return '기본그룹';
                   return '-';
                }
            }
        },
        { 'header': '이름', 'type': AutoTableCellType.Text, 'bindingKey': 'name' },
        { 'header': 'ID', 'type': AutoTableCellType.URL, 'bindingKey': 'id', 'bindingUrlMask': 'memberId', 'baseURL': MEMBERS_ROUTER.DETAILS },
        { 'header': 'SNS연동', 'type': AutoTableCellType.Custom, 'bindingKey': 'sns', 'render': (type) => TYPE_SNS[type] },
        {
            'header': '전화번호', 'type': AutoTableCellType.Custom, 'bindingKey': 'phone', 'render': (text) => {
                if (text && typeof text === 'string') {
                    return <MaskedPhoneLabel text={text} />
                } else {
                    return ""
                }
            }
        },
        { 'header': '가입일시', 'type': AutoTableCellType.TimeZone, 'bindingKey': 'createdOn' }
    ];

    function handleFilterSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        const termValue = refTerm.current.value
        setPaging({ ...paging, page: 0 })
        setFilter({ ...filter, term: termValue })
    }

    useEffect(() => {
        PointService.getAll(null).then(res => {
            if (res.status === 200) {
                const dataArry = res.data.reverse()
                let dataFilter = {}
                dataArry.forEach(value => {
                    dataFilter[value.id] = value.name
                })
                setCompanyGroup({ ...companyGroup, ...dataFilter })
            }
        }).catch(e => console.log(e))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        MemberService.getMembers({ ...paging, ...filter }).then(res => {
            setData(res.data);
        })
    }, [paging]);

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>회원 목록​</CHeaderBrand>
            </CHeader>

            <FilterBar options={filter} onOptionsChange={setFilter} onFilterSubmit={handleFilterSubmit} companyGroupId={companyGroup} refTerm={refTerm} />

            {
                data && <AutoTable configs={tableConfigs} source={data.content} />
            }

            {
                data && data.content.length > 0 &&
                <Pagination
                    url={location.pathname}
                    name="page"
                    selectedPage={data.number}
                    onPageChange={(e, v) => handlePageChange(e, v, paging, setPaging)}
                    totalPages={data.totalPages} />
            }

        </CContainer>
    );
}

function FilterBar({ options, onOptionsChange, onFilterSubmit, companyGroupId, refTerm }) {

    const filterOptions = {
        memberStatus: {
            NORMAL: '정상',
            UNACTIVATED: '휴면'
        },
        companyMember: {
            '': '전체',
            TRUE: '업체회원',
            FALSE: '일반회원'
        },
        companyGroupId: companyGroupId,
        filter: { //MEMBER_ID OR NAME
            NAME: '이름',
            MEMBER_ID: 'ID'
        },
        term: '', // VALUE OF NUMEBER_ID OR NAME
    };

    return (
        <CForm noValidate onSubmit={onFilterSubmit}>
            <CRow className="mt-2">
                <CCol>
                    <CRow>
                        <CCol>
                            <CFSelect name="memberStatus" className="w-75" options={filterOptions.memberStatus} onChange={(e) => handleChange(e, options, onOptionsChange)} />
                        </CCol>
                        <CCol>
                            <CFSelect name="companyMember" className="w-75" options={filterOptions.companyMember} onChange={(e) => handleChange(e, options, onOptionsChange)} />
                        </CCol>
                        <CCol>
                            <CFormSelect name="companyGroupId" onChange={(e) => handleChange(e, options, onOptionsChange)}>
                                <option key={`cf-select`} value={''}>전체</option>
                                {
                                    Object.keys(filterOptions.companyGroupId).map((key, index) => {
                                        return (
                                            <option key={`cf-select-${index}`} value={key}>{filterOptions.companyGroupId[key]}</option>
                                        );
                                    })
                                }
                            </CFormSelect>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol>
                    <CRow>
                        <CCol xs={10} className="d-flex">
                            <CFSelect name="filter" className="w-25 me-1" options={filterOptions.filter} onChange={(e) => handleChange(e, options, onOptionsChange)} />
                            <div className="w-75">
                                <CFormInput name="term" type="search" placeholder="검색" ref={refTerm} defaultValue={filterOptions.term} />
                            </div>
                        </CCol>
                        <CCol>
                            <CButton className="w-100" type="submit" color="dark">
                                검색
                            </CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </CForm>
    );
}

export default MemberManagement;
