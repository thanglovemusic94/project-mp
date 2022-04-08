export const TYPE_IMAGE = [
    "image/png",
    "image/jpeg"
]

export const TYPE_SELECTION = {
    ALL: '',
}

export const TYPE_CAR_TYPE ={
    DOMESTIC_ID: 'DOMESTIC',
    DOMESTIC_NAME: '국산',
    FOREIGN_ID: 'FOREIGN',
    FOREIGN_NAME: ' 외제'
}

const convertTypeCartType = (type) => {
    const checkType = Object.values(TYPE_CAR_TYPE).filter(value => value === type)[0]
    if (checkType === TYPE_CAR_TYPE.DOMESTIC_ID) return TYPE_CAR_TYPE.DOMESTIC_NAME
    if (checkType === TYPE_CAR_TYPE.FOREIGN_ID) return TYPE_CAR_TYPE.FOREIGN_NAME
}


export const TYPE_NOTICE ={
    GENERAL_ID: 'GENERAL',
    GENERAL_NAME: '일반',
    COMPANY_ID: 'COMPANY',
    COMPANY_NAME: '업체'
}

const convertTypeNotice = (type) => {
    const checkType = Object.values(TYPE_NOTICE).filter(value => value === type)[0]
    if (checkType === TYPE_NOTICE.GENERAL_ID) return TYPE_NOTICE.GENERAL_NAME
    if (checkType === TYPE_NOTICE.COMPANY_ID) return TYPE_NOTICE.COMPANY_NAME
}


export  {
    convertTypeNotice,
    convertTypeCartType
}
