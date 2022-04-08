export const MemberType = {
    READINGM: {
        value: "READINGM",
        label: "리딩엠"
    },
    RAMS: {
        value: "RAMS",
        label: "RAMS"
    },
}

export function convertMemberType(str) {
    if (str === MemberType.READINGM.value) {
        return MemberType.READINGM.label;
    } else if (str === MemberType.RAMS.value) {
        return MemberType.RAMS.label;
    }  else {
        return str;
    }
}