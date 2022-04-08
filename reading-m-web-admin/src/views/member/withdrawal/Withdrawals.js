import React, { useEffect, useState, useRef } from 'react'
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
    CPagination,
    CModal,
    CModalBody,
    CLabel,
    CInputRadio,
    CSelect
} from '@coreui/react'

import { trackPromise } from 'react-promise-tracker'
import { WithdrawalService } from 'src/services/WithdrawalService'
import DateTime from 'src/common/DateTime';
import { UserRole, convertRole } from 'src/constants/role.constants';
import { WithdrawalStatus, convertWithdrawalStatus } from 'src/constants/withdrawal.status.constants';

export default function Withdrawals() {
    const [withdrawalComfirm, setWithdrawalComfirm] = useState(false)
    const [withdrawalApprove, setWithdrawalApprove] = useState(false)
    const termInput = useRef();

    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        optionSearch: ''
    })

    const handleInputChange = event => {
        const { name, value } = event.target;
        setParams({ ...params, [name]: value, term: termInput.current.value })
    };

    const [selectedWithdrawalId, setSelectedWithdrawalId] = useState(-1)

    const handleApprove = (withdrawalId) => {
        setSelectedWithdrawalId(withdrawalId)
        setWithdrawalComfirm(true)
    }

    useEffect(() => {

        trackPromise(
            WithdrawalService.getWithdrawals(params).then((resp) => {
                if (resp.status === 200) {
                    setData(resp.data)
                }
            })
        )
    }, [params])

    function handlePageChange(page) {
        setParams({ ...params, page })
    }

    const onFormSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: termInput.current.value });
    }

    function handleWithdrawalApprove() {

        WithdrawalService.approveWithdrawal(selectedWithdrawalId).then((resp) => {
            if (resp.status === 204) {
                for (let i = 0; i < data.content.length; i++) {
                    if (data.content[i].id === selectedWithdrawalId) {
                        data.content[i].status = WithdrawalStatus.APPROVED.value

                        break;
                    }
                }

                setSelectedWithdrawalId(-1)

                setWithdrawalComfirm(!withdrawalComfirm)
                setWithdrawalApprove(!withdrawalApprove)

                setData({ ...data })
            }
        })
    }

    return (
        <>
            <h2 className="mb-4">탈퇴 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={onFormSubmit} className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="6" className="radio-group-custom rgc100">
                                <CFormGroup variant="checkbox">
                                    <CInputRadio
                                        id="radio1"
                                        name="radios"
                                        defaultChecked
                                        onChange={e => setParams({ ...params, memberType: "" })}
                                    />
                                    <CLabel
                                        variant="checkbox"
                                        htmlFor="radio1"
                                    >
                                        전체
                                    </CLabel>
                                </CFormGroup>
                                <CFormGroup variant="checkbox">
                                    <CInputRadio
                                        id="radio2"
                                        name="radios"
                                        value={UserRole.STUDENT.value}
                                        onChange={e => setParams({ ...params, memberType: e.target.value })}
                                    />
                                    <CLabel
                                        variant="checkbox"
                                        htmlFor="radio2"
                                    >
                                        {UserRole.STUDENT.label}
                                    </CLabel>
                                </CFormGroup>
                                <CFormGroup variant="checkbox">
                                    <CInputRadio
                                        id="radio3"
                                        name="radios"
                                        value={UserRole.PARENT.value}
                                        onChange={e => setParams({ ...params, memberType: e.target.value })}
                                    />
                                    <CLabel
                                        variant="checkbox"
                                        htmlFor="radio3"
                                    >
                                        {UserRole.PARENT.label}
                                    </CLabel>
                                </CFormGroup>
                                <CFormGroup variant="checkbox">
                                    <CInputRadio
                                        id="radio4"
                                        name="radios"
                                        value={UserRole.TUTOR.value}
                                        onChange={e => setParams({ ...params, memberType: e.target.value })}
                                    />
                                    <CLabel
                                        variant="checkbox"
                                        htmlFor="radio4"
                                    >
                                        {UserRole.TUTOR.label}
                                    </CLabel>
                                </CFormGroup>
                            </CCol>
                            <CCol md="6">
                                <div className="form-inline">
                                    <CFormGroup className="col-3 justify-content-end">
                                        <CSelect custom name="optionSearch" onChange={handleInputChange} defaultValue="">
                                            <option value="">선택</option>
                                            <option value="userName">이름</option>
                                            <option value="reason">탈퇴 사유</option>
                                        </CSelect>
                                    </CFormGroup>
                                    <CInputGroup className="col-9 justify-content-end">
                                        <CInput
                                            name="input2-group2"
                                            placeholder="파일을 등록해주세요."
                                            innerRef={termInput}
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
                                <th style={{ width: '10%' }}>번호</th>
                                <th style={{ width: '15%' }}>가입 유형</th>
                                <th style={{ width: '15%' }}>이름</th>
                                <th>탈퇴 사유</th>
                                <th style={{ width: '15%' }}>탈퇴일</th>
                                <th style={{ width: '15%' }}>탈퇴 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((withdrawal, index) => {
                                let indexNum = index + 1

                                return (
                                    <DataRow
                                        source={{ withdrawal, handleApprove }}
                                        number={(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}
                                        key={`withdrawal_row_${withdrawal.id}`}
                                    />
                                )
                            })}
                        </tbody>
                    </table>

                    <CPagination
                        activePage={data.number + 1}
                        pages={data.totalPages}
                        onActivePageChange={(i) => handlePageChange(i - 1)}
                        align="center"
                        className="mt-4"
                        limit={10}
                    />
                </CCardBody>
            </CCard>
            <CModal
                show={withdrawalComfirm}
                onClose={() => setWithdrawalComfirm(!withdrawalComfirm)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>탈퇴 승인 처리하시겠습니까?</p>
                    <CButton
                        variant="outline"
                        color="dark"
                        onClick={() => setWithdrawalComfirm(!withdrawalComfirm)}
                        className="mx-2"
                    >
                        취소
                    </CButton>
                    <CButton
                        color="dark"
                        onClick={handleWithdrawalApprove}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <CModal
                show={withdrawalApprove}
                onClose={() => setWithdrawalApprove(!withdrawalApprove)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>탈퇴 승인되었습니다.</p>

                    <CButton
                        color="dark"
                        onClick={() => setWithdrawalApprove(!withdrawalApprove)}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

function DataRow({ source, number }) {
    // const memberTypeMap = {TUTOR: "지도교사", STUDENT: "학생", PARENT: "학부모"}
    return (
        <tr>
            <td>{number}</td>
            <td>{convertRole(source.withdrawal.memberType)}</td>
            <td>{source.withdrawal.name}</td>
            <td>{source.withdrawal.reason}</td>
            <td><DateTime date={source.withdrawal.createdOn} format="YYYY.MM.DD" /></td>
            <td>
                {
                    (source.withdrawal.memberType === UserRole.TUTOR.value && source.withdrawal.status === WithdrawalStatus.WAITING.value) ?
                        <CButton
                            block
                            color="dark"
                            size="sm"
                            onClick={() => source.handleApprove(source.withdrawal.id)}
                        >
                            {WithdrawalStatus.WAITING.label}
                        </CButton>
                        :
                        convertWithdrawalStatus(source.withdrawal.status)
                }
            </td>
        </tr>
    )
}
