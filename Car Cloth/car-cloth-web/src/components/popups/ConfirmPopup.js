import BaseModal from "../base/BaseModal";

function ConfirmPopup({ title, content, onAgree, onExited, onShowMore }) {

    return (
        <BaseModal
            title={title}
            content={content}
            onAgree={onAgree}
            onExited={onExited}
            onShowMore={onShowMore}
            modalHeader={false}
            contentClassName="rounded-18px w-75 mx-auto overflow-hidden"
        />
    );
}

export default ConfirmPopup;
