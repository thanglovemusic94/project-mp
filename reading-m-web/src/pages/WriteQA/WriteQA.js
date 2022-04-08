import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { ClassQAService } from '../../services/ClassQAService'

const WriteQA = (props) => {
    const history = useHistory()
    const [data, setData] = useState({
        content: '',
        secret: false,
        title: '',
    })

    const [submitDisabled, setSubmitDisabled] = useState(false);
    // Modal Ok confirm
    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleSuccess = () => {
        setShow1(false)
        history.push({ pathname: "/liveclass-details", state: props.history.location.state })
    }
    // Validate form
    const [validTitle, setValidTitle] = useState(true)
    const [validContent, setValidContent] = useState(true)

    const titleOnChange = (e) => {
        let value = e.target.value
        if (value && value.trim().length > 0) {
            setValidTitle(true)
        } else {
            setValidTitle(false)
        }

        setData({
            ...data,
            title: value,
        })
    }

    const contentOnChange = (e) => {
        let value = e.target.value
        if (value && value.trim().length > 0) {
            setValidContent(true)
        } else {
            setValidContent(false)
        }

        setData({
            ...data,
            content: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let isValid = true;

        if (!data.title || data.title.trim().length === 0) {
            setValidTitle(false)
            isValid = false
        } else {
            setValidTitle(true)
        }

        if (!data.content || data.content.trim().length === 0) {
            setValidContent(false)
            isValid = false
        } else {
            setValidContent(true)
        }

        if (isValid) {
            let body = {
                ...data,
                id: new URLSearchParams(props.location.search).get("classId"),
            }

            setSubmitDisabled(true)

            ClassQAService.createClassQA(body).then((resp) => {
                if (resp.status === 201) {
                    handleShow1()
                }
            })
        }
    }

    return (
        <>
            {/* <LocalNavBar /> */}
            <div className="writeqa-body">
                <h2 className="page-title mb-4">Q&A 작성하기</h2>
                <Form onSubmit={handleSubmit}>
                    <Table className="table-form">
                        <tbody>
                            <tr>
                                <th className="th-285 align-middle">
                                    지도하기
                                </th>
                                <td>
                                    <label className="d-block d-lg-none">
                                        지도교사
                                    </label>
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={
                                            `지도교사 ${new URLSearchParams(props.location.search).get("tutorName")}`
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-middle">제목</th>
                                <td className="pr-0">
                                    <label className="d-block d-lg-none">
                                        제목
                                    </label>
                                    <div className="d-lg-flex align-items-center">
                                        <Form.Control
                                            className="ipw-488"
                                            type="text"
                                            placeholder="제목 입력 20자 이내"
                                            maxLength={20}
                                            onChange={titleOnChange}
                                        />
                                        <div className="d-none d-lg-block ml-4">
                                            <Form.Check
                                                label="비밀글"
                                                type="checkbox"
                                                id={`condition-5`}
                                                onClick={(e) =>
                                                    setData({
                                                        ...data,
                                                        secret:
                                                            e.target.checked,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div hidden={validTitle} className="text-danger">
                                        제목을 입력해주세요.
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-top">내용</th>
                                <td className="pr-0 pb-0">
                                    <label className="d-block d-lg-none">
                                        제목
                                    </label>
                                    <Form.Control
                                        as="textarea"
                                        rows={10}
                                        placeholder="내용 입력"
                                        onChange={contentOnChange}
                                    />
                                    <div hidden={validContent} className="text-danger">
                                        내용을 입력해주세요.
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-block d-lg-none my-4">
                        <Form.Check
                            label="비밀글"
                            type="checkbox"
                            id={`condition-5`}
                        />
                    </div>
                    <div className="text-right">
                        <Button
                            type="submit"
                            variant="m500"
                            className="btw-290"
                            disabled={submitDisabled}
                        >
                            문의하기
                        </Button>
                    </div>
                </Form>
            </div>
            <Modal
                show={show1}
                onHide={handleSuccess}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">Q&A가 등록되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={handleSuccess}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default WriteQA
