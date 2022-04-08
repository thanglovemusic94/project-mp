import CustomDropdown from 'components/CustomDropdown'
import { React, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import formatDate from "../../../utils/DateUtils"

const DataTemplate = {
    occupation: "",
    companyName: "",
    workPeriod: {
        end: {
            type: "WORKING"
        },
        start: {
        }
    },
    position: "",
    responsibilities: ""
}

const WorkingPeriodType = [
    { "label": "재직중", "value": "WORKING" },
    { "label": "휴직중", "value": "LEAVING" },
    { "label": "퇴사", "value": "LEFT" }
]

const RegisterCareer = ({ onFinish }) => {
    const [careers, setCareers] = useState([
        {
            ...DataTemplate,
        },
    ])

    const [validated, setValidated] = useState(false);

    function handleUpdateCareer(item, index) {
        let items = [...careers]

        items[index] = item

        setCareers([...items])
    }

    function handleAddCareer() {
        let newCareer = { ...DataTemplate }

        setCareers([...careers, newCareer])
    }

    function handleFinish(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
        } else {
            onFinish({ experiences: [...careers]})
        }

        setValidated(true);
    }

    return (
        <>
            <div className="registerselfintro-section">
                <div className="box-w612">
                    <div className="box-title">
                        <h3>경력 사항</h3>
                        <p className="text-danger">
                            *경력 사항은 필수 입력사항입니다.
                        </p>
                    </div>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleFinish}
                    >
                        {
                            careers.map((item, index) => {
                                let regex = new RegExp('[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|1[0-9]|2[0-9]|3[01])')

                                const itemStartDate = item.workPeriod.start.date
                                const itemEndDate = item.workPeriod.end.date
                                const enrollPeriodError = ((regex.test(itemStartDate) === true && regex.test(itemEndDate) === true))

                                console.log(itemStartDate)
                                console.log(itemEndDate)
                                console.log(enrollPeriodError)
                                return (
                                    <div key={index}>
                                        {/* This is temporary work for UI, need to be removed later */}
                                        <div hidden={index === 0}>
                                            <br />
                                            <br />
                                        </div>
                                        <Form.Group className="d-md-flex">
                                            <Form.Label>
                                                직종{' '}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <div>
                                                <Form.Control
                                                    className="ipw-488"
                                                    type="text"
                                                    placeholder="직종입력"
                                                    value={item.occupation}
                                                    onChange={(e) => handleUpdateCareer({
                                                        ...item,
                                                        "occupation": e.target.value
                                                    }, index)}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    직종을 입력해주세요.
                                                </Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="d-md-flex">
                                            <Form.Label>
                                                회사명 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <div>
                                                <Form.Control
                                                    className="ipw-488"
                                                    type="text"
                                                    placeholder="회사명 입력"
                                                    value={item.companyName}
                                                    onChange={(e) => handleUpdateCareer({
                                                        ...item,
                                                        "companyName": e.target.value
                                                    }, index)}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    회사명을 입력해주세요.
                                                </Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="d-md-flex">
                                            <Form.Label>
                                                재직기간 선택 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <div className="ipw-488">
                                                <Form.Control
                                                    className="ipw-349"
                                                    type="text"
                                                    placeholder="YYYYMMDD"
                                                    // value={item.workPeriod.date} // start
                                                    onChange={(e) => handleUpdateCareer({
                                                        ...item,
                                                        workPeriod: {
                                                            ...item.workPeriod,
                                                            start:{
                                                                date: formatDate(e.target.value, "YYYYMMDD", "YYYY-MM-DD")
                                                            }
                                                        }
                                                    }, index)}
                                                    maxLength="8"
                                                    pattern="[0-9]{4}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])"
                                                    required
                                                />

                                            </div>
                                        </Form.Group>
                                        <Form.Group className="d-md-flex">
                                            <Form.Label></Form.Label>
                                            <div className="ipw-488">
                                                <div className="input-dropdown-group d-flex">
                                                    <Form.Control
                                                        className="ipw-219"
                                                        type="text"
                                                        placeholder="YYYYMMDD"
                                                        value={item.workPeriod.date} // end
                                                        onChange={(e) => handleUpdateCareer({
                                                            ...item,
                                                            workPeriod: {
                                                                ...item.workPeriod,
                                                                end: {
                                                                    ...item.workPeriod.end,
                                                                    date: formatDate(e.target.value, "YYYYMMDD", "YYYY-MM-DD")
                                                                }
                                                            }
                                                        }, index)}
                                                        maxLength="8"
                                                        pattern="[0-9]{4}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])"
                                                        required
                                                    />
                                                    <CustomDropdown
                                                        items={WorkingPeriodType}
                                                        onChange={(e, k) => handleUpdateCareer({
                                                            ...item,
                                                            workPeriod: {
                                                                ...item.workPeriod,
                                                                end: {
                                                                    ...item.workPeriod.end,
                                                                    type: k
                                                                }
                                                            }
                                                        }, index)}
                                                        classNameToggle="ipw-130"
                                                    />
                                                </div>

                                            </div>
                                        </Form.Group>
                                        {
                                                <Form.Group className="d-md-flex">
                                                    <Form.Label></Form.Label>
                                                    <div className="ipw-488">
                                                        <Form.Control.Feedback type={"invalid"}
                                                                               className={(validated === false || enrollPeriodError === true) ? 'd-none': 'd-block'}
                                                        >
                                                            재직기간을 입력해주세요.
                                                        </Form.Control.Feedback>
                                                    </div>
                                                </Form.Group>
                                        }
                                        <Form.Group className="d-md-flex">
                                            <Form.Label>
                                                직급/직책 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <div>
                                                <Form.Control
                                                    className="ipw-488"
                                                    type="text"
                                                    placeholder="직급/직책 입력"
                                                    value={item.position}
                                                    onChange={(e) => handleUpdateCareer({
                                                        ...item,
                                                        "position": e.target.value
                                                    }, index)}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    직급/직책을 입력해주세요.
                                                </Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="d-md-flex">
                                            <Form.Label>
                                                담당업무 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <div>
                                                <Form.Control
                                                    className="ipw-488"
                                                    type="text"
                                                    placeholder="담당업무 입력"
                                                    value={item.responsibilities}
                                                    onChange={(e) => handleUpdateCareer({
                                                        ...item,
                                                        "responsibilities": e.target.value
                                                    }, index)}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    담당업무를 입력해주세요.
                                                </Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                    </div>
                                )
                            })
                        }
                        <div className="text-center my-5">
                            <Button variant="g700" className="btn-add btw-184" onClick={handleAddCareer}>
                                <i className="lcicon-plus-alt"></i>
                                경력 사항 추가
                            </Button>
                        </div>
                        <div className="text-center">
                            <Button type="submit" variant="p500" className="btw-386 mr-1" >
                                다음
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default RegisterCareer
