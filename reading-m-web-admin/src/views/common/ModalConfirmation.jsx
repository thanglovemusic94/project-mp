import { CButton, CModal, CModalBody } from "@coreui/react";

export default function ModalConfirmation({ show, onShow, onCancel, onConfirm }) {

    function handleConfirm() {
        onShow(!show);

        if (onConfirm !== undefined) {
            onConfirm();
        }
    }

    function handleCancel() {
        onShow(!show);

        if (onCancel !== undefined) {
            onCancel();
        }
    }


    return (
        <CModal
            show={show}
            onClose={() => onShow(!show)}
            centered
            size="sm"
        >
            <CModalBody className="text-center">
                <p>삭제하시겠습니까?</p>
                <CButton
                    variant="outline"
                    color="dark"
                    onClick={() => handleCancel()}
                    className="mx-2"
                >
                    취소
                </CButton>
                <CButton
                    color="dark"
                    onClick={() => handleConfirm()}
                    className="mx-2"
                >
                    확인
                </CButton>
            </CModalBody>
        </CModal>
    )
}