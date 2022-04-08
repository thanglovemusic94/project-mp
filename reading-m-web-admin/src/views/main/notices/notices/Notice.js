import React, { useEffect, useState } from 'react'
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
    CInputRadio,
    CLabel,
    CModal,
    CModalBody,
    CPagination,
    CRow,
} from '@coreui/react'

import { trackPromise } from 'react-promise-tracker'
import { NoticeService } from '../../../../services/NoticeService'
import DateTime from '../../../../common/DateTime'
import { UserRole } from '../../../../constants/role.constants'
import SButton from '../../../../components/common/SButton'
import { convertRole } from '../../../../constants/role.constants'

export default function Notices() {
    const [deleteComfirm, setDelConfirm] = useState(false)
    const [deleteDone, setDelDone] = useState(false)
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: 'id,desc',
        query: '',
        role: '',
    })

    const [isDisable, setIsDisable] = useState(true)
    const [check, setCheck] = useState(false);
    const initialSelect = new Array(params.size).fill(false)
    const [checkTable, setCheckTable] = useState(initialSelect)
    const [strTitleQury, setStrTitleQury] = useState('')

    function handleChangeQuery(e) {
        const { name, value } = e.target
        setParams({ ...params, [name]: value, query: strTitleQury })
    }

    function handleDelete() {
        setDelConfirm(false)
        const delIds = []

        checkTable.map((item, idx) => {
            if (item === true) {
                delIds.push(data.content[idx].id)
            }
        });

        if (delIds.length > 0) {
            NoticeService.deleteByIdIn(delIds).then((resp) => {
                if (resp.status === 204) {
                    refreshdata()
                    setDelDone(true)
                }
            })
        }
    }

    const onChangeHeaderCheckbox = (e) => {
        if (e.target.checked === true) {
            setCheck(true);

            let i = 0
            setCheckTable(data.content.map((n) => {
                if (!n.notAllowedDelete) {
                    i++
                    return true
                } else {
                    return false
                }
            }));

            if (i > 0) {
                setIsDisable(false);
            } else {
                setIsDisable(true)
            }

        } else {
            setCheck(false);
            setCheckTable(data.content.map(() => false));
            setIsDisable(true);
        }
    };

    const onChangeRowCheckbox = (event, index) => {
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

    useEffect(() => {
        trackPromise(
            refreshdata()
        )
    }, [params])

    const refreshdata = () => NoticeService.findByQuery(params).then((resp) => {

        setCheck(false);
        setCheckTable(initialSelect);
        setData(resp.data)
        setIsDisable(true)
    })

    const handlePageChange = function (page) {
        if (page > 0) setParams({ ...params, page: page - 1 })
    }

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        setParams({
            ...params,
            query: strTitleQury,
        });
    }

    return (
        <>
            <h2 className="mb-4">공지사항 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={handleSubmit} className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="6">
                                <div className="radio-group-custom rgc100">
                                    <CFormGroup variant="checkbox" >
                                        <CInputRadio
                                            id="radio1"
                                            name="role"
                                            value=""
                                            onChange={handleChangeQuery}
                                            defaultChecked
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
                                            name="role"
                                            value={UserRole.STUDENT.value}
                                            onChange={handleChangeQuery}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio2"
                                        >
                                            학생
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="checkbox">
                                        <CInputRadio
                                            id="radio3"
                                            name="role"
                                            value={UserRole.PARENT.value}
                                            onChange={handleChangeQuery}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio3"
                                        >
                                            학부모
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="checkbox">
                                        <CInputRadio
                                            id="radio4"
                                            name="role"
                                            value={UserRole.TUTOR.value}
                                            onChange={handleChangeQuery}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio4"
                                        >
                                            지도교사
                                        </CLabel>
                                    </CFormGroup>
                                </div>
                            </CCol>
                            <CCol md="6">
                                <CInputGroup>
                                    <CInput
                                        name="title"
                                        placeholder="파일을 등록해주세요."
                                        value={strTitleQury}
                                        onChange={(e) =>
                                            setStrTitleQury(
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                    <CInputGroupAppend>
                                        <SButton
                                            name="query"
                                            type="button"
                                            color="dark"
                                            onClick={() =>
                                                setParams({
                                                    ...params,
                                                    query: strTitleQury,
                                                })
                                            }
                                        >
                                            검색
                                        </SButton>
                                    </CInputGroupAppend>
                                </CInputGroup>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                    <table className="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th style={{ width: '5%' }}>
                                    <CFormGroup variant="custom-checkbox">
                                        <CInputCheckbox
                                            onChange={onChangeHeaderCheckbox}
                                            id="autohide"
                                            custom
                                            checked={check}
                                        />
                                        <CLabel variant="custom-checkbox" htmlFor="autohide">
                                        </CLabel>
                                    </CFormGroup>
                                </th>
                                <th style={{ width: '10%' }}>번호</th>
                                <th>공지사항 제목</th>
                                <th style={{ width: '15%' }}>구분</th>
                                <th style={{ width: '15%' }}>등록일</th>
                                <th style={{ width: '15%' }}>수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((notice, index) => (

                                <NoticeRow
                                    index={index}
                                    number={(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}
                                    onChangeRowCheckbox={onChangeRowCheckbox}
                                    checkTable={checkTable}
                                    notice={notice}
                                    key={index}
                                />
                            ))}
                        </tbody>
                    </table>

                    <CRow className="justify-content-between">
                        <CCol md="2">
                            <CButton
                                onClick={() => setDelConfirm(true)}
                                className="mr-1"
                                block
                                color="dark"
                                disabled={isDisable}
                            >
                                {' '}
                                삭제{' '}
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                to="/main/notices/notice-register/NoticeRegister"
                            >
                                {' '}
                                등록{' '}
                            </CButton>
                        </CCol>
                    </CRow>

                    <CPagination
                        activePage={data.number + 1}
                        pages={data.totalPages}
                        onActivePageChange={handlePageChange}
                        align="center"
                        className="mt-4"
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
                        onClick={handleDelete}
                        className="mx-2"
                    >
                        {' '}
                        확인{' '}
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
                        onClick={() => {
                            handlePageChange(1) //return to page 0 after deletion
                            setDelDone(!deleteDone)
                        }}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

function NoticeRow({ notice, index, number, onChangeRowCheckbox, checkTable }) {

    return (
        <tr>
            <td>
                <CFormGroup variant="custom-checkbox">
                    <CInputCheckbox
                        onChange={(event) => onChangeRowCheckbox(event, index)}
                        id={"check" + index}
                        value={notice.id}
                        checked={checkTable[index]}
                        custom
                        disabled={notice.notAllowedDelete}
                    />
                    <CLabel variant="custom-checkbox" htmlFor={"check" + index}>
                    </CLabel>
                </CFormGroup>
            </td>
            <td>{number}</td>
            <td>{notice.title}</td>
            <td>{convertRole(notice.role) || "전체"}</td>
            <td>
                <DateTime format="YYYY.MM.DD" date={notice.createdOn} />
            </td>
            <td>
                <CButton
                    block
                    color="dark"
                    size="sm"
                    to={`/main/notices/notice-edit/${notice.id}`}
                >
                    {' '}
                    수정{' '}
                </CButton>
            </td>
        </tr>
    )
}

// function isNoticeWithTitleDeletable(noticeId) {
//     const NON_DELETABLE_NOTICES = [1, 2, 3, 4]

//     return NON_DELETABLE_NOTICES.indexOf(noticeId) > -1
// }
