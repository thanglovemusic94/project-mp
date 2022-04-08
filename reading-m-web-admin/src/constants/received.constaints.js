export const Received = {
    EMAIl: '이메일 수신 동의',
    SMS: 'SMS 수신 동의'
}

export const Gender = {
    MALE: '남자',
    FEMALE: '여자'
}

export const checkGender = (gender) =>{
    if (Gender.hasOwnProperty(gender))
    return Gender[gender];
}
