import React, { useEffect, useState } from 'react'
import { DateUtils } from 'src/utils/DateUtils'
import {
    CCardBody,
    CButton,
    CCard,
    CCol,
    CInputGroup,
    CInputGroupAppend,
    CInput,
    CFormGroup,
    CForm,
    CInputCheckbox,
    CPagination,
    CRow,
    CSelect,
    CLabel
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";

import { trackPromise } from 'react-promise-tracker'
import { MemberService } from 'src/services/MemberService'
import { useRef } from 'react'
import { UserRole } from 'src/constants/role.constants'
import { convertMemberType } from 'src/constants/member.type.constants'
import { convertRole } from 'src/constants/role.constants'
import { TutorType, convertTutorType } from 'src/constants/member.tutor.type.constants'

export default function Members() {

    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [parms, setParms] = useState({
        page: 0,
        size: 10,
        tutorType: '',
        memberType: ''
    })

    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {
        trackPromise(
            MemberService.getMembers(parms).then((resp) => {
                if (resp.status === 200) {
                    setData(resp.data)
                    clearCheck()
                }
            })
        )

    }, [parms])

    function handlePageChange(page) {
        if (page > -1) {
            setParms({ ...parms, page })
        }
    }

    const handleChangeQuery = e => {
        const { name, value } = e.target;
        setParms({ ...parms, [name]: value, term: termInput.current.value });
    }

    const handleChangeTime = (name, date) => {
        if (date) {
            setParms({ ...parms, [name]: moment(date).format("YYYY-MM-DD") });
        } else {
            setParms({ ...parms, [name]: "" });
        }
    }

    const termInput = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setParms({ ...parms, term: termInput.current.value });
    }

    const [checkTable, setCheckTable] = useState(new Array(parms.size).fill(false));
    const [checkAll, setCheckAll] = useState(false);

    const clearCheck = () => {
        setCheckTable(new Array(parms.size).fill(false));
    }

    const onSelectAll = e => {
        if (e.target.checked === true) {
            setCheckAll(true);
            setCheckTable(data.content.map(() => true));
            setIsDisable(false);
        } else {
            setCheckAll(false);
            setCheckTable(data.content.map(() => false));
            setIsDisable(true);
        }
    }


    const onSelect = (event, index) => {
        let sizeTrue = 0
        setCheckTable(
            checkTable.map((item, idx) => {
                if (item === true) sizeTrue++
                return (idx === index) ? !item : item
            }
            ));

        if (event.target.checked === false && sizeTrue <= 1) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }

    const handleDownload = () => {
        const ids = [];
        checkTable.map((item, idx) => {
            if (item === true) {
                ids.push(data.content[idx].id)
            }
        });

        MemberService.download(ids)
            .then(response => {
                const blog = new Blob([response.data]);
                const url = window.URL.createObjectURL(blog);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `MemberList_${moment().format('YYYYMMDD')}.xlsx`); //or any other extension
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <>
            <h2 className="mb-4">회원 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <CFormGroup row>
                            <CCol md="6">
                                <div className="form-inline">
                                    <CFormGroup className="mr-2">
                                        <CSelect custom name="tutorType" onChange={handleChangeQuery} defaultValue="">
                                            <option value="">수업 종류 전체</option>
                                            <option value={TutorType.LIVE_BOOK_TEXT.value}>{TutorType.LIVE_BOOK_TEXT.label}</option>
                                            <option value={TutorType.LIVE_GOAL.value}>{TutorType.LIVE_GOAL.label}</option>
                                        </CSelect>
                                    </CFormGroup>

                                    <CFormGroup className="mr-2">
                                        <CSelect custom name="memberType" id="memberType" onChange={handleChangeQuery} defaultValue="">
                                            <option value=''>가입 유형 전체</option>
                                            <option value={UserRole.STUDENT.value}>{UserRole.STUDENT.label}</option>
                                            <option value={UserRole.PARENT.value}>{UserRole.PARENT.label}</option>
                                            <option value={UserRole.TUTOR.value}>{UserRole.TUTOR.label}</option>
                                        </CSelect>
                                    </CFormGroup>
                                    <DatePicker
                                        name="signupFrom"
                                        selected={parms.signupFrom ? new Date(parms.signupFrom) : ""}
                                        onChange={date => handleChangeTime("signupFrom", date)}
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="YYYY.MM.DD"
                                    />
                                    <span className="mx-2">~</span>
                                    <DatePicker
                                        name="signupTo"
                                        selected={parms.signupTo ? new Date(parms.signupTo) : ""}
                                        onChange={date => handleChangeTime("signupTo", date)}
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="YYYY.MM.DD"
                                    />
                                </div>
                            </CCol>
                            <CCol md="6">
                                <div className="form-inline">
                                    <CFormGroup className="col-3 justify-content-end">
                                        <CSelect custom name="optionSearch" onChange={handleChangeQuery} defaultValue="">
                                            <option value="">선택</option>
                                            <option value="userName">이름</option>
                                            <option value="point">현금 신청 포인트</option>
                                        </CSelect>
                                    </CFormGroup>
                                    <CInputGroup className="col-9 justify-content-end">
                                        <CInput
                                            type="text"
                                            id="input2-group2"
                                            name="term"
                                            innerRef={termInput}
                                            placeholder="검색어를 입력해주세요."
                                        />
                                        <CInputGroupAppend>
                                            <CButton color="dark" type="submit">
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
                                <th style={{ width: '5%' }}>
                                    <CFormGroup
                                        variant="custom-checkbox"
                                    >
                                        <CInputCheckbox
                                            onChange={onSelectAll}
                                            id="checkAll"
                                            checked={checkAll}
                                            custom
                                        />
                                        <CLabel variant="custom-checkbox" htmlFor="checkAll">
                                        </CLabel>
                                    </CFormGroup>
                                </th>
                                <th>번호</th>
                                <th>구분</th>
                                <th>가입 유형</th>
                                <th>학년</th>
                                <th>이름</th>
                                <th>ID</th>
                                <th>휴대폰 번호</th>
                                <th>이메일</th>
                                <th>수업 종류</th>
                                <th>가입일</th>
                                <th>회원 상세</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((member, index) => {
                                let detailUrl = ""

                                if (member.role === "TUTOR") {
                                    detailUrl = '/member/member-list/tutor/Tutor'
                                } else
                                    if (member.role === "STUDENT") {
                                        detailUrl = '/member/member-list/student/Student'
                                    } else
                                        if (member.role === "PARENT") {
                                            detailUrl = '/member/member-list/parent/Parent'
                                        }

                                return (
                                    <DataRow
                                        source={{ member, detailUrl, onSelect, checkTable }}
                                        number={(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}
                                        key={index}
                                    />
                                )
                            }
                            )}
                        </tbody>
                    </table>

                    <CRow className="justify-content-between">
                        <CCol md="3">
                            <CButton className="mr-1" block color="success" disabled={isDisable}
                                onClick={() => handleDownload()}>
                                선택 항목 Excel 다운로드
                            </CButton>
                        </CCol>
                    </CRow>

                    <CPagination
                        activePage={data.number + 1}
                        pages={data.totalPages}
                        onActivePageChange={(i) => handlePageChange(i - 1)}
                        // doubleArrows={false}
                        align="center"
                        className="mt-4"
                        limit={10}
                    />
                </CCardBody>
            </CCard>
        </>
    )
}

