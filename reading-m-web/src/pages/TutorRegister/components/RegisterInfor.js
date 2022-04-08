import CountDown from 'components/CountDown'
import CustomDropdown from 'components/CustomDropdown'
import React, {useEffect, useState} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { LoginService } from 'services/LoginService'
import formatDate from '../../../utils/DateUtils'
import UploadAvatar from 'components/UploadAvatar'
import {error} from "../../../reducers/error.reducer";

const ErrorPhrase = {
    IdRequired: 'ID를 입력해주세요.',
    IdWrongFormat: '영문, 숫자 조합의 6~13자리 ID를 입력해주세요.',
    IdAlreadyUsed: '이미 사용중인 ID 입니다.',
    idUsable: '사용가능한 ID입니다',
    PasswordRequired: '비밀번호를 입력해주세요.',
    PasswordWrongFormat:
        '영문, 숫자, 특수문자 조합의 8~13자리 비밀번호를 입력해주세요.',
    PasswordConfirmation: '비밀번호를 한번 더 입력해주세요.',
    PhoneRequired: '휴대폰 번호를 입력해주세요.',
    PhoneWrongFormat: '올바른 형식의 휴대폰 번호를 입력해주세요.',
    PhoneAuthCodeRequired: '인증번호를 입력해주세요.',
    PhoneAuthCodeInvalid: '잘못된 인증번호입니다.',
    EmailRequired: '이메일을 입력해주세요.',
    EmailWrongFormat: '올바른 형식의 이메일 주소를 입력해주세요.',
    EmailAlreadyUsed: '이미 사용중인 이메일입니다.',
    BankAccountRequired: '계좌번호를 입력해주세요.',
    BankAccountWrongFormat: '숫자만 입력해주세요.',
}

const Gender = [
    { label: '남자', value: 'MALE' },
    { label: '여자', value: 'FEMALE' },
]

