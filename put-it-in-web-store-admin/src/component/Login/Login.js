import { useState, useEffect } from "react"
import { userActions } from "../../actions/user.action";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { ImageItem } from "../common/ListImageSection"

const styles = {
    section: { marginTop: "70px" },
    sectionHead: { textAlign: "center" },
    sectionFoot: { textAlign: "center", marginTop: "1rem", fontSize: ".75em" },
    sectionBody: { marginTop: "1rem" },
    logo: { width: "100px" },
    title: { marginTop: "1rem" },
    button: { width: "100%", background: "#FF6C0E", borderColor: "#FF6C0E", color: "#FFFFFF" }
}

function Login() {

    var initState = {
        email: { text: "", isValid: true },
        password: { text: "", isValid: true }
    }
    const dispatch = useDispatch()
    const [form, setForm] = useState(initState);
    const [validated, setValidated] = useState(false);

    // selector
    const authen = useSelector(state => state.authentication);

    useEffect(() => {
        if (!authen.loggedIn && authen.error !== undefined) {
            switch (authen.error) {
                case '400':
                    setForm({ ...form, password: { text: form.password.text, isValid: false } });
                    break;
                case '404':
                    setForm({ ...form, password: { email: { text: form.email.text, isValid: false } } });
                    break;
                default:
                    alert('Please check your input again!')
                    setForm({ ...form, password: { text: form.password.text, isValid: false }, email: { text: form.email.text, isValid: false } });
                    break;
            }
        }
    }, [authen])

    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch])

    function handleChange(e) {
        const { id, value } = e.target;
        setForm(() => ({ ...form, [id]: { text: value, isValid: form[id].isValid } }))
    }

    function handleOnSubmit(e) {
        let formSubmit = e.currentTarget;
        e.preventDefault()
        e.stopPropagation()
        if (!formSubmit.checkValidity()) {
            setValidated(true)
        }
        else {
            dispatch(userActions.login(form.email.text, form.password.text));
        }
    }

    return (
        <>
            <Container>
                <Row className="justify-content-md-center" style={styles.section}>
                    <Col style={styles.sectionHead} xs={12}>
                        <ImageItem style={styles.logo} className="align-middle" />
                        <h5 style={styles.title}>관리자 로그인</h5>
                    </Col>
                    <Col style={styles.sectionBody} xs={{ span: 4 }}>
                        <Form style={styles.form} onSubmit={handleOnSubmit}>
                            <Form.Group>
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="email" placeholder="아이디를 입력해주세요." id="email" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호를 입력해주세요." id="password" onChange={handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={styles.button}>
                                로그인
                            </Button>
                        </Form>
                    </Col>
                    <Col style={styles.sectionFoot} xs={12}>
                        <p className="link-item">비밀번호를 잊어버리셨나요?</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login