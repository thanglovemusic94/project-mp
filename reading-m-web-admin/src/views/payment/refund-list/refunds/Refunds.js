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
    CSelect
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { trackPromise } from 'react-promise-tracker'
import { RefundService } from "../../../../services/RefundService";
import DateTime from "../../../../common/DateTime";
import moment from "moment";
import NumberFormat from "react-number-format";
import checkClassType from "../../../../constants/class.constants";
import convertRefundStatus from "../../../../constants/refund.status.constants";
import convertPaymentMethod from "../../../../constants/payment.method.constants";
import { PaymentMethod } from "../../../../constants/payment.method.constants";


export default function Refunds() {

    const keywordSearch = useRef();
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [query, setQuery] = useState({
        page: 0,
        size: 10,
        sort: ["id,DESC"],
        status: '',
        method: '',
        startTime: '',
        endTime: '',
        optionSearch: '',
        term: '',
    })

    const handleInputChange = event => {
        const { name, value } = event.target;
        setQuery({ ...query, [name]: value, term: keywordSearch.current.value })
    };

    const handleStartDateChange = date => {
        if (date)
            // setQuery({...query, startTime: Date.parse(moment(date).toDate())})
            setQuery({ ...query, startTime: moment(date).format("YYYY-MM-DD") })
        else {
            setQuery({ ...query, startTime: '' })
        }
    };

    const handleEndDateChange = date => {
        if (date)
            setQuery({ ...query, endTime: moment(date).format("YYYY-MM-DD") })
        else {
            setQuery({ ...query, endTime: '' })
        }
    };

    var onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setQuery({ ...query, term: keywordSearch.current.value });
    };

    const refreshData = () => RefundService.getAll(query)
        .then((resp) => {
            setData(resp.data)
        }).catch(e => console.log(e))

    useEffect(() => {
        trackPromise(
            refreshData()
        )
    }, [query])

    function handlePageChange(pageNumber) {
        if (pageNumber > 0) {
            --pageNumber;
        }
        setQuery({ ...query, page: pageNumber })
    }

    return (
        <>
            <h2 className="mb-4">환불 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={onSubmit}>
                        <div className="radio-group-custom mb-2">
                            <CFormGroup variant="checkbox">
                                <CInputRadio
                                    id="radio1"
                                    defaultChecked
                                    name="status"
                                    value=""
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
                                    value="REFUND_REQUEST"
                                    onChange={handleInputChange}
                                />
                                <CLabel variant="checkbox" htmlFor="radio2">
                                    환불 신청
                                </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="checkbox">
                                <CInputRadio
                                    id="radio3"
                                    name="status"
                                    value="REFUND_COMPLETION"
                                    onChange={handleInputChange}
                                />
                                <CLabel variant="checkbox" htmlFor="radio3">
                                    환불 완료
                                </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="checkbox">
                                <CInputRadio
                                    id="radio4"
                                    name="status"
                                    value="NON_REFUNDABLE"
                                    onChange={handleInputChange}
                                />
                                <CLabel variant="checkbox" htmlFor="radio4">
                                    환불 불가
                                </CLabel>
                            </CFormGroup>

                            <CFormGroup className="mr-2">
                                <CSelect custom name="method" onChange={handleInputChange} defaultValue={PaymentMethod.ALL.value}>
                                    <option value={PaymentMethod.ALL.value}>{PaymentMethod.ALL.label}</option>
                                    <option value={PaymentMethod.CREDIT_CARD.value}>{PaymentMethod.CREDIT_CARD.label}</option>
                                    <option value={PaymentMethod.BANK_TRANSFER.value}>{PaymentMethod.BANK_TRANSFER.label}</option>
                                </CSelect>
                            </CFormGroup>
                        </div>

                        <CFormGroup row className="justify-content-end">
                            <CCol md="6">
                                <div className="d-flex form-inline">
                                    <DatePicker
                                        name="startDate"
                                        selected={query.startTime ? new Date(query.startTime) : ""}
                                        onChange={(date) => handleStartDateChange(date)}
                                        className="mx-2"
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="YYYY.MM.DD"
                                    />
                                    ~
                                    <DatePicker
                                        name="endDate"
                                        selected={query.endTime ? new Date(query.endTime) : ""}
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
                                            <option value="payerName">결제자 이름</option>
                                            <option value="className">결제 수업 정보</option>
                                            <option value="amount">최종 결제 금액</option>
                                        </CSelect>
                                    </CFormGroup>
                                    <CInputGroup className="col-9 justify-content-end">
                                        <CInput
                                            innerRef={keywordSearch}
                                            name="term"
                                            placeholder="파일을 등록해주세요."
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
                                <th>환불 신청 일시</th>
                                <th>결제자 이름</th>
                                <th>결제 수업 정보</th>
                                <th>최종 결제 금액</th>
                                <th>환불 상태</th>
                                <th>결제 수단</th>
                                <th>상세</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                data.content.map((refund, index) => (
                                    <tr key={index}>
                                        <td>
                                            {
                                                (data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)
                                            }
                                        </td>
                                        <td><DateTime format={'YYYY.MM.DD HH:mm:ss'} date={refund.refundTime} /></td>
                                        <td>{refund.payment.payer.name}</td>
                                        <td>[{checkClassType(refund.payment.classInformation.type)}] {refund.payment.classInformation.name}</td>
                                        <td>
                                            <NumberFormat value={refund.payment.payValue} thousandSeparator={true}
                                                displayType={'text'} /> 원
                                        </td>
                                        <td>{convertRefundStatus(refund.status)}</td>
                                        <td>{convertPaymentMethod(refund.method)}</td>
                                        <td>
                                            <CButton
                                                block
                                                color="dark"
                                                size="sm"
                                                to={"/payment/refund-list/refund-details/" + refund.id}
                                            >
                                                상세
                                            </CButton>
                                        </td>
                                    </tr>

                                ))}
                        </tbody>
                    </table>
                    {
                        data.content.length > 0 &&
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