const RegisterInfor = ({ onFinish }) => {
    const [data, setData] = useState({
        memberId: '',
        password: '',
        phone: '',
        gender: 'MALE',
        receivedEmail: false,
        receivedSms: false,
        email: '',
        bankAccount: '',
    })

    const [stateSendCertNumber, setSendCertNumber] = useState(false)
    const [stateConfirmCertNumber, setConfirmCertNumber] = useState(false)
    const [errors, setErrors] = useState({})

    const [passwordMatched, setPasswordMatched] = useState(null)
    const [phoneVerified, setPhoneVerified] = useState(null)
    const [phoneAuthCode, setPhoneAuthCode] = useState('')
    const [sigKey, setSigKey] = useState(null)
    const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(null)
    const [file, setFile] = useState({value: null, error: false});
    const [checkEmptyFile, setCheckEmptyFile] = useState(false);

    function getCountdownTime() {
        let countdownTime = new Date()
        countdownTime.setMinutes(countdownTime.getMinutes() + 3)
        return countdownTime
    }

    function handleCheckIdExisted() {

        var pattern = new RegExp("^(?=.*\\d)(?=.*[a-zA-Z]).{6,13}$");
        if (data.memberId.trim().length === 0){
            setErrors({...errors, error: true, msg: ErrorPhrase.IdRequired})
        }else if (pattern.test(data.memberId) == false){
            setErrors({...errors, error: true, msg: ErrorPhrase.IdWrongFormat})
        } else {
            LoginService.isMemberIdExisted(data.memberId).then((resp) => {
                if (resp.status === 200) {
                    if (resp.data === true) setErrors({...errors, error: true, msg: ErrorPhrase.IdAlreadyUsed})
                    else setErrors({...errors, error: false, msg: ErrorPhrase.idUsable})
                }
            })
        }

    }

    function handlePhoneVerification() {
        setSigKey(null)

        LoginService.getPhoneVerificationNumber(data.phone).then((resp) => {
            if (resp === undefined) {
                setSigKey(null)
            }
            else if (resp.status === 200) {
                setSendCertNumber(true)
                setSigKey(resp.data)
            }
        })


    }

    function handleConfirmPhoneAuthCode() {
        let body = {
            phoneNo: data.phone,
            sig: sigKey,
            verifyNo: phoneAuthCode,
        }

        LoginService.confirmPhoneVerificationNumber(body)
            .then((resp) => {
                if (resp.status === 200) {
                    setPhoneVerified(resp.data)
                    if (resp.data === true) {
                        setConfirmCertNumber(true)
                    }
                }
            })
            .catch(() => {
                setPhoneVerified(false)
            })
    }

    function handleAuthCodeChanged(value) {
        setPhoneVerified(null)
        setPhoneAuthCode(value)
        setSigKey(null)
    }

    function handlePasswordConfirmation(value) {
        setPasswordMatched(data.password === value)
    }

    // Validate form
    const [validated, setValidated] = useState(false)
    const handleMemberId = (e) => {
        const {value} = e.target;
        setData({
            ...data,
            memberId: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const form = event.currentTarget

        handleCheckIdExisted()
        if (form.checkValidity() === false || file.value === null || errors.error === true) {
            if (file.value === null){
                setFile({...file, error: true})
                setCheckEmptyFile(true)
            }else  {
                setFile({...file, error: false})
                setCheckEmptyFile(false)
            }
            setValidated(true)

        } else {
            LoginService.isEmailExisted(data.email).then((resp) => {
                if (resp.status === 200) {
                    if (resp.data[0].existed === false) {
                        onFinish({id: null, tutor: {...data, id: null}, imagePC: file.value})
                    } else {
                        // Show email already existed
                        setEmailAlreadyUsed(true)
                    }
                }
            })
        }
    }

    const updateAddress = (event) => {
        if (event.origin === process.env.REACT_APP_BACKEND_BASE_URL) {
            setData({
                ...data,
                address: {
                    postCode: event.data.zipNo,
                    roadName: event.data.roadAddrPart1,
                    addressDetail: event.data.addrDetail,
                },
            })
        }
    }

    useEffect(()=>{
        window.addEventListener('message', updateAddress)

        return () => {
            window.removeEventListener('message', updateAddress)
        }
    },[])

    return (
        <>
            <div className="registerselfintro-section">
                <div className="box-w612">
                    <div className="box-title">
                        <h3>기본정보</h3>
                        <p className="text-danger">
                            *기본정보는 필수 입력사항입니다.
                        </p>
                    </div>

                    {/* upload avatar */}
                    <UploadAvatar file={file} setFile ={setFile} checkEmptyFile={checkEmptyFile} setCheckEmptyFile ={setCheckEmptyFile}/>

                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={(e) => {
                            if (file.value === null) setFile({...file, error: {...error, empty: true}})
                            handleSubmit(e)
                        }}
                        // className="was-validated"
                    >
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                이름 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="text"
                                    placeholder="이름 입력"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    이름을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                생년월일 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="text"
                                    placeholder="YYYYMMDD"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            birth: formatDate(
                                                e.target.value,
                                                'YYYYMMDD',
                                                'YYYY-MM-DD'
                                            ),
                                        })
                                    }
                                    maxLength="8"
                                    pattern="[0-9]{4}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    생년월일을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                성별 <span className="text-danger">*</span>
                            </Form.Label>
                            <CustomDropdown
                                items={Gender}
                                onChange={(e, k) => {
                                    setData({...data, gender: k})
                                }}
                                classNameToggle="ipw-488"
                                className=""
                            />
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                ID <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-btn-group ipw-488">
                                <div className="flex-grow-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="ID 입력 (영문, 숫자 조합 6 ~13자리)"
                                        onChange={handleMemberId}
                                        pattern="^(?=.*\d)(?=.*[a-zA-Z]).{6,13}$"
                                        required
                                    />
                                    {
                                        errors.error === null
                                            ?
                                            <></>
                                            :
                                            errors.error === true
                                                ?
                                                    <Form.Control.Feedback type={"invalid"} className={'d-block'}>
                                                        {errors.msg}
                                                    </Form.Control.Feedback>

                                                :
                                                <Form.Control.Feedback type={"valid"} className={'d-block'}>
                                                    {errors.msg}
                                                </Form.Control.Feedback>
                                    }


                                </div>
                                <div>
                                    <Button
                                        type="button"
                                        variant="g700"
                                        onClick={handleCheckIdExisted}
                                    >
                                        중복확인
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                비밀번호 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호 입력(영문, 숫자, 특수문자 조합 8~13자리)"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            password: e.target.value,
                                        })
                                    }
                                    pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[$@$!%*?&]).{8,13}"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {data.password === ''
                                        ? ErrorPhrase.PasswordRequired
                                        : ErrorPhrase.PasswordWrongFormat}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                비밀번호 확인{' '}
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    onChange={(e) =>
                                        handlePasswordConfirmation(
                                            e.target.value
                                        )
                                    }
                                    pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[$@$!%*?&]).{8,13}"
                                    isInvalid={passwordMatched === false}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {ErrorPhrase.PasswordConfirmation}
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
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                phone: e.target.value,
                                            })
                                        }
                                        pattern="(?=^[0-9]*$).{11}"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {data.phone === ''
                                            ? ErrorPhrase.PhoneRequired
                                            : ErrorPhrase.PhoneWrongFormat}
                                    </Form.Control.Feedback>
                                </div>
                                <div>
                                    <Button
                                        variant="g700"
                                        onClick={handlePhoneVerification}
                                    >
                                        인증번호 발송
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>
                        {sigKey !== null && (
                            <Form.Group className="d-lg-flex">
                                <Form.Label> </Form.Label>
                                <div className="input-btn-group ipw-488">
                                    <p className={'text-b500'}>
                                        <span>인증번호 유효시간 </span>
                                        <span>
                                            <CountDown deadline={getCountdownTime()}/>
                                       </span>
                                    </p>
                                </div>
                            </Form.Group>
                        )}
                        <Form.Group className="d-lg-flex">
                            <Form.Label></Form.Label>
                            <div className="input-btn-group ipw-488">
                                <div className="flex-grow-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="인증번호 입력"
                                        onChange={(e) =>
                                            handleAuthCodeChanged(
                                                e.target.value
                                            )
                                        }
                                        isValid={
                                            phoneAuthCode !== '' &&
                                            phoneVerified === true
                                        }
                                        isInvalid={phoneVerified === false}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {phoneAuthCode !== '' &&
                                        phoneVerified === false
                                            ? ErrorPhrase.PhoneAuthCodeInvalid
                                            : phoneAuthCode === ''
                                            ? ErrorPhrase.PhoneAuthCodeRequired
                                            : ''}
                                    </Form.Control.Feedback>
                                </div>
                                <Button
                                    variant="g700"
                                    onClick={handleConfirmPhoneAuthCode}
                                >
                                    확인
                                </Button>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                이메일 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="email"
                                    placeholder="이메일 입력"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            email: e.target.value,
                                        })
                                    }
                                    isValid={emailAlreadyUsed === false}
                                    isInvalid={emailAlreadyUsed === true}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {data.email === ''
                                        ? ErrorPhrase.EmailRequired
                                        : data.email !== '' &&
                                          emailAlreadyUsed === true
                                        ? ErrorPhrase.EmailAlreadyUsed
                                        : ErrorPhrase.EmailWrongFormat}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                주소 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-btn-group  ipw-488">
                                <div className="flex-grow-1">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id={'address'}
                                        name={'postCode'}
                                        value={data.address?.postCode}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                address: {
                                                    ...data.address,
                                                    postCode: e.target.value,
                                                },
                                            })
                                        }
                                        disabled
                                    />
                                </div>
                                <div>
                                    <Button type="submit"
                                            variant="g700"
                                            onClick={() =>
                                                window.open(
                                                    '/roadApi',
                                                    'pop',
                                                    'width=570,height=420, scrollbars=yes, resizable=yes'
                                                )
                                            }
                                    >
                                        우편번호 찾기
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label></Form.Label>
                            <Form.Control
                                className="ipw-488"
                                placeholder=""
                                type="text"
                                value={data.address?.addressDetail}
                                id={'address'}
                                name={'addressDetail'}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        address: {
                                            ...data.address,
                                            addressDetail: e.target.value,
                                        },
                                    })
                                }
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label></Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="text"
                                    placeholder="상세 주소 입력"
                                    value={data.address?.roadName}
                                    id={'address'}
                                    name={'roadName'}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            address: {
                                                ...data.address,
                                                roadName: e.target.value,
                                            },
                                        })
                                    }
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    주소를 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                은행 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="text"
                                    placeholder="은행 입력"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            bank: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    은행을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                계좌번호 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="text"
                                    placeholder="계좌번호 입력"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            bankAccount: e.target.value,
                                        })
                                    }
                                    pattern="^[0-9]*$"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {data.bankAccount !== ''
                                        ? ErrorPhrase.BankAccountWrongFormat
                                        : ErrorPhrase.BankAccountRequired}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <div className="d-block d-lg-flex justify-content-center mt-5">
                            <Form.Check
                                className="form-check-custom outline p500 mr-lg-3 mb-2 mb-lg-0 ipw-285"
                                label={
                                    <>
                                        <b>[선택]</b>이메일 수신 동의
                                    </>
                                }
                                type="checkbox"
                                id={`condition-2`}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        receivedEmail: e.target.checked,
                                    })
                                }
                            />
                            <Form.Check
                                className="form-check-custom outline p500 ml-lg-3 ipw-285"
                                label={
                                    <>
                                        <b>[선택]</b>SMS 수신 동의
                                    </>
                                }
                                type="checkbox"
                                id={`condition-3`}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        receivedSms: e.target.checked,
                                    })
                                }
                            />
                        </div>

                        <div className="d-flex justify-content-center pt-5 mb-5">
                            <Button
                                variant="p500"
                                className="btw-386 mr-1"
                                type="submit"
                            >
                                다음
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            <Modal
                show={stateSendCertNumber}
                onHide={() => setSendCertNumber(false)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner">
                        <p className="mb-0 text-center">
                            인증번호가 발송되었습니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={() => setSendCertNumber(false)}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={stateConfirmCertNumber}
                onHide={() => setConfirmCertNumber(false)}
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
                        onClick={() => setConfirmCertNumber(false)}
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RegisterInfor
