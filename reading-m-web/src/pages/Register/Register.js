import RMFormControl from 'components/common/RMFormControl';
import CountDown from 'components/CountDown';
import CustomDropdown from 'components/CustomDropdown';
import { grade } from 'constants/grade.contants';
import { school } from 'constants/school.contains';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LoginService } from '../../services/LoginService';

const ValidationFeedbacks = {
    "valid": {
        "memberId": {
            "available": "사용가능한 ID입니다."
        }
    },
    "invalid": {
        "name": "이름을 입력해주세요.",
        "memberId": {
            "required": "ID를 입력해주세요.",
            "wrongFormat": "영문, 숫자 조합의 6~13자리 ID를 입력해주세요.",
            "alreadyUsed": "이미 사용중인 ID 입니다.",
            "hasNotConfirmed": "ID 중복 확인을 진행해주세요."
        },
        "password": {
            "required": "비밀번호를 입력해주세요.",
            "wrongFormat": "영문, 숫자, 특수문자 조합의 8~13자리 비밀번호를 입력해주세요."
        },
        "confirmPassword": "비밀번호를 한번 더 입력해주세요.",
        "phoneNumber": {
            "required": "휴대폰번호를 입력해주세요.",
            "wrongFormat": "올바른 형식의 휴대폰 번호를 입력해주세요."
        },
        "verificationNumber": "인증번호를 입력해주세요.",
        "email": {
            "required": "이메일을 입력해주세요.",
            "wrongFormat": "올바른 형식의 이메일 주소를 입력해주세요.",
            "alreadyUsed": "이미 사용중인 이메일입니다."
        },
        "address": "주소를 입력해주세요."
    }
}

const InformationTemplate = {
    "address": {
        "postCode": '',
        "roadName": '',
        "addressDetail": '',
    },
    "email": '',
    "emailVerified": true,
    "memberId": '',
    "memberIdVerified": false,
    "name": '',
    "password": '',
    "confirmPassword": true,
    "phone": '',
    "phoneVerification": '',
    "receivedEmail": false,
    "receivedSms": false
}

const ChildrenInformationTemplate = {
    ...InformationTemplate,
    "grade": 0,
    "school": '',
    "schoolName": ''
}

const MAX_CHILDREN_NUM = 9;

const SelfContext = createContext(Register);

function ServicesAgree({ source, onSourceChange }) {

    return (
        <div className="d-block d-lg-flex justify-content-center mt-5">
            <Form.Check
                className="form-check-custom outline b500 mr-lg-3 mb-2 mb-lg-0 ipw-285"
                label={
                    <>
                        <b>[선택]</b>이메일 수신 동의
                    </>
                }
                type="checkbox"
                id={`condition-${new Date().toISOString()}-1`}
                onChange={(e) =>
                    onSourceChange({
                        ...source,
                        "receivedEmail": e.target.checked,
                    })
                }
            />
            <Form.Check
                className="form-check-custom outline b500 ml-lg-3 ipw-285"
                label={
                    <>
                        <b>[선택]</b>SMS 수신 동의
                    </>
                }
                type="checkbox"
                id={`condition-${new Date().toISOString()}-2`}
                onChange={(e) =>
                    onSourceChange({
                        ...source,
                        "receivedSms": e.target.checked,
                    })
                }
            />
        </div>
    )
}

