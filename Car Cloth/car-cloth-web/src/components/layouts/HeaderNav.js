import { useContext, useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { AppContext } from "../../App";
import { BackIcon, TitleLogo } from "../../assets/svgs/Icons";
import { PERMISSION_ROUTE, SNS_KAKAO_LOGIN_CALLBACK_ROUTE, SNS_LOGIN_ROUTE, SNS_NAVER_LOGIN_CALLBACK_ROUTE, SPLASH_ROUTE } from "../../constants/RouteConstants";
import { getMenuInfoByPath } from "../../routes";
import { Localizations } from "../../texts/Localizations";

function HeaderNav({ onBack }) {
    const history = useHistory();
    const location = useLocation();

    const { customHeaderName, optionalItem, setOptionalItem, isPlatformIOS } = useContext(AppContext);

    const [currentMenu, setCurrentMenu] = useState({
        'isRoot': '',
        'name': '',
        'optionalItem': ''
    });
    const [visible, setVisible] = useState(true);

    useEffect(() => {

        switch (location.pathname) {
            case SPLASH_ROUTE:
            case PERMISSION_ROUTE:
            case SNS_LOGIN_ROUTE:
            case SNS_NAVER_LOGIN_CALLBACK_ROUTE:
            case SNS_KAKAO_LOGIN_CALLBACK_ROUTE:

                setVisible(false);
                setOptionalItem(null)
                break;
            default:
                const menuInfo = getMenuInfoByPath(location.pathname);

                setCurrentMenu(menuInfo);
                setOptionalItem(menuInfo?.optionalItem)
                setVisible(true);
                break;
        }

        // eslint-disable-next-line
    }, [location])

    function handleMainPageChange(k, e) {

        switch (k) {
            case '0':

                if (onBack) {
                    const handled = onBack();

                    if (handled === false)
                        history.goBack();
                } else {
                    history.goBack();
                }

                break;

            case '1':
                break;

            case '2':
                break;

            default:
                break;
        }
    }

    return (
        <>
            {
                visible === false
                    ? <></>
                    : <Navbar
                        fixed="top"
                        bg="white"
                        className={`cc-header nav-header py-0  ${isPlatformIOS.current === true ? "ios align-items-end" : ""}`}
                        onSelect={handleMainPageChange}
                    >
                        <Nav className={`w-100 justify-content-between ${isPlatformIOS.current === true ? "align-items-center" : ""}`}>
                            <Nav.Item >
                                <Nav.Link eventKey="0" hidden={currentMenu.isRoot === true}>
                                    <div className="text-start">
                                        <BackIcon />
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={`position-absolute top-50 start-50 ${isPlatformIOS.current === true ? "translate-middle-x" : "translate-middle"}`}>
                                <Nav.Link eventKey="1" className="text-black">
                                    {
                                        currentMenu.isRoot === true
                                            ? currentMenu.name === Localizations.BottomBar.Home
                                                ? <TitleLogo />
                                                : customHeaderName ?? currentMenu.name
                                            : customHeaderName ?? currentMenu.name
                                    }
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={'me-2'}>
                                <Nav.Link eventKey="2" hidden={!currentMenu.optionalItem && !optionalItem}>
                                    <div className="text-end">
                                        {optionalItem ? optionalItem : currentMenu.optionalItem}
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
            }
        </>
    );
}

export default HeaderNav;
