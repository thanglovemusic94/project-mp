import React, { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateUser } from '../../../action/user'
import CustomDropdown from '../../../components/CustomDropdown'
import { grade } from '../../../constants/grade.contants'
import { school } from '../../../constants/school.contains'
import ModalChangePass from '../common/ModalChangePass'
import ModalChangePhone from '../common/ModalChangePhone'
import { checkClassTagRole, getRole } from '../../../constants/role.constants'
import { colorByRole } from '../../../constants/colorByRole'

export default function StudentProfileEdit() {
    const roleName = getRole().value
    const [show1, setShow1] = useState(false)
    const [changePass, setChangePass] = useState(false)
    const [changePhone, setChangePhone] = useState(false)

    const initUser = useSelector((state) => state.user)
    const [user, setUser] = useState({ ...initUser })
    const [validated, setValidated] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleInput = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleChangeDropdown = (e, k) => {
        const { name } = e.currentTarget
        if (name && name !== '') {
            setUser({ ...user, [name]: k })
        }
    }

    const handleCheckbox = (e) => {
        const { name } = e.target
        setUser({
            ...user,
            [name]: e.target.checked,
        })
    }

    const handleInputAddressChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            address: {
                ...user.address,
                [name]: value,
            },
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            setValidated(false)
        } else {
            dispatch(updateUser(user))
                .then((res) => {
                    setShow1(true)
                })
                .catch((e) => {
                    console.log(e)
                })
        }
        setValidated(true)
    }

    const handleModalConfirm = () => {
        setShow1(false)
        history.push('/my-profile')
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

    useEffect(() => {
        window.addEventListener('message', updateAddress)

        return () => {
            window.removeEventListener('message', updateAddress)
        }
    }, [])

    return (
        <>
            {user && (
                <section className="profile-edit-section">
                    <h2 className="text-center page-title mb-5">프로필 수정</h2>

                    <div className="box-w690">
                        <div className="my-5">
                            <Form
                                id={'profileEdit'}
                                noValidate
                                validated={validated}
                                onSubmit={handleSubmit}
                            >
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>이름</Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={user.name}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="d-lg-flex">
                                    <Form.Label>ID</Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={user.memberId}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="d-lg-flex">
                                    <Form.Label>비밀번호</Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            type="password"
                                            className="ipw-349"
                                            // defaultValue={user.password}
                                            defaultValue="********"
                                        />

                                        <div>
                                            <Button
                                                variant="g700"
                                                size="sm"
                                                onClick={() => {
                                                    setChangePass(!changePass)
                                                }}
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
                                            defaultValue={user.phone}
                                        />

                                        <div>
                                            <Button
                                                variant="g700"
                                                size="sm"
                                                onClick={() => {
                                                    setChangePhone(!changePhone)
                                                }}
                                            >
                                                휴대폰 번호 변경
                                            </Button>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group
                                    className="d-lg-flex"
                                    controlId="validationCustom01"
                                >
                                    <Form.Label>이메일</Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            이메일을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                <Form.Group
                                    className="d-lg-flex"
                                    controlId="validationCustom02"
                                >
                                    <Form.Label>주소</Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            className="ipw-349"
                                            value={user.address.postCode}
                                            onChange={handleInputAddressChange}
                                            name="postCode"
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

                                <Form.Group
                                    className="d-lg-flex"
                                    controlId="validationCustom02"
                                >
                                    <Form.Label></Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            value={user.address.addressDetail}
                                            onChange={handleInputAddressChange}
                                            name="addressDetail"
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            주소를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                <Form.Group
                                    className="d-lg-flex"
                                    controlId="validationCustom02"
                                >
                                    <Form.Label></Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            value={user.address.roadName}
                                            onChange={handleInputAddressChange}
                                            name="roadName"
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group
                                    className="d-lg-flex"
                                    controlId="validationCustom03"
                                >
                                    <Form.Label>학교</Form.Label>
                                    <div className="form-group-half ipw-488">
                                        <div className="row">
                                            <div className="col-6">
                                                <Form.Control
                                                    required
                                                    className="ipw-240"
                                                    type="text"
                                                    name="school"
                                                    defaultValue={user.school}
                                                    onChange={handleInput}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <CustomDropdown
                                                    required
                                                    name="clazz"
                                                    items={school}
                                                    onChange={
                                                        handleChangeDropdown
                                                    }
                                                    defaultValue={user.clazz}
                                                ></CustomDropdown>
                                            </div>
                                        </div>

                                        <Form.Control.Feedback type="invalid">
                                            학년을 선택해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>학년</Form.Label>
                                    <div className="ipw-488">
                                        <CustomDropdown
                                            name="grade"
                                            items={grade}
                                            defaultValue={user.grade}
                                            onChange={handleChangeDropdown}
                                        ></CustomDropdown>

                                        <Form.Control.Feedback type="invalid">
                                            학년을 선택해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                <Form.Group className="d-lg-flex">
                                    <Form.Label>학부모 이름</Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={user.parentName}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="d-lg-flex">
                                    <Form.Label>학부모 휴대폰 번호</Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            className="ipw-349"
                                            defaultValue={user.parentPhone}
                                        />
                                        <div>
                                            <Button
                                                variant="g700"
                                                size="sm"
                                                onClick={() => {
                                                    setChangePhone(!changePhone)
                                                }}
                                            >
                                                휴대폰 번호 변경
                                            </Button>
                                        </div>
                                    </div>
                                </Form.Group>

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
                                            id={`condition-1`}
                                            onChange={handleCheckbox}
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
                                            id={`condition-2`}
                                            onChange={handleCheckbox}
                                            name="receivedSms"
                                            defaultChecked={user.receivedSms}
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <Button
                            type="submit"
                            variant={`${checkClassTagRole(
                                roleName,
                                ...colorByRole
                            )}`}
                            className="btw-386"
                            form="profileEdit"
                        >
                            저장하기
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
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">저장되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button
                        variant="g700"
                        onClick={handleModalConfirm}
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
