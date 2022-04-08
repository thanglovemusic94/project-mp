import ModalNotification from 'components/common/ModalNotification'
import CountDown from 'components/CountDown'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LoginService } from '../../../services/LoginService'

const ResetPassword = () => {
    const VERIFICATION_NUMBER_WRONG = '인증번호를 다시 확인해주세요.'
    const VERIFICATION_NUMBER_CONFIRM_REQUIRED = "휴대폰 인증 완료 후 비밀번호 재설정이가능합니다.";

    const [showPhoneNumber, setShowPhoneNumber] = useState(false)
    const handleShowPhoneNumber = () => setShowPhoneNumber(true)
    const handleClosePhoneNumber = () => setShowPhoneNumber(false)

    const [showCertNumber, setShowCertNumber] = useState(false)
    const handleShowCertNumber = () => setShowCertNumber(true)
    const handleCloseCertNumber = () => setShowCertNumber(false)

    const [showResetConfirm, setShowResetConfirm] = useState(false)
    const handleShowResetConfirm = () => setShowResetConfirm(true)
    const handleCloseResetConfirm = () => setShowResetConfirm(false)

    const [showResetDone, setShowResetDone] = useState(false)
    const handleShowResetDone = () => setShowResetDone(true)
    const handleCloseResetDone = () => setShowResetDone(false)

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    
    const [expirationTime, setExpirationTime] = useState(null);

    const [validated, setValidated] = useState(false);

    const [memberId, setMemberId] = useState("");
    const [memberName, setMemberName] = useState("");

    const [phoneNum, setPhoneNum] = useState("")
    const [sig, setSig] = useState("")
    const [verificationNum, setVerificationNum] = useState("")
    const [validPhone, setValidPhone] = useState(false)


    const handleInfoSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const form = event.target;

        if (form.checkValidity() === true) {

            if (validPhone === false) {

                setNotificationMessage(VERIFICATION_NUMBER_CONFIRM_REQUIRED);
                setShowNotification(true);
            } else {
                // show reset password popup if phone number is verified
                handleShowResetConfirm()
            }
        }
        
        setValidated(true);
    }

    const handleGetVerificationNum = () => {
        const regex = /[0-9]{11}/g

        if (regex.test(phoneNum) === true) {
            
            LoginService.getPhoneVerificationNumber(phoneNum).then((resp) => {

                if (resp === undefined) {
                    // Do nothing
                } else if (resp.status === 200) {
                    setSig(resp.data)
                }
            })
    
            updateCountdownTime();
    
            handleShowPhoneNumber()

        } else {
            setValidated(true);
        }
    }

    const handleConfirmVerificationNum = () => {
        let body = {
            phoneNo: phoneNum,
            sig: sig,
            verifyNo: verificationNum,
        }

        LoginService.confirmPhoneVerificationNumber(body).then((resp) => {
            if (resp.status === 200) {
                handleShowCertNumber()
                setValidPhone(true)          
            }
        }).catch(err => {
            setShowCertNumber(true)
            setValidPhone(false)
        })
    }

    const handleResetPassword = (newPassword) => {
        let body = {
            memberId: memberId,
            name: memberName,
            newPassword: newPassword,
            verifyNo: verificationNum,
            phoneNo: phoneNum,
            sig: sig
        }

        LoginService.resetPassword(body).then((resp) => {
            if (resp.status === 200) {
                // TODO: Show confirm popup here
                handleShowResetDone()
            }
        })

        // Workaround while API is not working yet
        handleShowResetDone()
    }

    function updateCountdownTime() {
        let countdownTime = new Date();

        countdownTime.setMinutes(countdownTime.getMinutes() + 3);
        
        setExpirationTime(countdownTime);
    }


    return (
        <>
            <section className="resetpassword-body py-5">
                <div className="box-title text-center">
                    <h3>
                        회원가입 시 입력한 정보로
                        <br className="d-block d-md-none" />
                        비밀번호를 재설정 할 수 있습니다.
                    </h3>
                </div>
                <div className="box-w488">
                    <Form
                        validated={validated}
                        onSubmit={handleInfoSubmit}
                        noValidate
                    >
                        <Form.Group className="d-lg-flex">
                            <Form.Label>ID</Form.Label>
                            <div className="ipw-386">
                                <Form.Control
                                    type="text"
                                    placeholder="ID 입력 (영문, 숫자 조합 6 ~13자리)"
                                    required
                                    onChange={(e) =>
                                        setMemberId(e.target.value)
                                    }
                                    pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,13}"
                                    value={memberId}
                                    minLength="6"
                                    maxLength="13"
                                />
                                <Form.Control.Feedback type="invalid">
                                    ID를 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>이름</Form.Label>
                            <div className="ipw-386">
                                <Form.Control
                                    type="text"
                                    placeholder="이름 입력"
                                    required
                                    onChange={(e) =>
                                        setMemberName(e.target.value)
                                    }
                                    value={memberName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    이름을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>휴대폰번호</Form.Label>
                            <div className="input-btn-group ipw-386">
                                <div className="flex-grow-1">
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="-를 제외한 휴대폰 번호 11자 입력"
                                        pattern="[0-9]{11}"
                                        maxLength="11"
                                        onChange={e => setPhoneNum(e.target.value)}
                                        value={phoneNum}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        휴대폰 번호을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                                <div>
                                    <Button
                                        variant="g700"
                                        onClick={handleGetVerificationNum}
                                    >
                                        인증번호 발송
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>
                        {
                            expirationTime !== null &&
                            <Form.Group className="d-lg-flex">
                                <div className="input-btn-group ipw-386 ml-auto">
                                    <span>인증번호 유효시간&nbsp;</span>
                                    <CountDown 
                                        key={`CountDown_${expirationTime.toString()}`} 
                                        deadline={ expirationTime } />
                                </div>
                            </Form.Group>
                        }                        
                        <Form.Group className="d-lg-flex">
                            <div className="input-btn-group ipw-386 ml-auto">
                                <div className="flex-grow-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="인증번호 입력"
                                        required
                                        onChange={(e) =>
                                            setVerificationNum(e.target.value)
                                        }
                                        pattern="^[0-9]*$"
                                        value={verificationNum}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        인증번호를 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>

                                <div>
                                    <Button
                                        variant="g700"
                                        onClick={handleConfirmVerificationNum}
                                    >
                                        확인
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>
                        <div className="d-lg-flex mt-5">
                            <Button
                                className="btw-386 ml-auto"
                                variant="b500"
                                type="submit"
                            >
                                비밀번호 재설정
                            </Button>
                        </div>
                    </Form>
                </div>
            </section>
            <Modal
                show={showPhoneNumber}
                onHide={handleShowPhoneNumber}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner">
                        <p className="mb-0 text-center">
                            인증번호가 발송되었습니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={handleClosePhoneNumber}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showCertNumber}
                onHide={handleCloseCertNumber}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0 text-center">
                            {validPhone ? "인증이 완료되었습니다." : VERIFICATION_NUMBER_WRONG}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={handleCloseCertNumber}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <ResetPasswordConfirm 
                show={showResetConfirm}
                onShow={setShowResetConfirm}
                onConfirm={handleResetPassword}
            />
            <Modal
                show={showResetDone}
                onHide={handleShowResetDone}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0 text-center">
                            비밀번호 재설정이 완료되었습니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" as={Link} to="/login">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <ModalNotification 
                show={showNotification}
                onShow={setShowNotification}
                content={notificationMessage}
            />
        </>
    )
}

