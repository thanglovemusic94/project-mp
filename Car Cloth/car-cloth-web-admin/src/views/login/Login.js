import {CButton, CCol, CContainer, CForm, CFormInput, CFormLabel, CImage, CRow} from '@coreui/react';
import {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import logo from '../../assets/logo.svg';
import {LocalStorageManager} from '../../managers/LocalStorageManager';
import {LoginService} from '../../services/LoginService';
import {handleChange} from '../../utils/StateUtils';
import {UserContext} from "../../context/user-context/UserProvider";
import {LOGIN_FAIL, LOGIN_SUCCESS} from "../../context/user-context/UserAction";

function Login() {
    const history = useHistory();
    const {dispatch} = useContext(UserContext);
    const [data, setData] = useState({
        'username': '',
        'password': ''
    });

    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        if (validated === true) {
            formValidate();
        }
        // eslint-disable-next-line
    }, [data])

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (formValidate() === true) {

            // Call Login API here.
            LoginService.login(data.username, data.password).then((res) => {

                if (res.status === 200) {
                    LocalStorageManager.saveUserToken(res.data);
                    dispatch(LOGIN_SUCCESS) // change state and re render app
                    history.push("/");

                }
            }).catch((err) => {
                setData({ ...data, 'password': '' })
                setValidated(true);
                setError(true);
                dispatch(LOGIN_FAIL) // change state and re render app
            });
        } else {
            setValidated(true);
        }
    }

    function formValidate() {
        if (
            data.username.length === 0 ||
            data.password.length === 0
        ) {
            setError(true);

            return false;
        } else {
            setError(false);
        }

        return true;
    }

    function LoginError() {
        let elemnt = <></>

        if (error === true) {
            elemnt =
                <CRow className="mt-4">
                    <p className="text-danger text-center">로그인 정보가 일치하지 않습니다.​</p>
                </CRow>
        }

        return elemnt;
    }

    return (
        <CContainer>
            {/*<div className="position-absolute top-50 start-50 translate-middle">*/}
            <div className="position-absolute top-50 start-50 translate-middle" style={{width: "30%"}}>
                <div className={'text-center mb-4'}>
                    <CImage src={logo} />
                </div>
                <p className={'text-center fw-bold'}>관리자 로그인</p>

                <CForm noValidate onSubmit={handleSubmit} >
                    <CRow className="my-md-5">
                        <CFormLabel htmlFor="lbUsername" className="col-sm-3 col-form-label fw-bold">아이디​</CFormLabel>
                        <CCol sm={9} >
                            <CFormInput
                                name="username"
                                type="text"
                                className="form-control"
                                id="lbUsername"
                                placeholder="아이디​"
                                value={data.username}
                                onChange={e => handleChange(e, data, setData)}
                            />
                        </CCol>
                    </CRow>

                    <CRow className="mb-md-5">
                        <CFormLabel htmlFor="lbPassword" className="col-sm-3 col-form-label fw-bold">비밀번호​</CFormLabel>
                        <CCol sm={9} >
                            <CFormInput
                                name="password"
                                type="password"
                                className="form-control"
                                id="lbPassword"
                                placeholder="비밀번호​"
                                value={data.password}
                                onChange={e => handleChange(e, data, setData)}
                            />
                        </CCol>
                    </CRow>

                    <div className="text-center mt-4">
                        <CButton type="submit" className="btn btn-dark w-25">로그인</CButton>
                    </div>

                    <LoginError />
                </CForm>
            </div>
        </CContainer>
    );
}

export default Login;
