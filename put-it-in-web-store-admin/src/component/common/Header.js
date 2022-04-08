import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LogoutAct = {tite:"로그아웃", url:"/login"}

function Header() {

    const loggedIn = useSelector(state => state.authentication.loggedIn)

    const [showNavigation, setNavigation] = useState(true);
    const showNavi = () => document.body.classList.remove('sb-sidenav-toggled');
    const hideNavi = () => document.body.classList.add('sb-sidenav-toggled');

    var handleToggle = () => {
        setNavigation(!showNavigation);
    }

    useEffect(() => {
        (showNavigation) ? showNavi() : hideNavi()
    }, [showNavigation])

    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark" aria-label=''>
                <Link className="navbar-brand" to="/index.html">Put It In</Link>
                <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" onClick={handleToggle}><i className="fas fa-bars"></i></button>
                <div className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                </div>

                {!loggedIn &&
                    <ul className="navbar-nav ml-auto ml-md-0 pull-right" >
                        <li className="nav-item dropdown">
                            <Link to="/login" className="link-item reverse">로그인</Link>
                        </li>
                    </ul>
                }
                {loggedIn &&
                    <ul className="navbar-nav ml-auto ml-md-0 pull-right" >
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/">
                                <svg className="svg-inline--fa fa-user fa-w-14 fa-fw" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                                {/* <i className="fas fa-user fa-fw"></i> */}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href={LogoutAct.url}>{LogoutAct.tite}</a>
                            </div>
                        </li>
                    </ul>
                }
            </nav >
        </>
    );
}

export default Header;
