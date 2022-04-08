import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { LoginService } from '../../../services/LoginService'

export default function ModalChangePass({ show, setChangePass }) {
    const [validated, setValidated] = useState(false)
    const [show1, setShow1] = useState(false)
    const [errCurrentPassword, setErrCurrentPassword] = useState(false)

    const [data, setData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            setValidated(false)
        } else {
            LoginService.changePassword(data.currentPassword, data.newPassword)
                .then((res) => {
                    setShow1(!show1)
                })
                .catch((e) => {
                    if (
                        e.response.data.code === 500 ||
                        e.response.data.code === 5004
                    ) {
                        setValidated(false)
                        setErrCurrentPassword(true)
                    }
                })
        }
        setValidated(true)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    setErrCurrentPassword(false)
                    setValidated(false)
                    setChangePass(false)
                }}
                dialogClassName="modalw-386 modalh-610 modal-changepassword"
                centered
            >
                <Modal.Header className="justify-content-center">
                    <Modal.Title>비밀번호 변경</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner">
                        <p className="text-top font-18 text-center">
                            현재 비밀번호와 새 비밀번호를 입력해주세요.
                        </p>
                        <Form
                            id={'formId'}
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <Form.Group controlId="currentPassword">
                                <Form.Label>현재 비밀번호</Form.Label>
                                <Form.Control
                                    required
                                    size="sm"
                                    // pattern="((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,13})"
                                    name="currentPassword"
                                    type="password"
                                    placeholder="비밀번호 입력(영문, 숫자, 특수문자 조합 8~13자리)"
                                    onChange={handleInput}
                                    isInvalid={errCurrentPassword}
                                />
                                {errCurrentPassword ? (
                                    <Form.Control.Feedback type="invalid">
                                        비밀번호가 일치하지 않습니다.
                                    </Form.Control.Feedback>
                                ) : (
                                    <Form.Control.Feedback type="invalid">
                                        비밀번호를 입력해주세요.
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group controlId="newPassword">
                                <Form.Label>새 비밀번호</Form.Label>
                                <Form.Control
                                    // pattern="((?=.*[a-z])(?=.*d)(?=.*[@#$!%])(?=.*[A-Z]).{8,13})"
                                    required
                                    size="sm"
                                    type="password"
                                    placeholder="비밀번호 입력(영문, 숫자, 특수문자 조합 8~13자리)"
                                    name="newPassword"
                                    onChange={handleInput}
                                />

                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 입력해주세요.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>새 비밀번호 확인</Form.Label>
                                <Form.Control
                                    required
                                    size="sm"
                                    pattern={data.newPassword}
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    name="confirmPassword"
                                    onChange={handleInput}
                                />

                                <Form.Control.Feedback type="invalid">
                                    새 비밀번호를 한번 더 입력해주세요.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={() => setChangePass(false)}>
                        취소
                    </Button>
                    <Button variant="m500" type={'submit'} form="formId">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={show1}
                onHide={() => setShow1(!show1)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">비밀번호 변경이 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button
                        variant="g700"
                        onClick={() => {
                            setShow1(false)
                            setChangePass(!show)
                        }}
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
