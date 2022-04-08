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
    CInputCheckbox,
    CPagination,
    CRow,
    CModal,
    CModalBody,
    CSelect
} from '@coreui/react'

import { trackPromise } from 'react-promise-tracker'
import { CouponService } from 'src/services/CouponService'
import DateTime from 'src/common/DateTime'
import { AppliedClass, convertAppliedClass } from 'src/constants/coupon.applied.class.constants'
import NumberFormat from 'react-number-format'

export default function Coupons() {
    const [deleteComfirm, setDelConfirm] = useState(false)
    const [deleteDone, setDelDone] = useState(false)
    const termInput = useRef();
    const [checkAll, setCheckAll] = useState(false)
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })
    const [params, setParams] = useState({
        page: 0,
        size: 10,
        classType: '',
        optionSearch: '',
        term: '',
        isAll: true
    })

    const [isDisable, setIsDisable] = useState(true)

    const handleInputChange = event => {
        const { name, value } = event.target;
        setParams({ ...params, [name]: value })
    };

    const initialSelect = new Array(params.size).fill(false)
    const [checkTable, setCheckTable] = useState(initialSelect)
    const [selectedItems, setSelectedItems] = useState([])

    const onSelectAll = e => {
        if (e.target.checked === true) {
            setCheckAll(true);
            setCheckTable(data.content.map(() => true));
            selectedItems.splice(0, selectedItems.length)
            selectedItems.push(data.content.map(m => m.id))
            setIsDisable(false)
        } else {
            setCheckAll(false);
            setCheckTable(data.content.map(() => false));
            selectedItems.splice(0, selectedItems.length)
            setIsDisable(true)
        }
    }

    const handleItemSelected = (event, index) => {

        if (event.target.checked === true) {
            selectedItems.push(event.target.value)
            setIsDisable(false)
        } else {
            const idx = selectedItems.indexOf(event.target.value)
            selectedItems.splice(idx, 1)
            if (selectedItems.length === 0) {
                setIsDisable(true)
            }
        }

        setCheckTable(
            checkTable.map((item, idx) => (idx === index) ? !item : item
            ));

        setSelectedItems([...selectedItems])
    }

    const refershData = () => {
        return CouponService.getCoupons(params).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
                setCheckAll(false)
                setIsDisable(true)
                setCheckTable(initialSelect)
                selectedItems.splice(0, selectedItems.length)

            }
        })
    }
    useEffect(() => {
        trackPromise(
            refershData()
        )
    }, [params])

    function handlePageChange(page) {
        if (page > -1) {
            setParams({ ...params, page })
        }
    }

    const handleFilter = e => {
        let { name, value } = e.target;
        let isAll = false;

        if (name === "classType") {

            if (value === AppliedClass.ALL.value) {
                isAll = true;
            }

            if (value === AppliedClass.APPLIED_ALL.value) {
                value = "";
            }
        }

        setParams({ ...params, [name]: value, isAll: isAll, term: termInput.current.value });
    }

    function handleDeleteCoupons() {
        let ids = [...selectedItems]
        if (!ids || ids.length === 0) {
            return
        }

        CouponService.deleteCoupon(ids).then((resp) => {
            if (resp.status === 204) {
                setDelConfirm(!deleteComfirm)
                setDelDone(!deleteDone)
                refershData()
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: termInput.current.value });
    }
    return (
        <>
            <h2 className="mb-4">쿠폰 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={handleSubmit} className="form-horizontal">
                        <CFormGroup row>
                            <CCol className="form-inline" md="6">
                                <CFormGroup className="mr-2">
                                    <CSelect custom name="classType" onChange={handleFilter} defaultValue={AppliedClass.ALL.value}>
                                        <option value={AppliedClass.ALL.value}>{AppliedClass.ALL.label}</option>
                                        <option value={AppliedClass.LIVE_BOOK.value}>{AppliedClass.LIVE_BOOK.label}</option>
                                        <option value={AppliedClass.LIVE_GOAL.value} >{AppliedClass.LIVE_GOAL.label}</option>
                                        <option value={AppliedClass.MATHEMATICS.value} >{AppliedClass.MATHEMATICS.label}</option>
                                        {/* <option value={AppliedClass.APPLIED_ALL.value} >{AppliedClass.APPLIED_ALL.label}</option> */}
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol md="6">
                                <div className="form-inline">
                                    <CFormGroup className="col-3 justify-content-end">
                                        <CSelect custom name="optionSearch" onChange={handleInputChange} defaultValue="">
                                            <option value="">선택</option>
                                            <option value="couponName">쿠폰명</option>
                                        </CSelect>
                                    </CFormGroup>
                                    <CInputGroup className="col-9">
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
                                        variant="custom-checkbox">
                                        <CInputCheckbox
                                            onChange={onSelectAll}
                                            id="checkAll"
                                            checked={checkAll}
                                            className="position-static"
                                        />
                                    </CFormGroup>
                                </th>
                                <th style={{ width: '10%' }}>번호</th>
                                <th>쿠폰명</th>
                                <th style={{ width: '15%' }}>할인 금액</th>
                                <th style={{ width: '15%' }}>적용 수업</th>
                                <th style={{ width: '15%' }}>유효기간</th>
                                <th style={{ width: '15%' }}>수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((item, index) => {
                                return (
                                    <DataRow
                                        number={(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}
                                        index={index}
                                        source={{ ...item }}
                                        key={index}
                                        itemSelected={handleItemSelected}
                                        checkTable={checkTable}
                                    />
                                )
                            }
                            )}
                        </tbody>
                    </table>

                    <CRow className="justify-content-between">
                        <CCol md="2">
                            <CButton
                                onClick={() => setDelConfirm(!deleteComfirm)}
                                className="mr-1"
                                block
                                color="dark"
                                disabled={isDisable}
                            >
                                삭제
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                to="/member/coupon-list/coupon-register/CouponRegister"
                            >
                                등록
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
            <CModal
                show={deleteComfirm}
                onClose={() => setDelConfirm(!deleteComfirm)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>삭제하시겠습니까?</p>
                    <CButton
                        variant="outline"
                        color="dark"
                        onClick={() => setDelConfirm(!deleteComfirm)}
                        className="mx-2"
                    >
                        취소
                    </CButton>
                    <CButton
                        color="dark"
                        onClick={handleDeleteCoupons}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <CModal
                show={deleteDone}
                onClose={() => setDelDone(!deleteDone)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>삭제되었습니다.</p>

                    <CButton
                        color="dark"
                        onClick={() => setDelDone(!deleteDone)}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

function DataRow({ number, index, source, itemSelected, checkTable }) {

    return (
        <tr>
            <td>
                <CFormGroup
                    variant="checkbox"
                    className="checkbox"
                >
                    <CInputCheckbox
                        checked={checkTable[index]}
                        value={source.id}
                        className="position-static"
                        onChange={(e) => itemSelected(e, index)}
                    />
                </CFormGroup>
            </td>
            <td>{number}</td>
            <td>{source.name}</td>
            <td><NumberFormat value={source.amount} thousandSeparator={true} displayType={'text'} />원</td>
            <td>{convertAppliedClass(source.classType)}</td>
            <td>
                <DateTime date={source.startValidDate} format="YYYY.MM.DD" /> ~ <DateTime date={source.endValidDate} format="YYYY.MM.DD" />
            </td>
            <td>
                <CButton
                    block
                    color="dark"
                    size="sm"
                    to={{ pathname: "/member/coupon-list/coupon-edit/CouponEdit", data: source }}
                >
                    수정
                </CButton>
            </td>
        </tr>
    )
}
