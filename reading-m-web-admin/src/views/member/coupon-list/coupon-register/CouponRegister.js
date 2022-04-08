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
import { CouponService } from 'src/services/CouponService'
import { UserRole } from 'src/constants/role.constants'
import { AppliedClass } from 'src/constants/coupon.applied.class.constants'
import { SelectedMemember } from 'src/constants/coupon.selected.member.constants'

const CouponRegister = () => {
    const [couponDetail, setCouponDetail] = useState(
        {
            "amount": 0,
            "classType": AppliedClass.APPLIED_ALL.value,
            "startValidDate": new Date(),
            "endValidDate": new Date(),
            "id": 0,
            "issuingMode": SelectedMemember.ALL.value,
            "name": "",
            "parents": []            
        }
    )
    const [small, setSmall] = useState(false)
    const [showOn, setModalSelectMembers] = useState(false)

    const showModalSelectMembers = () => {
        setModalSelectMembers(!showOn)
    }

    function handleCreateCoupon() {
        const parentIdList = couponDetail.parents.map(p => p.id);
        CouponService.createCoupon({...couponDetail, parentIdList: parentIdList}).then((resp) => {
            if (resp.status === 201) {
                setSmall(!small)
            }
        })
    }

    function handleMemberSelect(selectedMembers) {
        setCouponDetail({...couponDetail, parents: [...selectedMembers]})
    }

    function handleRemoveSelectedMember(index) {
        let members = [...couponDetail.parents]
        
        members.splice(index, 1)

        setCouponDetail({...couponDetail, parents: [...members]})
    }

    return (
        <>
            <h2 className="mb-4">쿠폰 수정</h2>
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
                                    쿠폰명
                                </td>
                                <td>
                                    <CInput
                                        className="col-6"
                                        placeholder="coupon"
                                        onChange={(e) => setCouponDetail({...couponDetail, "name": e.target.value})}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    할인 금액
                                </td>
                                <td>
                                    <div className="form-inline">
                                        <CInput
                                            className="col-6"
                                            placeholder="sale_pay"
                                            onChange={(e) => setCouponDetail({...couponDetail, "amount": e.target.value})}
                                        />
                                        <span className="ml-2">원</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    적용 수업
                                </td>
                                <td>
                                    <div className="radio-group-custom">
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio1"
                                                name="radios"
                                                value={AppliedClass.APPLIED_ALL.value}
                                                defaultChecked
                                                onClick={(e) => setCouponDetail({...couponDetail, "classType": e.target.value})}
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio1"
                                            >
                                                {AppliedClass.APPLIED_ALL.label}
                                            </CLabel>
                                        </CFormGroup>
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio2"
                                                name="radios"
                                                value={AppliedClass.LIVE_BOOK.value}
                                                onChange={(e) => setCouponDetail({...couponDetail, "classType": e.target.value})}
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio2"
                                            >
                                                {AppliedClass.LIVE_BOOK.label}
                                            </CLabel>
                                        </CFormGroup>
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio3"
                                                name="radios"
                                                value={AppliedClass.LIVE_GOAL.value}
                                                onChange={(e) => setCouponDetail({...couponDetail, "classType": e.target.value})}
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio3"
                                            >
                                                {AppliedClass.LIVE_GOAL.label}
                                            </CLabel>
                                        </CFormGroup>
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio4"
                                                name="radios"
                                                value={AppliedClass.MATHEMATICS.value}
                                                onChange={(e) => setCouponDetail({...couponDetail, "classType": e.target.value})}
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio4"
                                            >
                                                {AppliedClass.MATHEMATICS.label}
                                            </CLabel>
                                        </CFormGroup>
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
                                            selected={couponDetail.startValidDate}
                                            onChange={(date) =>
                                                setCouponDetail({...couponDetail, "startValidDate": date})
                                            }
                                            className="mx-2"
                                        />
                                        ~
                                        <DatePicker
                                            selected={couponDetail.endValidDate}
                                            onChange={(date) =>
                                                setCouponDetail({...couponDetail, "endValidDate": date})
                                            }
                                            className="mx-2"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    발급 회원
                                </td>
                                <td>
                                    <CFormGroup variant="custom-radio" inline>
                                        <CInputRadio
                                            custom
                                            id="all-parents"
                                            name="inline-radios"
                                            value={SelectedMemember.ALL.value}
                                            defaultChecked
                                            onChange={(e) => setCouponDetail({...couponDetail, "issuingMode": e.target.value, "parents": []})}
                                        />
                                        <CLabel
                                            variant="custom-checkbox"
                                            htmlFor="all-parents"
                                        >
                                            {SelectedMemember.ALL.label}
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="custom-radio" inline>
                                        <CInputRadio
                                            custom
                                            id="select-member"
                                            name="inline-radios"
                                            value={SelectedMemember.SELECT.value}
                                            onChange={(e) => setCouponDetail({...couponDetail, "issuingMode": e.target.value})}
                                        />
                                        <CLabel
                                            variant="custom-checkbox"
                                            htmlFor="select-member"
                                        >
                                            {SelectedMemember.SELECT.label}
                                        </CLabel>
                                    </CFormGroup>
                                    <CButton
                                        size="sm"
                                        color="secondary"
                                        shape="pill"
                                        onClick={showModalSelectMembers}
                                        hidden={couponDetail.issuingMode === "ALL"}
                                    >
                                        <CIcon name="cil-plus" /> 회원 선택
                                    </CButton>
                                    <div className="selected-member-list">
                                        <ol>
                                            {
                                                couponDetail.parents.map((item, index) => {
                                                    
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
                                to="/member/coupon-list/coupons/Coupons"
                            >
                                취소
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                onClick={handleCreateCoupon}
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
                    <CButton
                        color="dark"
                        to="/member/coupon-list/coupons/Coupons"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <ModalSelectMembers
                show={showOn}
                setModalSelectMembers={setModalSelectMembers}
                onMemberSelectCompleted={handleMemberSelect}
                selectedMembers={[...couponDetail.parents]}
                type={UserRole.PARENT.value}
            />
        </>
    )
}

export default CouponRegister
