import React, { useRef, useEffect, useState } from 'react'
import {
    CButton,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputCheckbox,
    CInputGroup,
    CInputGroupAppend,
    CModal,
    CModalBody,
    CPagination,
    CRow,
} from '@coreui/react'
import { UserService } from 'src/services/UserService'

const ModalSelectMembers = (props) => {

    const term = useRef();

    const [members, setMembers] = useState({
        "content": [],
        "number": 0,
        "size": 10,
        "totalPages": 0
    })

    const [params, setParams] = useState({
        role: props.type,
        page: 0,
        size: 10,
        sort: "id,DESC",
        term: ''
    })

    const [pageReady, setPageReady] = useState(false)
    const [selectedMembers, setSelectedMembers] = useState(props.selectedMembers)
    const [checkTable, setCheckTable] = useState(new Array(params.size).fill(false))

    useEffect(() => {
       
        UserService.getUserByRoleAndQuery(params).then((res) => {
            if (res.status === 200) {
                const newMembers = res.data;
                setMembers(newMembers);
                let newCheckTable = [...checkTable];
                for(let i=0; i<newMembers.content.length; i++) {
                    newCheckTable[i] = selectedMembers.findIndex(s => s.id === newMembers.content[i].id) !== -1
                }

                setCheckTable(newCheckTable)
            }

            if (pageReady === false) setPageReady(true)
        })
    }, [params])

    useEffect(() => {        
        setSelectedMembers(props.selectedMembers)
    }, [props.show])

    function handlePageChange(page) {
        if (page > -1) {
            setParams({ ...params, page})
        }
    }


    function handleMemberSelected(event, index, member) {
        if (event.target.checked === true) {
            setSelectedMembers([...selectedMembers, {...member}])
        } else {
            let idx = 0
    
            for ( ; idx < selectedMembers.length; idx++) {
                if (selectedMembers[idx].id === member.id) 
                    break;
            }
            selectedMembers.splice(idx, 1)
            setSelectedMembers([...selectedMembers])
        }
        
        checkTable[index] = !checkTable[index]
        setCheckTable([...checkTable])
    }

    function handleMemberSelectedAll(event) {
        const data = members.content
        if (event.target.checked === true) {
            selectedMembers.splice(0, selectedMembers.length);
            
            for (let i=0; i<data.length; i++) {
                selectedMembers.push({id: data[0].id, name: data[0].name})
                checkTable[i] = true;
            }

            setSelectedMembers([...selectedMembers]);
            setMembers({...members})
            setCheckTable([...checkTable]);
        } else {
            selectedMembers.splice(0, selectedMembers.length);
            setSelectedMembers([...selectedMembers])
            setMembers({...members})
            for (let i=0; i<data.length; i++) {
                checkTable[i] = false;
            }
            setCheckTable([...checkTable]);
        }
    }

    function handleConfirm() {
        props.onMemberSelectCompleted(selectedMembers)
        props.setModalSelectMembers(false)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setParams({...params, term: term.current.value});
    };

    return (
        pageReady === true ?
        <>
            <CModal
                show={props.show}
                onClose={() => props.setModalSelectMembers(false)}
                centered
                size="lg"
            >
                <CModalBody>
                    <h3 className="text-center mt-2 mb-4">회원 선택</h3>
                    <CForm onSubmit={onSubmit}>
                        <CFormGroup row className="justify-content-end mb-3">
                            <CCol sm="6">
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
                                    <CFormGroup
                                        variant="checkbox"
                                        className="checkbox"
                                    >
                                        <CInputCheckbox
                                            className="position-static"
                                            onChange={(e) => handleMemberSelectedAll(e)}
                                        />
                                    </CFormGroup>
                                </th>
                                <th>가입 유형</th>
                                <th>이름</th>
                                <th>ID</th>
                                <th>휴대폰 번호</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                members.content.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <CFormGroup
                                                    variant="checkbox"
                                                    className="checkbox"
                                                >
                                                    <CInputCheckbox
                                                        className="position-static"
                                                        checked={checkTable[index]}
                                                        onChange={(e) => handleMemberSelected(e, index, {"id": item.id, "name": item.name})}
                                                    />
                                                </CFormGroup>
                                            </td>
                                            <td>{props.type}</td>
                                            <td>{item.name}</td>
                                            <td>{item.memberId}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <CPagination
                        activePage={members.number + 1}
                        pages={members.totalPages}
                        onActivePageChange={(i) => handlePageChange(i - 1)}
                        align="center"
                        className="mt-4"
                        limit={10}
                    ></CPagination>

                    <CRow className="justify-content-center mt-5 mb-2">
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                variant="outline"
                                onClick={() =>
                                    props.setModalSelectMembers(false)
                                }
                            >
                                취소
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                onClick={handleConfirm}
                            >
                                확인
                            </CButton>
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </>
        :
        <>
        </>
    )
}

export default ModalSelectMembers
