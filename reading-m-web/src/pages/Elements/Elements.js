import React, { useContext, useState } from 'react'
import {
    Button,
    Modal,
    Form,
    Dropdown,
    Accordion,
    useAccordionToggle,
    AccordionContext,
    Collapse,
    Table,
    Tabs,
    Tab,
    Nav,
} from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import reactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

const Elements = () => {
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

    const [show2, setShow2] = useState(false)
    const handleShow2 = () => setShow2(true)
    const handleClose2 = () => setShow2(false)

    const [show3, setShow3] = useState(false)
    const handleShow3 = () => setShow3(true)
    const handleClose3 = () => setShow3(false)

    const [show4, setShow4] = useState(false)
    const handleShow4 = () => setShow4(true)
    const handleClose4 = () => setShow4(false)

    const [startDate, setStartDate] = useState(new Date())

    // Validate form
    const [validated, setValidated] = useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        setValidated(true)
    }

    // Accordion
    function CustomToggle({ children, eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext)
        const toggleOnClick = useAccordionToggle(
            eventKey,
            () => callback && callback(eventKey)
        )
        const isCurrentEventKey = currentEventKey === eventKey

        return (
            <button
                className={isCurrentEventKey ? 'active' : null}
                onClick={toggleOnClick}
            >
                {children}
            </button>
        )
    }

    // Rating star
    const lcRating = {
        count: 5,
        emptyIcon: <i className="lcicon-star" />,
        filledIcon: <i className="lcicon-star-voted" />,
    }

    return (
        <>
            <div className="box-w612">
                <div className="box-title">
                    <h3>기본정보</h3>
                    <p className="text-danger">
                        *기본정보는 필수 입력사항입니다.
                    </p>
                </div>
                <div className="box-inner">
                    <Form
                        validated={validated}
                        onSubmit={handleSubmit}
                        className="was-validated"
                    >
                        <Form.Group className="d-lg-flex">
                            <Form.Label>이름</Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue="최유나"
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>이름</Form.Label>
                            <div className="ipw-488">
                                <div className="input-icon-group ipw-349">
                                    <Form.Control
                                        type="text"
                                        placeholder="지도교사 이름을 입력하세요."
                                        size="sm"
                                    />
                                    <i className="lcicon-search"></i>
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                이름 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="text"
                                    placeholder="이름 입력"
                                    required
                                    size="sm"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                이름 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="text"
                                    placeholder="이름 입력"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                소요 시간 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <div className="d-flex">
                                    <Form.Control
                                        className="ipw-240"
                                        type="text"
                                        placeholder="일차별 소요 시간 입력"
                                        required
                                    />
                                    <label className="mt-3 ml-3">분</label>
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    일차별 소요 시간을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>이름</Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="이름 입력"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    내용을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                커리큘럼 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-btn-group ipw-488">
                                <div className="flex-grow-1">
                                    <Form.Control
                                        type="email"
                                        placeholder="ID 입력 (영문, 숫자 조합 6 ~13자리)"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        커리큘럼을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                                <div>
                                    <Button type="submit" variant="g700">
                                        커리큘럼 추가
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                커리큘럼 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-btn-group ipw-488">
                                <div className="flex-grow-1">
                                    <Form.Control
                                        type="email"
                                        placeholder="커리큘럼 입력. 예시) 제 1일차 독서와 토론"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        커리큘럼을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        variant="g700"
                                        className="btn-add"
                                    >
                                        <i className="lcicon-plus-alt"></i>
                                        커리큘럼
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group className="d-lg-flex">
                            <div className="input-btn-group ipw-488 ml-auto">
                                <div className="flex-grow-1">
                                    <Form.Control
                                        type="email"
                                        placeholder="커리큘럼 입력. 예시) 제 1일차 독서와 토론"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        커리큘럼을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        variant="g700"
                                        className="btn-add"
                                    >
                                        <i className="lcicon-plus-alt"></i>
                                        커리큘럼
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                주소 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-btn-group ipw-488">
                                <div className="flex-grow-1">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        disabled
                                    />
                                </div>
                                <div>
                                    <Button type="submit" variant="g700">
                                        우편번호 찾기
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <div className="ipw-488 ml-auto">
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    disabled
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <div className="ipw-488 ml-auto">
                                <Form.Control
                                    type="text"
                                    placeholder="상세 주소 입력"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                학교 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <div className="row mx-n1">
                                    <div className="col-6 px-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="학교명 입력"
                                            required
                                        />
                                    </div>
                                    <div className="col-6 px-1">
                                        <Dropdown className="form-control-dropdown">
                                            <Dropdown.Toggle
                                                id="dropdown"
                                                variant=""
                                            >
                                                학교선택
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/">
                                                    초등학교
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/">
                                                    중학교
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/">
                                                    고등학교
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    학년을 선택해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                학년 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Dropdown className="form-control-dropdown ipw-240">
                                    <Dropdown.Toggle id="dropdown" variant="">
                                        학년선택
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/">
                                            1학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            2학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            3학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            4학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            5학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            6학년
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Form.Control.Feedback type="invalid">
                                    수준을 선택해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>
                                학년 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <Dropdown className="form-control-dropdown">
                                    <Dropdown.Toggle id="dropdown" variant="">
                                        학년선택
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/">
                                            1학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            2학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            3학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            4학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            5학년
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            6학년
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Form.Group>

                        <Form.Group className="d-lg-flex">
                            <Form.Label htmlFor="inputPassword6">
                                5학년
                            </Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="text"
                                    className="ipw-240"
                                    id="inputPassword6"
                                    aria-describedby="passwordHelpInline"
                                />
                                <Form.Text id="passwordHelpInline" muted>
                                    Must be 8-20 characters long.
                                </Form.Text>
                            </div>
                        </Form.Group>

                        <Form.Group className="d-lg-flex">
                            <Form.Label>수신 동의 여부</Form.Label>
                            <div className="ipw-488 d-lg-flex">
                                <Form.Check
                                    className="form-check-custom m500 mr-5"
                                    label={
                                        <>
                                            <b>[선택]</b> condition-1
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-1`}
                                />
                                <Form.Check
                                    className="form-check-custom m500"
                                    label={
                                        <>
                                            <b>[선택]</b> condition-2
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-2`}
                                />
                            </div>
                        </Form.Group>

                        {/* Enddddddddddddddddddd Form */}

                        <h3 className="mt-5">Radios</h3>
                        <div className="mt-3">
                            <label>Checkbox Default</label>
                            <Form.Check
                                label="condition-3"
                                type="checkbox"
                                id={`condition-3`}
                            />
                            <Form.Check
                                label={
                                    <>
                                        <b>[필수]</b> condition-55
                                    </>
                                }
                                type="checkbox"
                                id={`condition-55`}
                            />
                        </div>
                        <div className="mt-3">
                            <label>Radios custom</label>
                            <Form.Check
                                className="form-radio-custom"
                                label="condition-20"
                                type="radio"
                                id={`condition-20`}
                                name="radio"
                            />
                            <Form.Check
                                className="form-radio-custom"
                                label="condition-21"
                                type="radio"
                                name="radio"
                                id={`condition-21`}
                            />
                        </div>

                        <div className="my-5">
                            <div>
                                <Form.Check
                                    className="form-check-custom no-label mt-4 b500"
                                    label=""
                                    type="checkbox"
                                    id={`condition-10`}
                                />
                                <Form.Check
                                    className="form-check-custom mt-4 b500"
                                    label={
                                        <>
                                            <b>[필수]</b> checkbox 333
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-333`}
                                />
                            </div>
                            <div>
                                <Form.Check
                                    className="form-check-custom outline mt-4 b500"
                                    label={
                                        <>
                                            <b>[필수]</b>checkbox 4
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-4`}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    커리큘럼을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                            <div>
                                <Form.Check
                                    className="form-check-custom outline mt-4 b500"
                                    label={
                                        <>
                                            <b>[필수]</b>checkbox 5
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-5`}
                                />
                            </div>
                            <div>
                                <Form.Check
                                    className="form-check-custom outline mt-4 g700"
                                    label={
                                        <>
                                            <b>[필수]</b>checkbox 6
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-6`}
                                />
                            </div>
                            <div>
                                <Form.Check
                                    className="form-check-custom outline mt-4 m500"
                                    label={
                                        <>
                                            <b>[필수]</b>checkbox 7
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-7`}
                                />
                            </div>
                            <div>
                                <Form.Check
                                    className="form-check-custom outline mt-4 p500"
                                    label={
                                        <>
                                            <b>[필수]</b>checkbox 8
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-8`}
                                    required
                                />
                            </div>
                            <div className="form-check-required square mt-4">
                                <Form.Check
                                    className="form-check-custom b500 outline"
                                    label={
                                        <>
                                            <b>[필수]</b>checkbox 7
                                        </>
                                    }
                                    type="checkbox"
                                    id={`condition-9`}
                                />
                                <Button variant="b500" as={Link} to="/">
                                    내용보기
                                </Button>
                            </div>
                        </div>

                        <div className="uploadfile-custom d-lg-flex">
                            <div className="uploadfile-name">
                                <i className="lcicon-close-black"></i>* 1개의
                                파일만 첨부가 가능합니다.
                            </div>
                            <div className="uploadfile-button">
                                <label for="file-upload" className="btn-upload">
                                    파일 선택
                                    <i className="lcicon-plus-alt"></i>
                                </label>
                                <input id="file-upload" type="file" />
                            </div>
                        </div>
                        <div className="uploadfile-custom d-lg-flex">
                            <div className="uploadfile-button">
                                <label for="file-upload" className="btn-upload">
                                    <i className="lcicon-plus-alt"></i>
                                    파일 선택
                                </label>
                                <input id="file-upload" type="file" />
                            </div>
                            <div className="uploadfile-name">
                                * 1개의 파일만 첨부가 가능합니다.
                                <i className="lcicon-close-black"></i>
                            </div>
                        </div>
                        <div className="uploadfile-name uploaded">
                            * 1개의 파일만 첨부가 가능합니다.
                            <i className="lcicon-close-black"></i>
                        </div>

                        <div className="uploadfile-name uploaded mt-1">
                            이유진 학생 첨삭 파일.pdf
                            <Button
                                size="xs"
                                variant=""
                                as={Link}
                                to="/images/myw3schoolsimage.jpg"
                                download
                                className="btn-download"
                            >
                                다운로드
                            </Button>
                        </div>

                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                variant="m500"
                                type="submit"
                                className="btw-184"
                            >
                                로그인
                            </Button>
                        </div>

                        <Form.Group>
                            <Form.Label>1주차 준비</Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    type="text"
                                    placeholder="준비 내용 입력"
                                    required
                                    size="sm"
                                />
                                <Form.Control.Feedback type="invalid">
                                    준비 내용을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>1주차 수업 내용</Form.Label>
                            <div className="ipw-488">
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    required
                                    defaultValue="안녕하세요. 1주차에는 홍길동전 책을 읽고 수업을 진행하겠습니다."
                                />
                                <Form.Control.Feedback type="invalid">
                                    수업 내용을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>1주차 수업일시</Form.Label>
                            <Form.Control
                                plaintext
                                readOnly
                                defaultValue="2020.11.20 월 오전 9시 30분 ~ 12시 30분 "
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>1주차 수업일시</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue="[LiveClass 책글] 초등 3필독 독서 수업"
                            />
                        </Form.Group>
                    </Form>
                </div>
            </div>

            <h3>Filter section</h3>
            <div className="my-5">
                <div className="d-flex">
                    <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="ipw-152 datepicker-dark"
                    />
                    <Dropdown className="form-control-dropdown ipw-130 mr-2">
                        <Dropdown.Toggle id="dropdown" variant="" size="sm">
                            요일 선택
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/">월</Dropdown.Item>
                            <Dropdown.Item href="#/">화</Dropdown.Item>
                            <Dropdown.Item href="#/">수</Dropdown.Item>
                            <Dropdown.Item href="#/">목</Dropdown.Item>
                            <Dropdown.Item href="#/">금</Dropdown.Item>
                            <Dropdown.Item href="#/">토</Dropdown.Item>
                            <Dropdown.Item href="#/">일</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="form-control-dropdown ipw-100 mr-2">
                        <Dropdown.Toggle id="dropdown" variant="" size="sm">
                            오전
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/">오전</Dropdown.Item>
                            <Dropdown.Item href="#/">오후</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="form-control-dropdown ipw-152 mr-2">
                        <Dropdown.Toggle id="dropdown" variant="" size="sm">
                            희망 시간 선택
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/">1시</Dropdown.Item>
                            <Dropdown.Item href="#/">2시</Dropdown.Item>
                            <Dropdown.Item href="#/">3시</Dropdown.Item>
                            <Dropdown.Item href="#/">4시</Dropdown.Item>
                            <Dropdown.Item href="#/">5시</Dropdown.Item>
                            <Dropdown.Item href="#/">6시</Dropdown.Item>
                            <Dropdown.Item href="#/">7시</Dropdown.Item>
                            <Dropdown.Item href="#/">8시</Dropdown.Item>
                            <Dropdown.Item href="#/">9시</Dropdown.Item>
                            <Dropdown.Item href="#/">10시</Dropdown.Item>
                            <Dropdown.Item href="#/">11시</Dropdown.Item>
                            <Dropdown.Item href="#/">12시</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="form-control-dropdown ipw-152 mr-2">
                        <Dropdown.Toggle id="dropdown" variant="" size="sm">
                            희망 시간 선택
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/">0분</Dropdown.Item>
                            <Dropdown.Item href="#/">30분</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <h3>Date Time list table</h3>
            <div className="my-5">
                <div className="datetime-list">
                    <ul className="reset-list">
                        <li>
                            월 오전 9시 30분 ~ 12시 30분
                            <span className="datetime-remove">
                                <i className="lcicon-close-black"></i>
                            </span>
                        </li>
                        <li>
                            화 오후 1시 ~ 4시
                            <span className="datetime-remove">
                                <i className="lcicon-close-black"></i>
                            </span>
                        </li>
                        <li>
                            수 오전 9시 30분 ~ 12시 30분
                            <span className="datetime-remove">
                                <i className="lcicon-close-black"></i>
                            </span>
                        </li>
                    </ul>
                    <p className="text-danger mt-3">
                        희망 수업일시를 선택해주세요.
                    </p>
                </div>
            </div>
            <h3>Star voting</h3>
            <div className="my-5">
                <div className="star-box voted-3">
                    <i className="lcicon-star"></i>
                    <i className="lcicon-star"></i>
                    <i className="lcicon-star"></i>
                    <i className="lcicon-star"></i>
                    <i className="lcicon-star"></i>
                </div>
            </div>
            <div className="my-5">
                <reactStars {...lcRating} />
            </div>
            <h3>Icons</h3>
            <div className="my-5">
                <span className="icon-like liked">
                    <i className="lcicon-hear"></i>
                </span>
            </div>

            <h3>Buttons</h3>
            <div className="my-5">
                <div className="d-flex justify-content-center mt-5">
                    <Button variant="g700" className="btn-icon btw-224">
                        <i className="lcicon-plus-alt"></i>
                        자녀추가하기
                    </Button>
                </div>
                <Button variant="g500" className="btw-184 m-1" size="sm">
                    취소
                </Button>
                <Button variant="g500" className="btw-184 m-1">
                    취소
                </Button>
                <Button variant="g700" className="btw-184 m-1">
                    확인
                </Button>
                <Button variant="b500" className="btw-184 m-1">
                    취소
                </Button>
                <Button variant="m500" className="btw-184 m-1">
                    확인
                </Button>
                <Button variant="white" className="btw-184 m-1">
                    확인
                </Button>
                <Button variant="g700" className="btw-184 btn-square m-1">
                    확인
                </Button>
                <Button variant="p500" className="btw-184 btn-outline m-1">
                    확인
                </Button>
            </div>

            <h3>Button Link</h3>
            <div className="my-5">
                <Button
                    variant="b500"
                    className="btw-184"
                    as={Link}
                    to="/magazine-details"
                >
                    자세히보기
                </Button>
            </div>

            <h3>Modal Popup</h3>

            <div className="my-5">
                <Button variant="g700" onClick={handleShow}>
                    Modal Common
                </Button>
                <Button variant="g700" onClick={handleShow1}>
                    Modal OK button
                </Button>
                <Button variant="g700" onClick={handleShow2}>
                    Modal Yes or No
                </Button>
                <Button variant="g700" onClick={handleShow3}>
                    Modal customize Height
                </Button>
                <Button variant="g700" onClick={handleShow4}>
                    Modal Confirm Custom Height + Icon
                </Button>
            </div>
            <h3>Tab radio</h3>
            <div className="my-5">
                <div className="filter-grade">
                    <Form.Check
                        label="전체"
                        type="radio"
                        id={`grade-1`}
                        name="grade"
                        defaultChecked
                    />
                    <Form.Check
                        label="초등학교 1~3학년"
                        type="radio"
                        id={`grade-2`}
                        name="grade"
                    />
                    <Form.Check
                        label="초등학교 4~6학년"
                        type="radio"
                        id={`grade-3`}
                        name="grade"
                    />
                    <Form.Check
                        label="중학교 1~3학년"
                        type="radio"
                        id={`grade-4`}
                        name="grade"
                    />
                </div>
            </div>
            <h3>Datepicker</h3>
            <div className="my-5">
                <ReactDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="ipw-152"
                />
            </div>
            <div className="my-5">
                <ReactDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="ipw-152 datepicker-dark"
                />
            </div>
            <h3>Accordion</h3>
            <div className="my-5">
                <Accordion>
                    <div className="toggle-box">
                        <CustomToggle eventKey="0">
                            <i className="lcicon-classGuide"></i>수업안내
                            <i className="lcicon-dropClose"></i>
                        </CustomToggle>
                        <CustomToggle eventKey="1">
                            <i className="lcicon-classCurriculum"></i>수업
                            커리큘럼
                            <i className="lcicon-dropClose"></i>
                        </CustomToggle>
                    </div>
                    <div className="collapse-box">
                        <Accordion.Collapse eventKey="0">
                            <div>
                                지도교사 홍민기와 함께하는 독서 수업! 초등학생이
                                필수로 읽어야할 독서와 글쓰기 수업을 재미있고
                                신나게 같이 배워보아요! 7명이 함께 진행하는
                                온라인 LiveClass 독서 수업으로 다양한 수업을
                                함께 진행합니다
                            </div>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="1">
                            <div>
                                지도교사 홍민기와 함께하는 독서 수업! 초등학생이
                                필수로 읽어야할 독서와 글쓰기 수업을 재미있고
                                신나게 같이 배워보아요! 7명이 함께 진행하는
                                온라인 LiveClass 독서 수업으로 다양한 수업을
                                함께 진행합니다.지도교사 홍민기와 함께하는 독서
                                수업! 초등학생이 필수로 읽어야할 독서와 글쓰기
                                수업을 재미있고 신나게 같이 배워보아요! 7명이
                                함께 진행하는 온라인 LiveClass 독서 수업으로
                                다양한 수업을 함께 진행합니다.
                            </div>
                        </Accordion.Collapse>
                    </div>
                </Accordion>
            </div>
            <h3>Toggle Collapse</h3>
            <div className="my-5">
                <Button
                    variant="b500"
                    className="btw-184 mr-1"
                    onClick={() => setOpen3(!open3)}
                    aria-controls="answer3"
                    aria-expanded={open3}
                >
                    답변하기
                </Button>
                <Collapse in={open3}>
                    <div id="answer3">
                        <div className="tablelist-row">
                            <div className="d-flex align-items-center">
                                <div className="answer-content">
                                    <Form.Control
                                        className="ipw-488"
                                        as="textarea"
                                        rows={3}
                                        placeholder="이름 입력"
                                    />
                                </div>
                                <div className="answer-action text-right">
                                    <Button
                                        variant="white"
                                        onClick={handleShow3}
                                    >
                                        저장하기
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
            <h3>Table List + Responsive on mobile</h3>
            <div className="my-5">
                <div className="classcurriculum-content">
                    <div className="classcurriculum-list">
                        <div className="curriculum-head clearfix">
                            <div className="tcol-md-10 tcol-20">주차</div>
                            <div className="tcol-50 d-none d-lg-block">
                                수업일시
                            </div>
                            <div className="tcol-20 d-none d-lg-block">
                                수업도서
                            </div>
                            <div className="tcol-10 d-none d-lg-block">
                                지은이
                            </div>
                            <div className="tcol-10 d-none d-lg-block">
                                출판사
                            </div>
                            <div className="tcol-80 ccol-content d-block d-lg-none">
                                수업정보
                            </div>
                        </div>
                        <div className="curriculum-body">
                            <ul>
                                <li>
                                    <div className="tcol-md-10 tcol-20">
                                        1주차
                                    </div>
                                    <div className="tcol-md-50 tcol-80 ccol-date">
                                        2020.11.24 월 오후 1시 ~ 4시
                                    </div>
                                    <div className="tcol-md-20 tcol-60 ccol-book">
                                        홍길동전
                                    </div>
                                    <div className="tcol-md-10 tcol-20 ccol-author">
                                        김지은
                                    </div>
                                    <div className="tcol-md-10 tcol-20 ccol-publisher">
                                        문학사
                                    </div>
                                </li>
                                <li>
                                    <div className="tcol-md-10 tcol-20">
                                        1주차
                                    </div>
                                    <div className="tcol-md-50 tcol-80 ccol-date">
                                        2020.11.24 월 오후 1시 ~ 4시
                                    </div>
                                    <div className="tcol-md-20 tcol-60 ccol-book">
                                        홍길동전
                                    </div>
                                    <div className="tcol-md-10 tcol-20 ccol-author">
                                        김지은
                                    </div>
                                    <div className="tcol-md-10 tcol-20 ccol-publisher">
                                        문학사
                                    </div>
                                </li>
                            </ul>
                            <p className="curriculumn-note mt-3">
                                * LiveClass 책글 수업은 수업 결제는 전 월의 10일
                                이전에 진행해야 1주차부터 수업 참여가
                                가능합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <div className="tablelist g700">
                    <div className="tablelist-header d-flex">
                        <div className="tcol-20 d-none d-lg-block">
                            카테고리
                        </div>
                        <div className="tcol-40 d-none d-lg-block">제목</div>
                        <div className="tcol-20 d-none d-lg-block">신청자</div>
                        <div className="tcol-15 d-none d-lg-block">신청일</div>
                        <div className="tcol-100 d-block d-lg-none">
                            신청내용
                        </div>
                    </div>
                    <div className="tablelist-body">
                        <div className="tablelist-row-group">
                            <div
                                className="tablelist-row pointer"
                                onClick={() => setOpen1(!open1)}
                                aria-expanded={open1}
                            >
                                <div className="tcol-md-20 tcol-25 application-cate">
                                    영수사과
                                </div>
                                <div className="tcol-md-40 tcol-80 application-title text-left">
                                    수업신청해요!
                                </div>
                                <div className="tcol-md-20 tcol-25">이은서</div>
                                <div className="tcol-md-15 tcol-25">
                                    2020.11.25
                                </div>
                                <span className="toggle-action">
                                    <i className="lcicon-dropClose"></i>
                                </span>
                            </div>
                            <div className="tablelist-row-group tablelist-row-collapse">
                                <Collapse in={open1}>
                                    <div id="answer1">
                                        <div className="tablelist-row g100">
                                            <div className="tcol-60 text-left">
                                                <p className="mb-1">
                                                    수업 신청합니다.
                                                </p>
                                                <p className="mb-1">
                                                    재미있는 수업 신청합니다.
                                                    개설해주세요.
                                                </p>
                                            </div>
                                            <div className="tcol-40 text-right pl-2">
                                                <Button
                                                    variant="white"
                                                    onClick={handleShow2}
                                                    className="btn-square btn-reply"
                                                    size="sm"
                                                >
                                                    삭제
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="tablelist-row-group">
                            <div
                                className="tablelist-row pointer"
                                onClick={() => setOpen2(!open2)}
                                aria-expanded={open2}
                            >
                                <div className="tcol-md-20 tcol-25 application-cate">
                                    영수사과
                                </div>
                                <div className="tcol-md-40 tcol-80 application-title text-left">
                                    수업신청해요!
                                </div>
                                <div className="tcol-md-20 tcol-25">이은서</div>
                                <div className="tcol-md-15 tcol-25">
                                    2020.11.25
                                </div>
                                <span className="toggle-action">
                                    <i className="lcicon-dropClose"></i>
                                </span>
                            </div>
                            <div className="tablelist-row-group tablelist-row-collapse">
                                <Collapse in={open2}>
                                    <div id="answer2">
                                        <div className="tablelist-row g100">
                                            <div className="tcol-60 text-left">
                                                <p className="mb-1">
                                                    수업 신청합니다.
                                                </p>
                                                <p className="mb-1">
                                                    재미있는 수업 신청합니다.
                                                    개설해주세요.
                                                </p>
                                            </div>
                                            <div className="tcol-40 text-right">
                                                <Button
                                                    variant="white"
                                                    onClick={() =>
                                                        setOpen3(!open3)
                                                    }
                                                    aria-expanded={open3}
                                                    className="btn-square btn-reply"
                                                    size="sm"
                                                >
                                                    답변하기
                                                </Button>
                                            </div>
                                        </div>
                                        <Collapse in={open3}>
                                            <div id="answer3">
                                                <div className="tablelist-row g100">
                                                    <div className="tcol-70 text-left">
                                                        <Form.Control
                                                            className="ipw-488"
                                                            as="textarea"
                                                            rows={3}
                                                            placeholder="이름 입력"
                                                        />
                                                    </div>
                                                    <div className="tcol-30 text-right pl-2">
                                                        <Button
                                                            variant="white"
                                                            onClick={
                                                                handleShow1
                                                            }
                                                            className="btn-square btn-reply"
                                                            size="sm"
                                                        >
                                                            저장하기
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="tablelist-row-group">
                            <div
                                className="tablelist-row pointer"
                                onClick={() => setOpen4(!open4)}
                                aria-expanded={open4}
                            >
                                <div className="tcol-md-20 tcol-25 application-cate">
                                    영수사과
                                </div>
                                <div className="tcol-md-40 tcol-80 application-title text-left">
                                    수업신청해요!
                                </div>
                                <div className="tcol-md-20 tcol-25">이은서</div>
                                <div className="tcol-md-15 tcol-25">
                                    2020.11.25
                                </div>
                                <span className="toggle-action">
                                    <i className="lcicon-dropClose"></i>
                                </span>
                            </div>
                            <div className="tablelist-row-group tablelist-row-collapse">
                                <Collapse in={open4}>
                                    <div id="answer4">
                                        <div className="tablelist-row g100">
                                            <div className="tcol-70 text-left">
                                                <p className="mb-1">
                                                    수업 신청합니다.
                                                </p>
                                                <p className="mb-1">
                                                    재미있는 수업 신청합니다.
                                                    개설해주세요.
                                                </p>
                                            </div>
                                            <div className="tcol-30 text-right"></div>
                                        </div>
                                        <div className="tablelist-row g100">
                                            <div className="tcol-md-60  text-left d-none d-lg-block">
                                                <span className="answer-closed-label">
                                                    답변
                                                </span>
                                                <div className="answer-closed-content">
                                                    LiveClass 목적 페이지에
                                                    상담에 관한 수업
                                                    개설했습니다. 검색창에
                                                    김철수라고 입력하면 확인 할
                                                    수 있어요~ 수업 들으러
                                                    오세요~
                                                </div>
                                            </div>
                                            <div className="tcol-md-20 application-tutorname">
                                                <span className="answer-closed-label">
                                                    답변
                                                </span>
                                                지도교사 김철수
                                            </div>
                                            <div className="tcol-md-15">
                                                2020.11.25
                                            </div>
                                            <div className="tcol-100 text-left d-block d-lg-none">
                                                <div className="answer-closed-content">
                                                    LiveClass 목적 페이지에
                                                    상담에 관한 수업
                                                    개설했습니다. 검색창에
                                                    김철수라고 입력하면 확인 할
                                                    수 있어요~ 수업 들으러
                                                    오세요~
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <div className="tablelist g700">
                    <div className="tablelist-header">
                        <div className="tcol-md-70 tcol-100">수업 정보</div>
                        <div className="tcol-25 d-none d-lg-block">
                            지도교사
                        </div>
                    </div>
                    <div className="tablelist-body">
                        <div className="tablelist-row-group">
                            <div
                                className="tablelist-row pointer"
                                onClick={() => setOpen2(!open2)}
                                aria-expanded={open2}
                            >
                                <div className="tcol-md-70 tcol-100 text-left">
                                    <span className="category">학교수행</span>
                                    [LiveClass 목적] 발표 향상 수업
                                </div>
                                <div className="tcol-25 tclear">김철수</div>
                                <span className="toggle-action">
                                    <i className="lcicon-dropClose"></i>
                                </span>
                            </div>
                            <div className="tablelist-row-group tablelist-row-collapse">
                                <Collapse in={open2}>
                                    <div id="answer2">
                                        <div className="tablelist-row g100">
                                            <div className="tcol-md-35 text-left">
                                                <span className="mr-3">
                                                    1주차
                                                </span>
                                                홍길동전
                                            </div>
                                            <div className="tcol-md-30">
                                                2020.11.24. 월 1시 ~ 4시
                                            </div>
                                            <div className="tcol-35 text-lg-right">
                                                <span className="status-attendance red">
                                                    결석
                                                </span>
                                                <Button
                                                    variant="g300"
                                                    className="btw-260 btn-sm btn-outline"
                                                >
                                                    교실로 가기
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="tablelist-row g100">
                                            <div className="tcol-md-35 text-left">
                                                <span className="mr-3">
                                                    1주차
                                                </span>
                                                홍길동전
                                            </div>
                                            <div className="tcol-md-30">
                                                2020.11.24. 월 1시 ~ 4시
                                            </div>
                                            <div className="tcol-35 text-lg-right">
                                                <span className="status-attendance m500">
                                                    출석완료
                                                </span>
                                                <Button
                                                    variant="g300"
                                                    className="btw-260 btn-sm btn-outline"
                                                >
                                                    교실로 가기
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="tablelist-row g100">
                                            <div className="tcol-md-35 text-left">
                                                <span className="mr-3">
                                                    1주차
                                                </span>
                                                홍길동전
                                            </div>
                                            <div className="tcol-md-30">
                                                2020.11.24. 월 1시 ~ 4시
                                            </div>
                                            <div className="tcol-35 text-lg-right">
                                                <span className="status-attendance">
                                                    출석전
                                                </span>
                                                <Button
                                                    variant="g300"
                                                    className="btw-260 btn-sm btn-outline"
                                                >
                                                    교실로 가기
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <div className="tablelist g700">
                    <div className="tablelist-header">
                        <div className="tcol-10 d-none d-lg-block">강의</div>
                        <div className="tcol-60 d-none d-lg-block">
                            강의 제목
                        </div>
                        <div className="tcol-10 d-none d-lg-block">
                            수강여부
                        </div>
                        <div className="tcol-20 d-none d-lg-block">
                            강의 시간
                        </div>
                        <div className="tcol-100 d-block d-lg-none">
                            강의 정보
                        </div>
                    </div>
                    <div className="tablelist-body">
                        <div className="tablelist-row">
                            <div className="tcol-md-10 tcol-20">3강</div>
                            <div className="tcol-md-60 tcol-80 text-left">
                                중학교 과학 수학 강의
                            </div>
                            <div className="tcol-md-10 tcol-80 lecture-status done text-right text-lg-center">
                                수강완료
                            </div>
                            <div className="tcol-md-20 tcol-20">60분</div>
                        </div>
                        <div className="tablelist-row">
                            <div className="tcol-md-10 tcol-20">3강</div>
                            <div className="tcol-md-60 tcol-80 text-left">
                                중학교 과학 수학 강의
                            </div>
                            <div className="tcol-md-10 tcol-80 lecture-status inprogress text-right text-lg-center">
                                수강 중
                            </div>
                            <div className="tcol-md-20 tcol-20">60분</div>
                        </div>
                        <div className="tablelist-row">
                            <div className="tcol-md-10 tcol-20">3강</div>
                            <div className="tcol-md-60 tcol-80 text-left">
                                중학교 과학 수학 강의
                            </div>
                            <div className="tcol-md-10 tcol-80 lecture-status text-right text-lg-center">
                                수강전
                            </div>
                            <div className="tcol-md-20 tcol-20">60분</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-5 ">
                <div className="tablelist">
                    <div className="tablelist-header">
                        <div className="tcol-50 d-none d-lg-block">
                            후기내용
                        </div>
                        <div className="tcol-50 d-none d-lg-block">제목</div>
                        <div className="tcol-25 d-none d-lg-block">작성일</div>
                        <div className="tcol-25 d-none d-lg-block">작성자</div>
                        <div className="tcol-20 d-none d-lg-block">별점</div>
                        <div className="tcol-100 d-block d-lg-none">
                            후기 내용
                        </div>
                    </div>
                    <div className="tablelist-body">
                        <div className="tablelist-row flex-column">
                            <div className="tcol-100 d-lg-flex justify-content-between">
                                <div className="tcol-md-50 tcol-100 text-left">
                                    [LiveClass 책글] 초등 3~6 필독 독서 수업
                                </div>
                                <div className="tcol-md-50 tcol-100 d-lg-flex flex-row-reverse">
                                    <div className="tcol-40">
                                        <div className="star-box voted-3">
                                            <i className="lcicon-star"></i>
                                            <i className="lcicon-star"></i>
                                            <i className="lcicon-star"></i>
                                            <i className="lcicon-star"></i>
                                            <i className="lcicon-star"></i>
                                        </div>
                                    </div>
                                    <div className="tcol-30">이은서</div>
                                    <div className="tcol-30">2020.11.25</div>
                                </div>
                            </div>
                            <div className="tcol-100 text-g500 text-left">
                                수업 너무 재미있어요.
                            </div>
                        </div>
                        <div className="tablelist-row flex-column">
                            <div className="tcol-100 d-lg-flex justify-content-between">
                                <div className="tcol-md-50 tcol-100 text-left">
                                    [LiveClass 책글] 초등 3~6 필독 독서 수업
                                </div>
                                <div className="tcol-md-50 tcol-100 d-lg-flex flex-row-reverse">
                                    <div className="tcol-40">
                                        <div className="star-box voted-3">
                                            <i className="lcicon-star"></i>
                                            <i className="lcicon-star"></i>
                                            <i className="lcicon-star"></i>
                                            <i className="lcicon-star"></i>
                                            <i className="lcicon-star"></i>
                                        </div>
                                    </div>
                                    <div className="tcol-30">이은서</div>
                                    <div className="tcol-30">2020.11.25</div>
                                </div>
                            </div>
                            <div className="tcol-100 text-g500 text-left">
                                수업 너무 재미있어요.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Table form</h3>
            <div className="my-5">
                <Table className="table-form">
                    <tbody>
                        <tr>
                            <th className="th-285 align-middle">카테고리</th>
                            <td>
                                <label className="d-block d-lg-none">
                                    카테고리
                                </label>
                                <Dropdown className="form-control-dropdown ipw-386">
                                    <Dropdown.Toggle
                                        id="dropdown"
                                        // className="ipw-386"
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
                            </td>
                        </tr>
                        <tr>
                            <th className="th-285 align-middle">제목</th>
                            <td className="pr-0">
                                <label className="d-block d-lg-none">
                                    제목
                                </label>
                                <Form.Control
                                    type="text"
                                    placeholder="제목 입력 20자 이내"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    제목을 입력해주세요.
                                </Form.Control.Feedback>
                            </td>
                        </tr>
                        <tr>
                            <th className="th-285 align-top">내용</th>
                            <td className="pr-0 pb-0">
                                <label className="d-block d-lg-none">
                                    내용
                                </label>
                                <Form.Control
                                    as="textarea"
                                    rows={10}
                                    placeholder="내용 입력"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    내용을 입력해주세요.
                                </Form.Control.Feedback>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <h3>Nav Tabs Half</h3>
            <div className="my-5">
                <div className="nav-tabs-half b500">
                    <Tabs defaultActiveKey="findid">
                        <Tab eventKey="findid" title="ID찾기">
                            Hello Tab 1 Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Placeat, atque?
                        </Tab>
                        <Tab eventKey="resetpassword" title="비밀번호 재설정">
                            Hello Tab 2 Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Placeat, atque?
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <h3>Nav Tabs radius</h3>
            <div className="my-5">
                <div className="nav-tabs-radius b500">
                    <Tabs defaultActiveKey="findid">
                        <Tab eventKey="findid" title="ID찾기">
                            Hello Tab 1 Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Placeat, atque?
                        </Tab>
                        <Tab eventKey="resetpassword" title="비밀번호 재설정">
                            Hello Tab 2 Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Placeat, atque?
                        </Tab>
                    </Tabs>
                </div>
            </div>

            <h3>Nav Tabs with complex layout</h3>
            <div className="my-5">
                <Tab.Container defaultActiveKey="classList">
                    <div className="nav-tabs-radius g500">
                        <Nav>
                            <Nav.Item>
                                <Nav.Link eventKey="classList">
                                    수업리스트
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="classReviews">
                                    후기
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="classQAs">Q&A</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="tab-content">
                        <Tab.Content>
                            <Tab.Pane eventKey="classList">
                                Classlist content Lorem ipsum, dolor sit amet
                                consectetur adipisicing elit. Omnis consequuntur
                                eius dolor maxime assumenda veniam fugiat
                                suscipit, nulla eaque, optio doloribus animi
                                aspernatur ullam ad culpa illum, nisi tempore
                                magni. Aliquam nulla architecto earum ex
                                nesciunt, inventore voluptatem, facere nihil
                                eius in magnam est vero sint? Amet rem quasi
                                porro.
                            </Tab.Pane>
                            <Tab.Pane eventKey="classReviews">
                                ClassReview content Lorem ipsum, dolor sit amet
                                consectetur adipisicing elit. Omnis consequuntur
                                eius dolor maxime assumenda veniam fugiat
                                suscipit, nulla eaque, optio doloribus animi
                                aspernatur ullam ad culpa illum, nisi tempore
                                magni. Aliquam nulla architecto earum ex
                                nesciunt, inventore voluptatem, facere nihil
                                eius in magnam est vero sint? Amet rem quasi
                                porro.
                            </Tab.Pane>
                            <Tab.Pane eventKey="classQAs">
                                ClassQAs content Lorem ipsum, dolor sit amet
                                consectetur adipisicing elit. Omnis consequuntur
                                eius dolor maxime assumenda veniam fugiat
                                suscipit, nulla eaque, optio doloribus animi
                                aspernatur ullam ad culpa illum, nisi tempore
                                magni. Aliquam nulla architecto earum ex
                                nesciunt, inventore voluptatem, facere nihil
                                eius in magnam est vero sint? Amet rem quasi
                                porro.
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </div>

            {/* Modal custom 2 button */}

            <Modal
                show={show2}
                onHide={handleClose2}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner">
                        <p className="mb-0">삭제 하시겠습니까?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={handleClose2}>
                        취소
                    </Button>
                    <Button variant="g700" onClick={handleShow1}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal custom 1 button */}

            <Modal
                show={show1}
                onHide={handleClose1}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">인증이 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={handleClose1}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal LiveClass */}
            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modalw-996"
                centered
            >
                <Modal.Header className="justify-content-center">
                    <Modal.Title>서비스 이용약관</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner">
                        <p>
                            전체 동의는 필수 및 선택 정보에 대한 동의도 포함되어
                            있으며, 개별적으로도 동의를 선택하실 수 있습니다.
                            선택 항목은 동의를 거부하는 경우에도 회원가입 및
                            서비스 이용은 가능합니다.
                        </p>
                        <p>
                            전체 동의는 필수 및 선택 정보에 대한 동의도 포함되어
                            있으며, 개별적으로도 동의를 선택하실 수 있습니다.
                            선택 항목은 동의를 거부하는 경우에도 회원가입 및
                            서비스 이용은 가능합니다.
                        </p>
                        <p>
                            전체 동의는 필수 및 선택 정보에 대한 동의도 포함되어
                            있으며, 개별적으로도 동의를 선택하실 수 있습니다.
                            선택 항목은 동의를 거부하는 경우에도 회원가입 및
                            서비스 이용은 가능합니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button onClick={handleClose} className="btw-224">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal customize Height */}
            <Modal
                show={show3}
                onHide={handleClose3}
                dialogClassName="modalw-386 modalh-610 modal-resetpass"
                centered
            >
                <Modal.Header className="justify-content-center">
                    <Modal.Title>비밀번호 재설정</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner">
                        <p className="text-top font-18 text-center">
                            현재 비밀번호와 새 비밀번호를 입력해주세요.
                        </p>
                        <Form className="was-validated">
                            <Form.Group>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control
                                    required
                                    size="sm"
                                    type="password"
                                    placeholder="비밀번호 입력(영문, 숫자, 특수문자 조합 8~13자리)"
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 입력해주세요.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>비밀번호 확인</Form.Label>
                                <Form.Control
                                    required
                                    size="sm"
                                    type="password"
                                    placeholder="비밀번호 확인"
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 한번 더 입력해주세요.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={handleClose3}>
                        취소
                    </Button>
                    <Button variant="b500" onClick={handleClose3}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={show4}
                onHide={handleClose4}
                dialogClassName="modalw-386 modalh-480 modal-comfirm modal-tutorbook-confirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <p className="text-top">
                            지도교사 지원이 완료되었습니다.
                        </p>
                        <i className="lcicon-tutorbook-confirm my-2"></i>
                        <p className="text-bottom">
                            로그인은 승인 이후에 가능하며, <br /> 승인 여부는
                            개별적으로 전달드립니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="p500" as={Link} to="/">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Elements
