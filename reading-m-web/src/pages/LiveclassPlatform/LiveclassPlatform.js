import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LiveclassPlatform = () => {
    const [show1, setShow1] = useState(false)

    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)
    return (
        <>
            <div className="page-details">
                <article className="article-details">
                    <h3 className="article-title">
                        <span className="notice-label">전체</span>
                        LiveClass 리딩엠 플랫폼
                    </h3>
                    <div className="article-date text-right">2020.11.25</div>
                    <div className="article-download text-right">
                        <Button
                            variant="outline-g700"
                            className="btw-290 btn-square"
                            onClick={handleShow1}
                        >
                            다운로드
                        </Button>
                    </div>
                    <div className="article-content">
                        <p>
                            대통령·국무총리·국무위원·행정각부의 장·헌법재판소
                            재판관·법관·중앙선거관리위원회
                            위원·감사원장·감사위원 기타 법률이 정한 공무원이 그
                            직무집행에 있어서 헌법이나 법률을 위배한 때에는
                            국회는 탄핵의 소추를 의결할 수 있다.
                        </p>
                        <p>
                            누구든지 법률에 의하지 아니하고는
                            체포·구속·압수·수색 또는 심문을 받지 아니하며.
                            국가는 노인과 청소년의 복지향상을 위한 정책을 실시할
                            의무를 진다. 이 경우 공무원 자신의 책임은 면제되지
                            아니한다.
                        </p>
                        <p>
                            대통령·국무총리·국무위원·행정각부의 장·헌법재판소
                            재판관·법관·중앙선거관리위원회
                            위원·감사원장·감사위원 기타 법률이 정한 공무원이 그
                            직무집행에 있어서 헌법이나 법률을 위배한 때에는
                            국회는 탄핵의 소추를 의결할 수 있다.
                        </p>
                        <p>
                            누구든지 법률에 의하지 아니하고는
                            체포·구속·압수·수색 또는 심문을 받지 아니하며.
                            국가는 노인과 청소년의 복지향상을 위한 정책을 실시할
                            의무를 진다. 이 경우 공무원 자신의 책임은 면제되지
                            아니한다.
                        </p>
                        <p>
                            대통령·국무총리·국무위원·행정각부의 장·헌법재판소
                            재판관·법관·중앙선거관리위원회
                            위원·감사원장·감사위원 기타 법률이 정한 공무원이 그
                            직무집행에 있어서 헌법이나 법률을 위배한 때에는
                            국회는 탄핵의 소추를 의결할 수 있다.
                        </p>
                        <p>
                            누구든지 법률에 의하지 아니하고는
                            체포·구속·압수·수색 또는 심문을 받지 아니하며.
                            국가는 노인과 청소년의 복지향상을 위한 정책을 실시할
                            의무를 진다. 이 경우 공무원 자신의 책임은 면제되지
                            아니한다.
                        </p>
                    </div>
                    <div className="article-footer text-right">
                        <Button
                            variant="g700"
                            className="btw-290 mr-2 mb-3 mb-lg-0"
                            as={Link}
                            to="/notice-list"
                        >
                            뒤로가기
                        </Button>

                        {/* Get back MAIN page if click from MAIN Page */}
                        <Button
                            variant="g700"
                            className="btw-290"
                            as={Link}
                            to="/"
                        >
                            뒤로가기
                        </Button>
                    </div>
                </article>
            </div>
            <Modal
                show={show1}
                onHide={handleClose1}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner">
                        <p className="mb-0">다운로드 할 파일이 없습니다.</p>
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

export default LiveclassPlatform
