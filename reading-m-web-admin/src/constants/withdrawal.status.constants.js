export const WithdrawalStatus = {
    APPROVED: {
        value: "APPROVED",
        label: "탈퇴 완료"
    },
    COMPLETED: {
        value: "COMPLETED",
        label: "탈퇴 완료"
    },
    WAITING: {
        value: "WAITING",
        label: "탈퇴 승인"
    },
}

export function convertWithdrawalStatus(str) {
    if (str === WithdrawalStatus.APPROVED.value) {
        return WithdrawalStatus.APPROVED.label;
    } else if (str === WithdrawalStatus.COMPLETED.value) {
        return WithdrawalStatus.COMPLETED.label;
    } else if (str === WithdrawalStatus.WAITING.value) {
        return WithdrawalStatus.WAITING.label;
    }  else {
        return str;
    }
}