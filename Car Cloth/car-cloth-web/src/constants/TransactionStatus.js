
export const TRANSACTION_STATUS = {
    COMPARE: {
        label: '견적 비교',
        value: 'COMPARE'
    },
    RESERVATION: {
        label: '예약',
        value: 'RESERVATION',
    },
    CONSTRUCTING: {
        label: '시공 중',
        value: 'CONSTRUCTING',
    },
    COMPLETE: {
        label: '시공 완료',
        value: 'COMPLETE',
    }
}

export const TRANSACTION__OBJECT_STATUS = {
    'COMPARE': '견적 비교',
    'RESERVATION': '예약',
    'CONSTRUCTING': '시공 중',
    'COMPLETE': '시공 완료'
}

// export const STEPS_TRANSACTION_STATUS = ['COMPARE', 'RESERVATION', 'CONSTRUCTING', 'COMPLETE']
export const STEPS_TRANSACTION_STATUS = Object.keys(TRANSACTION__OBJECT_STATUS)
