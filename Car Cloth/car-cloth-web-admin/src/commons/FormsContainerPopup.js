import { CButton, CForm, CModal, CModalBody } from "@coreui/react";
import { useState } from "react";

function ContainerPopup({ visible, setVisible, headerText, manualValidated, attachedComponent, onAgree }) {
    const [validated, setValidated] = useState(false);

    function handleAgree(event) {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        if (form.checkValidity() === true) {

            if (manualValidated === false)
                setValidated(false);

            setVisible(false);
            onAgree();
        } else {

            if (manualValidated === false)
                setValidated(true);
        }
    }

    return (
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalBody>
                <CForm noValidate validated={validated} onSubmit={handleAgree}>
                    <div className="text-center">
                        <div className="fw-semibold mb-3">{headerText}</div>
                        <div className="px-3">
                            {attachedComponent}
                        </div>
                        <div className="mt-3">
                            <CButton className="w-25 me-3" color="light"   onClick={() => setVisible(false)}>취소​</CButton>
                            <CButton className="w-25" color="dark"   type="submit">확인</CButton>
                        </div>
                    </div>
                </CForm>
            </CModalBody>
        </CModal>
    );
}

export default ContainerPopup;
