import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UserService } from 'services/UserService'

export default function ParentProfile() {
    const user = useSelector((state) => state.user)

    return (
        <>
            {user && (
                <section className="profile-infor-section">
                    <h2 className="page-title mb-4">내 프로필</h2>
                    <div className="box-w590">
                        <div className="my-5">
                            <Form.Group className="d-lg-flex">
                                <Form.Label className="ipw-285 mb-0">
                                    이름
                                </Form.Label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.name}
                                />
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label className="ipw-285 mb-0">
                                    ID
                                </Form.Label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.memberId}
                                />
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label className="ipw-285 mb-0">
                                    비밀번호
                                </Form.Label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue="********"
                                    type="password"
                                />
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label className="ipw-285 mb-0">
                                    휴대폰번호
                                </Form.Label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.phone}
                                />
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label className="ipw-285 mb-0">
                                    이메일
                                </Form.Label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.email}
                                />
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label className="ipw-285 mb-0">
                                    주소
                                </Form.Label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={UserService.displayAddressDetails(
                                        user.address
                                    )}
                                />
                            </Form.Group>

                            {user.children &&
                                user.children.map((item, index) => (
                                    <ChildItem child={item} index={index} />
                                ))}

                            <div className="d-flex justify-content-end my-4">
                                <Button
                                    variant="g700"
                                    className="btw-184 btn-icon btn-sm"
                                    as={Link}
                                    to={'/my-profile/add-children'}
                                >
                                    <i className="lcicon-plus-alt"></i>
                                    자녀추가하기
                                </Button>
                            </div>

                            <Form.Group className="d-lg-flex">
                                <Form.Label className="ipw-285 mb-0">
                                    수신 동의 여부
                                </Form.Label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={UserService.displayConsentEmailSms(
                                        user
                                    )}
                                />
                            </Form.Group>
                        </div>
                        <div className="mt-5 d-flex">
                            <Button
                                variant="b500"
                                className="btw-290 btn-outline"
                                as={Link}
                                to={'/my-profile/withdrawal'}
                            >
                                회원탈퇴
                            </Button>
                            <Button
                                variant="b500"
                                className="btw-290 ml-2"
                                as={Link}
                                to={'/my-profile/edit'}
                            >
                                수정하기
                            </Button>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

function ChildItem({ child, index }) {
    return (
        <div className="box-section" key={index}>
            <div className="d-flex">
                <label className="ipw-220 tcol-30 mb-0">자녀 {index + 1}</label>
                <div className="w-100 tcol-70">
                    <div className="mb-3">
                        <label className="ipw-130 tcol-50">자녀 이름</label>
                        <span>{child.name}</span>
                    </div>
                    <div className="mb-3">
                        <label className="ipw-130 tcol-50">자녀 ID</label>
                        <span>{child.memberId}</span>
                    </div>
                    <div className="mb-3">
                        <label className="ipw-130 tcol-50">자녀 학교</label>
                        <span>{child.school}</span>
                    </div>
                    <div>
                        <label className="ipw-130 tcol-50">자녀 학년</label>
                        <span>{child.grade} 학년</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
