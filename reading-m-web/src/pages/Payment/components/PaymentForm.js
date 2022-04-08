import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import DateTime from '../../../components/common/DateTime'
import { schoolgrade } from '../../../constants/schoolgrade.constants'
import { pointtype } from '../../../constants/pointtype.constants'
import Currency from '../../../components/common/Currency'
import { LoginService } from '../../../services/LoginService'
import { ParentService } from '../../../services/ParentService'
import CustomDropdown from '../../../components/CustomDropdown'
import { PaymentService } from 'services/payment.service'
import { LiveClassType } from 'constants/class.constants'

function PaymentForm({ classInfo }) {
    const [validated, setValidated] = useState(false)
    const [payerInfo, setPayerInfo] = useState({})
    const [children, setChildren] = useState([])
    const [coupons, setCoupons] = useState([])
    const [discount, setDisCount] = useState(0)
    const [maxCashpoints, setMaxCashPoints] = useState(0)
    const [maxEventPoints, setMaxEventPoints] = useState(0)
    const [cashPoints, setCashPoints] = useState(0)
    const [eventPoints, setEventPoints] = useState(0)
    const [checkedPaymentTerm, setCheckedPaymentTerm] = useState(false)
    const [checkedRefundTerm, setCheckedRefundTerm] = useState(false)
    const [agreedAll, setAgreedAll] = useState(false)
    const [showPolicy, setShowPolicy] = useState(false)
    const MATH_CLASS_TYPE = LiveClassType.Mathematics.value
    const LIVE_BOOK_CLASS_TYPE = LiveClassType.LiveClassBook.value

    let className = ""
    let tuitionFee = 0

    const [data, setData] = useState({
        childId: 0,
        classId: classInfo.id,
        method: 'CREDIT_CARD',
        couponId: -1,
        eventPoint: 0,
        cashPoint: 0,
    })

    useEffect(() => {
        getPayerInfo()
        getChildren()
        getCoupons()
        getPoints()
    }, [])

    useEffect(() => changeTerm(), [checkedPaymentTerm, checkedRefundTerm])

    const getPayerInfo = () => {
        LoginService.getProfile()
            .then((res) => {
                let payerInfo = {
                    name: res.data?.name,
                    phone: res.data?.phone,
                    email: res.data?.email
                }

                setPayerInfo(payerInfo)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getChildren = () => {

        ParentService.getChildren()
            .then((res) => {
                setChildren(
                    res.data.map((std) => ({ label: std.name, value: std.id }))
                )
                res.data.length > 0 && setData({ ...data, childId: res.data[0].id })
            })
            .catch((err) => console.log(err))
    }

    const getCoupons = () => {
        ParentService.getValidCoupon(classInfo.type)
            .then((res) => {
                setCoupons([
                    { label: '할인 쿠폰 선택', value: -1, amount: 0 },
                    ...res.data.map((c) => ({
                        label: c.name,
                        value: c.id,
                        amount: c.amount,
                    })),
                ])
            })
            .catch((err) => console.log(err))
    }

    const getPoints = () => {
        ParentService.getSummaryPoints()
            .then((res) => {
                let points = res.data
                const cashPoint = points.find(p => p.type === pointtype.CASH_POINT)
                const eventPoint = points.find((p) => p.type == pointtype.EVENT_POINT)
                setMaxCashPoints(cashPoint ? cashPoint.amount : 0)
                setMaxEventPoints(eventPoint ? eventPoint.amount : 0)
            })
            .catch((err) => console.log(err))
    }

    const changeTerm = () => {
        setAgreedAll(checkedPaymentTerm && checkedRefundTerm)
    }

    const handleChangeDropdown = (e, k) => {
        const { name } = e.target
        if (name && name != '') {
            setData({ ...data, [name]: k })
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleChangePayerInfo = (e) => {
        const { name, value } = e.target
        setPayerInfo({ ...payerInfo, [name]: value })
    }

    const buyAllLecture = () => {
        return classInfo.checkList.find(checked => !checked) === undefined
    }

    const getSelectedVideo = () => {
        const checkList = classInfo.checkList
        return classInfo.videos.filter((v, i) => checkList[i])
    }

    if (classInfo) {
        tuitionFee = classInfo.tuitionFee
        if (classInfo.type === MATH_CLASS_TYPE) {
            className = `[과학수학 다빈치] ${classInfo.name}`

            if (buyAllLecture()) {
                tuitionFee = Math.round(0.9 * tuitionFee)
            } else {
                tuitionFee = getSelectedVideo()
                    .map(video => video.fee)
                    .reduce((accumulator, currentValue) =>
                        accumulator + currentValue
                    )

            }
        } else {
            className = `[LiveClass ${classInfo.type === LIVE_BOOK_CLASS_TYPE ? "책글" : "목적"}] ${classInfo.name}`
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        setValidated(true)

        if (agreedAll && form.checkValidity()) {
            let paymentDto = {
                ...data,
                classType: classInfo.type,
                amount: tuitionFee,
                payerInfo: payerInfo
            }

            if (classInfo.type === MATH_CLASS_TYPE) {
                var indexs = []
                classInfo.checkList.forEach((check, i) => {
                    if (check) {
                        indexs.push(i)
                    }
                })

                paymentDto.courseIndex = indexs
            }

            ParentService.orderPayment(paymentDto)
                .then((res) => {
                    if (res.status === 201) {
                        PaymentService.requestPayment(
                            res.data.finalAmount,
                            res.data.orderId,
                            classInfo.name,
                            res.data.payerInfo
                        )
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <>
            {classInfo && (
                <div className="makepayment-body">
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <section className="payment__class">
                            <h3 className="payment__title">수업 정보</h3>
                            <div className="payment__classtable d-md-flex">
                                <div>
                                    <h4>수업정보</h4>
                                    <div className="payment__classinfor">
                                        <p className="payment__classname">
                                            {className}
                                        </p>
                                        <table>
                                            {
                                                <>
                                                    {
                                                        classInfo.type === MATH_CLASS_TYPE && !buyAllLecture() &&
                                                        classInfo.videos.map((video, i) =>
                                                            classInfo.checkList[i] &&
                                                            <tr key={i}>
                                                                <td>{`${i}강`}</td>
                                                                <td style={{ paddingRight: "10px" }}>{video.name}</td>
                                                                <td><Currency amount={video.fee} /></td>
                                                            </tr>
                                                        )

                                                    }

                                                    {(classInfo.type === LIVE_BOOK_CLASS_TYPE || classInfo.type === MATH_CLASS_TYPE)
                                                        && (
                                                            <tr>
                                                                <td>대상학생 :</td>
                                                                <td>
                                                                    {
                                                                        classInfo.type === LIVE_BOOK_CLASS_TYPE
                                                                            ?
                                                                            schoolgrade[
                                                                            classInfo
                                                                                .targetStudentGrade
                                                                            ]
                                                                            :
                                                                            classInfo.grade
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )}

                                                    <tr>
                                                        <td>수업 준비 :</td>
                                                        <td>
                                                            {
                                                                classInfo.materials
                                                            }
                                                        </td>
                                                    </tr>
                                                    {
                                                        classInfo.type !== MATH_CLASS_TYPE &&
                                                        <tr>
                                                            <td className="align-top">
                                                                수업 일시 :
                                                            </td>
                                                            <td>
                                                                {classInfo.curriculum &&
                                                                    classInfo.curriculum.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => (
                                                                            <>
                                                                                <DateTime
                                                                                    date={
                                                                                        item.start
                                                                                    }
                                                                                    format="YYYY.MM.DD ddd h:mm a"
                                                                                />
                                                                                ~{' '}
                                                                                <DateTime
                                                                                    date={
                                                                                        item.end
                                                                                    }
                                                                                    format="h:mm a"
                                                                                />
                                                                                <br />
                                                                            </>
                                                                        )
                                                                    )}
                                                            </td>
                                                        </tr>
                                                    }

                                                </>
                                            }
                                        </table>
                                    </div>
                                </div>
                                <div className="d-flex flex-column">
                                    <h4 className="border-right-0">
                                        결제 예정 금액
                                    </h4>
                                    <div className="payment__classamount">
                                        {
                                            tuitionFee > 0 &&
                                            <Currency
                                                amount={tuitionFee}
                                            />
                                        }

                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="payment__payer">
                            <h3 className="payment__title">결제자 정보</h3>
                            <div className="payment__box-form">
                                <div className="payment__box-inner">
                                    <Form.Group
                                        className="d-lg-flex"
                                        controlId="validationCustom01"
                                    >
                                        <Form.Label>이름</Form.Label>
                                        <div>
                                            <Form.Control
                                                className="ipw-386"
                                                type="text"
                                                name="name"
                                                value={payerInfo.name}
                                                required
                                                onChange={(e) => {
                                                    handleChangePayerInfo(e)
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                이름을 입력해주세요.
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    <Form.Group
                                        className="d-lg-flex"
                                        controlId="validationCustom01"
                                    >
                                        <Form.Label>휴대폰 번호</Form.Label>
                                        <div>
                                            <Form.Control
                                                className="ipw-386"
                                                type="text"
                                                name="phone"
                                                value={payerInfo.phone}
                                                required
                                                onChange={(e) => {
                                                    handleChangePayerInfo(e)
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                휴대폰 번호를 입력해주세요.
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    <Form.Group
                                        className="d-lg-flex mb-0"
                                        controlId="validationCustom01"
                                    >
                                        <Form.Label>이메일</Form.Label>
                                        <div>
                                            <Form.Control
                                                className="ipw-386"
                                                type="mail"
                                                name="email"
                                                value={payerInfo.email}
                                                required
                                                onChange={(e) => {
                                                    handleChangePayerInfo(e)
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                이메일을 입력해주세요.
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <h3 className="payment__title">자녀 정보</h3>
                            <div className="payment__box-form">
                                <div className="payment__box-inner">
                                    <Form.Group
                                        className="d-lg-flex mb-0"
                                        controlId="validationCustom01"
                                    >
                                        <Form.Label>자녀선택</Form.Label>
                                        {children.length > 0 && (
                                            <CustomDropdown
                                                items={children}
                                                className={
                                                    'form-control-dropdown'
                                                }
                                                name={'childId'}
                                                classNameToggle={'ipw-386'}
                                                onChange={handleChangeDropdown}
                                            ></CustomDropdown>
                                        )}
                                    </Form.Group>
                                </div>
                            </div>
                            <h3 className="payment__title">할인 정보</h3>
                            <div className="payment__box-form">
                                <div className="payment__box-inner">
                                    <Form.Group
                                        className="d-lg-flex mb-0"
                                        controlId="validationCustom01"
                                    >
                                        <Form.Label>할인 쿠폰</Form.Label>
                                        {coupons.length > 0 && (
                                            <CustomDropdown
                                                items={coupons}
                                                className={
                                                    'form-control-dropdown'
                                                }
                                                classNameToggle={'ipw-386'}
                                                name="couponId"
                                                onChange={(e, k) => {
                                                    handleChangeDropdown(e, k)
                                                    setDisCount(
                                                        coupons.filter(
                                                            (c) => c.value == k
                                                        )[0].amount
                                                    )
                                                }}
                                            ></CustomDropdown>
                                        )}
                                    </Form.Group>
                                </div>
                            </div>
                        </section>
                        <section className="payment__method">
                            <h3 className="payment__title line">결제 수단</h3>
                            <div className="d-flex payment__method-options">
                                <Form.Check
                                    className="form-radio-custom"
                                    label="신용 카드"
                                    type="radio"
                                    id={`condition-1`}
                                    name="paymentMethod"
                                    defaultChecked
                                />
                                <Form.Check
                                    className="form-radio-custom"
                                    label="계좌 이체"
                                    type="radio"
                                    id={`condition-2`}
                                    name="paymentMethod"
                                />
                            </div>
                            <div className="payment__note">
                                <ul>
                                    <li>
                                        - 선택하신 결제 수단 및 정보를
                                        확인해주세요.
                                    </li>
                                    <li>
                                        - 신용 카드 결제는 국내 모든 신용/체크
                                        카드 결제가 가능합니다.
                                    </li>
                                    <li>
                                        - 계좌이체 결제는 은행계좌만 있으면
                                        이용이 가능합니다.
                                    </li>
                                </ul>
                            </div>
                            <div className="payment__point">
                                <Form.Group className="d-lg-flex">
                                    <Form.Label className="col-md-3 col-5">
                                        현금 포인트
                                    </Form.Label>
                                    <div>
                                        <Form.Control
                                            name="cashPoint"
                                            className="ipw-386 mr-2"
                                            type="number"
                                            placeholder="김영희"
                                            required
                                            value={cashPoints}
                                            min={0}
                                            max={maxCashpoints}
                                            onChange={(e) => {
                                                setCashPoints(e.target.value)
                                                handleChangeInput(e)
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            보유하신 포인트를 초과하였습니다.
                                        </Form.Control.Feedback>
                                    </div>
                                    <Form.Text id="cashPointErrorMessage" muted>
                                        사용 가능 현금 포인트{' '}
                                        <b>{maxCashpoints}</b>
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="d-lg-flex">
                                    <Form.Label className="col-md-3 col-5">
                                        이벤트 포인트
                                    </Form.Label>
                                    <div>
                                        <Form.Control
                                            name="eventPoint"
                                            className="ipw-386 mr-2"
                                            type="number"
                                            placeholder="김영희"
                                            required
                                            value={eventPoints}
                                            min={0}
                                            max={maxEventPoints}
                                            onChange={(e) => {
                                                setEventPoints(e.target.value)
                                                handleChangeInput(e)
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            보유하신 포인트를 초과하였습니다.
                                        </Form.Control.Feedback>
                                    </div>
                                    <Form.Text
                                        id="eventPointErrorMessage"
                                        muted
                                    >
                                        사용 가능 이벤트 포인트{' '}
                                        <b>{maxEventPoints}</b>
                                    </Form.Text>
                                </Form.Group>
                            </div>
                        </section>
                        <section className="payment__amount">
                            <h3 className="payment__title line">결제 금액</h3>
                            <div className="payment__amount-list py-3">
                                <table className="table">
                                    <tr>
                                        <th>결제 예정 금액</th>
                                        <td>
                                            <Currency
                                                amount={tuitionFee}
                                            />{' '}
                                            <br />
                                            {classInfo.type !== MATH_CLASS_TYPE &&
                                                <span>
                                                    (
                                                    {classInfo.curriculum &&
                                                        classInfo.curriculum.map(
                                                            (item, index) => {
                                                                return (
                                                                    <>
                                                                        {' '}{(index > 0 ? ', ' : '')
                                                                            + (index + 1) + '주차'}
                                                                        {' '}
                                                                    </>
                                                                )
                                                            })
                                                    }
                                                    )
                                                </span>
                                            }

                                        </td>
                                    </tr>
                                    <tr>
                                        <th>할인 쿠폰</th>
                                        <td>
                                            <Currency amount={-discount} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>현금 포인트</th>
                                        <td>
                                            {' '}
                                            <Currency amount={-cashPoints} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>이벤트 포인트</th>
                                        <td>
                                            {' '}
                                            <Currency
                                                amount={-eventPoints}
                                            />{' '}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="payment__amount-total">
                                최종 결제 금액 &nbsp;{' '}
                                <Currency
                                    amount={
                                        tuitionFee -
                                        discount -
                                        cashPoints -
                                        eventPoints
                                    }
                                />
                            </div>
                        </section>
                        <section className="payment__required">
                            <div className="form-check-required square mt-lg-4">
                                <Form.Check
                                    className="form-check-custom b500 outline"
                                    label="[필수] 위 수업의 결제 조건을 확인하였으며, 결제 진행에 동의합니다."
                                    type="checkbox"
                                    id={`condition-3`}
                                    checked={checkedPaymentTerm}
                                    onChange={(e) =>
                                        setCheckedPaymentTerm(e.target.checked)
                                    }
                                />
                            </div>
                            <div className="form-check-required square mt-1 mt-lg-4">
                                <Form.Check
                                    className="form-check-custom b500 outline"
                                    label="[필수] 환불정책에 대한 내용을 인지하였으며, 환불정책에 동의합니다."
                                    type="checkbox"
                                    id={`condition-4`}
                                    checked={checkedRefundTerm}
                                    onChange={(e) =>
                                        setCheckedRefundTerm(e.target.checked)
                                    }
                                />

                                <Button
                                    variant="b500"
                                    onClick={() => setShowPolicy(!showPolicy)}
                                >
                                    내용보기
                                </Button>
                            </div>
                            <span hidden={agreedAll} className="text-danger">
                                필수 약관에 동의해주세요.
                            </span>
                        </section>
                        <div className="text-center mt-5">
                            <Button
                                variant="b500"
                                //as={Link}
                                className="btw-386"
                                //to="/payment-complete"
                                type="submit"
                            >
                                결제하기
                            </Button>
                        </div>
                    </Form>
                </div>
            )}

            <Modal
                show={showPolicy}
                onHide={() => setShowPolicy(false)}
                dialogClassName="modalw-996"
                centered
            >
                <Modal.Header className="justify-content-center">
                    <Modal.Title>환불 정책</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner">
                        <p>
                            전체 동의는 필수 및 선택 정보에 대한 동의도 포함되어
                            있으며, 개별적으로도 동의를 선택하실 수 있습니다.
                            선택 항목은 동의를 거부하는 경우에도 회원가입 및
                            서비스 이용은 가능합니다.
                        </p>
                        <p>
                            전체 동의는 필수 및 선택 정보에 대한 동의도 포함되어
                            있으며, 개별적으로도 동의를 선택하실 수 있습니다.
                            선택 항목은 동의를 거부하는 경우에도 회원가입 및
                            서비스 이용은 가능합니다.
                        </p>
                        <p>
                            전체 동의는 필수 및 선택 정보에 대한 동의도 포함되어
                            있으며, 개별적으로도 동의를 선택하실 수 있습니다.
                            선택 항목은 동의를 거부하는 경우에도 회원가입 및
                            서비스 이용은 가능합니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button
                        variant="b500"
                        onClick={() => setShowPolicy(false)}
                        className="btw-224 btn-square"
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PaymentForm
