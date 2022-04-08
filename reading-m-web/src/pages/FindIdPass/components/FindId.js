import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LoginService } from '../../../services/LoginService'

const FindId = () => {
    const MESSAGE_PHONENUMBER_REQUIRED = "휴대폰 번호를 입력해주세요.";
    const MESSAGE_PHONENUMBER_WRONG_FORMAT = "올바른 형식의 휴대폰 번호를 입력해주세요.";

    const [foundId, setFoundId] = useState(null)

    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [validated, setValidated] = useState(false);
    const [invalidPhoneNumberFeedback, setInvalidPhoneNumberFeedback] = useState(MESSAGE_PHONENUMBER_REQUIRED);

    const handleUserName = (event) => {
        setUserName(event.target.value);
    }

    const handlePhoneNumber = (event) => {
        const regex = /^[0-9]*$/g
        const text = event.target.value;

        if (regex.test(text) === false) {
            setInvalidPhoneNumberFeedback(MESSAGE_PHONENUMBER_WRONG_FORMAT);
        } else {
            setInvalidPhoneNumberFeedback(MESSAGE_PHONENUMBER_REQUIRED);
        }

        setPhoneNumber(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const form = event.target;

        if (form.checkValidity() === true) {
            let body = {
                name: userName,
                phone: phoneNumber,
            }
    
            LoginService.findMemberId(body)
                .then((resp) => {
                    if (resp.status === 200) {
                        if (resp.data !== null) {
                            setFoundId(resp.data)
                        } else {
                            setFoundId('')
                        }
                    }
                })
                .catch((error) => {
                    // Workaround for current state, not use this later.
                    setFoundId('')
                })
        }

        setValidated(true);
    }

    return (
        <>
            <section className="findid-body py-5">
                <div className="box-title text-center" hidden={foundId !== null}>
                    <h3>
                        회원가입 시 입력한 정보로{' '}
                        <br className="d-block d-md-none" />
                        ID를 찾을 수 있습니다.
                    </h3>
                </div>
                <div className="box-w488" hidden={foundId !== null}>
                    <Form
                        validated={validated}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Form.Group className="d-lg-flex">
                            <Form.Label>이름</Form.Label>
                            <div className="ipw-386">
                                <Form.Control
                                    type="text"
                                    placeholder="이름 입력"
                                    required
                                    onChange={(e) => handleUserName(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    이름을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>휴대폰번호</Form.Label>
                            <div className="ipw-386">
                                <Form.Control
                                    type="text"
                                    placeholder="-를 제외한 휴대폰 번호 11자 입력"
                                    pattern="[0-9]{11}"
                                    maxLength="11"
                                    required
                                    onChange={(e) => handlePhoneNumber(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { invalidPhoneNumberFeedback }
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <div className="d-lg-flex mt-5">
                            <Button
                                type="submit"
                                variant="b500"
                                className="btw-386 ml-auto"
                            >
                                ID 찾기
                            </Button>
                        </div>
                    </Form>
                </div>
                <div
                    className="box-findidpass-results mt-5"
                    hidden={foundId === null || foundId.length === 0}
                >
                    <p className="mb-4">
                        회원의 ID는{' '}
                        <span className="memberid-search">{foundId}</span>
                        입니다
                    </p>
                    <Button className="btw-386" as={Link} to="/login">
                        로그인 페이지로 가기
                    </Button>
                </div>
                <div
                    className="box-findidpass-results mt-5"
                    hidden={foundId === null || foundId.length > 0}
                >
                    <p className="mb-4">아직 회원가입하지 않으셨나요?</p>
                    <Button className="btw-386" as={Link} to="/terms">
                        회원가입으로 이동
                    </Button>
                </div>
            </section>
        </>
    )
}

export default FindId
