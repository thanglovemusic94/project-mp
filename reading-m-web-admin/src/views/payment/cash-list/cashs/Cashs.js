import React, { useEffect, useRef, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputGroup,
    CInputGroupAppend,
    CInputRadio,
    CLabel,
    CPagination,
    CSelect,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { trackPromise } from 'react-promise-tracker'
import { CashRequirementService } from "../../../../services/CashRequirementService";
import { DateUtils } from "../../../../utils/DateUtils";
import moment from "moment";
import NumberFormat from "react-number-format";
import { convertCashStatus, CashStatus } from "../../../../constants/cash.status.constants";


export default function Cashs() {
    const term = useRef();

    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [query, setQuery] = useState({
        page: 0,
        size: 10,
        sort: "id,DESC",
        status: '',
        start: '',
        end: '',
        optionSearch: '',
        query: ""
    })

    const handleInputChange = event => {
        const { name, value } = event.target;
        setQuery({ ...query, [name]: value, query: term.current.value })
    };

    const handleStartDateChange = date => {
        if (date)
            setQuery({ ...query, start: moment(date).format("YYYY-MM-DD") })
        else {
            setQuery({ ...query, start: '' })
        }
    };

    const handleEndDateChange = date => {
        if (date)
            setQuery({ ...query, end: moment(date).format("YYYY-MM-DD") })
        else {
            setQuery({ ...query, end: '' })
        }
    };

    function handlePageChange(pageNumber) {
        if (pageNumber > 0) {
            --pageNumber;
        }
        setQuery({ ...query, page: pageNumber })
    }

    const refreshdata = () => CashRequirementService.getAll(query).then((resp) => {
        setData(resp.data)
    }).catch(e => console.log(e))

    useEffect(() => {
        trackPromise(
            refreshdata()
        )
    }, [query])

    var onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setQuery({ ...query, query: term.current.value });
    };

    return (
        <>
            <h2 className="mb-4">현금 신청 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={onSubmit}>
                        <div className="radio-group-custom mb-3">
                            <CFormGroup variant="checkbox">
                                <CInputRadio
                                    id="radio1"
                                    name="status"
                                    value=""
                                    defaultChecked
                                    onChange={handleInputChange}
                                />
                                <CLabel variant="checkbox" htmlFor="radio1">
                                    전체
                                </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="checkbox">
                                <CInputRadio
                                    id="radio2"
                                    name="status"
                                    value={CashStatus.CASH_REQUEST.value}
                                    onChange={handleInputChange}
                                />
                                <CLabel variant="checkbox" htmlFor="radio2">
                                    {CashStatus.CASH_REQUEST.label}
                                </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="checkbox">
                                <CInputRadio
                                    id="radio3"
                                    name="status"
                                    value={CashStatus.CASH_COMPLETE.value}
                                    onChange={handleInputChange}
                                />
                                <CLabel variant="checkbox" htmlFor="radio3">
                                    {CashStatus.CASH_COMPLETE.label}
                                </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="checkbox">
                                <CInputRadio
                                    id="radio4"
                                    name="status"
                                    value={CashStatus.NON_CASH.value}
                                    onChange={handleInputChange}
                                />
                                <CLabel variant="checkbox" htmlFor="radio4">
                                    {CashStatus.NON_CASH.label}
                                </CLabel>
                            </CFormGroup>
                        </div>
                        <CFormGroup row>
                            <CCol md="6">
                                <div className="d-flex form-inline">
                                    <DatePicker
                                        name="start"
                                        selected={query.start ? new Date(query.start) : ""}
                                        onChange={(date) => handleStartDateChange(date)}
                                        className="mx-2"
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="YYYY.MM.DD"
                                    />
                                    ~
                                    <DatePicker
                                        name="end"
                                        selected={query.end ? new Date(query.end) : ""}
                                        onChange={(date) => handleEndDateChange(date)}
                                        className="mx-2"
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="YYYY.MM.DD"
                                    />
                                </div>
                            </CCol>

                            <CCol md="6">
                                <div className="form-inline">
                                    <CFormGroup className="col-3 justify-content-end">
                                        <CSelect custom name="optionSearch" onChange={handleInputChange} defaultValue="">
                                            <option value="">선택</option>
                                            <option value="userName">이름</option>
                                            <option value="point">현금 신청 포인트</option>
                                        </CSelect>
                                    </CFormGroup>
                                    <CInputGroup className="col-9 justify-content-end">
                                        <CInput
                                            name="name"
                                            placeholder="파일을 등록해주세요."
                                            innerRef={term}
                                        />
                                        <CInputGroupAppend>
                                            <CButton type="submit" color="dark">
                                                검색
                                            </CButton>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </div>
                            </CCol>

                        </CFormGroup>
                    </CForm>
                    <table className="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>번호</th>
                                <th>현금 신청 일시</th>
                                <th>이름</th>
                                <th>현금 신청 포인트</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.content.map((cash, index) => (
                                    <tr key={index}>
                                        <td>{(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}</td>
                                        <td>{DateUtils.toLocalDateTime(cash.requirementTime)}</td>
                                        <td>{cash.user.name}</td>
                                        <td>
                                            <NumberFormat value={cash.point} thousandSeparator={true}
                                                displayType={'text'} /> 포인트
                                        </td>
                                        <td>{convertCashStatus(cash.status)}</td>
                                        <td>
                                            <CButton
                                                block
                                                color="dark"
                                                size="sm"
                                                to={"/payment/cash-list/cash-details/" + cash.id}
                                            >
                                                상세
                                            </CButton>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {data.content.length > 0 &&
                        <CPagination
                            // doubleArrows={false}
                            className="mt-4"
                            align="center"
                            addListClass="some-class"
                            activePage={data.number + 1}
                            pages={data.totalPages}
                            limit={10}
                            onActivePageChange={handlePageChange}
                        />
                    }

                </CCardBody>
            </CCard>
        </>
    )
}


