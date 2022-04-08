import { Button, Modal } from "react-bootstrap"

const ModalNotification = ({ show, onShow, content }) => {

    function selfToggle() {

        onShow(!show);
    }

    return (
        <Modal
            show={ show }
            onHide={ onShow }
            dialogClassName="modalw-386 modal-comfirm"
            centered
        >
            <Modal.Body>
                <div className="modal-body-inner flex-column">
                    {/* <i className="lcicon-modalComplete mb-2"></i> */}
                    <p className="mb-0">{ content }</p>
                </div>                
            </Modal.Body>

            <Modal.Footer className="modal-btn-half">
                <Button variant="g700" onClick={ selfToggle }>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalNotification