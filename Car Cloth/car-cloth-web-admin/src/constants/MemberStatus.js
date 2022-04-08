
export const MEMBER_STATUS = {
    'DELETED': '휴면',
    'ACTIVATED': '정상'
}

export const TYPE_SNS = {
    NAVER: "네이버",
    KAKAO: "카카오",
    GOOGLE: "구글",
    APPLE: "애플"
}

export const isActiveMember = (lastLoginTime) => {
    if(lastLoginTime != null){
        const checkMillisecondsLastLoginToNow = new Date() - new Date(lastLoginTime)  // milliseconds
        const dayLastLoginToNow = Math.ceil(checkMillisecondsLastLoginToNow / (1000 * 60 * 60 * 24))
        if (dayLastLoginToNow < 365) {
            return MEMBER_STATUS['ACTIVATED']
        } else {
            return MEMBER_STATUS['DELETED']
        }
    }else{
        return MEMBER_STATUS['ACTIVATED']
    }
    
}

export const memberType = (companyMember) =>{
    if(companyMember === true) return '업체회원';
    return '일반회원'
}

