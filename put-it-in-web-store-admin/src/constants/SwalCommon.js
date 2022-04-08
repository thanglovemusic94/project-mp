export const SwalCommon = {
    ALERT_DELETE_ALL: {
        text: "해당 항목을 삭제하시겠습니까?\n" +
            "삭제 시 데이터 복구는 불가능합니다.",
        icon: "warning",
        buttons: ["취소", "삭제"],
        dangerMode: true,
    },
    ALERT_SAVE_COMPLETE: {
        text: "저장이 완료되었습니다.",
        icon: "success",
        button: "확인",
    },
    ALERT_DELETE_FAILED: {
        text: "저장에 실패했습니다.",
        icon: "error",
        button: "확인"
    }
}