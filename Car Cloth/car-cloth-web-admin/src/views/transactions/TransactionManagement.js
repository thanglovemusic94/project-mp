import {CButton, CContainer, CForm, CFormInput, CFormSelect, CHeader, CHeaderBrand} from "@coreui/react";
import {useEffect, useRef, useState} from "react";
import CFSelect from "../../commons/CFSelect";
import AutoTable, {AutoTableCellType} from "../../commons/AutoTable";
import {TRANSACTION_ROUTER} from "../../constants/RouterConstant";
import {TransactionService} from "../../services/TransactionService";
import {handleChange, handlePageChange} from "../../utils/StateUtils";
import {ConstructionTypeConstant} from "../../constants/ConstructionTypeConstant";
import {TRANSACTION_STATUS} from "../../constants/TransactionStatus";
import { useLocation } from "react-router";
import Pagination from "../../commons/Pagination";


function TransactionManagement() {
    const location = useLocation()
    const termKey = useRef()
    const termValue = useRef()

    const optionsTransactionFilter = {transactionIn: "거래번호", memberId: "견적요청 회원 ID"}
    const tableConfigs = [
        {'header': '거래번호', 'type': AutoTableCellType.URL, 'bindingKey': 'id', 'baseURL': TRANSACTION_ROUTER.DETAILS},
        {
            'header': '진행상태',
            'type': AutoTableCellType.Custom,
            'bindingKey': 'status',
            'render': (item) => {
                return TRANSACTION_STATUS[item];
            }
        },
        {'header': '견적요청 회원', 'type': AutoTableCellType.Text, 'bindingKey': 'requester.name'},
        {'header': '견적요청 회원 ID', 'type': AutoTableCellType.Text, 'bindingKey': 'requester.memberId'},
        {
            'header': '시공유형',
            'type': AutoTableCellType.Custom,
            'bindingKey': 'constructionType',
            render: item => {
                if (item) {
                    return ConstructionTypeConstant[item]
                }
            }
        },
        {'header': '견적 요청일', 'type': AutoTableCellType.DateTime, 'bindingKey': 'createdOn', 'format': 'YYYY.MM.DD'}
    ];
    const [data, setData] = useState()
    const [query, setQuery] = useState({
        page: 0,
        size: 10,
        sort: ['id,DESC'],
        status: null,
    });

    function handleFilterSubmit(event) {
        event.preventDefault();
        delete query['transactionIn']
        delete query['memberId']
        const key = termKey.current.value
        const value = termValue.current.value
        setQuery({...query, [key]: value})
    }

    useEffect(() => {
        TransactionService.getTransactions(query).then((res) => {
            if (res.status === 200) {
                setData(res.data);
            }
        });
    }, [query]);

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>거래 목록</CHeaderBrand>
            </CHeader>

            <CForm className="d-flex my-5" noValidate onSubmit={handleFilterSubmit}>
                {/*<div className="w-25"></div>*/}
                <div className="d-flex w-75 justify-content-start">
                    <div className="d-flex w-25 me-3">
                        <span className="align-self-center text-end me-1">진행상태</span>
                        <CFSelect
                            className="w-50"
                            name="status"
                            options={TRANSACTION_STATUS}
                            onChange={(e) => {
                                handleChange(e, query, setQuery)
                            }}
                        />
                    </div>
                    <div className="d-flex w-50">
                        <CFormSelect className="w-25 me-1" ref={termKey}>
                            {
                                Object.keys(optionsTransactionFilter).map((key, index) => {
                                    return (
                                        <option key={`cf-select-${index}`} value={key}>{optionsTransactionFilter[key]}</option>
                                    );
                                })
                            }
                        </CFormSelect>

                        <CFormInput
                            className="w-50 me-3"
                            name="searchValue"
                            type="search"
                            placeholder="검색"
                            ref={termValue}
                        />
                    </div>

                </div>
                <div className={'w-25 text-end'}>
                    <CButton className="w-25" type="submit" color="dark">
                        검색
                    </CButton>
                </div>
            </CForm>

            {data &&
                <AutoTable
                    configs={tableConfigs}
                    source={data.content}
                    indexColumn={false}
                />
            }

            {
                data?.content.length > 0 &&
                <Pagination
                    url={location.pathname}
                    name="page"
                    selectedPage={data.number}
                    onPageChange={(e, v) => handlePageChange(e, v, query, setQuery)}
                    totalPages={data.totalPages}
                />
            }
        </CContainer>
    );
}

export default TransactionManagement;
