import CIcon from '@coreui/icons-react';
import { CHeader, CLink, CSubheader } from '@coreui/react';
import React, { useState } from 'react';
import { LocalStorageManager } from 'src/managers/LocalStorageManager';
import { UserService } from 'src/services/UserService';
import ModalNotification from 'src/views/common/ModalNotification';

const POPUP_LOGOUT_TITLE = "로그아웃 되었습니다.";
const POPUP_LOGOUT_PATH = "/login";

const TheHeader = () => {
    const [show, setShow] = useState(false);

    function handleLogout() {

        UserService.logout().then((resp) => {

            if (resp.status === 204) {

                LocalStorageManager.removeAccessToken();
                LocalStorageManager.removeRefreshToken();

                setShow(true);
            }
        })
    }

    return (
        <>
            <CHeader withSubheader>
                <CSubheader className="px-3 justify-content-end">
                    <div className="d-md-down-none mfe-2 c-subheader-nav">
                        <CLink className="c-subheader-nav-link" onClick={handleLogout}>
                            <CIcon name="cil-account-logout" alt="Logout" />
                            &nbsp;로그아웃
                        </CLink>
                    </div>
                </CSubheader>
            </CHeader>

            <ModalNotification
                show={show}
                onShow={setShow}
                content={POPUP_LOGOUT_TITLE}
                path={POPUP_LOGOUT_PATH}
                clickOnBackToClose={false}
            />
        </>
    )
}

export default TheHeader
