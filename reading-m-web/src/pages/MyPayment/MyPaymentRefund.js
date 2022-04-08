import PaymentAmountInfor from 'components/Payment/PaymentAmountInfor'
import PaymentClassInfor from 'components/Payment/PaymentClassInfor'
import PaymentRefundReason from 'components/Payment/PaymentRefundReason'
import React, {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {ParentService} from "../../services/ParentService";


export default function MyPaymentRefund() {
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    let {state} = useLocation()
    const [error, setError] = useState({})
    const [data, setData] = useState({
        "amount": state.item.paymentInfo.amount,
        "cashPoint": state.item.paymentInfo.cashPoint,
        "eventPoint": state.item.paymentInfo.eventPoint,
        "paymentId": state.id,
        "method": state.item.paymentInfo.method,
        "reason": null,
        "policy": false
    })



    const handleInputChange = (e) => {
        const inputType = e.target.type
        const {name, value, id} = e.target
        console.log(name, e.target.checked)
        if (inputType === 'checkbox') {
            setError({...error, [name]: validate(name, e.target.checked)})
            setData({...data, [name]: e.target.checked})
        }
        if (inputType === 'text') {
            setError({...error, [name]: validate(name, value)})
            setData({...data, [name]: value})
        }
    }

    const validate = (name, value) => {
        switch (name) {
            case 'reason':
                if (!value || value.trim() === '') {
                    return true
                }
                return false
            case 'policy':
                if (value === true) {
                    return false
                }
                return true
            default: {
                return false
            }
        }
    }

    function onSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        let validationErrors = {}
        Object.keys(data).forEach((name) => {
            const error = validate(name, data[name])
            if (error) {
                validationErrors[name] = error
            }
        })
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors)
        } else {
            delete data.policy
            ParentService.requestRefund(data).then((resp) => {
                setShow1(!show1)
            }).catch(e => console.log(e))
        }
    }
    return (
        <>
            <div className="mypaymentrefund-body">
                <h2 className="page-title mb-4">환불 신청</h2>
                <PaymentClassInfor classInfo={state.item.classInfo}/>
                <PaymentAmountInfor paymentInfo={state.item.paymentInfo}
                                    classType={state.item.classInfo.type}
                                    curriculum={state.item.classInfo.curriculum}/>
                <form onSubmit={onSubmit}>
                    <PaymentRefundReason paymentInfo={state.item.paymentInfo} handleInputChange={handleInputChange} error={error}/>
                    <div className="form-check-required square mt-4">
                        <Form.Check
                            className="form-check-custom b500 outline"
                            label="[필수] 환불정책에 대한 내용을 인지하였으며, 환불정책에 동의합니다."
                            type="checkbox"
                            id={`policy`}
                            onChange={handleInputChange}
                            name='policy'

                        />

                        <Button variant="b500" onClick={() => setShow(!show)}>
                            내용보기
                        </Button>
                    </div>
                    {error.policy && <p className={'text-danger'}>환불정책에 동의해주세요.</p>}

                    <div className="text-center mt-5">
                        <Button
                            variant="b500"
                            className="btw-386"
                            type={'submit'}
                            // onClick={() => setShow1(!show1)}
                        >
                            환불 신청하기
                        </Button>
                    </div>
                </form>
            </div>

            {/* Modal confirm */}

            <Modal
                show={show1}
                onHide={() => setShow1(!show1)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">환불 신청이 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" as={Link} to={{pathname:"/my-payment", state: {keytab: 'myrefundlist'}}}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Refund Policy */}

            <Modal
                show={show}
                onHide={() => setShow(!show)}
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
                        onClick={() => setShow(!show)}
                        className="btw-224 btn-square"
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
