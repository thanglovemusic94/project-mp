import { AppContext } from 'contexts/AppContext'
import React, { useContext } from 'react'
import { Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import LogoResonponsive from '../assets/logo/logo-responsive.png'
import Logo from '../assets/logo/logo.png'
import NavbarLinks from './NavbarLinks'

const TheHeader = () => {
    const { isLogined } = useContext(AppContext)

    return (
        <div>
            <div className="lc-header">
                <div className="container">
                    <div className="header-logo text-center">
                        <span className="logo-img d-none d-lg-block">
                            <NavLink to="/">
                                <Image src={Logo} alt="LiveClass Logo" />
                            </NavLink>
                        </span>
                        <span className="logo-img d-block d-lg-none">
                            <NavLink to="/">
                                <Image
                                    src={LogoResonponsive}
                                    alt="LiveClass Logo"
                                />
                            </NavLink>
                        </span>
                        <span className="span-login" hidden={isLogined}>
                            <NavLink to="/login">로그인</NavLink> |{' '}
                            <NavLink to="/register">회원가입</NavLink>
                        </span>
                    </div>
                </div>
                <div className="header-nav">
                    <NavbarLinks />
                </div>
            </div>
        </div>
    )
}

export default TheHeader
