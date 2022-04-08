import { CButton, CModal, CModalBody } from "@coreui/react";
import React from "react";

export default function ModalNotification(props) {
    const { show, onShow, onClose, content, path, clickOnBackToClose } = props;

    const selfToggle = () => onShow(!show)

    const handleOnClose = () => {

        if (onClose !== undefined) {

            onClose();
        }
            

        selfToggle()
    }

    return (
        <>
            <CModal
                show={show}
                onClose={handleOnClose}
                centered
                size="sm"
                closeOnBackdrop={clickOnBackToClose !== undefined ? clickOnBackToClose : true}
            >
                <CModalBody className="text-center">
                    <p>{content}</p>

                    {
                        path ?
                            <CButton
                                color="dark"
                                className="mx-2"
                                to={path}
                            >
                                확인
                            </CButton>
                            :
                            <CButton
                                color="dark"
                                onClick={handleOnClose}
                                className="mx-2"
                            >
                                확인
                            </CButton>
                    }
                </CModalBody>
            </CModal>
        </>
    )
}
