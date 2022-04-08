import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import { convertClassType } from 'constants/class.constants'
import { StudentService } from 'services/StudentService'
import { useHistory } from 'react-router-dom'
import { StudentActivityTab } from 'pages/MyActivity/StudentActivity'
import { ReviewTab } from 'pages/MyActivity/Student/MyReview'
import { FaLeaf } from 'react-icons/fa'

export default function WriteReview(props) {
    const history = useHistory()
    //Init class name
    const clazz = props.location?.state?.clazz || ''
    // const clazz = useState(initClass)

    // Modal Ok confirm
    const [showNotification, setShowNotification] = useState(false)

    const [review, setReview] = useState({
        classId: props.location?.state?.id,
        rating: null,
        content: ''
    });

    // Validate form
    const [validated, setValidated] = useState(false)
    const [validRating, setValidRating] = useState(true)
    const [validContent, setValidContent] = useState(true)

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let isValid = true

        if (!review.rating) {
            setValidRating(false)
            isValid = false
        }

        if (!review.content || review.content.trim().length === 0) {
            setValidContent(false)
            isValid = false
        }

        setValidated(isValid)

        if (isValid) {
            saveReview()
        }

    }

    const ratingChanged = (newRating) => {
        if (!validRating) {
            setValidRating(true)
        }

        setReview({ ...review, rating: newRating })
    }

    const contentChanged = (content) => {
        if (content && content.trim().length > 0) {
            setValidContent(true)
        } else {
            setValidContent(false)
        }

        setReview({ ...review, content: content })
    }

    const saveReview = () => {
        StudentService.writeReview(review).then((resp) => {
            if (resp.status === 201) {
                setShowNotification(true)
            }
        })
    }

    const handleCloseNotification = () => {
        setShowNotification(false)
        history.push('/student/my-activity',
            {
                'parentTabActive': StudentActivityTab.MyReview.key,
                'childrenTabActive': ReviewTab.CreatedReview.eventKey
            })
    }

    return (
        <>
            <div className="writereview-body">
                <h2 className="page-title mb-4">후기 작성하기</h2>
                <Form
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <Table className="table-form">
                        <tbody>
                            <tr>
                                <th className="th-285 align-middle">
                                    수업 정보
                                </th>
                                <td>
                                    <label className="d-block d-lg-none">
                                        수업 정보
                                    </label>
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        value={clazz}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-middle">별점</th>
                                <td className="pr-0">
                                    <label className="d-block d-lg-none">
                                        별점
                                    </label>
                                    <div>
                                        <ReactStars
                                            count={5}
                                            emptyIcon={<i className="lcicon-star" />}
                                            filledIcon={<i className="lcicon-star-voted" />}
                                            onChange={(e) => ratingChanged(e)}
                                            value={review.rating} />

                                        <div hidden={validRating} className="text-danger">
                                            별점을 선택해주세요.
                                        </div>
                                        {/* <Form.Control.Feedback type="invalid">
                                            별점을 선택해주세요.
                                        </Form.Control.Feedback> */}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-top">후기</th>
                                <td className="pr-0 pb-0">
                                    <label className="d-block d-lg-none">
                                        후기
                                    </label>
                                    <Form.Control
                                        as="textarea"
                                        rows={10}
                                        placeholder="후기 입력. 30자 이내 "
                                        onChange={(e) => contentChanged(e.currentTarget.value)}
                                        value={review.content}
                                    />
                                    <div hidden={validContent} className="text-danger">
                                        후기를 입력해주세요.
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        후기를 입력해주세요.
                                    </Form.Control.Feedback>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="text-right">
                        <Button
                            type="submit"
                            variant="m500"
                            className="btw-290"
                        >
                            저장하기
                        </Button>
                    </div>
                </Form>
            </div>
            <Modal
                show={showNotification}
                onHide={() => setShowNotification(false)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">후기가 등록되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={handleCloseNotification}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
