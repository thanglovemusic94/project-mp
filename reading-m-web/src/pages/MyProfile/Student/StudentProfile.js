import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserService } from 'services/UserService'
import { convertSchool } from 'constants/student.target.constants'

export default function StudentProfile() {
    const user = useSelector((state) => state.user)

    return (
        <>
            {user && (
                <section className="profile-infor-section">
                    <h2 className="text-center page-title mb-5">내 프로필</h2>
                    <div className="box-w590">
                        <div className="my-5">
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">이름</label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.name}
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">ID</label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.memberId}
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">비밀번호</label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue="********"
                                    type="password"
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">
                                    휴대폰번호
                                </label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.phone}
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">이메일</label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.email}
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">주소</label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={UserService.displayAddressDetails(
                                        user.address
                                    )}
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">학교</label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={`${user.school} ${convertSchool(user.clazz)}`} //school
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">학년</label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={`${user.grade}학년`} //Grade
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">
                                    학부모 이름
                                </label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.parentName}
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">
                                    학부모 휴대폰 번호
                                </label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={user.parentPhone}
                                />
                            </div>
                            <div className="d-lg-flex mb-4 align-items-center">
                                <label className="ipw-285 mb-0">
                                    수신 동의 여부
                                </label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={UserService.displayConsentEmailSms(
                                        user
                                    )}
                                />
                            </div>
                        </div>
                        <div className="d-flex">
                            <Button
                                variant="m500"
                                className="btw-290 btn-outline"
                                as={Link}
                                to={'/my-profile/withdrawal'}
                            >
                                회원탈퇴
                            </Button>

                            <Button
                                variant="m500"
                                className="btw-290 ml-1"
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
