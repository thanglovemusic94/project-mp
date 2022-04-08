import BaseModal from "../base/BaseModal";

function NoticePopup({ content, onExited, modalFooter }) {

    return (
        <BaseModal
            content={content}
            onExited={onExited}
            singleButtonMode
            contentClassName="rounded-18px w-75 mx-auto overflow-hidden"
            modalHeader={false}
            modalFooter={modalFooter}
        />
    );
}

export default NoticePopup;