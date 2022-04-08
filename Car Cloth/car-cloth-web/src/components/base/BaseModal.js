import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Localizations } from "../../texts/Localizations";
import { handleChange } from "../../utils/StateUtils";

function BaseModal({
    title,
    content,

    agreeText,
    disagreeText,

    singleButtonMode,
    contentEditable,
    invalidFeedback,

    backdrop,
    closeButton,

    onAgree,
    onExited,
    onShowMore,

    modalHeader,
    modalBody,
    modalFooter,

    ...props
}) {
    const noContent = !content && !contentEditable;
    const hideAll = modalHeader === false && modalBody === false && modalFooter === false;

    const [show, onShow] = useState(true);
    const [enteredContent, setEnteredContent] = useState("");
    const [invalidContent, showInvalidContent] = useState(false);

    function selfToggle() {
        onShow(onShowMore ?? !show);
    }

    function handleAgree() {

        if (contentEditable === true) {

            if (enteredContent.length < 5) {
                showInvalidContent(true);
            } else {
                showInvalidContent(false);

                selfToggle();

                if (onAgree)
                    onAgree(enteredContent);
            }
        } else {
            selfToggle();

            if (onAgree)
                onAgree();
        }
    }

    return (
        <Modal
            {...props}

            show={show}
            onHide={selfToggle}
            onExited={onExited}
            backdrop={backdrop ?? true}
            contentClassName={hideAll === true ? 'd-none' : props.contentClassName}
            centered
        >
            {
                modalHeader === false
                    ? <></>
                    :
                    <Modal.Header className="border-bottom-0 p-2 bg-white"
                        closeButton={closeButton}>
                        <Modal.Title className="w-100">
                            <div className={noContent === true ? "py-4" : ""}>
                                {title}
                            </div>
                        </Modal.Title>
                    </Modal.Header>
            }

            {
                modalBody === false
                    ? <></>
                    :
                    <Modal.Body className="font-noto" hidden={noContent}>
                        <div className="text-center" hidden={!content}>{content}</div>
                        <Form className="pb-3 text-center" hidden={!contentEditable}>
                            <Form.Control
                                className="mb-2"
                                as="textarea"
                                rows={5}
                                value={enteredContent}
                                onChange={e => handleChange(e, enteredContent, setEnteredContent)}
                            />
                            <span className="text-danger" hidden={!invalidContent}>{invalidFeedback}</span>
                        </Form>
                    </Modal.Body>
            }

            {
                modalFooter === false
                    ? <></>
                    :
                    <Modal.Footer className={`p-0 ${modalBody === false && modalHeader === false ? 'border-top-0' : ''} font-noto`}>
                        {
                            singleButtonMode === true
                                ?
                                <Button
                                    variant="white"
                                    className="w-100 m-0 rounded-18px fw-normal fs-17"
                                    onClick={handleAgree ?? selfToggle}
                                >
                                    {Localizations.Common.Confirm}
                                </Button>
                                :
                                <div className="d-flex w-100 m-0">
                                    <Button
                                        variant="outline-light"
                                        className="fs-17 w-50 py-10px border-0 text-danger border-end"
                                        onClick={selfToggle}
                                    >
                                        {disagreeText ?? Localizations.Common.Cancel}
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        className="fs-17 w-50 py-10px border-0 text-blue-500"
                                        onClick={handleAgree}
                                    >
                                        {agreeText ?? Localizations.Common.Confirm}
                                    </Button>
                                </div>
                        }
                    </Modal.Footer>
            }
        </Modal>
    );
}

export default BaseModal;
