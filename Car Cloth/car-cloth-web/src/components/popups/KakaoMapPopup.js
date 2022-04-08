import { useState } from "react";
import { Modal } from "react-bootstrap";
import KakaoMapContainer from "../KakaoMapContainer";

function KakaoMapPopup({value, onConfirm, onExited }) {
    const [showMap, setShowMap] = useState(true);

    function handleSelect(value) {
        setShowMap(false);

        if (onConfirm)
            onConfirm(value);
    }

    return (
        <>
            <Modal show={showMap} onHide={() => setShowMap(!showMap)} onExited={onExited} fullscreen>
                <Modal.Body className="p-0">
                    <KakaoMapContainer value={value}  onSelect={handleSelect} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default KakaoMapPopup;