function ResetPasswordConfirm({ show, onShow, onConfirm }) {
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const [validated, setValidated] = useState(false);
    const [formFeedback, setFormFeedback] = useState({
        // "newPassword": false,
        // "confirmNewPassword": false
    });

    useEffect(() => {
        
        if (validated === true) {
            validateForm();
        }        
    }, [newPassword, confirmNewPassword])

    function handleShowHide() {
        onShow(!show)
    }

    function handleConfirm() {

        if (validateForm() === true) {
            if (onConfirm) {
                onConfirm(newPassword);
            }

            handleShowHide();
        }
            
        setValidated(true);
    }

    function validateForm() {
        let result = true;
        let feedbacks = {
            "newPassword": true,
            "confirmNewPassword": true
        }
        const passwordRegex = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[$@$!%*?&]).{8,13}/g

        if (newPassword.length < 8 ||
            passwordRegex.test(newPassword) === false
        ) {
            result = false;
            feedbacks["newPassword"] = false;
        }

        if (confirmNewPassword.length === 0 ||
            confirmNewPassword !== newPassword    
        ) {
            result = false;
            feedbacks["confirmNewPassword"] = false;
        }

        setFormFeedback(feedbacks);

        return result;
    }

    return (
        <Modal
            show={show}
            onHide={handleShowHide}
            dialogClassName="modalw-386 modalh-610 modal-resetpass"
            centered
        >
            <Modal.Header className="justify-content-center">
                <Modal.Title>비밀번호 재설정</Modal.Title>
            </Modal.Header>
            
            <Modal.Body scrollable="true">
                <div className="modal-body-inner">
                    <p class="text-center">
                        재설정 할 비밀번호를 입력해주세요.
                    </p>
                    <Form 
                        // validated={validated}
                        noValidate
                    >
                        <Form.Group>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                // required
                                size="sm"
                                type="password"
                                placeholder="비밀번호 입력(영문, 숫자, 특수문자 조합 8~13자리)"
                                maxLength="13"
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                value={newPassword}
                                isValid={
                                    formFeedback.newPassword !== undefined && 
                                    formFeedback.newPassword === true
                                }
                                isInvalid={
                                    formFeedback.newPassword !== undefined && 
                                    formFeedback.newPassword === false
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                비밀번호를 입력해주세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control
                                // required
                                size="sm"
                                type="password"
                                placeholder="비밀번호 확인"
                                maxLength="13"
                                onChange={(e) =>
                                    setConfirmNewPassword(e.target.value)
                                }
                                value={confirmNewPassword}
                                isValid={
                                    formFeedback.confirmNewPassword !== undefined && 
                                    formFeedback.confirmNewPassword === true
                                }
                                isInvalid={
                                    formFeedback.confirmNewPassword !== undefined && 
                                    formFeedback.confirmNewPassword === false
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                비밀번호를 한번 더 입력해주세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>

            <Modal.Footer className="modal-btn-half">
                <Button variant="g200" onClick={handleShowHide}>
                    취소
                </Button>
                <Button variant="b500" onClick={handleConfirm}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ResetPassword
