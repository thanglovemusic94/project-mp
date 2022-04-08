import React from "react";
import { navigation } from './../../routes';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function NavigationBar() {

    const loggedIn = useSelector(state => state.authentication.loggedIn)

    return (
        <>
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion" aria-label=''>
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading"></div>

                            {navigation.map((item, index) => <SidenavItem navItem={item} index={index} key={index} />)}

                        </div >
                    </div >

                    {loggedIn &&
                        <div className="sb-sidenav-footer">
                            <div className="small">Logged in as: </div>
                        Administrator
                    </div>
                    }

                </nav >
            </div >
        </>
    );
}

export default NavigationBar;

function SidenavItem(props) {
    var { navItem, index } = props;
    return (
        <div>
            <Link as="a" className="nav-link collapsed" to={`${navItem.url ? navItem.url : '#'}`} data-toggle="collapse" data-target={`#collapseLayouts${index}`} aria-expanded="false" aria-controls={`collapseLayouts${index}`}>
                {navItem.mainMenu}
                {(navItem.subMenu) && <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>}
            </Link>
            <div className="collapse" id={`collapseLayouts${index}`} aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                {(navItem.subMenu) &&
                    <nav className="sb-sidenav-menu-nested nav">
                        {navItem.subMenu.map((subItem, idx) => <Link as="a" key={idx} className="nav-link" to={subItem.url}>{subItem.name}</Link>)}
                    </nav>
                }
            </div>
        </div >

    )
}
