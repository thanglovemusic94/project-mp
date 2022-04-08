import BaseModal from "../base/BaseModal";

function InputPopup({ title, onAgree, invalidFeedback, onExited }) {

    return (
        <BaseModal
            title={title}
            onAgree={onAgree}
            invalidFeedback={invalidFeedback}
            onExited={onExited}
            contentEditable
        />
    );
}

export default InputPopup;