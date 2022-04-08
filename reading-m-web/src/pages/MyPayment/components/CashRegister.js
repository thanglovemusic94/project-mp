import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {useLocation} from 'react-router'
import NumberFormat from "react-number-format";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import {ParentService} from "../../../services/ParentService";

const schema = yup.object().shape({
    point: yup.number().typeError('현금 신청할 포인트를 입력해주세요.').required(),
    bank: yup.string().required('은행을 입력해주세요.'),
    accountNumber: yup.number().typeError('계좌번호를 입력해주세요.').required(),
    accountName: yup.string().required('예금주를 입력해주세요.'),
})

export default function CashRegister() {
    let {state} = useLocation();
    const [show1, setShow1] = useState(false)
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
        onTouched,
        setError,
    } = useForm(
        { resolver: yupResolver(schema) })

    function onSubmit(data) {

        ParentService.createCashRequirement(data).then((res) => {
            setShow1(!show1)
            history.push({pathname:'/my-payment', state: {keytab: 'mycashlist'}})

        }).catch(e => console.log(e))
    }

    return (
        <>
            <div className="cashregister-body">
                <h2 className="page-title mb-4">현금 신청</h2>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h4 className="mb-3">포인트 정보</h4>
                    <div className="box-gray py-5">
                        <div className="box-w612">
                            <div className="d-lg-flex justify-content-center align-items-center text-center mb-3">
                                <label className="label-point px-3">
                                    <i className="lcicon-cashpoint mr-1"></i>
                                    보유 현금 포인트
                                </label>
                                <p className="point-amount px-3">
                                    <NumberFormat value={state.amount}
                                                  thousandSeparator={true}
                                                  displayType={'text'}/> 포인트
                                </p>
                            </div>
                            <Form.Group className="d-md-flex">
                                <Form.Label>
                                    현금 신청{' '}
                                    <br className="d-none d-lg-block" /> 포인트
                                </Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        type="text"
                                        placeholder="이름 입력"
                                        isInvalid={errors.point}
                                        {...register('point')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.point?.message}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-md-flex">
                                <Form.Label>은행</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        type="text"
                                        placeholder="이름 입력"
                                        isInvalid={errors.bank}
                                        {...register('bank')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.bank?.message}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-md-flex">
                                <Form.Label>계좌번호</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        type="text"
                                        placeholder="이름 입력"
                                        isInvalid={errors.accountNumber}
                                        {...register('accountNumber')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.accountNumber?.message}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-md-flex">
                                <Form.Label>예금주</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        type="text"
                                        placeholder="이름 입력"
                                        isInvalid={errors.accountName}
                                        {...register('accountName')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.accountName?.message}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-g500 my-3">
                            * 현금 신청 시 입력한 포인트 및 정보는 수정이 불가능
                            합니다.
                        </p>
                        <Button
                            variant="b500"
                            className="btw-386 mt-4 mb-5"
                            // onClick={handleShow1}
                            type={'submit'}
                        >
                            현금 신청하기
                        </Button>
                    </div>
                </Form>
            </div>
            <Modal
                show={show1}
                onHide={()=>setShow1(!show1)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">현금 신청이 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" as={Link} to="/move-top-8.7.5">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
