import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {convertGenderStatus, TutorType} from '../../../constants/tutorType'
import { UserService } from 'services/UserService'

export default function TutorProfile() {
    const user = useSelector((state) => state.user)

    return (
        <>
            {user && (
                <section className="profile-infor-section">
                    <h2 className="page-title mb-4">내 프로필</h2>
                    <div className="box-w590">
                        <div className="box-avatar">
                            <div className="avatar-image">
                                <img
                                    src={user.profileImageUrl}
                                    alt="Tutor Avatar"
                                />
                            </div>
                        </div>
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
                                생년월일
                            </Form.Label>
                            <Form.Control
                                plaintext
                                readOnly
                                defaultValue={user.birth}
                            />
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label className="ipw-285 mb-0">
                                성별
                            </Form.Label>
                            <Form.Control
                                plaintext
                                readOnly
                                defaultValue={convertGenderStatus(user.gender)}
                            />
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label className="ipw-285 mb-0">ID</Form.Label>
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
                                // defaultValue="서울특별시 서초구 고무래로 10길 27 502호"
                                defaultValue={UserService.displayAddressDetails(
                                    user.address
                                )}
                            />
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label className="ipw-285 mb-0">
                                은행
                            </Form.Label>
                            <Form.Control
                                plaintext
                                readOnly
                                defaultValue={user.bank}
                            />
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label className="ipw-285 mb-0">
                                계좌번호
                            </Form.Label>
                            <Form.Control
                                plaintext
                                readOnly
                                defaultValue={user.bankAccount}
                            />
                        </Form.Group>

                        {(user.tutorType === TutorType.LIVE_BOOK_TEXT ||
                            user.tutorType === TutorType.ALL) && (
                            <Form.Group className="d-lg-flex align-items-start">
                                <Form.Label className="ipw-285 mb-0">
                                    지도교사 유형
                                </Form.Label>
                                <div className="w-100">
                                    <h4 className="tutor-book">
                                        LiveClass 책글 지도교사
                                    </h4>
                                    <p className="text-g500 mb-0 pl-3">
                                        지도교사 {user.name}와 함께 재미있는
                                        수업을 진행해보아요.
                                    </p>
                                </div>
                            </Form.Group>
                        )}

                        {(user.tutorType === TutorType.LIVE_GOAL ||
                            user.tutorType === TutorType.ALL) && (
                            <Form.Group className="d-lg-flex">
                                <Form.Label className="ipw-285 mb-0"></Form.Label>
                                <div className="w-100">
                                    <h4 className="tutor-goal">
                                        LiveClass 목적 지도교사
                                    </h4>
                                </div>
                            </Form.Group>
                        )}

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

                        <div className="mt-5 d-flex">
                            <Button
                                variant="p500"
                                className="btw-290 btn-outline"
                                as={Link}
                                to={'/my-profile/withdrawal'}
                            >
                                회원탈퇴
                            </Button>
                            <Button
                                variant="p500"
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
