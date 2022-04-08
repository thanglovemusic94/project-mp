import CustomDropdown from 'components/CustomDropdown'
import React, { useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import formatDate from "../../../utils/DateUtils";

const UniversityType = [
    { "label": "대학교(4년)", "value": "Y4" },
    { "label": "대학교(6년)", "value": "Y6" }
]

const EnrollmentPeriodStartType = [
    { "label": "입학", "value": "ADMISSION" },
    { "label": "편입", "value": "TRANSFER" }
]

const EnrollmentPeriodEndType = [
    { "label": "졸업", "value": "GRADUATED" },
    { "label": "재학중", "value": "STUDY_UNI" },
    { "label": "휴학중", "value": "STUDY_ABOARD" },
    { "label": "수료", "value": "COMPLETED" },
    { "label": "중퇴", "value": "DROP_HALF" },
    { "label": "자퇴", "value": "DROP" },
    { "label": "졸업예정", "value": "SOON_GRADUATED" }
]

const MajorType = [
    { "label": "주전공", "value": "MAIN" },
    { "label": "부전공", "value": "MINOR" },
    { "label": "복수전공", "value": "MULTIPLE" }
]

const RegisterEdu = ({ onFinish }) => {
    const [data, setData] = useState(null)
    const [enrollPeriodStart, setEnrollPeriodStart] = useState({
        "date": ""
    })
    const [enrollPeriodEnd, setEnrollPeriodEnd] = useState({
        "date": ""
    })
    const [majors, setMajors] = useState([
        {
            name: '',
            type: 'MAIN',
        },
    ])

    const [validated, setValidated] = useState(false);
    const [enrollPeriodError, setEnrollPeriodError] = useState(false)

    function handleAddMajor() {
        let item = {
            name: '',
            type: 'MAIN',
        }

        setMajors([...majors, item])
    }

    function handleRemoveMajor(index) {
        let items = [...majors]

        items.splice(index, 1)

        setMajors([...items])
    }

    function handleUpdateMajorType(value, index) {
        let items = [...majors]

        items[index].type = value

        setMajors([...items])
    }

    function handleUpdateMajorName(value, index) {
        let items = [...majors]

        items[index].name = value

        setMajors([...items])
    }

    function handleUpdateEnrollmentPeriod(type, value) {
        let regex1 = new RegExp('[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|1[0-9]|2[0-9]|3[01])')
        let regex2 = new RegExp('[0-9]{4}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])')

        if (type === "start") {
            setEnrollPeriodStart({
                ...enrollPeriodStart,
                date: formatDate(value, "YYYYMMDD", "YYYY-MM-DD"),
            })

             setEnrollPeriodError((regex1.test(enrollPeriodEnd.date) === true && regex2.test(value) === true))
        } else if (type === "end") {

            setEnrollPeriodEnd({
                ...enrollPeriodEnd,
                date: formatDate(value, "YYYYMMDD", "YYYY-MM-DD"),
            })
             setEnrollPeriodError((regex1.test(enrollPeriodStart.date) === true && regex2.test(value) === true))
        }


    }

    function handleFinish(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        } else {
            let info = {
                ...data,
                enrollPeriod: {
                    start: {
                        ...enrollPeriodStart,
                    },
                    end: {
                        ...enrollPeriodEnd,
                    },
                },
                majors,
            }
            onFinish({ academicInfo: { ...info } })
        }

        setValidated(true);
    }

    return (
        <>
            <div className="registerselfintro-section">
                <div className="box-w612">
                    <div className="box-title">
                        <h3>학력사항</h3>
                        <p className="text-danger">
                            *학력사항은 필수 입력사항입니다.
                        </p>
                    </div>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleFinish}
                    >
                        <Form.Group className="d-md-flex">
                            <Form.Label>
                                대학 유형 <span className="text-danger">*</span>
                            </Form.Label>
                            <CustomDropdown
                                items={UniversityType}
                                onChange={(e, k) => {
                                    setData({ ...data, "uniType": k })
                                }}
                                classNameToggle="ipw-488"
                            />
                        </Form.Group>
                        <Form.Group className="d-md-flex">
                            <Form.Label>
                                대학교명 <span className="text-danger">*</span>
                            </Form.Label>
                            <div>
                                <Form.Control
                                    className="ipw-488"
                                    type="text"
                                    placeholder="대학교명 입력 "
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            uniName: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    대학교명을 입력해주세요.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-md-flex">
                            <Form.Label>
                                재학기간 <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="ipw-488">
                                <div className="input-dropdown-group d-flex">
                                    <Form.Control
                                        className="ipw-220"
                                        type="text"
                                        placeholder="YYYYMMDD"
                                        onChange={(e) =>
                                            handleUpdateEnrollmentPeriod(
                                                "start",
                                                e.target.value,
                                            )
                                        }
                                        maxLength="8"
                                        pattern="[0-9]{4}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])"
                                        required
                                    />
                                    <CustomDropdown
                                        items={EnrollmentPeriodStartType}
                                        onChange={(e, k) => {
                                            setEnrollPeriodStart({
                                                ...enrollPeriodStart,
                                                "type": k,
                                            })
                                        }}
                                        classNameToggle="ipw-130"
                                    />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-md-flex">
                            <Form.Label></Form.Label>
                            <div className="ipw-488">
                                <div className="input-dropdown-group d-flex">
                                    <Form.Control
                                        className="ipw-220"
                                        type="text"
                                        placeholder="YYYYMMDD"
                                        onChange={(e) =>
                                            handleUpdateEnrollmentPeriod(
                                                "end",
                                                e.target.value,
                                            )
                                        }
                                        maxLength="8"
                                        pattern="[0-9]{4}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])"
                                        required
                                    />
                                    <CustomDropdown
                                        items={EnrollmentPeriodEndType}
                                        onChange={(e, k) => setEnrollPeriodEnd({
                                            ...enrollPeriodEnd,
                                            "type": k,
                                        })}
                                        classNameToggle="ipw-130"
                                    />
                                </div>
                            </div>
                        </Form.Group>

                        {(validated === false || enrollPeriodError === true) ?
                            <></>:
                            <Form.Group className="d-md-flex">
                                <Form.Label></Form.Label>
                                <div className="ipw-488">
                                    <Form.Control.Feedback type={"invalid"}
                                                           className={'d-block'}
                                    >
                                        재직기간을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        }

                        {majors.map((item, index) => {
                            let isLast = index === majors.length - 1

                            return (
                                <div key={index}>
                                    <Form.Group className="d-md-flex">
                                        <Form.Label>
                                            주전공{' '}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Form.Label>
                                        <div className="ipw-488">
                                            <CustomDropdown
                                                items={MajorType}
                                                onChange={(e, k) => {
                                                    handleUpdateMajorType(
                                                        k,
                                                        index
                                                    )
                                                }}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="d-md-flex">
                                        <Form.Label></Form.Label>
                                        <div className="ipw-488">
                                            <Form.Control
                                                className="ipw-488"
                                                type="text"
                                                placeholder="전공 입력"
                                                value={item.name}
                                                onChange={(e) =>
                                                    handleUpdateMajorName(
                                                        e.target.value,
                                                        index
                                                    )
                                                }
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                전공을 입력해주세요.
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    {isLast === true ? (
                                        <div className="d-md-flex justify-content-between">
                                            <Form.Label></Form.Label>
                                            <div className="ipw-488">
                                                <Button
                                                    variant="g700"
                                                    className="btn-add btn-default btw-184"
                                                    onClick={handleAddMajor}
                                                >
                                                    <i className="lcicon-plus-alt"></i>
                                                    전공추가
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="d-md-flex justify-content-between mb-5">
                                            <Form.Label></Form.Label>
                                            <div className="ipw-488">
                                                <Button
                                                    variant="g700"
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        handleRemoveMajor(index + 1)
                                                    }
                                                >
                                                    삭제
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                        <div className="d-flex justify-content-center pt-5">
                            <Button
                                type="submit"
                                variant="p500"
                                className="btw-386 mr-1"
                            >
                                다음
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default RegisterEdu
