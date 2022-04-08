import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import CustomDropdown from '../../../components/CustomDropdown'
import { grade } from '../../../constants/grade.contants'
import { school } from '../../../constants/school.contains'
import { ParentService } from '../../../services/ParentService'
import { LoginService } from '../../../services/LoginService'
import CountDown from '../../../components/CountDown'

export default function ParentAddChild() {
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [showCountDown, setShowCountDown] = useState(false)
    const [showPhoneSuccess, setShowPhoneSuccess] = useState(false)
    const [showPhoneNumber, setShowPhoneNumber] = useState(false)
    const history = useHistory()

    const [numberConfirm, setNumberConfirm] = useState({
        phoneNo: '',
        sig: '',
        verifyNo: '',
    })
    const initChildren = {
        address: {
            addressDetail: '',
            postCode: '',
            roadName: '',
        },
        email: '',
        grade: 1,
        memberId: '',
        name: '',
        password: '',
        phone: '',
        receivedEmail: false,
        receivedSms: false,
        school: '',
    }
    const [children, setChildren] = useState(initChildren)

    const [validated, setValidated] = useState(false) // show validate success and erros
    const [checkValid, setCheckValid] = useState(false) // check form validate exit errors
    const [validChildrenId, setValidChildrenId] = useState(false) // check validate check add nember id

    const handleChangeInput = (e) => {
        const { name, value, id } = e.target
        if (id === 'txtVerificationNumber2') {
            setNumberConfirm({ ...numberConfirm, verifyNo: value })
        } else {
            setChildren({ ...children, [name]: value })
        }
    }

    const handleChangeAddress = (e) => {
        const { name, value } = e.target
        setChildren({
            ...children,
            address: { ...children.address, [name]: value },
        })
    }

    const handleCheckbox = (e) => {
        const { name } = e.target
        setChildren({ ...children, [name]: e.target.checked })
    }

    const handleChangeDropdown = (e, k) => {
        const { name } = e.target
        if (name && name !== '') {
            setChildren({ ...children, [name]: k })
            console.log(name, k)
        }
    }

    function handleDoubleCheck() {
        ParentService.existsMemberId(children.memberId).then((res) => {
            if (res.data) {
                setValidChildrenId(true)
                console.log('id member is exit')
            } else {
                setValidChildrenId(false)
                console.log('id member not exit')
            }
        })
    }

    var time = new Date()
    time.setMinutes(3 + time.getMinutes())

    function handelGetVerification() {
        setShowPhoneNumber(!showPhoneNumber)
        LoginService.getPhoneVerificationNumber(children.phone)
            .then((res) => {
                setShowCountDown(!showCountDown)
                setNumberConfirm({
                    ...numberConfirm,
                    phoneNo: children.phone,
                    sig: res.data,
                })
            })
            .catch((err) => console.log(err))
    }

    function postVerificaion() {
        LoginService.confirmPhoneVerificationNumber(numberConfirm)
            .then((res) => {
                setShowPhoneSuccess(!setShowPhoneSuccess())
                console.log('change phone success: ' + numberConfirm)
            })
            .catch((err) => console.log(err))
    }

    function onSubmit(e) {
        e.preventDefault()
        e.stopPropagation()

        const form = e.currentTarget
        if (form.checkValidity() === false) {
            setCheckValid(true)
        } else {
            console.log('call api add children')
            ParentService.addChildren(children)
                .then((res) => {
                    console.log('success add children')
                    history.push('/my-profile')
                })
                .catch((e) => console.log(e))
        }
        setValidated(true)
    }

    return (
        <>
            <div className="parentaddchild-body">
                <h2 className="page-title mb-lg-4">자녀 추가 회원가입</h2>
                <section>
                    <div className="box-w612 py-lg-5">
                        <div className="box-title">
                            <h3>기본정보</h3>
                            {checkValid && (
                                <p className="text-danger">
                                    *기본정보는 필수 입력사항입니다.
                                </p>
                            )}
                        </div>
                        <div className="box-register">
                            <Form
                                id={'formAddChildren'}
                                onSubmit={onSubmit}
                                noValidate
                                validated={validated}
                                // className="was-validated"
                            >
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>
                                        이름
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            type="text"
                                            placeholder="이름 입력"
                                            required
                                            onChange={handleChangeInput}
                                            name={'name'}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            이름을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>
                                        ID
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <div className="flex-grow-1">
                                            <Form.Control
                                                type="text"
                                                placeholder="ID 입력 (영문, 숫자 조합 6 ~13자리)"
                                                required
                                                onChange={handleChangeInput}
                                                name={'memberId'}
                                                isInvalid={validChildrenId}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {validChildrenId
                                                    ? 'ID 중복 확인을 진행해주세요.'
                                                    : 'ID를 입력해주세요.'}
                                            </Form.Control.Feedback>
                                        </div>
                                        <div>
                                            <Button
                                                variant="g700"
                                                name={'doubleCheck'}
                                                onClick={handleDoubleCheck}
                                            >
                                                중복확인
                                            </Button>
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>
                                        비밀번호
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            type="text"
                                            placeholder="비밀번호 입력(영문, 숫자, 특수문자 조합 8~13자리)"
                                            required
                                            onChange={handleChangeInput}
                                            name={'password'}
                                            pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[$@$!%*?&]).{8,13}"
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            비밀번호를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>
                                        비밀번호 확인
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            type="text"
                                            placeholder="비밀번호 확인"
                                            required
                                            pattern={children.password}
                                            // onChange={handleChangeInput}
                                            // name={"confirmPassword"}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            비밀번호를 한번 더 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                <Form.Group className="d-lg-flex">
                                    <Form.Label>
                                        휴대폰 번호
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <div className="flex-grow-1">
                                            <Form.Control
                                                type="text"
                                                placeholder="-를 제외한 휴대폰 번호 11자 입력"
                                                required
                                                onChange={handleChangeInput}
                                                name={'phone'}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                휴대폰번호를 입력해주세요.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div>
                                            <Button
                                                variant="g700"
                                                onClick={() =>
                                                    setShowPhoneNumber(
                                                        !showPhoneNumber
                                                    )
                                                }
                                            >
                                                인증번호 발송
                                            </Button>
                                        </div>
                                    </div>
                                </Form.Group>
                                {showCountDown && (
                                    <p>
                                        <span>인증번호 유효시간 </span>
                                        <span>
                                            <CountDown deadline={time} />
                                        </span>
                                    </p>
                                )}
                                <Form.Group className="d-lg-flex">
                                    <Form.Label></Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <div className="flex-grow-1">
                                            <Form.Control
                                                type="text"
                                                required
                                                placeholder="인증번호 입력"
                                                id="txtVerificationNumber2"
                                                onChange={handleChangeInput}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                인증번호를 입력해주세요.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div>
                                            <Button
                                                type="button"
                                                variant="g700"
                                                onClick={postVerificaion}
                                            >
                                                확인
                                            </Button>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="d-lg-flex">
                                    <Form.Label>
                                        이메일
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            type="email"
                                            placeholder="이메일 입력"
                                            required
                                            onChange={handleChangeInput}
                                            name={'email'}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            이메일을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex mb-n2 mb-lg-3">
                                    <Form.Label>
                                        주소
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <div className="flex-grow-1">
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                disabled
                                                required
                                                name={'postCode'}
                                                onChange={handleChangeAddress}
                                            />
                                        </div>
                                        <Button
                                            variant="g700"
                                            // onClick={() => setShow2(!show2)}
                                        >
                                            우편번호 찾기
                                        </Button>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex mb-n2 mb-lg-3">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        className="ipw-488"
                                        type="text"
                                        disabled
                                        required
                                        name={'roadName'}
                                        onChange={handleChangeAddress}
                                    />
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label></Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            className="ipw-488"
                                            type="text"
                                            placeholder="상세 주소 입력"
                                            required
                                            name={'addressDetail'}
                                            onChange={handleChangeAddress}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            주소를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>
                                        학교
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="ipw-488">
                                        <div className="row mx-n1">
                                            <div className="col-6 px-1">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="학교명 입력"
                                                    required
                                                    name={'school'}
                                                    onChange={handleChangeInput}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    학교를 입력 및 선택
                                                    해주세요.
                                                </Form.Control.Feedback>
                                            </div>
                                            <div className="col-6 px-1">
                                                <CustomDropdown
                                                    items={school}
                                                    onChange={
                                                        handleChangeDropdown
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>
                                        학년
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="ipw-488">
                                        <CustomDropdown
                                            items={grade}
                                            onChange={handleChangeDropdown}
                                            name={'grade'}
                                            className="ipw-240"
                                        />
                                    </div>
                                </Form.Group>

                                <div className="d-block d-lg-flex justify-content-center mt-5">
                                    <Form.Check
                                        className="form-check-custom b500 outline mr-lg-3 mb-2 mb-lg-0 ipw-285"
                                        label={
                                            <>
                                                <b>[필수]</b>이메일 수신 동의
                                            </>
                                        }
                                        type="checkbox"
                                        id={`condition-4`}
                                        name={'receivedEmail'}
                                        onChange={handleCheckbox}
                                    />
                                    <Form.Check
                                        className="form-check-custom b500 outline ml-lg-3 ipw-285"
                                        label={
                                            <>
                                                <b>[필수]</b>SMS 수신 동의
                                            </>
                                        }
                                        type="checkbox"
                                        id={`condition-5`}
                                        name={'receivedSms'}
                                        onChange={handleCheckbox}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>
                </section>

                <div className="text-center d-flex d-lg-block mt-5">
                    <Button
                        variant="g700"
                        as={Link}
                        className="btw-290 btn-g500 mr-1"
                        to="/my-profile"
                    >
                        취소
                    </Button>
                    <Button
                        variant="b500"
                        className="btw-290 ml-1"
                        type="submit"
                        form={'formAddChildren'}
                    >
                        확인
                    </Button>
                </div>
            </div>
            <Modal
                show={show2}
                onHide={() => setShow2(!show2)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner">
                        <p className="mb-0 text-center">
                            Postal code finding pop-up exposure (API
                            interworking)
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={() => setShow2(!show2)}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showPhoneNumber}
                onHide={() => setShowPhoneNumber(!showPhoneNumber)}
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
                    <Button
                        variant="g700"
                        // onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                        onClick={handelGetVerification}
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal // success verification phone
                show={showPhoneSuccess}
                onHide={() => setShowPhoneSuccess(!showPhoneSuccess)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0 text-center">
                            인증이 완료되었습니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button
                        variant="g700"
                        onClick={() => setShowPhoneSuccess(!showPhoneSuccess)}
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
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">
                            자녀 추가 회원가입이 완료되었습니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" as={Link} to="/my-profile">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
