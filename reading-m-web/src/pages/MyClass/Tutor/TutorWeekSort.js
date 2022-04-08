import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function TutorWeekSort() {
    // State Confirm
    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

    return (
        <>
            <div className="tutoropenclassbook-body">
                <h2 class="page-title bg-m500">LiveClass 책글 수정하기</h2>
                <Form
                // validated={validated}
                // onSubmit={handleSubmit}
                // className="was-validated"
                >
                    <section className="box-section">
                        <div className="box-w612 py-lg-5">
                            <Form.Group className="d-lg-flex">
                                <Form.Label>지도교사</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue="최유나"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>
                                    지도교사 <br className="d-none d-lg-flex" />
                                    소개인사
                                </Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue="최유나 지도교사와 함께 재미있는 수업을 진행해보아요."
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>수업명</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        required
                                        type="text"
                                        defaultValue="[LiveClass 책글] 초등 3필독 독서 수업"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        수업명을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>수업 준비</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        type="text"
                                        required
                                        defaultValue="필기도구"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        수업 준비 내용을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex align-items-start">
                                <Form.Label>수업안내</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        required
                                        defaultValue="지도교사 김철수와 함께하는 독서 수업! 즐거운 수업을 같이 해 보아요~"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        수업 안내 내용을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>교육비</Form.Label>
                                <div className="ipw-488">
                                    <div className="d-flex">
                                        <Form.Control
                                            className="ipw-240"
                                            type="text"
                                            defaultValue="200,000"
                                            required
                                        />
                                        <label className="mt-3 ml-3">원</label>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        교육비를 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>인원</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        className="ipw-349"
                                        defaultValue="60"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>대상학생</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue="초등학교 3학년"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>수업일시</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue="2020년 11월"
                                    />
                                </div>
                            </Form.Group>
                        </div>
                    </section>
                    <section className="box-section boxsort mb-4">
                        <span className="btn-boxsort">
                            <i className="lcicon-sort-1"></i>
                        </span>
                        <div className="box-w612">
                            <div className="d-lg-flex">
                                <div className="flex-grow-1">
                                    <label className="label-week m500">
                                        1주차 
                                    </label>
                                </div>
                                <div className="ipw-488">
                                    <Form.Group>
                                        <Form.Label>1주차 수업일시</Form.Label>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue="2020.11.20 월 오전 9시 30분 ~ 12시 30분 "
                                        />
                                    </Form.Group>
                                    <div className="box-gray mb-3">
                                        <ul>
                                            <li>
                                                <span>수업도서</span> : 홍길동전
                                            </li>
                                            <li>
                                                <span>지은이</span> : 김지은
                                            </li>
                                            <li>
                                                <span>출판사</span> : 문학사
                                            </li>
                                        </ul>
                                    </div>
                                    <Form.Group>
                                        <Form.Label>1주차 수업 내용</Form.Label>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue="안녕하세요. 1주차에는 홍길동전 책을 읽고 수업을 진행하겠습니다."
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>1주차 준비</Form.Label>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue="필기도구"
                                        />
                                    </Form.Group>
                                    <div className="newspaper-selected">
                                        <span>기억으로 살아가는 현재</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="box-section boxsort mb-4">
                        <span className="btn-boxsort">
                            <i className="lcicon-sort-1"></i>
                        </span>
                        <div className="box-w612">
                            <div className="d-lg-flex">
                                <div className="flex-grow-1">
                                    <label className="label-week m500">
                                        2주차
                                    </label>
                                </div>
                                <div className="ipw-488">
                                    <Form.Group>
                                        <Form.Label>2주차 수업일시</Form.Label>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue="2020.11.20 월 오전 9시 30분 ~ 12시 30분 "
                                        />
                                    </Form.Group>
                                    <div className="box-gray mb-3">
                                        <ul>
                                            <li>
                                                <span>수업도서</span> : 홍길동전
                                            </li>
                                            <li>
                                                <span>지은이</span> : 김지은
                                            </li>
                                            <li>
                                                <span>출판사</span> : 문학사
                                            </li>
                                        </ul>
                                    </div>
                                    <Form.Group>
                                        <Form.Label>2주차 수업 내용</Form.Label>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue="안녕하세요. 2주차에는 홍길동전 책을 읽고 수업을 진행하겠습니다."
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>2주차 준비</Form.Label>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue="필기도구"
                                        />
                                    </Form.Group>
                                    <div className="newspaper-selected">
                                        <span>기억으로 살아가는 현재</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="box-w590 text-center mt-5">
                        <Form.Group>
                            <Form.Label className="mb-4">
                                수정 사유 입력
                            </Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={3}
                                required
                                defaultValue="수정 사유 입력"
                            />
                            <Form.Control.Feedback type="invalid">
                                수정 사유를 입력해주세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="text-center d-flex d-lg-block mt-5">
                        <Button variant="g500" className="btw-290">
                            취소
                        </Button>
                        <Button
                            variant="p500"
                            className="btw-290 ml-1"
                            onClick={handleShow1}
                        >
                            주차 변경완료
                        </Button>
                    </div>
                </Form>
            </div>

            <Modal
                show={show1}
                onHide={handleClose1}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">주차 변경이 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" as={Link} to="/move-to-9.2.3">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
