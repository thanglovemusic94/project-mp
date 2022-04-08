import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function TutorClassGoalDetails() {
    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)
    return (
        <>
            <div className="tutorclassbookdetails-body">
                <h2 class="page-title">수업 전체보기</h2>
                <div class="dropdown-divider pb-4"></div>
                <h3 className="tutorclass-name">
                    <span className="title-badge b500 mr-3 mb-2 mb-lg-0">
                        국어 독서 논술
                    </span>
                    <br className="d-block d-lg-none" />
                    [LiveClass 목적] 발표 향상 수업
                </h3>
                <div className="tablelist m500">
                    <div className="tablelist-header d-none d-lg-block">
                        <div className="tcol-5"></div>
                        <div className="tcol-30 d-none d-lg-block">
                            학생정보
                        </div>
                        <div className="tcol-20 d-none d-lg-block">
                            학생 휴대폰번호
                        </div>
                        <div className="tcol-10 d-none d-lg-block">학부모</div>
                        <div className="tcol-20 d-none d-lg-block">
                            학부모 휴대폰번호
                        </div>
                        <div className="tcol-20 d-none d-lg-block">결제일</div>
                    </div>

                    <div className="tablelist-body ">
                        <div className="tablelist-row text-right text-lg-center">
                            <div className="tcol-15 tcol-md-5">
                                <span className="label-new">New</span>
                            </div>
                            <div className="tcol-20 d-lg-none text-500">
                                학생정보
                            </div>
                            <div className="tcol-md-30 tcol-65">
                                서울초등학교 3학년 이유진 학생
                            </div>

                            <div className="tcol-md-20 tcol-100">
                                010-1234-5678
                            </div>
                            <div className="tcol-35 d-lg-none text-500">
                                학부모
                            </div>
                            <div className="tcol-md-10 tcol-20">최나영</div>
                            <div className="tcol-md-20 tcol-45">
                                010-1234-5678
                            </div>
                            <div className="tcol-35 d-lg-none text-500">
                                결제일
                            </div>
                            <div className="tcol-md-20 tcol-65 text-g500">
                                2020.11.02
                            </div>
                        </div>

                        <div className="tablelist-row text-right text-lg-center">
                            <div className="tcol-md-5"></div>
                            <div className="tcol-35 d-lg-none text-500">
                                학생정보
                            </div>
                            <div className="tcol-md-30 tcol-65">
                                서울초등학교 3학년 이유진 학생
                            </div>

                            <div className="tcol-md-20 tcol-100">
                                010-1234-5678
                            </div>
                            <div className="tcol-35 d-lg-none text-500">
                                학부모
                            </div>
                            <div className="tcol-md-10 tcol-20">최나영</div>
                            <div className="tcol-md-20 tcol-45">
                                010-1234-5678
                            </div>
                            <div className="tcol-35 d-lg-none text-500">
                                결제일
                            </div>
                            <div className="tcol-md-20 tcol-65 text-g500">
                                2020.11.02
                            </div>
                        </div>
                        <div className="tablelist-row text-right text-lg-center">
                            <div className="tcol-md-5"></div>
                            <div className="tcol-35 d-lg-none text-500">
                                학생정보
                            </div>
                            <div className="tcol-md-30 tcol-65">
                                서울초등학교 3학년 이유진 학생
                            </div>

                            <div className="tcol-md-20 tcol-100">
                                010-1234-5678
                            </div>
                            <div className="tcol-35 d-lg-none text-500">
                                학부모
                            </div>
                            <div className="tcol-md-10 tcol-20">최나영</div>
                            <div className="tcol-md-20 tcol-45">
                                010-1234-5678
                            </div>
                            <div className="tcol-35 d-lg-none text-500">
                                결제일
                            </div>
                            <div className="tcol-md-20 tcol-65 text-g500">
                                2020.11.02
                            </div>
                        </div>
                    </div>
                </div>
                <div className="myclassdetails-box tutor mt-5">
                    <div className="myclassdetails-labelweek b500">
                        1일차 발표 수업 OT
                    </div>
                    <div className="myclassdetails-body">
                        <div className="myclassdetails-notify data-input">
                            <p className="mb-0 d-flex align-items-center">
                                <i className="lcicon-notify-g700"></i>
                                <span className="label">공지사항</span>
                                <Form.Control
                                    type="text"
                                    placeholder="지도교사 개인 사정으로 인해 1주차 초등 3~6 필독 독서 수업은 30분 연기됩니다."
                                    className=""
                                />
                            </p>
                        </div>
                        <div className="d-lg-flex">
                            <div className="col-md-7 py-4 px-0">
                                <div className="myclassdetails-intro">
                                    <div className="d-flex">
                                        <div className="myclassdetails-avatar">
                                            <div>
                                                <img
                                                    src="https://www.w3schools.com/w3images/avatar2.png"
                                                    alt="Tutor Avatar"
                                                />
                                                <p className="myclassdetails-teachername">
                                                    <span>지도교사</span>
                                                    <br className="d-block d-lg-none" />
                                                    <span className="name ml-2 ml-lg-0">
                                                        홍민기
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="myclassdetails-classcontent">
                                            <p>안녕하세요 여러분 ;)</p>
                                            <p>
                                                초등 3 필독 독서 수업 1주차에는
                                                수업 소개 및 커리큘럼에 대한
                                                설명 위주로 진행합니다. 모두
                                                반가워요!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="myclassdetails-materials">
                                        <i className="lcicon-pencilcolor"></i>
                                        1주차 수업준비 : 필기도구
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="myclassdetails-uploadfile">
                            <div className="uploadfile-custom mb-0 py-3">
                                <div className="col-md-6">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="uploadfile-label">
                                            공통파일 첨부하기
                                            <span>
                                                * 개수 제한없이 파일 첨부가
                                                가능합니다.
                                            </span>
                                        </label>
                                        <div className="uploadfile-button">
                                            <label
                                                for="file-upload"
                                                className="btn-upload btn-xs mr-0"
                                            >
                                                <i className="lcicon-plus-alt"></i>
                                                파일 선택
                                            </label>
                                            <input
                                                id="file-upload"
                                                type="file"
                                            />
                                        </div>
                                    </div>
                                    <div className="uploadfile-name uploaded mt-1">
                                        이유진 학생 첨삭 파일.pdf
                                        <i className="lcicon-close-black"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="uploadfile-custom mb-0 py-3">
                                <div className="col-md-12">
                                    <label className="uploadfile-label mb-2">
                                        파일 첨부하기
                                        <span>
                                            * 개수 제한없이 파일 첨부가
                                            가능합니다.
                                        </span>
                                    </label>
                                    <div className="box-gray mb-2 py-3">
                                        <div className="row mx-n2">
                                            <div className="col-md-6 px-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label className="uploadfile-label">
                                                        이유진 학생 파일
                                                        첨부하기
                                                    </label>
                                                    <div className="uploadfile-button">
                                                        <label
                                                            for="file-upload"
                                                            className="btn-upload btn-xs mr-0"
                                                        >
                                                            <i className="lcicon-plus-alt"></i>
                                                            파일 선택
                                                        </label>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="uploadfile-name uploaded mt-1">
                                                    이유진 학생 첨삭 파일.pdf
                                                    <i className="lcicon-close-black"></i>
                                                </div>
                                                <div className="uploadfile-name uploaded mt-1">
                                                    1주차 공통 자료.pdf
                                                    <i className="lcicon-close-black"></i>
                                                </div>
                                            </div>
                                            <div className="col-md-6 px-2">
                                                <div
                                                    style={{
                                                        height: '32px',
                                                    }}
                                                    className="invisible d-lg-block d-none"
                                                ></div>

                                                <div className="uploadfile-name uploaded mt-1">
                                                    이유진 학생 첨삭 파일.pdf
                                                    <Button
                                                        size="xs"
                                                        variant="b600"
                                                        as={Link}
                                                        to="/images/myw3schoolsimage.jpg"
                                                        download
                                                        className="btn-download"
                                                    >
                                                        다운로드
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-gray mb-2 py-3">
                                        <div className="row mx-n2">
                                            <div className="col-md-6 px-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label className="uploadfile-label">
                                                        이은서 학생 파일
                                                        첨부하기
                                                    </label>
                                                    <div className="uploadfile-button">
                                                        <label
                                                            for="file-upload"
                                                            className="btn-upload btn-xs mr-0"
                                                        >
                                                            <i className="lcicon-plus-alt"></i>
                                                            파일 선택
                                                        </label>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="uploadfile-name uploaded mt-1">
                                                    1주차 공통 자료.pdf
                                                    <i className="lcicon-close-black"></i>
                                                </div>
                                            </div>
                                            <div className="col-md-6 px-2">
                                                <div
                                                    style={{
                                                        height: '32px',
                                                    }}
                                                    className="invisible d-lg-block d-none"
                                                ></div>

                                                <div className="uploadfile-name uploaded mt-1">
                                                    이유진 학생 첨삭 파일.pdf
                                                    <Button
                                                        size="xs"
                                                        variant="b600"
                                                        as={Link}
                                                        to="/images/myw3schoolsimage.jpg"
                                                        download
                                                        className="btn-download"
                                                    >
                                                        다운로드
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-gray mb-2 py-3">
                                        <div className="row mx-n2">
                                            <div className="col-md-6 px-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label className="uploadfile-label">
                                                        이은서 학생 파일
                                                        첨부하기
                                                    </label>
                                                    <div className="uploadfile-button">
                                                        <label
                                                            for="file-upload"
                                                            className="btn-upload btn-xs mr-0"
                                                        >
                                                            <i className="lcicon-plus-alt"></i>
                                                            파일 선택
                                                        </label>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="myclassdetails-footer">
                        <div className="d-lg-flex myclassdetails-footer-top">
                            <div className="liveclass-title">
                                <div className="d-lg-flex">
                                    <h4>Live 교실 </h4>
                                    <div className="liveclass-info">
                                        <p>1주차 홍길동전</p>
                                        <p>
                                            수업일시 : 2020.12.11.월 오후 1시 ~
                                            4시
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button
                                    variant="b500"
                                    className="btw-372 d-lg-block d-none"
                                >
                                    Live 교실 입장하기
                                </Button>
                            </div>
                        </div>

                        <div className="text-center myclassdetails-footer-bottom">
                            <Button
                                variant="g700"
                                className="btw-184"
                                onClick={handleShow1}
                            >
                                저장하기
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <Button
                        variant="p500"
                        className="btw-386"
                        as={Link}
                        to="/move-to-9.4"
                    >
                        자세히보기
                    </Button>
                </div>
            </div>
            <Modal
                show={show1}
                onHide={handleClose1}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column ">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">저장되었습니다.</p>
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