function SignUpInformation({ source, onSourceChange, index }) {
    const {
        validated,
        handleMemberIdCheck,
        handleRequestPhoneVerification,
        confirmPhoneVerificationNumber,
        handleOpenPostalCodePopup
    } = useContext(SelfContext);

    const [idAvailable, setIdAvailable] = useState(null);
    const [canCheckId, setCanCheckId] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [expirationTime, setExpirationTime] = useState(null);

    function handleIdCheckCallback(result) {
        
        if (canCheckId === true) {
            
            setIdAvailable(!result);

            onSourceChange({
                ...source,
                "memberIdVerified": true
            })
        }
    }

    function handleMemberIdChange(e) {
        var value = e.target.value;
        var pattern = new RegExp(e.target.pattern);
        
        setCanCheckId(pattern.test(value) === true);

        if (idAvailable !== null) {
            setIdAvailable(null);
        }

        onSourceChange({
            ...source,
            "memberId": value
        })
    }

    function handleConfirmPasswordChange(e) {
        const value = e.target.value;
        const isValid = value === source.password;

        setConfirmPassword(isValid);

        onSourceChange({
            ...source,
            "confirmPassword": isValid
        })
    }

    function updateCountdownTime() {
        let countdownTime = new Date();

        countdownTime.setMinutes(countdownTime.getMinutes() + 3);

        setExpirationTime(countdownTime);
    }

    return (
        <>
            <Form.Group className="d-lg-flex">
                <Form.Label>
                    이름
                    <span className="text-danger">*</span>
                </Form.Label>
                <div className="ipw-488">
                    <RMFormControl
                        type="text"
                        required
                        placeholder="이름 입력"
                        onChange={(e) =>
                            onSourceChange({
                                ...source,
                                "name": e.target.value,
                            })
                        }
                        invalidFeedback={ValidationFeedbacks.invalid.name}
                    />
                </div>
            </Form.Group>
            <Form.Group className="d-lg-flex">
                <Form.Label>
                    ID
                    <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-btn-group ipw-488">
                    <div className="flex-grow-1">
                        <RMFormControl
                            type="text"
                            required
                            placeholder="ID 입력 (영문, 숫자 조합 6 ~13자리)"
                            onChange={handleMemberIdChange}
                            maxLength="13"
                            minLength="6"
                            pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,13}"
                            invalidFeedback={ValidationFeedbacks.invalid.memberId.required}
                            invalidPatternFeedback={ValidationFeedbacks.invalid.memberId.wrongFormat}
                        />
                        {
                            idAvailable === null
                                ? (validated === true) && (source.memberIdVerified === false)
                                    ? <span>{ValidationFeedbacks.invalid.memberId.hasNotConfirmed}</span>
                                    : <></>
                                : idAvailable === true
                                    ? <span>{ValidationFeedbacks.valid.memberId.available}</span>
                                    : <span>{ValidationFeedbacks.invalid.memberId.alreadyUsed}</span>
                        }
                    </div>
                    <div>
                        <Button
                            type="button"
                            variant="g700"
                            onClick={() => handleMemberIdCheck(source.memberId, handleIdCheckCallback)}
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
                    <RMFormControl
                        type="password"
                        required
                        placeholder="비밀번호 입력(영문, 숫자, 특수문자 조합 8~13자리)"
                        onChange={(e) =>
                            onSourceChange({
                                ...source,
                                "password": e.target.value,
                            })
                        }
                        maxLength="13"
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[$@$!%*?&]).{8,13}"
                        invalidFeedback={ValidationFeedbacks.invalid.password.required}
                        invalidPatternFeedback={ValidationFeedbacks.invalid.password.wrongFormat}
                    />
                </div>
            </Form.Group>
            <Form.Group className="d-lg-flex">
                <Form.Label>
                    비밀번호 확인
                    <span className="text-danger">*</span>
                </Form.Label>
                <div className="ipw-488">
                    <Form.Control
                        type="password"
                        required
                        placeholder="비밀번호 확인"
                        onChange={handleConfirmPasswordChange}
                        // isValid={confirmPassword !== null && confirmPassword === true}
                        isInvalid={confirmPassword !== null && confirmPassword === false}
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
                        <RMFormControl
                            type="text"
                            required
                            placeholder="-를 제외한 휴대폰 번호 11자 입력"
                            onChange={(e) =>
                                onSourceChange({
                                    ...source,
                                    "phone": e.target.value,
                                })
                            }
                            pattern="(?=^[0-9]*$).{11}"
                            maxLength="11"
                            invalidFeedback={ValidationFeedbacks.invalid.phoneNumber.required}
                            invalidPatternFeedback={ValidationFeedbacks.invalid.phoneNumber.wrongFormat}
                        />
                    </div>
                    <div>
                        <Button
                            variant="g700"
                            onClick={() => handleRequestPhoneVerification(source.phone, updateCountdownTime)}
                        >
                            인증번호 발송
                        </Button>
                    </div>
                </div>
            </Form.Group>
            {
                expirationTime !== null &&
                <Form.Group className="d-lg-flex">
                    <div className="input-btn-group ipw-488 ml-auto">
                        <span>인증번호 유효시간&nbsp;</span>
                        <CountDown
                            key={`CountDown_${expirationTime.toString()}`}
                            deadline={expirationTime} />
                    </div>
                </Form.Group>
            }
            <Form.Group className="d-lg-flex">
                <Form.Label></Form.Label>
                <div className="input-btn-group ipw-488">
                    <div className="flex-grow-1">
                        <Form.Control
                            type="text"
                            required
                            placeholder="인증번호 입력"
                            onChange={(e) => onSourceChange({
                                ...source,
                                "phoneVerification": e.target.value,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            인증번호를 입력해주세요.
                        </Form.Control.Feedback>
                    </div>
                    <div>
                        <Button
                            variant="g700"
                            onClick={() =>
                                confirmPhoneVerificationNumber(
                                    source.phone,
                                    source.phoneVerification
                                )
                            }
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
                    <RMFormControl
                        type="email"
                        required
                        placeholder="이메일 입력"
                        onChange={(e) =>
                            onSourceChange({
                                ...source,
                                "email": e.target.value,
                            })
                        }
                        pattern=".*@.*[.].+"
                        invalidFeedback={ValidationFeedbacks.invalid.email.required}
                        invalidPatternFeedback={ValidationFeedbacks.invalid.email.wrongFormat}
                    />
                    {
                        source.emailVerified === true
                            ? <></>
                            : <span>{ValidationFeedbacks.invalid.email.alreadyUsed}</span>
                    }
                </div>
            </Form.Group>
            <Form.Group className="d-lg-flex mb-0 mb-lg-3">
                <Form.Label>
                    주소
                    <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-btn-group ipw-488">
                    <div className="flex-grow-1">
                        <Form.Control
                            type="text"
                            placeholder=""
                            value={
                                source.address.postCode
                            }
                            // onChange={(e) =>
                            //     onSourceChange({
                            //         ...source,
                            //         "address": {
                            //             ...source.address,
                            //             "postCode": e.target.value,
                            //         },
                            //     })
                            // }
                            required
                        />
                    </div>
                    <div>
                        <Button
                            variant="g700"
                            onClick={() => handleOpenPostalCodePopup(index)}
                        >
                            우편번호 찾기
                        </Button>
                    </div>
                </div>
            </Form.Group>
            <Form.Group className="d-lg-flex">
                <Form.Label></Form.Label>
                <div className="ipw-488">
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={source.address.roadName}
                        // onChange={(e) =>
                        //     onSourceChange({
                        //         ...source,
                        //         "address": {
                        //             ...source.address,
                        //             "roadName": e.target.value,
                        //         },
                        //     })
                        // }
                        required
                    />
                </div>
            </Form.Group>
            <Form.Group className="d-lg-flex">
                <Form.Label></Form.Label>
                <div className="ipw-488">
                    <Form.Control
                        type="text"
                        required
                        placeholder="상세 주소 입력"
                        value={
                            source.address.addressDetail
                        }
                        onChange={(e) =>
                            onSourceChange({
                                ...source,
                                "address": {
                                    ...source.address,
                                    "addressDetail": e.target.value,
                                },
                            })
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        주소를 입력해주세요.
                    </Form.Control.Feedback>
                </div>
            </Form.Group>
        </>
    )
}

function ParentSignUpInformation({ source }) {
    const { setParentInfo } = useContext(SelfContext);

    return (
        <div className="box-w612">
            <SignUpInformation
                source={source}
                onSourceChange={setParentInfo}
                index={-1}
            />
            <ServicesAgree
                source={source}
                onSourceChange={setParentInfo}
            />
        </div>
    )
}

function ChildrenSignUpInformation({ source, index }) {
    const {
        handleChildrenInfoChange,
        handleSchoolSelect,
        handleGradeSelect,
        handleRemoveChildren
    } = useContext(SelfContext);

    const weekNum = index + 1;

    function handleChange(childrenInfo) {

        handleChildrenInfoChange(childrenInfo, index);
    }

    const RemoveButton = () => {
        let elemt = <></>

        if (index > 0) {
            elemt = <Button
                type="button"
                variant=""
                className="box-add-delete"
                onClick={() => {
                    handleRemoveChildren(index)
                }}
            >
                삭제
            </Button>
        }

        return elemt;
    }

    return (
        <>
            <div className="box-add">
                <span className="box-add-label">자녀{weekNum}</span>
                <RemoveButton />
                <div className="box-w612">
                    <SignUpInformation
                        source={source}
                        onSourceChange={handleChange}
                        index={index}
                    />
                    <Form.Group className="d-lg-flex">
                        <Form.Label>
                            학교
                            <span className="text-danger">
                                *
                            </span>
                        </Form.Label>
                        <div className="ipw-488">
                            <div className="row mx-n1">
                                <div className="col-6 px-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="학교명 입력"
                                        required
                                        onChange={(e) =>
                                            handleChange({
                                                ...source,
                                                "schoolName":
                                                    e.target
                                                        .value,
                                            })
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        학교를 입력 및 선택
                                        해주세요.
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col-6 px-1">
                                    <CustomDropdown
                                        items={school}
                                        onChange={(e, k) => handleSchoolSelect(k, e, index)}
                                        defaultToggleLabel="학교 선택"
                                        defaultToggleValue=""
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="d-lg-flex">
                        <Form.Label>
                            학년
                            <span className="text-danger">
                                *
                            </span>
                        </Form.Label>
                        <div className="ipw-488">
                            <CustomDropdown
                                className="ipw-240"
                                classNameToggle="ipw-240"
                                items={grade}
                                onChange={(e, k) => handleGradeSelect(k, e, index)}
                                defaultToggleLabel="학년선택"
                                defaultToggleValue=""
                                required
                                invalidFeedback="학년을 선택해주세요."
                            />
                            <Form.Control.Feedback type="invalid">
                                학년을 선택해주세요.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <ServicesAgree
                        source={source}
                        onSourceChange={handleChange}
                    />
                </div>
            </div>
        </>
    )
}

export default function Register() {
    const VERIFICATION_NUMBER_WRONG = '인증번호를 다시 확인해주세요.'

    const [validated, setValidated] = useState(false);

    const [parentInfo, setParentInfo] = useState({
        ...InformationTemplate
    })

    const [childrenList, setChildrensInfo] = useState([
        {
            ...ChildrenInformationTemplate
        }
    ])

    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

    const [showPhoneNumber, setShowPhoneNumber] = useState(false)
    const handleShowPhoneNumber = () => setShowPhoneNumber(true)
    const handleClosePhoneNumber = () => setShowPhoneNumber(false)

    const [showCertNumber, setShowCertNumber] = useState(false)
    const handleCloseCertNumber = () => setShowCertNumber(false)

    const [validPhone, setValidPhone] = useState(false)
    const [sig, setSig] = useState('')

    async function verifyEmails() {
        let emails = [];

        emails.push(parentInfo.email);

        for (const item of childrenList) {
            emails.push(item.email);
        }

        let res = await LoginService.verifyEmails(emails).then((resp) => {

            if (resp.status === 200) {

                return resp.data;
            }
        })

        let duplicated = res.filter(s => s.existed === true);
        let result = duplicated.length === 0;

        if (result === false) {
            for (const item of duplicated) {

                if (parentInfo.email === item.email) {
                    parentInfo.emailVerified = false;

                    setParentInfo({ ...parentInfo });

                    break;
                }
            }

            let hasChildEmailNotVerified = false;

            for (const item of duplicated) {
                for (let child of childrenList) {

                    if (child.email === item.email) {
                        child.emailVerified = false;

                        if (hasChildEmailNotVerified === false)
                            hasChildEmailNotVerified = true;

                        break;
                    }
                }
            }

            if (hasChildEmailNotVerified === true) {

                setChildrensInfo([...childrenList]);
            }
        } else {
            setParentInfo({ ...parentInfo, "emailVerified": true });

            childrenList.forEach(s => s.emailVerified = true);
            setChildrensInfo([...childrenList]);
        }

        return res;
    }

    function verifyPassword() {
        let result = true;

        if (parentInfo.confirmPassword === false) result = false;

        for (const item of childrenList) {

            if (item.confirmPassword === false) {
                result = false;

                break;
            }
        }

        return result;
    }

    function doSignUp() {
        let body = { ...parentInfo }
        body.children = childrenList

        LoginService.signUp(body).then((resp) => {

            if (resp.status === 201) {

                handleShow1()
            }
        })
    }

    function handleSignUp(e) {
        e.preventDefault();
        e.stopPropagation();

        const form = e.target;

        if (form.checkValidity() === true) {
            if (verifyPassword() === true) {

                verifyEmails().then((resp) => {

                    if (resp === true) {

                        doSignUp();
                    }
                })
            }
        }

        setValidated(true);
    }

    function handleMemberIdCheck(memberId, callback) {

        LoginService.isMemberIdExisted(memberId).then((resp) => {

            if (resp.status === 200) {

                if (callback)
                    callback(resp.data);
            }
        })
    }

    function handleRequestPhoneVerification(phoneNumber, callback) {

        LoginService.getPhoneVerificationNumber(phoneNumber).then((resp) => {

            if (resp !== undefined) {
                if (resp.status === 200) {

                    setSig(resp.data)
                }
            }
        })

        if (callback)
            callback();

        handleShowPhoneNumber();
    }

    function confirmPhoneVerificationNumber(phoneNumber, verificationNum) {
        let body = {
            phoneNo: phoneNumber,
            sig: sig,
            verifyNo: verificationNum,
        }

        LoginService.confirmPhoneVerificationNumber(body)
            .then((resp) => {

                if (resp.status === 200) {
                    setShowCertNumber(true)
                    setValidPhone(true)
                }
            })
            .catch((err) => {
                setShowCertNumber(true)
                setValidPhone(false)
            })
    }

    function handleAddChildren() {
        const newChild = {
            ...ChildrenInformationTemplate
        }

        setChildrensInfo([...childrenList, newChild])
    }

    function handleRemoveChildren(index) {
        childrenList.splice(index, 1)

        setChildrensInfo([...childrenList])
    }

    function handleChildrenInfoChange(newInfo, index) {
        let newChildrensInfo = [...childrenList]

        newChildrensInfo[index] = { ...newInfo }

        setChildrensInfo(newChildrensInfo);
    }

    function handleSchoolSelect(key, event, index) {

        childrenList[index].school = key

        setChildrensInfo([...childrenList])
    }

    function handleGradeSelect(key, event, index) {

        childrenList[index].grade = parseInt(key)

        setChildrensInfo([...childrenList])
    }

    function handleOpenPostalCodePopup(index) {
        sessionStorage.setItem("targetPostalCodePopup", index);

        window.addEventListener('message', updateAddressParent)

        window.open(
            '/roadApi',
            'pop',
            'width=570,height=420, scrollbars=yes, resizable=yes'
        );
    }

    function updateAddressParent(event) {
        if (event.origin === process.env.REACT_APP_BACKEND_BASE_URL) {
            window.removeEventListener('message', updateAddressParent)

            const targetPostalCodePopup = parseInt(sessionStorage.getItem("targetPostalCodePopup"));

            if (targetPostalCodePopup === -1) {
                setParentInfo({
                    ...parentInfo,
                    address: {
                        postCode: event.data.zipNo,
                        roadName: event.data.roadAddrPart1,
                        addressDetail: event.data.addrDetail,
                    }
                })
            } else {
                let newChildrenList = [...childrenList]

                newChildrenList[targetPostalCodePopup] = {
                    ...newChildrenList[targetPostalCodePopup],
                    address: {
                        postCode: event.data.zipNo,
                        roadName: event.data.roadAddrPart1,
                        addressDetail: event.data.addrDetail,
                    }
                }

                setChildrensInfo(newChildrenList);
            }
        }
    }

    function AddChildButton() {
        let elmnt = <></>

        if (childrenList.length < MAX_CHILDREN_NUM) {
            elmnt = <Button
                variant="g700"
                className="btn-icon btw-224"
                onClick={handleAddChildren}
            >
                <i className="lcicon-plus-alt"></i>
                자녀추가하기
            </Button>
        }

        return elmnt;
    }

    return (
        <SelfContext.Provider value={{
            validated,
            setParentInfo,
            handleOpenPostalCodePopup,
            handleChildrenInfoChange,
            handleMemberIdCheck,
            handleRequestPhoneVerification,
            handleSchoolSelect,
            handleGradeSelect,
            handleRemoveChildren,
            confirmPhoneVerificationNumber
        }}>
            <Form
                validated={validated}
                onSubmit={handleSignUp}
                noValidate
            >
                <div className="register-body">
                    <h2 className="page-title bg-b500">학부모 회원가입</h2>
                    <section className="box-section">
                        <div className="box-inner">
                            <div className="box-title">
                                <h3>기본정보</h3>
                                <p className="text-danger">
                                    *기본정보는 필수 입력사항입니다.
                                </p>
                            </div>
                            <ParentSignUpInformation source={parentInfo} />
                        </div>
                    </section>
                    <section className="box-section">
                        <div className="box-w794">
                            <div className="box-title">
                                <h3>자녀정보</h3>
                                <p className="text-danger">
                                    *자녀정보는 필수 입력사항입니다.
                                </p>
                            </div>
                            {
                                childrenList.map((item, index) => {

                                    return (
                                        <ChildrenSignUpInformation
                                            key={`ChildrenSignUpInformation_${index}`}
                                            source={item}
                                            index={index}
                                        />
                                    )
                                })
                            }
                            <div className="d-flex justify-content-center mt-5">
                                <AddChildButton />
                            </div>
                        </div>
                    </section>
                    <div className="d-flex d-lg-block text-center mt-5">
                        <Button
                            variant="g500"
                            as={Link}
                            className="btw-290 mr-2"
                            to="/login"
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            variant="b500"
                            className="btw-290"
                        // onClick={handleSignUp}
                        >
                            확인
                        </Button>
                    </div>
                </div>
            </Form>
            <Modal
                show={showPhoneNumber}
                onHide={handleShowPhoneNumber}
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
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0 text-center">
                            {validPhone
                                ? '인증이 완료되었습니다.'
                                : VERIFICATION_NUMBER_WRONG}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={handleCloseCertNumber}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={show1}
                onHide={handleClose1}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">회원가입이 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" as={Link} to="/login">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </SelfContext.Provider>
    )
}
