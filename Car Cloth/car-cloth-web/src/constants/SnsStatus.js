export const SnsStatus = {
    'NAVER': 'NAVER',
    'KAKAO': 'KAKAO',
    'GOOGLE': 'GOOGLE',
    'APPLE': 'APPLE',
}


export const convertTypeSNS = (type) =>{
    switch (type) {
        case 'NAVER':
            return '네이버'
        case 'KAKAO':
            return '카카오'
        case 'GOOGLE':
            return '구글 '
        case 'APPLE':
            return '애플'
        default:
            return;
    }
}

