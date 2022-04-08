import { useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { Localizations } from "../../texts/Localizations";

function SelectionPopup({ source, onSelect, onExited, isClose }) {
    const [visible, setVisible] = useState(true);

    function selfToggle() {
        setVisible(!visible);
    }

    function handleSelect(index) {

        if (onSelect)
            onSelect(index);

        selfToggle();
    }

    return (
        <>
            <Modal
                dialogClassName="d-flex align-items-end min-vh-100 my-auto"
                contentClassName="bg-transparent border-0"
                show={visible}
                onHide={selfToggle}
                onExited={onExited}
            >
                <Modal.Body className="p-0">
                    <ListGroup>
                        {
                            source?.map((item, index) => {
                                let additionalClassName = index === 0 ? "rounded-top-14px" : index === source.length - 1 ? "rounded-bottom-14px" : "";

                                additionalClassName += " fs-17 py-14px";

                                return (
                                    <ListGroup.Item
                                        key={index}
                                        className={additionalClassName}
                                        onClick={() => handleSelect(index)}
                                    >
                                        {item}
                                    </ListGroup.Item>
                                );
                            })
                        }
                    </ListGroup>

                    <Button
                        className="bg-white w-100 py-11px rounded-14px border-0 text-blue mb-5 mt-2 fs-20 font-noto fw-medium"
                        onClick={selfToggle}
                    >
                        {isClose ? Localizations.Common.Close : Localizations.Common.Cancel}
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SelectionPopup;
