import React, { useState } from 'react'
import {
    CCardBody,
    CButton,
    CCard,
    CCol,
    CInput,
    CRow,
    CModalBody,
    CModal,
    CFormGroup,
    CInputRadio,
    CLabel,
} from '@coreui/react'

import ModalSelectMembers from '../../ModalSelectMembers'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { PointPaymentService } from 'src/services/PointPaymentService'
import { UserRole } from 'src/constants/role.constants'

const PointRegister = () => {
    const [data, setData] = useState(
        {
            "id": -1,
            "type": "CASH_POINT",
            "issuingMode": "ALL",
            "startValidDate": new Date(),
            "endValidDate": new Date(),
            "parents": []
        }
    )
    const [small, setSmall] = useState(false)
    const [showOn, setModalSelectMembers] = useState(false)

    const showModalSelectMembers = () => {
        setModalSelectMembers(!showOn)
    }

    function handleCreatePointPayment() {
        const parentIdList = data.parents.map(p => p.id);
        PointPaymentService.createPointPayment({...data, parentIdList: parentIdList}).then((resp) => {

            if (resp.status === 201) {
                setSmall(!small)
            }
        })
    }

    function handleMemberSelect(selectedMembers) {
        setData({...data, parents: [...selectedMembers]})
    }

    function handleRemoveSelectedMember(index) {
        let members = [...data.parents]
        
        members.splice(index, 1)

        setData({...data, parents: [...members]})
    }

    return (
        <>
            <h2 className="mb-4">포인트 지급</h2>
            <CCard>
                <CCardBody>
                    <div className="d-flex justify-content-end">
                        <p className="text-danger">
                            * 표시된 영역은 필수 입력 영역 입니다.
                        </p>
                    </div>

                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    구분
                                </td>
                                <td>
                                    <div className="radio-group-custom">
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio1"
                                                name="radios"
                                                value="CASH_POINT"
                                                onChange={(e) => setData({...data, "type": e.target.value})}
                                                defaultChecked
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio1"
                                            >
                                                현금 포인트
                                            </CLabel>
                                        </CFormGroup>
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio2"
                                                name="radios"
                                                value="EVENT_POINT"
                                                onChange={(e) => setData({...data, "type": e.target.value})}
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio2"
                                            >
                                                이벤트 포인트
                                            </CLabel>
                                        </CFormGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    포인트명
                                </td>
                                <td>
                                    <div className="form-inline">
                                        <CInput
                                            className="col-6"
                                            placeholder="point_name"
                                            onChange={(e) => setData({...data, "name": e.target.value})}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    지급 포인트
                                </td>
                                <td>
                                    <div className="form-inline">
                                        <CInput
                                            className="col-6"
                                            placeholder="point"
                                            onChange={(e) => setData({...data, "amount": e.target.value})}
                                        />
                                        <span className="ml-2">포인트</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    유효기간
                                </td>
                                <td>
                                    <div className="d-flex">
                                        <DatePicker
                                            selected={data.startValidDate}
                                            onChange={(date) =>
                                                setData({...data, "startValidDate": date})
                                            }
                                            className="mx-2"
                                        />
                                        ~
                                        <DatePicker
                                            selected={data.endValidDate}
                                            onChange={(date) =>
                                                setData({...data, "endValidDate": date})
                                            }
                                            className="mx-2"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    지급 회원
                                </td>
                                <td>
                                    <CFormGroup variant="custom-radio" inline>
                                        <CInputRadio
                                            custom
                                            id="all-parents"
                                            name="inline-radios"
                                            value="ALL"
                                            onClick={(e) => setData({...data, "issuingMode": e.target.value, "parents": []})}
                                            defaultChecked
                                        />
                                        <CLabel
                                            variant="custom-checkbox"
                                            htmlFor="all-parents"
                                        >
                                            학부모 전체
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="custom-radio" inline>
                                        <CInputRadio
                                            custom
                                            id="select-member"
                                            name="inline-radios"
                                            value="SELECT"
                                            onClick={(e) => setData({...data, "issuingMode": e.target.value})}
                                        />
                                        <CLabel
                                            variant="custom-checkbox"
                                            htmlFor="select-member"
                                        >
                                            회원 선택
                                        </CLabel>
                                    </CFormGroup>
                                    <CButton
                                        size="sm"
                                        color="secondary"
                                        shape="pill"
                                        onClick={showModalSelectMembers}
                                        hidden={data.issuingMode === "ALL"}
                                    >
                                        <CIcon name="cil-plus" /> 회원 선택
                                    </CButton>
                                    <div className="selected-member-list">
                                        <ol>
                                            {
                                                data.parents.map((item, index) => {

                                                    return (
                                                        <li key={index}>
                                                            <span>{item.name}</span>
                                                            <CIcon name="cil-x" onClick={() => handleRemoveSelectedMember(index)}/>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ol>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <CRow className="justify-content-center mt-5">
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                variant="outline"
                                to="/member/point-list/points/Points"
                            >
                                취소
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                onClick={handleCreatePointPayment}
                            >
                                저장
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CModal
                show={small}
                onClose={() => setSmall(!small)}
                size="sm"
                centered
            >
                <CModalBody className="text-center">
                    <p>저장되었습니다.</p>
                    <CButton color="dark" to="/member/point-list/points/Points">
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <ModalSelectMembers
                show={showOn}
                setModalSelectMembers={setModalSelectMembers}
                onMemberSelectCompleted={handleMemberSelect}
                selectedMembers={[...data.parents]}
                type={UserRole.PARENT.value}
            />
        </>
    )
}

export default PointRegister
