import React, { useEffect, useState, useRef } from 'react'
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
    CModal,
    CModalBody,
    CPagination,
    CRow,
} from '@coreui/react'

import { trackPromise } from 'react-promise-tracker'
import { MagazineService } from "../../../../services/MagazineService";
import Moment from "react-moment";

export default function Magazines(props) {
    const [deleteComfirm, setDelConfirm] = useState(false)
    const [deleteDone, setDelDone] = useState(false)
    const term = useRef();
    const [isDisable, setIsDisable] = useState(true)

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
        query: ""
    })

    const [check, setCheck] = useState(false);
    const initialSelect = new Array(params.size).fill(false)
    const [checkTable, setCheckTable] = useState(initialSelect);

    const refreshdata = () => MagazineService.getAll(params).then((resp) => {
        setCheck(false);
        setCheckTable(initialSelect);
        setData(resp.data)
        setIsDisable(true)
    })

    useEffect(() => {
        trackPromise(
            refreshdata()
        )
    }, [params])

    function handlePageChange(pageNumber) {
        if (pageNumber > 0) {
            --pageNumber;
        }
        setParams({ ...params, page: pageNumber })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, query: term.current.value });
    };


    const _onChangeHeaderCheckbox = (e) => {
        if (e.target.checked == true) {
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

    const handelDelete = () => {
        const ids = [];
        checkTable.map((item, idx) => {
            if (item === true) {
                ids.push(data.content[idx].id)
            }
        });

        MagazineService.deletes(ids).then(() => {
            refreshdata()
            setDelConfirm(false)
            setDelDone(true)
        })
    }
    return (
        <>
            <h2 className="mb-4">매거진 리스트 </h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <CFormGroup row className="form-horizontal justify-content-end">
                            <CCol md="6">
                                <CInputGroup>
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
                                </th>
                                <th style={{ width: '10%' }}>번호</th>
                                <th>매거진 제목</th>
                                <th style={{ width: '15%' }}>등록일</th>
                                <th style={{ width: '15%' }}>수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.content.map((magazine, index) => (
                                    <tr key={index}>
                                        <td>
                                            <CFormGroup variant="custom-checkbox">
                                                <CInputCheckbox
                                                    onChange={(event) => _onChangeRowCheckbox(event, index)}
                                                    id={"check" + index}
                                                    value={magazine.id}
                                                    checked={checkTable[index]}
                                                    custom
                                                />
                                                <CLabel variant="custom-checkbox" htmlFor={"check" + index}>
                                                </CLabel>
                                            </CFormGroup>
                                        </td>
                                        <td>
                                            {
                                                (data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)
                                            }
                                        </td>

                                        <td>{magazine.title}</td>
                                        <td><Moment format="YYYY.MM.DD">{magazine.createdAt}</Moment></td>
                                        <td>
                                            <CButton
                                                block
                                                color="dark"
                                                size="sm"
                                                to={"/main/magazines/magazine-edit/" + magazine.id}
                                            >
                                                수정
                                            </CButton>
                                        </td>
                                    </tr>
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
                                삭제
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                to="/main/magazines/magazine-register"
                            >
                                등록
                            </CButton>
                        </CCol>
                    </CRow>

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
                        onClick={() => handelDelete()}
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


