export const AppliedClass = {
    LIVE_BOOK: {
        value: 'LIVE_BOOK',
        label: 'LiveClass 책글',
    },
    LIVE_GOAL: {
        value: 'LIVE_GOAL',
        label: 'LiveClass 목적',
    },
    MATHEMATICS: {
        value: 'MATHEMATICS',
        label: '과학수학 다빈치',
    },
    APPLIED_ALL: {
        value: 'ALL',
        label: '모든 수업',
    },
    ALL: {
        value: '',
        label: '수업 종류 전체',
    },
}

export function convertAppliedClass(str) {
    if (!str) {
        return AppliedClass.APPLIED_ALL.label;
    }
    if (str === AppliedClass.LIVE_BOOK.value) {
        return AppliedClass.LIVE_BOOK.label;
    }
    if (str === AppliedClass.LIVE_GOAL.value) {
        return AppliedClass.LIVE_GOAL.label;
    }
    if (str === AppliedClass.MATHEMATICS.value) {
        return AppliedClass.MATHEMATICS.label;
    }
    return str;
}