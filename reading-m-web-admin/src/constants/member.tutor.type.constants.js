export const TutorType = {
    LIVE_BOOK_TEXT: {
        value: "LIVE_BOOK_TEXT",
        label: "LiveClass 책글"
    },
    LIVE_GOAL: {
        value: "LIVE_GOAL",
        label: "LiveClass 목적"
    },
    ALL: {
        value: "ALL",
        label: "LiveClass 책글, LiveClass 목적"
    },
}

export function convertTutorType(str) {
    if (str === TutorType.LIVE_BOOK_TEXT.value) {
        return TutorType.LIVE_BOOK_TEXT.label;
    } else if (str === TutorType.LIVE_GOAL.value) {
        return TutorType.LIVE_GOAL.label;
    } else if (str === TutorType.ALL.value) {
        return TutorType.ALL.label;
    } else {
        return str;
    }
}