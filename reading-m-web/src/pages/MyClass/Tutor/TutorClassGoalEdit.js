import React, { useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import ModalClassDateTime from './ModalClassDateTime'

export default function TutorClassGoalEdit() {
    // State Confirm
    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

    // State ModalClassDateTime
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <div className="tutoropenclassgoal-body">
                <h2 class="page-title bg-b500">LiveClass 목적 개설하기</h2>
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
                            <Form.Group className="d-lg-flex align-items-start">
                                <Form.Label>
                                    지도교사 <br className="d-none d-lg-flex" />
                                    소개인사
                                </Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        required
                                        defaultValue="지도교사 소개인사 입력 100자 이내"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        지도교사 소개인사를 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>카테고리</Form.Label>
                                <div className="ipw-488">
                                    <Dropdown className="form-control-dropdown">
                                        <Dropdown.Toggle
                                            id="dropdown"
                                            variant=""
                                        >
                                            카테고리 선택
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/">
                                                국어 독서 논술
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/">
                                                영수사과
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/">
                                                학교수행
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/">
                                                상담기타
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form.Control.Feedback type="invalid">
                                        카테고리를 선택해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>수업명</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        type="text"
                                        required
                                        defaultValue="수업명 입력"
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
                                        defaultValue="수업 준비 입력"
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
                                        rows={5}
                                        required
                                        defaultValue="수업안내 입력"
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
                                            required
                                            defaultValue="300,000"
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
                                        defaultValue="60"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        인원을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </div>
                    </section>
                    <section className="box-section">
                        <div className="border-top-bottom">
                            <div className="box-w612 py-lg-5">
                                <div className="box-day d-lg-flex mb-5">
                                    <div className="flex-grow-1">
                                        <label className="label-week b500">
                                            1일차
                                        </label>
                                    </div>
                                    <div className="ipw-488">
                                        <Form.Group>
                                            <Form.Label>
                                                1일차 수업일시
                                            </Form.Label>
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    {/* After datetime selected */}
                                                    <div className="input-icon-group">
                                                        <Form.Control
                                                            type="text"
                                                            size="sm"
                                                            defaultValue="2020.11.24 월 오전 9시 30분 ~ 12시 30분 "
                                                        />
                                                        <i className="lcicon-close-black"></i>
                                                    </div>

                                                    <Form.Control.Feedback type="invalid">
                                                        수업일시를 선택해주세요.
                                                    </Form.Control.Feedback>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="g700"
                                                        size="sm"
                                                        className="btn-square btw-120 ml-1"
                                                        onClick={handleShow}
                                                    >
                                                        수업일시 선택
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                1일차 수업명
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                defaultValue="발표 수업  OT"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                1일차 수업 내용
                                            </Form.Label>
                                            <div className="ipw-488">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={5}
                                                    required
                                                    defaultValue="1일차에는 수업 소개 및 커리큘럼에 대한 설명 위주로 진행합니다."
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    수업 내용을 입력해주세요.
                                                </Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>1일차 준비</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                defaultValue="필기도구"
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="text-center mt-5">
                        <Button
                            variant="p500"
                            className="btw-386"
                            onClick={handleShow1}
                        >
                            저장하기
                        </Button>
                    </div>
                </Form>
            </div>
            <ModalClassDateTime show={show} setShow={setShow} />

            <Modal
                show={show1}
                onHide={handleClose1}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">
                            LiveClass 목적 개설이 완료되었습니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={handleClose1}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
