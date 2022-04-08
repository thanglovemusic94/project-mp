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

const Login = (props) => {
    const [validated, setValidated] = useState(false);

    const [modal, setSmall] = useState(false)
    const [saveSucess, setSaveSuccess] = useState(false)

    const [isPassMatching, setPasswordMatching] = useState(null);

    const toggle = () => {
        setSmall(!modal)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.target;

        if (form.checkValidity() === true) {
            if(checkPassword()) {
                const query = new URLSearchParams(props.location.search)
                const newPassword = document.getElementById("newPassword").value

                UserService.resetPassword(query.get("sig"), newPassword).then((res) => {
                
                    setSaveSuccess(res.status === 204)
                    toggle()
                }).catch(() => {
                
                    setSaveSuccess(false)
                    toggle()
                })
            }
        }

        setValidated(true);
    }

    const checkPassword= () => {
        const newPassword = document.getElementById("newPassword").value
        const confirmNewPassword = document.getElementById("confirmNewPassword").value
        // Password contain 8-13 charater contain at least 1 number and 1 special character
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,13}$/g
        const match = regex.test(newPassword);

        if (newPassword === confirmNewPassword) {
            setPasswordMatching(true);
            return match;
        } else {
            setPasswordMatching(false);
            return false;
        }
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
                                            <h1>비밀번호 재설정</h1>
                                            <h5>
                                                재설정 할 새 비밀번호를
                                                입력해주세요.
                                            </h5>
                                        </div>
                                        <CFormGroup className="mb-4 row">
                                            <CLabel
                                                className="col-sm-2"
                                                htmlFor="nf-email"
                                            >
                                                새 비밀번호
                                            </CLabel>
                                            <div className="col-md-10">
                                                <CInput
                                                    required
                                                    id="newPassword"
                                                    type="password"
                                                    placeholder="새 비밀번호 입력"
                                                    autoComplete="current-password"
                                                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,13}$"
                                                />
                                                <CInvalidFeedback>비밀번호는 영문, 숫자, 특수문자 조합의 8~13자를 입력해주세요. </CInvalidFeedback>
                                            </div>
                                        </CFormGroup>
                                        <CFormGroup className="mb-4 row">
                                            <CLabel
                                                className="col-sm-2"
                                                htmlFor="nf-email"
                                            >
                                                비밀번호 확인
                                            </CLabel>
                                            <div className="col-md-10">
                                                <CInput
                                                    required
                                                    id="confirmNewPassword"
                                                    type="password"
                                                    placeholder="비밀번호 확인"
                                                    autoComplete="current-password"
                                                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,13}$"
                                                    invalid={isPassMatching === false}
                                                />
                                                <CInvalidFeedback>비밀번호가 일치하지 않습니다.</CInvalidFeedback>
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
                                                    // onClick={() =>
                                                    //     setSmall(!modal)
                                                    // }
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
                        <p>{saveSucess ? '비밀번호 재설정이 완료되었습니다.' : '처리 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.'}</p>
                        <CButton color="primary" to="/login">
                            확인
                        </CButton>
                    </CModalBody>
                </CModal>
            </CContainer>
        </div>
    )
}

export default Login
