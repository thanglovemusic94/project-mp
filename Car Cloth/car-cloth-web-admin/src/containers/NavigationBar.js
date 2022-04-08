import {CButton, CCol, CContainer, CNavbar, CNavbarNav, CNavItem, CRow} from "@coreui/react";
import {useHistory} from "react-router";
import {NavItemHeaderConstant} from "../constants/NavItemHeaderConstant";

function NavigationBar({ selectedIndex, onSelected }) {
    return (
        <>
            <CNavbar expand="lg" colorScheme="light" className="bg-light py-0 border-dark ">
                <CNavbarNav className="w-100">
                    <CContainer className="p-0" fluid>
                        <CRow xs={{ gutter: 0 }}>
                            {
                                NavItemHeaderConstant.map((item, index) => {
                                    let isActive = selectedIndex === index;

                                    return (
                                        <CCol key={`nav-item-${index}`}>
                                            <NavigationItem
                                                source={item}
                                                index={index}
                                                onSelected={onSelected}
                                                isActive={isActive}
                                            />
                                        </CCol>
                                    );
                                })
                            }
                        </CRow>
                    </CContainer>
                </CNavbarNav>
            </CNavbar>
        </>
    )
}

function NavigationItem({ source, index, onSelected, isActive }) {
    const history = useHistory();

    function handleSelected() {
        // SessionStorageManager.saveNavPosition(index);

        if (onSelected) {
            onSelected(index);
        }

        history.push(source.route);
    }

    return (
        <CNavItem>
            <CButton
                className="w-100 text-nowrap fs-6 border border-dark border-end-0 shadow-none"
                component="button"
                role="button"
                size="lg"
                color="dark"
                variant="ghost"
                shape="rounded-0"
                onClick={handleSelected}
                active={isActive}
            >
                {source.name}
            </CButton>
        </CNavItem>
    );
}

export default NavigationBar;
