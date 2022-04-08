import React, {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import CountDown from "../../../components/CountDown";
import {LoginService} from "../../../services/LoginService";


const ModalChangePhone = (props) => {
    const {show, setChangePhone} = props
    const [show1, setShow1] = useState(false)
    const [showCountDown, setShowCountDown] = useState(false)

    const [validatedPhone, setValidatedPhone] = useState(false)
    const [validatedConfirm, setValidatedConfirm] = useState(false)
    const [checkValidityPhone, setCheckValidityPhone] = useState(false)
    const [checkSuccess, setCheckSuccess] = useState(false)

    const [phone, setPhone] = useState('')
    const [numberConfirm, setNumberConfirm] = useState({
        phoneNo: '',
        sig: '',
        verifyNo: '',
    })

    var time = new Date();
    time.setMinutes(3 + time.getMinutes());

    const handleInputPhone = (e) => {
        const {value} = e.target
        setPhone(value)
    }

    const handleInputConfirm = (e) => {
        const {value} = e.target
        setNumberConfirm({phoneNo: phone, sig: '', verifyNo: value})
    }

    const handleSubmitAuthen = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        if (form.checkValidity() === checkValidityPhone) {
            setCheckValidityPhone(checkValidityPhone)
        } else {
            setCheckValidityPhone(!checkValidityPhone)
            LoginService.getPhoneVerificationNumber(phone).then((res) => {
                setShowCountDown(!showCountDown)
                setNumberConfirm({...numberConfirm, sig: res.data})
            }).catch((err) => console.log(err))
        }
        setValidatedPhone(true)
    }

    const handleSubmitConfirm = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
        } else {
            if (checkValidityPhone === true) {
                console.log('call api confirm ')
                LoginService.confirmPhoneVerificationNumber(numberConfirm).then((res) => {
                        console.log("change phone success: " + numberConfirm);
                        setCheckSuccess(true)
                    }
                ).catch((err) => console.log(err))

                setCheckSuccess(true)
            } else {
                document.getElementById('formPhone').reset()
                document.getElementById('formConfirm').reset()
                setValidatedPhone(true)
            }
        }
        setValidatedConfirm(true)
    }

    const resetState = () => {
        setValidatedPhone(false)
        setValidatedConfirm(false)
        setCheckValidityPhone(false)
        setPhone('')
        setCheckSuccess(false)
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => {
                    props.setChangePhone(false)
                    resetState()
                }}
                dialogClassName="modalw-386 modalh-610 modal-changepassword"
                centered
            >
                <Modal.Header className="justify-content-center">
                    <Modal.Title>휴대폰 번호 변경</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner">
                        <p className="text-top font-18 text-center">
                            새 휴대폰 번호를 입력해주세요.
                        </p>
                        <div>
                            <Form.Group>
                                <Form.Label>휴대폰번호</Form.Label>
                                <Form
                                    className="input-btn-group mb-2"
                                    id="formPhone"
                                    noValidate
                                    validated={validatedPhone}
                                    onSubmit={handleSubmitAuthen}
                                >
                                    <div>
                                        <Form.Control
                                            type="text"
                                            pattern="[0-9]{11}"
                                            required
                                            size="sm"
                                            placeholder="-를 제외한 휴대폰 번호 11자 입력"
                                            onChange={handleInputPhone}
                                            name="phoneNo"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            휴대폰 번호를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                    <Button
                                        variant="g700"
                                        size="sm"
                                        type={'submit'}
                                    >
                                        인증번호 발송
                                    </Button>
                                </Form>
                                {(checkValidityPhone && showCountDown) && (
                                    <p>
                                        <span>인증번호 유효시간 </span>
                                        <span>
                                            <CountDown deadline={time}/>
                                       </span>
                                    </p>
                                )}

                                <Form
                                    className="input-btn-group"
                                    id="formConfirm"
                                    noValidate
                                    validated={validatedConfirm}
                                    onSubmit={handleSubmitConfirm}
                                >
                                    <div>
                                        <Form.Control
                                            type="text"
                                            required
                                            size="sm"
                                            placeholder="인증번호 입력"
                                            onChange={handleInputConfirm}
                                            name="confirm"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            인증번호를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                    <Button
                                        variant="g700"
                                        size="sm"
                                        type={'submit'}
                                    >
                                        확인
                                    </Button>
                                </Form>
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button
                        variant="g200"
                        onClick={() => props.setChangePhone(false)}
                    >
                        취소
                    </Button>
                    <Button
                        variant="m500"
                        onClick={() => {
                            if (checkSuccess) {
                                setShow1(true)
                                setChangePhone(!show)
                                resetState()
                            } else {
                                setValidatedPhone(true)
                                setValidatedConfirm(true)
                                return
                            }
                        }}
                    >
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
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">인증이 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={() => setShow1(false)}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalChangePhone
