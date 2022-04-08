import React from 'react'

const RegisterSteps = ({ step }) => {
    const stepNames = [
        '기본정보',
        '학력사항',
        '자격증',
        '경력 사항',
        '자기소개서',
        '지원 유형 선택',
    ]

    return (
        <>
            <div className="registersteps-section">
                {/* on desktop  */}
                <div className="register-steps desktop d-none d-lg-block">
                    <ul className="reset-list d-flex justify-content-center">
                        {stepNames.map((item, index) => {
                            const itemClassName =
                                index === step ? 'current' : ''
                            const numberIndicator =
                                index < 10 ? '0' + (index + 1) : index + 1

                            return (
                                <li className={itemClassName}>
                                    <span className="step-number">
                                        <span>{numberIndicator}</span>
                                    </span>
                                    {item}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {/* on mobile  */}
                <div className="register-steps mobile d-block d-lg-none">
                    <ul className="reset-list text-center">
                        <li className="current">
                            기본정보
                            <span className="step-number">
                                <span>01</span>
                                <span>06</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default RegisterSteps
