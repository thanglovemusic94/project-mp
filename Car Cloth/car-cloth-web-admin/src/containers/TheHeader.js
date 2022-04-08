import {CButton, CCol, CContainer, CHeader, CImage} from "@coreui/react";
import { useHistory } from "react-router";
import logo from '../assets/logo.svg';
import { LocalStorageManager } from "../managers/LocalStorageManager";
import '../scss/containers/TheHeader.scss'
import {useContext} from "react";
import {UserContext} from "../context/user-context/UserProvider";
import {LOGOUT} from "../context/user-context/UserAction";

function TheHeader() {
    const history = useHistory();
    const {dispatch} = useContext(UserContext);

    function handleLogout() {
        LocalStorageManager.removeUserToken();
        LocalStorageManager.removeAccessDate();
        dispatch(LOGOUT)
        history.push("/login");
    }

    return (
        <>
            <CHeader>
                <CContainer fluid>
                    <CCol className={'col-2'} style={{margin: "0 4em"}}>
                        <CImage className="logo" fluid src={logo} onClick={()=>history.push("/")} style={{cursor: "pointer"}}/>
                    </CCol>
                    <CButton
                        variant="outline"
                        color="dark"

                        onClick={handleLogout}
                    >
                        로그아웃​
                    </CButton>
                </CContainer>
            </CHeader>
        </>
    )
}

export default TheHeader;
