import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { WithDrawalService } from '../../../services/WithDrawalService'
import { LoginService } from '../../../services/LoginService'
import { checkClassTagRole, getRole } from '../../../constants/role.constants'
import { colorByRole } from '../../../constants/colorByRole'

export default function WithDraw() {
    const history = useHistory()
    const [validated, setValidated] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    const roleName = getRole().value
    const [data, setData] = useState({})
    const [errCurrentPassword, setErrCurrentPassword] = useState(false)

    const handleInputChange = (e) => {
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
            setShow1(!show1)
        }
        setValidated(true)
    }

    const handleWithDraw = (event) => {
        event.preventDefault()
        event.stopPropagation()
        WithDrawalService.requestWithDrawal(data)
            .then((res) => {
                // LoginService.logout()
                //     .then((r) => {
                //         setShow2(!show2)
                //         history.push('/')
                //     })
                //     .catch((e) => {
                //         setShow2(!show2)
                //         if (
                //             e.response.data.status === 500 ||
                //             e.response.data.status === 5004
                //         ) {
                //             setErrCurrentPassword(true)
                //         }
                //     })

                if (res.status === 201) {
                    LoginService.logoutBrowser()
                    setShow2(!show2)
                }
            })
            .catch((err) => {
                if (err.response.data.code === 5004) {
                    setValidated(false)
                    setErrCurrentPassword(true)
                }
            })
    }

    return (
        <>
            <section className="profile-infor-section">
                <h2 className="page-title mb-lg-4 mb-0">회원 탈퇴</h2>
                <div className="box-section">
                    <div className="box-w590 my-lg-5 my-0">
                        <Form
                            id="withDrawForm"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <Form.Group className="d-md-flex">
                                <Form.Label>비밀번호</Form.Label>
                                <div>
                                    <Form.Control
                                        className="ipw-488"
                                        type="password"
                                        placeholder="비밀번호 입력"
                                        required
                                        onChange={handleInputChange}
                                        name="password"
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
                                </div>
                            </Form.Group>
                            <Form.Group className="d-md-flex">
                                <Form.Label>탈퇴사유</Form.Label>
                                <div>
                                    <Form.Control
                                        className="ipw-488"
                                        type="text"
                                        placeholder="탈퇴사유 입력"
                                        required
                                        name="reason"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        탈퇴사유를 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <div className="withdraw-note box-gray mt-5">
                                <ul>
                                    <li>
                                        - 회원탈퇴 시, 아이디를 포함한 모든
                                        개인정보가 삭제됩니다.
                                    </li>
                                    <li>
                                        - 기타 탈퇴와 관련된 모든 정책은
                                        LiveClass 리딩엠 가입시 동의하신 약관 및
                                        개인정보 제공, 활용 등의 내용에
                                        따릅니다.
                                    </li>
                                    <li>
                                        - 각종 Q&A, 후기 등 데이터는 삭제되지
                                        않습니다.
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-5">
                                <Form.Check
                                    className={`form-check-custom outline mt-4  ${checkClassTagRole(
                                        roleName,
                                        ...colorByRole
                                    )}`}
                                    label={
                                        <>
                                            <b>[필수]</b> 안내 사항을
                                            확인하였으며, 탈퇴에 동의합니다.
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-3`}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    필수 약관에 동의해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="d-flex d-lg-block text-center mt-5">
                    <Button
                        variant="g500"
                        className="btw-290"
                        as={Link}
                        to={'/my-profile'}
                    >
                        취소
                    </Button>
                    <Button
                        variant={`${checkClassTagRole(
                            roleName,
                            ...colorByRole
                        )}`}
                        className={`btw-290 ml-2`}
                        type="submit"
                        form="withDrawForm"
                    >
                        탈퇴하기
                    </Button>
                </div>
            </section>

            <Modal
                show={show1}
                onHide={() => setShow1(!show1)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner">
                        <p className="mb-0">탈퇴 하시겠습니까?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={() => setShow1(!show1)}>
                        취소
                    </Button>
                    <Button
                        variant="g700"
                        onClick={(e) => {
                            setShow1(!show1)
                            handleWithDraw(e)
                        }}
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={show2}
                onHide={() => {
                    setErrCurrentPassword(false)
                    setShow2(!show2)
                }}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">탈퇴가 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={() => window.location.href = '/'}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
