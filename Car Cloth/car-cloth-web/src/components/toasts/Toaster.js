import { Toast, ToastContainer } from "react-bootstrap";

function Toaster({ show, onShow, duration }) {

    function selfToggle() {
        onShow(!show);
    }

    return (
        <ToastContainer>
            <Toast
                className="color-primary rounded-pill fw-bold text-center"
                onClose={selfToggle}
                show={show}
                delay={duration}
                autohide
            >
                <Toast.Body className="p-2">채팅방 알림이 꺼졌습니다</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default Toaster;