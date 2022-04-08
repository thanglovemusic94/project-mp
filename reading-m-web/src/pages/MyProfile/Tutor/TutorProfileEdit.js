import React, { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import ModalChangePass from '../common/ModalChangePass'
import ModalChangePhone from '../common/ModalChangePhone'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../../../action/user'
import { convertGenderStatus, TutorType } from '../../../constants/tutorType'
import { checkClassTagRole, getRole } from '../../../constants/role.constants'
import { colorByRole } from '../../../constants/colorByRole'
import UploadAvatar from 'components/UploadAvatar'
import { StorageService } from "../../../services/StorageService";
import { TutorService } from "../../../services/TutorService";

export default function TutorProfileEdit() {
    const [show1, setShow1] = useState(false)
    const [changePass, setChangePass] = useState(false)
    const [changePhone, setChangePhone] = useState(false)

    const roleName = getRole().value
    const dispatch = useDispatch()
    const history = useHistory()
    const [validated, setValidated] = useState(false)
    const initUser = useSelector((state) => state.user)
    const [user, setUser] = useState({ ...initUser })
    const [file, setFile] = useState({ value: null, error: false });
    const [checkEmptyFile, setCheckEmptyFile] = useState(false);
    const [registrationData, setRegistrationData] = useState();

    const handleInputChange = (e) => {
        const inputType = e.target.type
        const { name, value, id } = e.target

        if (inputType === 'checkbox') {
            setUser({
                ...user,
                [name]: e.target.checked,
            })
        } else {
            if (id === 'address') {
                setUser({
                    ...user,
                    address: {
                        ...user.address,
                        [name]: value,
                    },
                })
            } else {
                setUser({ ...user, [name]: value })
            }
        }
    }
    const checkValidateFile = () => {
        if (user.profileImageUrl) {
            if (file.error === true && user.profileImageUrl.trim().length > 0) return true;
            if (file.error === false && user.profileImageUrl.trim().length > 0) return false;
        } else {
            if (file == null || file.error === true) {
                setCheckEmptyFile(true)
                return true
            }
            setCheckEmptyFile(false)
            return false
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget

        if (form.checkValidity() === false || checkValidateFile()) {
        } else {
            if (file.value != null) {
                dispatch(updateUser({ ...user, profileImageUrl: file.value.name }))
                    .then((res) => {
                        StorageService.upload(res.profileImgUrl, file.value).then(res => {
                        })
                        setShow1(!show1)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            } else {
                dispatch(updateUser({ ...user, profileImageUrl: null })).then((res) => {
                    setShow1(!show1)
                }).catch((e) => {
                    console.log(e)
                })
            }
        }
        setValidated(true)
    }

    const updateAddress = (event) => {
        if (event.origin === process.env.REACT_APP_BACKEND_BASE_URL) {
            setUser({
                ...user,
                address: {
                    postCode: event.data.zipNo,
                    roadName: event.data.roadAddrPart1,
                    addressDetail: event.data.addrDetail,
                },
            })
        }
    }

    const getTutorApply = () => TutorService.getTutorApply().then(res => {
        setRegistrationData(res.data)
    }).catch(e => console.log(e))

    useEffect(() => {
        getTutorApply()
        window.addEventListener('message', updateAddress)

        return () => {
            window.removeEventListener('message', updateAddress)
        }
    }, [])

    console.log(registrationData)
    return (
        <>
            {user && (
                <section className="profile-edit-section">
                    <h2 className="page-title mb-4">프로필 수정</h2>
                    <div className="box-w690">
                        <Form //className="was-validated"
                            id="editProfileTutor"
                            onSubmit={handleSubmit}
                            noValidate
                            validated={validated}
                        >

                            <UploadAvatar urlImage={user.profileImageUrl} file={file} setFile={setFile}
                                checkEmptyFile={checkEmptyFile} setCheckEmptyFile={setCheckEmptyFile} />

                            <div className="py-5">
                                <Form.Group className="d-lg-flex">
                                    <Form.Label className="ipw-285 mb-0">
                                        이름
                                    </Form.Label>
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        value={user.name}
                                    />
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label className="ipw-285 mb-0">
                                        생년월일
                                    </Form.Label>
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        value={user.birth}
                                    />
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label className="ipw-285 mb-0">
                                        성별
                                    </Form.Label>
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        value={convertGenderStatus(user.gender)}
                                    />
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label className="ipw-285 mb-0">
                                        ID
                                    </Form.Label>
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        value={user.memberId}
                                    />
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>비밀번호</Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            type="password"
                                            className="ipw-349"
                                            defaultValue="********"
                                        />
                                        <div>
                                            <Button
                                                variant="g700"
                                                size="sm"
                                                onClick={() =>
                                                    setChangePass(!changePass)
                                                }
                                            >
                                                비밀번호 변경
                                            </Button>
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>휴대폰번호</Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            className="ipw-349"
                                            value={user.phone}
                                        />
                                        <div>
                                            <Button
                                                variant="g700"
                                                size="sm"
                                                onClick={() =>
                                                    setChangePhone(!changePhone)
                                                }
                                            >
                                                휴대폰 번호 변경
                                            </Button>
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>이메일</Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            value={user.email}
                                            name={'email'}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            이메일을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex mb-0 mb-lg-3">
                                    <Form.Label>주소</Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            className="ipw-349"
                                            value={user.address.postCode}
                                            id={'address'}
                                            name={'postCode'}
                                            onChange={handleInputChange}
                                        />
                                        <div>
                                            <Button
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
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            value={user.address.addressDetail}
                                            id={'address'}
                                            name={'addressDetail'}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            주소를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex  mb-0 mb-lg-3">
                                    <Form.Label></Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            value={user.address.roadName}
                                            id={'address'}
                                            name={'roadName'}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>은행</Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            value={user.bank}
                                            name={'bank'}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            주소를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>계좌번호</Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            value={user.bankAccount}
                                            name={'bankAccount'}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="d-lg-flex align-items-start py-3">
                                    <Form.Label>지도교사 유형</Form.Label>
                                    {(user.tutorType ===
                                        TutorType.LIVE_BOOK_TEXT ||
                                        user.tutorType === TutorType.ALL) && (
                                            <div className="ipw-488">
                                                <h4 className="tutor-book">
                                                    LiveClass 책글 지도교사
                                                </h4>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={5}
                                                    placeholder="지도교사 홍민기와 함께 재미있는 수업을
                                        진행해보아요."
                                                    required
                                                    maxLength={'100'}
                                                    value={
                                                        user.bookTextIntroduction
                                                    }
                                                    name="bookTextIntroduction"
                                                    onChange={handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    지도교사 소개인사를
                                                    입력해주세요.
                                                </Form.Control.Feedback>
                                                {user.tutorType !==
                                                    TutorType.ALL && (
                                                        <Button
                                                            type="submit"
                                                            variant="g700"
                                                            className="btn-icon btn-sm btw-320 mt-3"
                                                            as={Link}
                                                            to={{
                                                                pathname: "/tutor-register-goal",
                                                                state: { registrationData: registrationData }
                                                            }}
                                                        >
                                                            <i className="lcicon-plus-alt"></i>
                                                            LiveClass 목적 지도교사
                                                            지원하기
                                                        </Button>
                                                    )}
                                            </div>
                                        )}
                                </Form.Group>

                                {(user.tutorType === TutorType.LIVE_GOAL ||
                                    user.tutorType === TutorType.ALL) && (
                                        <Form.Group className="d-lg-flex">
                                            <Form.Label>지도교사 유형</Form.Label>
                                            <div className="ipw-488">
                                                <h4 className="tutor-goal">
                                                    LiveClass 목적 지도교사
                                                </h4>
                                                {user.tutorType !==
                                                    TutorType.ALL && (
                                                        <Button
                                                            type="submit"
                                                            variant="g700"
                                                            className="btn-icon btn-sm btw-320"
                                                            as={Link}
                                                            to={{
                                                                pathname: "/tutor-register-book",
                                                                state: { registrationData: registrationData, bothTutorType: false }
                                                            }}
                                                        >
                                                            <i className="lcicon-plus-alt"></i>
                                                            LiveClass 책글 지도교사
                                                            지원하기
                                                        </Button>
                                                    )}
                                            </div>
                                        </Form.Group>
                                    )}

                                <Form.Group className="d-lg-flex mt-4">
                                    <Form.Label>수신 동의 여부</Form.Label>
                                    <div className="ipw-488 d-lg-flex">
                                        <Form.Check
                                            className={`form-check-custom mr-5 mb-2 mb-lg-0 ${checkClassTagRole(
                                                roleName,
                                                ...colorByRole
                                            )}`}
                                            label={
                                                <>
                                                    <b>[선택]</b> 이메일 수신
                                                    동의
                                                </>
                                            }
                                            type="checkbox"
                                            id={`receivedEmail`}
                                            onChange={handleInputChange}
                                            name="receivedEmail"
                                            defaultChecked={user.receivedEmail}
                                        />
                                        <Form.Check
                                            className={`form-check-custom ${checkClassTagRole(
                                                roleName,
                                                ...colorByRole
                                            )}`}
                                            label={
                                                <>
                                                    <b>[선택]</b> SMS 수신 동의
                                                </>
                                            }
                                            type="checkbox"
                                            id={`receivedSms`}
                                            onChange={handleInputChange}
                                            name="receivedSms"
                                            defaultChecked={user.receivedSms}
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </Form>
                    </div>

                    <div className="text-center mt-5 d-none d-lg-block">
                        <Button
                            variant={`${checkClassTagRole(
                                roleName,
                                ...colorByRole
                            )}`}
                            className="btw-386"
                            type="submit"
                            form={'editProfileTutor'}
                        // onClick={()=>setShow1(!show1)}
                        >
                            저장하기
                        </Button>
                    </div>

                    <div className="text-center d-flex d-lg-none">
                        <Button
                            variant="p500"
                            className="btw-290 btn-outline"
                            as={Link}
                        >
                            회원탈퇴
                        </Button>
                        <Button
                            variant="p500"
                            className="btw-290 ml-2"
                            as={Link}
                        >
                            수정하기
                        </Button>
                    </div>
                </section>
            )}
            <Modal
                show={show1}
                onHide={() => setShow1(!show1)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">저장되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button
                        variant="g700"
                        onClick={() => {
                            setShow1(false)
                            history.push('/my-profile')
                            dispatch(getUserDetails())
                        }}
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalChangePass show={changePass} setChangePass={setChangePass} />
            <ModalChangePhone
                show={changePhone}
                setChangePhone={setChangePhone}
            />
        </>
    )
}
