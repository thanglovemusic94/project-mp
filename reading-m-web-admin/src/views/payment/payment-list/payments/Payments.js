import React, { useEffect, useRef, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputCheckbox,
    CInputGroup,
    CInputGroupAppend,
    CLabel,
    CPagination,
    CRow,
    CSelect,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { trackPromise } from 'react-promise-tracker'
import { PaymentService } from "../../../../services/PaymentService";
import { UserService } from "../../../../services/UserService";
import moment from "moment";
import { DateUtils } from "../../../../utils/DateUtils";
import { TutorType } from 'src/constants/tutor.type.constants'
import checkClassType from "../../../../constants/class.constants";
import { PaymentMethod } from "../../../../constants/payment.method.constants";
import convertPaymentMethod from "../../../../constants/payment.method.constants";
import { PaymentStatus } from "../../../../constants/payment.status.constants";
import convertPaymentStatus from "../../../../constants/payment.status.constants";
import NumberFormat from "react-number-format";
import { UserRole } from "../../../../constants/role.constants";


export default function Payments() {

    const term = useRef();
    const [tutors, setTutors] = useState([{ "name": "" }]);

    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: "id,DESC",
        classType: '',
        method: '',
        status: '',
        tutorName: '',
        startTime: '',
        endTime: '',
        optionSearch: '',
        term: '', // payer name, payment class name, final payment amount.
    })

    const [isDisable, setIsDisable] = useState(true)

    const handleInputChange = event => {
        const { name, value } = event.target;
        setParams({ ...params, [name]: value, term: term.current.value })
    };

    const handleStartDateChange = date => {
        if (date)
            setParams({ ...params, startTime: moment(date).format("YYYY-MM-DD") })
        else {
            setParams({ ...params, startTime: '' })
        }
    };

    const handleEndDateChange = date => {
        if (date)
            setParams({ ...params, endTime: moment(date).format("YYYY-MM-DD") })
        else {
            setParams({ ...params, endTime: '' })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: term.current.value });
    };

    const refreshdata = () => PaymentService.getAll(params).then((resp) => {
        setCheck(false);
        setCheckTable(initialSelect);
        setData(resp.data)
    })

    useEffect(() => {
        trackPromise(
            refreshdata(),
            UserService.getAllUserByRole(UserRole.TUTOR.value).then((res) => {
                setTutors(res.data)
            })
        )

    }, [params])

    const [check, setCheck] = useState(false);
    const initialSelect = new Array(params.size).fill(false)
    const [checkTable, setCheckTable] = useState(initialSelect);


    function handlePageChange(pageNumber) {
        if (pageNumber > 0) {
            --pageNumber;
        }
        setParams({ ...params, page: pageNumber })
    }

    const _onChangeHeaderCheckbox = (e) => {
        if (e.target.checked === true) {
            setCheck(true);
            setCheckTable(data.content.map(() => true));
            setIsDisable(false);
        } else {
            setCheck(false);
            setCheckTable(data.content.map(() => false));
            setIsDisable(true);
        }
    };

    const _onChangeRowCheckbox = (event, index) => {
        let sizeTrue = 0
        setCheckTable(checkTable.map((item, idx) => {
            if (item === true) sizeTrue++
            return (idx === index) ? !item : item
        }));

        if (event.target.checked === false && sizeTrue <= 1) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    };


    function handleDownLoad() {
        const ids = [];
        checkTable.map((item, idx) => {
            if (item === true) {
                ids.push(data.content[idx].id)
            }
        });

        PaymentService.download(ids)
            .then(response => {
                const blog = new Blob([response.data]);
                const url = window.URL.createObjectURL(blog);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Payment List_${moment().format('YYYYMMDD')}.xlsx`); //or any other extension
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(e => {
                console.log(e);
            })
            ;
    }

    return (
        <>
            <h2 className="mb-4">결제 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <div className="form-inline mb-4">
                            <CFormGroup className="mr-2">
                                <CSelect custom name="classType" onChange={handleInputChange} defaultValue={TutorType.ALL.value}>
                                    <option value={TutorType.ALL.value}>{TutorType.ALL.label}</option>
                                    <option value={TutorType.LIVE_BOOK.value}>{TutorType.LIVE_BOOK.label}</option>
                                    <option value={TutorType.LIVE_GOAL.value}>{TutorType.LIVE_GOAL.label}</option>
                                    <option value={TutorType.MATHEMATICS.value}>{TutorType.MATHEMATICS.label}</option>
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup className="mr-2">
                                <CSelect custom name="method" onChange={handleInputChange} defaultValue={PaymentMethod.ALL.value}>
                                    <option value={PaymentMethod.ALL.value}>{PaymentMethod.ALL.label}</option>
                                    <option value={PaymentMethod.CREDIT_CARD.value}>{PaymentMethod.CREDIT_CARD.label}</option>
                                    <option value={PaymentMethod.BANK_TRANSFER.value}>{PaymentMethod.BANK_TRANSFER.label}</option>
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup className="mr-2">
                                <CSelect custom name="tutorName" defaultValue="" onChange={handleInputChange}>
                                    <option value="">담당 전체</option>
                                    {tutors.map((value, index) => {
                                        return (
                                            <option key={index} id={index} value={value.name}>{value.name}</option>
                                        );
                                    })}
                                </CSelect>
                            </CFormGroup>

                            <CFormGroup className="mr-2">
                                <CSelect custom name="status" onChange={handleInputChange} defaultValue="">
                                    <option value="">{PaymentStatus.ALL.label}</option>
                                    <option value={PaymentStatus.COMPLETED.value}>{PaymentStatus.COMPLETED.label}</option>
                                </CSelect>
                            </CFormGroup>
                        </div>
                        <CFormGroup row>
                            <CCol md="6" className="d-flex form-inline">
                                <div className="d-flex form-inline">
                                    <DatePicker
                                        name="startDate"
                                        selected={params.startTime ? new Date(params.startTime) : ""}
                                        onChange={(date) => handleStartDateChange(date)}
                                        className="mx-2"
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="YYYY.MM.DD"
                                    />
                                    <span className="mx-2">~</span>
                                    <DatePicker
                                        name="endDate"
                                        selected={params.endTime ? new Date(params.endTime) : ""}
                                        onChange={(date) => handleEndDateChange(date)}
                                        className="mx-2"
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="YYYY.MM.DD"
                                    />
                                </div>
                            </CCol>
                            <CCol md="6" className="form-inline">
                                <CFormGroup className="col-3 justify-content-end">
                                    <CSelect custom name="optionSearch" onChange={handleInputChange} defaultValue="">
                                        <option value="">선택</option>
                                        <option value="payerName">결제자 이름</option>
                                        <option value="amount">최종 결제 금액</option>
                                    </CSelect>
                                </CFormGroup>
                                <CInputGroup className="col-9 justify-content-end">
                                    <CInput
                                        type="text"
                                        name="term"
                                        placeholder="검색어를 입력해주세요."
                                        innerRef={term}
                                    />
                                    <CInputGroupAppend>
                                        <CButton type="submit" color="dark">
                                            검색
                                        </CButton>
                                    </CInputGroupAppend>
                                </CInputGroup>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                    <table className="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th style={{ width: '5%' }}>
                                    {data.content.length > 0 &&
                                    <CFormGroup variant="custom-checkbox">
                                        <CInputCheckbox
                                            onChange={_onChangeHeaderCheckbox}
                                            id="autohide"
                                            custom
                                            checked={check}
                                        />
                                        <CLabel variant="custom-checkbox" htmlFor="autohide">
                                        </CLabel>
                                    </CFormGroup>
                                    }

                                </th>
                                <th>번호</th>
                                <th>결제일시</th>
                                <th>결제자 이름</th>
                                <th>결제 수업 정보</th>
                                <th>교사명</th>
                                <th>최종 결제 금액</th>
                                <th>결제 상태</th>
                                <th>결제 수단</th>
                                <th>상세</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.content.map((payment, index) => (

                                    <tr key={index}>
                                        <td>
                                            <CFormGroup variant="custom-checkbox">
                                                <CInputCheckbox
                                                    onChange={(event) => _onChangeRowCheckbox(event, index)}
                                                    id={"check" + index}
                                                    value={payment.id}
                                                    checked={checkTable[index]}
                                                    custom
                                                />
                                                <CLabel variant="custom-checkbox" htmlFor={"check" + index}>
                                                </CLabel>
                                            </CFormGroup>
                                        </td>
                                        <td> {
                                            (data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)
                                        }</td>
                                        <td>{DateUtils.toLocalDate(payment.paymentTime)}</td>
                                        <td>{payment.payerName}</td>
                                        <td>[{checkClassType(payment.classType)}] {payment.className}</td>
                                        <td>{payment.tutorName}</td>
                                        <td>
                                            <NumberFormat value={payment.payValue} thousandSeparator={true}
                                                displayType={'text'} /> 원
                                        </td>
                                        <td>{convertPaymentStatus(payment.status)}</td>
                                        <td>{convertPaymentMethod(payment.method)}</td>
                                        <td>
                                            <CButton
                                                block
                                                color="dark"
                                                size="sm"
                                                to={"/payment/payment-list/payment-details/" + payment.id}
                                            >
                                                상세
                                            </CButton>
                                        </td>
                                    </tr>

                                ))}
                        </tbody>
                    </table>

                    <CRow className="justify-content-between">
                        <CCol md="3">
                            <CButton className="mr-1" block color="success" disabled={isDisable}
                                onClick={() => handleDownLoad()}>
                                선택 항목 Excel 다운로드
                            </CButton>
                        </CCol>
                    </CRow>

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


