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
    CSelect
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import ModalSettleDetail from './ModalSettleDetail'
import { trackPromise } from 'react-promise-tracker'
import { UserService } from "../../../services/UserService";
import { SettlementService } from "../../../services/SettlementService";
import { DateUtils } from "../../../utils/DateUtils";
import moment from "moment";
import NumberFormat from "react-number-format";
import { TutorType } from 'src/constants/tutor.type.constants'
import { SettlementStatus } from 'src/constants/settlement.status.constants'
import checkClassType from 'src/constants/class.constants'

export default function TutorSettled() {
    const term = useRef();
    const [showSettleDetail, setShowSettleDetail] = useState(false)
    const [tutors, setTutors] = useState([{ "name": "" },]);
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [settlementId, setSettlementId] = useState(0) // pass in modal detail

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: ['id,DESC'],
        classType: "",
        settlementStatus: "",
        startTime: "",
        endTime: "",
        tutorName: "",
        optionSearch: '',
        term: "",
    })

    const [isDisable, setIsDisable] = useState(true)

    const handleInputChange = event => {
        const { name, value } = event.target;
        setParams({ ...params, [name]: value, term: term.current.value })
    };

    const handleTerm = (term) => {
        if (!term || term.trim().length === 0) {
            return ""
        }
    }

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

    var onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: term.current.value });
    };

    const refreshdata = () => SettlementService.getAll(params).then((resp) => {
        setCheck(false);
        setCheckTable(initialSelect);
        setData(resp.data)
    })

    useEffect(() => {
        trackPromise(
            refreshdata(),
            UserService.getAllUserByRole("TUTOR").then((res) => {
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
        if (e.target.checked == true) {
            setCheck(true);
            setCheckTable(data.content.map(() => true));
            setIsDisable(false)
        } else {
            setCheck(false);
            setCheckTable(data.content.map(() => false));
            setIsDisable(true)
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
        console.log(ids)
        SettlementService.download(ids)
            .then(response => {
                // console.log(response);
                const blog = new Blob([response.data]);
                const url = window.URL.createObjectURL(blog);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Settlement List_${moment().format('YYYYMMDD')}.xlsx`); //or any other extension
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(e => {
                console.log(e);
            })
            ;
    }

    function handleShowDetail(item) {
        setShowSettleDetail(!showSettleDetail)
        setSettlementId(item.id);
    }

    return (
        <>
            <h2 className="mb-4">지도교사 정산 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={onSubmit}>
                        <div className="form-inline mb-4">
                            <CFormGroup className="mr-2">
                                <CSelect custom name="classType" onChange={handleInputChange} defaultValue={TutorType.ALL.value}>
                                    <option value={TutorType.ALL.value}>{TutorType.ALL.label}</option>
                                    <option value={TutorType.LIVE_BOOK.value}>{TutorType.LIVE_BOOK.label}</option>
                                    <option value={TutorType.LIVE_GOAL.value}>{TutorType.LIVE_GOAL.label}</option>
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup className="mr-2">
                                <CSelect name="settlementStatus" onChange={handleInputChange} >
                                    <option value={SettlementStatus.ALL.value}>{SettlementStatus.ALL.label}</option>
                                    <option value={SettlementStatus.UN_SETTLED.value}>{SettlementStatus.UN_SETTLED.label}</option>
                                    <option value={SettlementStatus.SETTLEMENT_COMPLETED.value}>{SettlementStatus.SETTLEMENT_COMPLETED.label}</option>
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup className="mr-2">
                                <CSelect custom name="tutorName" onChange={handleInputChange} defaultValue="">
                                    <option value="">담당 전체</option>
                                    {tutors.map((tutors, index) => {
                                        return (
                                            <option id={index} value={tutors.name}>{tutors.name}</option>
                                        );
                                    })}
                                </CSelect>
                            </CFormGroup>
                        </div>
                        <CFormGroup row>
                            <CCol md="6">
                                <div className="form-inline">
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
                                        <option value="className">수업명</option>
                                        <option value="tuitionFee">교육비</option>
                                        <option value="payerNumber">결제 인원</option>
                                        <option value="fee">수수료</option>
                                        <option value="tax">세금</option>
                                        <option value="amount">정산금액</option>
                                    </CSelect>
                                </CFormGroup>
                                <CInputGroup className="col-9">
                                    <CInput
                                        type="text"
                                        id="term"
                                        name="term"
                                        innerRef={term}
                                        placeholder="검색어를 입력해주세요."
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
                                <th>수업 개설일</th>
                                <th>수업 종류</th>
                                <th>수업명</th>
                                <th>지도교사 이름</th>
                                <th>교육비</th>
                                <th>결제 인원</th>
                                <th>수수료</th>
                                <th>세금</th>
                                <th>PG사 수수료</th>
                                <th>정산금액</th>
                                <th>정산상태</th>
                                <th>정산 상세</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.content &&
                                data.content.map((item, index) => (


                                    <tr>
                                        <td>
                                            <CFormGroup variant="custom-checkbox">
                                                <CInputCheckbox
                                                    onChange={(event) => _onChangeRowCheckbox(event, index)}
                                                    id={"check" + index}
                                                    value={item.id}
                                                    checked={checkTable[index]}
                                                    custom
                                                />
                                                <CLabel variant="custom-checkbox" htmlFor={"check" + index}>
                                                </CLabel>
                                            </CFormGroup>
                                        </td>
                                        <td> {
                                            (data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)
                                        }
                                        </td>
                                        <td>{DateUtils.toLocalDate(item.liveClass.openDate)}</td>
                                        <td>{checkClassType(item.liveClass.type)}</td>
                                        <td>{item.liveClass.name}</td>
                                        <td>{item.liveClass.tutor.name}</td>
                                        <td>
                                            <NumberFormat value={item.liveClass.tuitionFee} thousandSeparator={true}
                                                displayType={'text'} /> 원
                                        </td>
                                        <td>{item.payerNumber} 명</td>
                                        <td>
                                            <NumberFormat value={item.fee} thousandSeparator={true} displayType={'text'} /> 원
                                        </td>
                                        <td>
                                            <NumberFormat value={item.tax} thousandSeparator={true} displayType={'text'} /> 원
                                        </td>
                                        <td>
                                            <NumberFormat value={item.pgFee} thousandSeparator={true}
                                                displayType={'text'} /> 원
                                        </td>
                                        <td>
                                            <NumberFormat value={item.amount} thousandSeparator={true}
                                                displayType={'text'} /> 원
                                        </td>

                                        <td>
                                            {
                                                (() => {
                                                    switch (item.status) {
                                                        case 'UN_SETTLED':
                                                            return (
                                                                <span>미정산</span>
                                                            )
                                                        case 'SETTLEMENT_COMPLETED':
                                                            return (
                                                                <span>정산 완료</span>
                                                            )

                                                        default:
                                                            return (
                                                                <span></span>
                                                            )
                                                    }
                                                })()
                                            }

                                        </td>


                                        <td>
                                            <CButton
                                                block
                                                color="dark"
                                                size="sm"
                                                onClick={() => handleShowDetail(item)}
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
                            className="mt-4"
                            align="center"
                            addListClass="some-class"
                            activePage={data.number + 1}
                            pages={data.totalPages}
                            onActivePageChange={handlePageChange}
                        />
                    }

                </CCardBody>
            </CCard>
            <ModalSettleDetail
                show={showSettleDetail}
                setShow={setShowSettleDetail}
                settlementId={settlementId}
                refreshdata={refreshdata}
            />
        </>
    )
}
