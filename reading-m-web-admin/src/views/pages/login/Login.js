import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormGroup,
    CImg,
    CInput,
    CInvalidFeedback,
    CLabel,
    CRow,
} from '@coreui/react'
import SButton from "../../../components/common/SButton";
import { trackPromise } from "react-promise-tracker";
import { UserService } from 'src/services/UserService';
import { useHistory } from 'react-router-dom';
import { LocalStorageManager } from 'src/managers/LocalStorageManager';

const Login = () => {
    const history = useHistory();
    const [data, setData] = useState({
        "username": "",
        "password": ""
    })

    const [validated, setValidated] = useState(false);

    useEffect(() => {

        if (LocalStorageManager.getAccessToken() !== null) {
            UserService.logout().then((resp) => {

                if (resp.status === 204) {

                    LocalStorageManager.removeAccessToken();
                    LocalStorageManager.removeRefreshToken();
                }
            })
        }
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        const form = event.target;

        if (form.checkValidity() === true) {
            trackPromise(
                UserService.login(data.username, data.password)
            ).then((resp) => {

                if (resp.status === 200) {

                    LocalStorageManager.saveToken(resp.data);

                    history.push("/main/banners");
                }
            })
        }

        setValidated(true);
    }

    function handleChange(event) {

        setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm wasValidated={validated} onSubmit={handleSubmit} noValidate>
                                        <div className="text-center">
                                            <CImg src={'/images/logo.png'} alt="ReadingM Logo" />
                                            <h1>Admin Login</h1>
                                        </div>
                                        <CFormGroup className="mb-3 row">
                                            <CLabel className="col-sm-2" htmlFor="nf-email">
                                                ID
                                            </CLabel>
                                            <div className="col-md-10">
                                                <CInput
                                                    name="username"
                                                    type="text"
                                                    placeholder="ID 입력"
                                                    onChange={handleChange}
                                                    autoComplete="username"
                                                    required
                                                />
                                                <CInvalidFeedback>ID를 확인해주세요.</CInvalidFeedback>
                                            </div>
                                        </CFormGroup>
                                        <CFormGroup className="mb-4 row">
                                            <CLabel className="col-sm-2" htmlFor="nf-email">
                                                비밀번호
                                            </CLabel>
                                            <div className="col-md-10">
                                                <CInput
                                                    name="password"
                                                    type="password"
                                                    placeholder="비밀번호 입력"
                                                    autoComplete="current-password"
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <CInvalidFeedback>비밀번호를 확인해주세요.</CInvalidFeedback>
                                            </div>
                                        </CFormGroup>
                                        <CRow>
                                            <CCol xs="12" className="text-center">
                                                <SButton
                                                    color="primary"
                                                    className="px-4"
                                                    /*to="/main/banner"*/
                                                    type="submit"
                                                >
                                                    로그인
                                                </SButton>
                                            </CCol>
                                            <CCol xs="12" className="text-center">
                                                <CButton
                                                    color="link"
                                                    className="px-0"
                                                    to="/sendmail"
                                                >
                                                    비밀번호 재설정
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
