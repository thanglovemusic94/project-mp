import React, { useState } from 'react'
import { UserService } from 'src/services/UserService';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CRow,
    CLabel,
    CFormGroup,
    CModal,
    CModalBody,
    CInvalidFeedback,
} from '@coreui/react'

const Login = () => {
    const [validated, setValidated] = useState(false);

    const [modal, setSmall] = useState(false)
    const [saveSucess, setSaveSuccess] = useState(false)
    const [formData, setFormData] = useState({
        email: ''
    })

    const toggle = () => {
        setSmall(!modal)
    }

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value})
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.target;

        if (form.checkValidity() === true) {
 
            UserService.requestRestPassword(formData.email).then((res) => {
                setSaveSuccess(res.status === 204)
                toggle()
            }).catch(() => {
                setSaveSuccess(false)
                toggle()      
            })
        }

        setValidated(true);
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm 
                                        noValidate
                                        wasValidated={validated}
                                        onSubmit={handleSubmit}>
                                        <div className="text-center">
                                            <h1> 비밀번호 초기화 메일 발송 </h1>
                                            <p>
                                                관리자로 등록된 이메일 주소를
                                                정확히 입력해 주세요. 해당
                                                이메일로 비밀번호 재설정 안내
                                                메일을 발송해드립니다.
                                            </p>
                                        </div>
                                        <CFormGroup className="mb-3 row">
                                            <CLabel
                                                className="col-sm-2"
                                                htmlFor="nf-email"
                                            >
                                                이메일
                                            </CLabel>
                                            <div className="col-md-10">
                                                <CInput
                                                    required
                                                    type="email"
                                                    name="email"
                                                    placeholder="이메일 입력"
                                                    autoComplete="email"
                                                    onChange={handleChangeInput}
                                                    pattern=".*@.*[.].+"
                                                />
                                                <CInvalidFeedback>이메일을 확인해주세요.</CInvalidFeedback>
                                            </div>
                                        </CFormGroup>
                                        <CRow>
                                            <CCol
                                                xs="12"
                                                className="text-center"
                                            >
                                                <CButton
                                                    color="primary"
                                                    className="px-4"
                                                    type="submit"
                                                >
                                                    확인
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
                <CModal show={modal} onClose={toggle} centered>
                    <CModalBody className="text-center">
                        <p>{saveSucess ? '발송이 완료되었습니다. 메일을 확인해주세요.' : '처리 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.'}</p>
                        <CButton color="primary" to="/login" >
                            확인
                        </CButton>
                    </CModalBody>
                </CModal>
            </CContainer>
        </div>
    )
}

export default Login
