export const GoalClassCategory = {
    ESSAY: {
        value: 'ESSAY',
        label: '국어독서논술',
    },
    SUBJECT: {
        value: 'SUBJECT',
        label: '영수사과',
    },
    SCHOOL_EXEC: {
        value: 'SCHOOL_EXEC',
        label: '학교수행',
    },
    CONSUL_N_OTHERS: {
        value: 'CONSUL_N_OTHERS',
        label: '상담기타',
    }
}

export function convertGoalClassCategory(str) {
    if (str === GoalClassCategory.ESSAY.value) {
        return GoalClassCategory.ESSAY.label
    }
    if (str === GoalClassCategory.SUBJECT.value) {
        return GoalClassCategory.SUBJECT.label
    }
    if (str === GoalClassCategory.SCHOOL_EXEC.value) {
        return GoalClassCategory.SCHOOL_EXEC.label
    }
    if (str === GoalClassCategory.CONSUL_N_OTHERS.value) {
        return GoalClassCategory.CONSUL_N_OTHERS.label
    }
    return str;
}
