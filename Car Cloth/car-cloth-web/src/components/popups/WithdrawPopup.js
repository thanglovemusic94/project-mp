import BaseModal from "../base/BaseModal";

function WithdrawPopup({ title, content, onAgree, onExited, onShowMore }) {

    return (
        <BaseModal
            title={title}
            content={content}
            onAgree={onAgree}
            onExited={onExited}
            closeButton={true}
            dialogClassName="withdraw-popup"
            agreeText={'다시 생각해 볼게요'}
            disagreeText={'탈퇴하기'}
            contentClassName="rounded-8px overflow-hidden"

        />
    );
}

export default WithdrawPopup;
