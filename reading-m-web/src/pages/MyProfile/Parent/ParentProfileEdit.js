import React, { useState, useEffect } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
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

export default function ParentProfileEdit() {
    const [show, setShow] = useState(false)
    const [changePass, setChangePass] = useState(false)
    const [changePhone, setChangePhone] = useState(false)

    const roleName = getRole().value
    const dispatch = useDispatch()
    const history = useHistory()
    const [validated, setValidated] = useState(false)

    const initUser = useSelector((state) => state.user)
    const [user, setUser] = useState({ ...initUser })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            address: {
                ...user.address,
                [name]: value,
            },
        })
    }

    const handleEmail = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleCheckbox = (e) => {
        const { name } = e.target
        setUser({
            ...user,
            [name]: e.target.checked,
        })
    }

    const handleChangeDropdown = (i, e, k) => {
        const { name } = e.currentTarget
        if (name && name !== '') {
            user.children[i][name] = k
            setUser({
                ...user,
                children: user.children,
            })
        }
    }

    const handleInputChildren = (i, e) => {
        const { name, value } = e.target
        // const index = user.children.findIndex(()=>i+1); // index of array object children
        user.children[i][name] = value
        setUser({
            ...user,
            children: user.children,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            setValidated(false)
        } else {
            console.log('call api edit parent')
            dispatch(updateUser(user))
                .then((res) => {
                    setShow(true)
                })
                .catch((e) => {
                    console.log(e)
                })
        }
        setValidated(true)
    }

    const handleModalConfirm = () => {
        setShow(false)
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
                    <h2 className="page-title mb-4">프로필 수정</h2>
                    <div className="box-w690">
                        <div className="my-5">
                            <Form
                                id="editProfileParent"
                                onSubmit={handleSubmit}
                                noValidate
                                validated={validated}

                            //className="was-validated"
                            >
                                <Form.Group className="d-lg-flex">
                                    <Form.Label>이름</Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            value={user.name}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="d-lg-flex">
                                    <Form.Label>ID</Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            value={user.memberId}
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
                                            defaultValue={'********'}
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
                                            name="email"
                                            onChange={handleEmail}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            이메일을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                <Form.Group className="d-lg-flex">
                                    <Form.Label>주소</Form.Label>
                                    <div className="input-btn-group ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            className="ipw-349"
                                            value={user.address.postCode}
                                            onChange={handleInputChange}
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

                                <Form.Group className="d-lg-flex">
                                    <Form.Label></Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            value={user.address.addressDetail}
                                            name="addressDetail"
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            주소를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label></Form.Label>
                                    <div className="ipw-488">
                                        <Form.Control
                                            required
                                            type="text"
                                            value={user.address.roadName}
                                            onChange={handleInputChange}
                                            name="roadName"
                                        // value="502호"
                                        />
                                    </div>
                                </Form.Group>

                                {user.children.map((child, index) => (
                                    <EditChildItem
                                        key={`edit_child_item_${index}`}
                                        index={index}
                                        child={child}
                                        handleChangeDropdown={
                                            handleChangeDropdown
                                        }
                                        handleInputChildren={
                                            handleInputChildren
                                        }
                                    />
                                ))}

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
                                            id={'receivedSms'}
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
                            variant={`${checkClassTagRole(
                                roleName,
                                ...colorByRole
                            )}`}
                            className="btw-386"
                            // onClick={handleShow1}
                            type="submit"
                            form="editProfileParent"
                        >
                            저장하기
                        </Button>
                    </div>
                </section>
            )}
            <Modal
                show={show}
                onHide={() => setShow(!show)}
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
                    <Button variant="g700" onClick={handleModalConfirm}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal change password */}
            <ModalChangePass show={changePass} setChangePass={setChangePass} />
            {/* Modal change phone number */}
            <ModalChangePhone
                show={changePhone}
                setChangePhone={setChangePhone}
            />
        </>
    )
}

function EditChildItem({
    child,
    index,
    handleInputChildren,
    handleChangeDropdown,
}) {
    return (
        <div className="box-gray mb-3" key={index}>
            <div className="d-lg-flex">
                <label className="ipw-184 mb-3 mb-lg-0 ">
                    자녀 {index + 1}
                </label>
                <div className="w-100">
                    <div className="d-flex d-lg-block">
                        <div className="mb-3 tcol-50">
                            <label className="ipw-100 mr-3 mr-lg-0">이름</label>
                            <span>{child.name}</span>
                        </div>
                        <div className="mb-3 tcol-50">
                            <label className="ipw-100 mr-3 mr-lg-0">ID</label>
                            <span>{child.memberId}</span>
                        </div>
                    </div>
                    <div className="d-lg-flex align-items-center mb-3">
                        <label className="ipw-100">학교</label>
                        <div className="d-lg-flex">
                            <div className="form-group-half">
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Control
                                            className="ipw-184 form-control-sm"
                                            type="text"
                                            value={child.school}
                                            onChange={(e) =>
                                                handleInputChildren(index, e)
                                            }
                                            name="school"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <CustomDropdown
                                            className="ipw-184"
                                            classNameToggle="btn-sm"
                                            required
                                            name="clazz"
                                            items={school}
                                            onChange={handleChangeDropdown}
                                            value={child.clazz}
                                            index={index}
                                        />
                                    </div>
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    학년을 선택해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </div>
                    </div>
                    <div className="d-lg-flex align-items-center mb-3">
                        <label className="ipw-100">학년</label>
                        <div>
                            <CustomDropdown
                                className={'ipw-184'}
                                classNameToggle="btn-sm"
                                name="grade"
                                items={grade}
                                value={child.grade}
                                index={index}
                                onChange={handleChangeDropdown}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
