import React, {useEffect, useState} from 'react'
import {Button, Dropdown, Form, Modal, Table} from 'react-bootstrap'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomDropdown from "../../components/CustomDropdown";
import * as yup from "yup";
import {InquiryService} from "../../services/InquiryService";
import {useHistory} from "react-router-dom";

const schema = yup.object().shape({
    title: yup.string().required('제목을 입력해주세요.'),
    content: yup.string().required('내용을 입력해주세요.'),
   // type: yup.string().required('문의 유형을 입력해주세요.'),

})

export default function WriteInquiry(props) {
    const {register, handleSubmit, onBlur, watch, formState: {errors}, onTouched, setError, clearErrors, setValue} = useForm({
        resolver: yupResolver(schema)
    })
    const [show1, setShow1] = useState(false)
    const type = register("type")
    const history = useHistory();

    const handleChangeInput = (e, k) => {
        const {name} = e.target;
        console.log(k)
        console.log(name)
        if (name === 'type') {
            if (k === null) {
                setError("type", {message: "문의 유형을 입력해주세요."});
            } else {
                setValue('type', k)
                clearErrors('type')
            }
        }
    }

    const item = [
        {label: "문의 유형", value: null},
        {label: "수업", value: "CLASS"},
        {label: "결제/환불", value: "PAYMENT_REFUND"},
        {label: "정산", value: "SETTLEMENT"},
        {label: "기타", value: "OTHERS"}
    ]

    const onSubmit = (data) => {
        if (!data.type){
            setError("type", {message: "문의 유형을 입력해주세요."})
        }else {
            if (Object.keys(errors).length <= 0){
                InquiryService.createInquiry(data).then(res =>{
                    setShow1(!show1)
                }).catch(e => console.log(e))
            }
        }
    }

    return (
        <>
            <div className="writeinquiry-body">
                <h2 className="page-title mb-4">1:1 문의하기</h2>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Table className="table-form">
                        <tbody>
                        <tr>
                            <th className="th-285 align-middle">
                                문의 유형
                            </th>
                            <td className="pr-0">
                                <label className="d-block d-lg-none">
                                    문의 유형
                                </label>
                                <CustomDropdown items={item} name={'type'}
                                                defaultValue={null}
                                                className={'ipw-488'}
                                                onChange={handleChangeInput}
                                />

                                <Form.Control.Feedback className={errors.type ? "d-block" : "d-none"} type="invalid">
                                    {errors.type?.message}
                                </Form.Control.Feedback>

                            </td>
                        </tr>
                        <tr>
                            <th className="th-285 align-middle">제목</th>
                            <td className="pr-0">
                                <label className="d-block d-lg-none">
                                    제목
                                </label>
                                <div>
                                    <Form.Control
                                        type="text"
                                        placeholder="제목 입력 20자 이내 "
                                        {...register('title')}
                                        isValid={watch('title') && !errors.title}
                                        isInvalid={errors.title}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.title?.message}
                                    </Form.Control.Feedback>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="th-285 align-top">내용</th>
                            <td className="pr-0 pb-0">
                                <label className="d-block d-lg-none">
                                    내용
                                </label>
                                <Form.Control
                                    as="textarea"
                                    rows={10}
                                    placeholder="내용 입력"
                                    {...register('content')}
                                    isValid={watch('content') && !errors.content}
                                    isInvalid={errors.content}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.content?.message}
                                </Form.Control.Feedback>
                            </td>
                        </tr>
                        </tbody>
                    </Table>

                    <div className="text-right">
                        <Button
                            type="submit"
                            variant="g700"
                            className="btw-290"
                        >
                            문의하기
                        </Button>
                    </div>
                </Form>
            </div>
            <Modal
                show={show1}
                onHide={() => setShow1(!show1)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">1:1문의가 등록되었습니다. </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={()=> history.push('/')}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
