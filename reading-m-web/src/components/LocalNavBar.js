import React, { useContext, useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { LoginService } from 'services/LoginService'
import { checkClassTagRole, getRole } from '../constants/role.constants'
import { UserStorage } from '../storages/UserStorage'
import { AppContext } from '../contexts/AppContext'
import { Button, Modal } from 'react-bootstrap'
import { slide as Menu } from 'react-burger-menu'

function LocalNavBar() {
    const history = useHistory()
    const { isLogined, setIsLogined } = useContext(AppContext)

    const [showLogout, setShowLogout] = useState(false)

    const role = getRole()
    const use = UserStorage.getUserLocal()
    const classTagAside = ['user-student', 'user-parent', 'user-tutor']
    const classTagILcicon = ['lcicon-student', 'lcicon-parent', 'lcicon-tutor']

    const logout = () => {

        // TODO: Should change state and redirect only after logout API is responded successfully
        LoginService.logout()
        setShowLogout(false)
        setIsLogined(false)
        history.push('/login')
    }

    return (
        isLogined === true ?
            <>
                {/* menu on mobile LogIn */}
                <aside
                    className={
                        checkClassTagRole(role.value, ...classTagAside) +
                        ' d-xl-none'
                    }
                >
                    <Menu width={'198px'}>
                        <div className="lnb-box">
                            <div className="lnb-header">
                                <span className="lnb-logo">
                                    <i
                                        className={checkClassTagRole(
                                            role.value,
                                            ...classTagILcicon
                                        )}
                                    ></i>
                                </span>
                                {use && (
                                    <>
                                        <span className="lnb-name">
                                            {use.name}
                                        </span>
                                        <span className="lnb-infor">
                                            {role.label}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="lnb-body">
                                <ul>
                                    <li>
                                        <NavLink
                                            className="lnb-link"
                                            to="/my-profile"
                                        >
                                            내 프로필
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="lnb-link"
                                            to="/my-class"
                                        >
                                            내 수업
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="lnb-link"
                                            to="/my-book-calendar"
                                        >
                                            내 도서 캘린더
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="lnb-link"
                                            to="/my-activity"
                                        >
                                            내 활동
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="lnb-link" to="/my-inquiry">
                                            1:1 문의
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="span-logout">
                                <Link
                                    to="/"
                                    onClick={() => setShowLogout(!showLogout)}
                                >
                                    로그아웃
                                </Link>
                            </div>
                        </div>
                    </Menu>
                </aside>

                {/* menu on desktop LogIn */}
                <aside
                    className={
                        checkClassTagRole(role.value, ...classTagAside) +
                        ' d-none d-xl-block'
                    }
                >
                    <div className="lnb-box">
                        <div className="lnb-header">
                            <span className="lnb-logo">
                                <i
                                    className={checkClassTagRole(
                                        role.value,
                                        ...classTagILcicon
                                    )}
                                ></i>
                            </span>
                            {use && (
                                <>
                                    <span className="lnb-name">{use.name}</span>
                                    <span className="lnb-infor">{role.label}</span>
                                </>
                            )}
                        </div>
                        <div className="lnb-body">
                            {
                                role.value === "PARENT" ? <ParentLocalNavBarItems />
                                    :
                                    role.value === "STUDENT" ? <StudentLocalNavBarItems />
                                        :
                                        role.value === "TUTOR" ? <TutorLocalNavBarItems />
                                            :
                                            <></>
                            }
                        </div>
                        <div className="lnb-footer">
                            {/* This is a workaround, need to styling in CSS file properly later */}
                            <Button style={{ backgroundColor: "#fff", color: "#000", border: 0 }} onClick={() => setShowLogout(!showLogout)}>
                                로그아웃
                            </Button>
                        </div>
                    </div>
                </aside>

                <Modal
                    show={showLogout}
                    onHide={() => setShowLogout(!showLogout)}
                    dialogClassName="modalw-386 modal-comfirm"
                    centered
                >
                    <Modal.Body scrollable={true}>
                        <div className="modal-body-inner">
                            <p className="mb-0">로그아웃 하시겠습니까?</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="modal-btn-half">
                        <Button
                            variant="g200"
                            onClick={() => setShowLogout(!showLogout)}
                        >
                            취소
                        </Button>
                        <Button variant="g700" onClick={logout}>
                            확인
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            :
            <></>
    )
}

const ParentLocalNavBarItems = () => {

    return (
        <ul>
            <li>
                <NavLink className="lnb-link" to="/my-profile">
                    내 프로필
                </NavLink>
            </li>
            <li>
                <NavLink className="lnb-link" to="/my-class">
                    자녀 수업
                </NavLink>
            </li>
            <li>
                <NavLink
                    className="lnb-link"
                    to="/my-book-calendar"
                >
                    자녀 도서 캘린더
                </NavLink>
            </li>
            <li>
                <NavLink className="lnb-link" to="/parent/my-activity">
                    자녀 활동
                </NavLink>
            </li>
            <li>
                <Link className="lnb-link" to="/teacher-room">
                    교무실
                </Link>
            </li>
            <li>
                <Link className="lnb-link" to="/my-payment">
                    수업 결제 내역
                </Link>
            </li>
            <li>
                <NavLink className="lnb-link" to="/my-inquiry">
                    1:1 문의
                </NavLink>
            </li>
        </ul>
    )
}

const StudentLocalNavBarItems = () => {

    return (
        <ul>
            <li>
                <NavLink className="lnb-link" to="/my-profile">
                    내 프로필
                </NavLink>
            </li>
            <li>
                <NavLink className="lnb-link" to="/my-class">
                    내 수업
                </NavLink>
            </li>
            <li>
                <NavLink
                    className="lnb-link"
                    to="/my-book-calendar"
                >
                    내 도서 캘린더
                </NavLink>
            </li>
            <li>
                <NavLink className="lnb-link" to="/student/my-activity">
                    내 활동
                </NavLink>
            </li>
            <li>
                <NavLink className="lnb-link" to="/my-inquiry">
                    1:1 문의
                </NavLink>
            </li>
        </ul>
    )
}

const TutorLocalNavBarItems = () => {

    return (
        <ul>
            <li>
                <NavLink className="lnb-link" to="/my-profile">
                    내 프로필
                </NavLink>
            </li>
            <li>
                <NavLink className="lnb-link" to="/tutor/my-class">
                    내 수업
                </NavLink>
            </li>
            <li>
                <NavLink className="lnb-link" to="/tutor/my-activity">
                    내 활동
                </NavLink>
            </li>
            <li>
                <Link className="lnb-link" to="/teacher-room">
                    교무실
                </Link>
            </li>
            <li>
                <Link className="lnb-link" to="/settlement">
                    수업 정산 내역
                </Link>
            </li>
            <li>
                <NavLink className="lnb-link" to="/my-inquiry">
                    1:1 문의
                </NavLink>
            </li>
        </ul>
    )
}

export default LocalNavBar