function DataRow({ source, number }) {
    const onSelect = source.onSelect;
    const checkTable = source.checkTable;

    return (
        <tr>
            <td>
                <CFormGroup
                    variant="custom-checkbox"
                >
                    <CInputCheckbox
                        onChange={(event) => onSelect(event, source.indexNum - 1)}
                        id={"check" + source.indexNum}
                        value={source.member.id}
                        checked={checkTable[source.indexNum - 1]}
                        custom
                    />
                    <CLabel variant="custom-checkbox" htmlFor={"check" + source.indexNum}>
                    </CLabel>
                </CFormGroup>
            </td>
            <td>{number}</td>
            <td>{convertMemberType(source.member.classSource)}</td>
            <td>{convertRole(source.member.role)}</td>
            <td>{source.member.grade > 0 ? source.member.grade + "학년" : ""}</td>
            <td>{source.member.name}</td>
            <td>{source.member.memberId}</td>
            <td>{source.member.phone}</td>
            <td>{source.member.email}</td>
            <td>{convertTutorType(source.member.tutorType)}</td>
            <td>{DateUtils.toLocalDate(source.member.createdOn)}</td>
            <td>
                <CButton
                    block
                    color="dark"
                    size="sm"
                    to={{ pathname: source.detailUrl, data: source.member }}
                >
                    수정
                </CButton>
            </td>
        </tr>
    )
}
