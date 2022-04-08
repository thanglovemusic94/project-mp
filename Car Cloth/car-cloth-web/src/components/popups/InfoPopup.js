import BaseModal from "../base/BaseModal";

function InfoPopup({ title, content, backdrop, onExited, onAgree }) {

    return (
        <BaseModal
            title={title}
            content={content}
            onAgree={onAgree}
            onExited={onExited}
            backdrop={backdrop}
            singleButtonMode
        />
    );
}

export default InfoPopup;
