import React, {useContext, useState} from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {Button, Image, Modal} from 'react-bootstrap'
import LogoFooter from '../assets/logo/logoFooter.png'
import {AppContext} from "../contexts/AppContext";

const TheFooter = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const [show1, setShow1] = useState(false)
    const { isLogined}  = useContext(AppContext);
    const history = useHistory();
    const handleShowInquiry = () =>{
        if (isLogined === false){
            setShow1(!show1)
        }else {
            history.push('/write-inquiry');
        }
    }

    return (
        <>
            <div className="lc-footer">
                <div className="container">
                    <div className="footer-top d-lg-flex align-items-center justify-content-between">
                        <div className="footer-logo">
                            <Image src={LogoFooter} alt="LiveClass LogoFooter" />
                        </div>
                        <div className="footer-nav">
                            <nav>
                                <ul className="d-flex">
                                    <li>
                                        <NavLink to="/directions">
                                            찾아오시는 길
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/privacy-policy">
                                            개인정보처리방침
                                        </NavLink>
                                    </li>
                                    <li>
                                        <Link onClick={handleShowInquiry}>
                                            1:1 문의하기
                                        </Link>
                                    </li>
                                    <li>
                                        <NavLink to="/frequently-qa">
                                            자주 묻는 질문
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="footer-infor">
                        <h4 className="footer-title">
                            책읽기와 글쓰기 LIVE 수업 리딩엠
                        </h4>
                        <p className="footer-contact">
                            서울특별시 서초구 고무래로 10길 27. 주호빌딩 402호 / TEL
                            : 02-537-2248 / FAX : 02-2646-8825 리딩엠 대표 : 황종일
                            /
                            <br />
                            사업자등록번호 105-87-39631 / 통신판매신고번호
                            제2018-서울서초-2460호
                        </p>
                        <p className="footer-copyright mb-0">
                            Copyright ⓒ 2014 ReadingM, ALL rights reserved.
                        </p>
                    </div>
                    <div className="scroll-to-top">
                        <div onClick={scrollToTop}>
                        <span className="lc-backtop">
                            <i className="lcicon-btn-top"></i>
                            TOP
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={show1}
                onHide={() => setShow1(!show1)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <p className="mb-0">로그인 후 이용할 수 있습니다. </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={()=> {
                        setShow1(!show1)
                        history.push('/login')
                    }}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TheFooter
