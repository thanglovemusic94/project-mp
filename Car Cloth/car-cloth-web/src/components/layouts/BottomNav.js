import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { ActiveHistoryIcon, ActiveHomeIcon, ActiveProductIcon, ActiveProfileIcon, InactiveHistoryIcon, InactiveHomeIcon, InactiveProductIcon, InactiveProfileIcon } from "../../assets/svgs/Icons";
import {
    IDENTITY_VERIFICATION_ROUTE,
    MAIN_PAGE_ROUTE,
    PERMISSION_ROUTE,
    PRODUCT_INFO_PAGE_ROUTE,
    SNS_LOGIN_ROUTE,
    SPLASH_ROUTE,
    QUOTE_REQUEST_START_ROUTE,
    TERMS_AND_CONDITIONS_ROUTE,
    USAGE_HISTORY_ROUTER,
    QUOTE_REQUEST_PART_SELECTION_ROUTE,
    QUOTE_REQUEST_CREATE_ROUTE,
    MY_PAGE,
    COMPANY,
    CAR_REGISTER_ROUTE,
    SNS_NAVER_LOGIN_CALLBACK_ROUTE,
    SNS_KAKAO_LOGIN_CALLBACK_ROUTE
} from "../../constants/RouteConstants";
import { SessionStorageManager } from "../../managers/SessionStorageManager";
import { Localizations } from "../../texts/Localizations";
import BottomNavButton from "../buttons/BottomNavButton";


const BottomNavItems = [
    {
        title: Localizations.BottomBar.Home,
        activeState: <ActiveHomeIcon />,
        inactiveState: <InactiveHomeIcon />,
        route: MAIN_PAGE_ROUTE
    },
    {
        title: Localizations.BottomBar.ProductInformation,
        activeState: <ActiveProductIcon />,
        inactiveState: <InactiveProductIcon />,
        route: PRODUCT_INFO_PAGE_ROUTE.CATEGORY
    },
    {
        title: Localizations.BottomBar.UsageHistory,
        activeState: <ActiveHistoryIcon />,
        inactiveState: <InactiveHistoryIcon />,
        route: USAGE_HISTORY_ROUTER.LIST
    },
    {
        title: Localizations.BottomBar.MyPage,
        activeState: <ActiveProfileIcon />,
        inactiveState: <InactiveProfileIcon />,
        route: MY_PAGE
    }
]


function BottomNav() {
    const history = useHistory();
    const location = useLocation();

    const [selectedIndex, setSelectedIndex] = useState(SessionStorageManager.getBottomNav());
    const [visible, setVisible] = useState(false);

    function handleMainPageChange(k, e) {
        setSelectedIndex(parseInt(k));

        history.push(BottomNavItems[k].route);
    }

    useEffect(() => {

        switch (location.pathname) {
            case SPLASH_ROUTE:
            case PERMISSION_ROUTE:
            case SNS_LOGIN_ROUTE:
            case TERMS_AND_CONDITIONS_ROUTE:
            case IDENTITY_VERIFICATION_ROUTE:
            case USAGE_HISTORY_ROUTER.DETAIL:
            case QUOTE_REQUEST_START_ROUTE:
            case QUOTE_REQUEST_PART_SELECTION_ROUTE:
            case QUOTE_REQUEST_CREATE_ROUTE:
            case USAGE_HISTORY_ROUTER.RESERVATION_HISTORY:
            case USAGE_HISTORY_ROUTER.QUOTATION_DETAIL:
            case USAGE_HISTORY_ROUTER.REGISTER_REVIEW:
            case USAGE_HISTORY_ROUTER.EDIT_REVIEW:
            case USAGE_HISTORY_ROUTER.RESERVATION_APPLICATION:
            case COMPANY.REGISTER_HISTORY:
            case COMPANY.REQUESTED_QUOTE_DETAIL:
            case COMPANY.CREATE_QUOTE:
            case CAR_REGISTER_ROUTE:
            case SNS_NAVER_LOGIN_CALLBACK_ROUTE:
            case SNS_KAKAO_LOGIN_CALLBACK_ROUTE:

                setVisible(false);
                break;

            default:

                for (var i = 0; i < BottomNavItems.length; i++) {

                    if (BottomNavItems[i].route === location.pathname) {
                        setSelectedIndex(i);

                        SessionStorageManager.saveBottomNav(i);

                        break;
                    }
                }

                setVisible(true);
                break;
        }

        // eslint-disable-next-line
    }, [location])

    return (
        <>
            {
                visible === false
                    ? <></>
                    :
                    <Navbar className="cc-footer nav-bottom border-top" bg="white" fixed="bottom" onSelect={handleMainPageChange}>
                        <Container fluid>
                            <Nav className="w-100" justify>
                                {
                                    BottomNavItems.map((item, index) => {

                                        return (
                                            <Nav.Item key={index}>
                                                <Nav.Link eventKey={index}>
                                                    <BottomNavButton
                                                        active={selectedIndex === index}
                                                        title={item.title}
                                                        activeState={item.activeState}
                                                        inactiveState={item.inactiveState}
                                                    />
                                                </Nav.Link>
                                            </Nav.Item>
                                        );
                                    })
                                }
                            </Nav>
                        </Container>
                    </Navbar>
            }
        </>
    );
}

export default BottomNav;
