import ConversationBoard from 'components/ConversationBoard'
import RadioFilter from 'components/RadioFilter'
import { SUBJECT_SELECTIONS } from 'constants/class.constants'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ClassGoalService } from 'services/ClassGoalService'
import ApplicationWrite from './ApplicationWrite'
import { UserRole, getRole } from 'constants/role.constants'

const ClassAppList = () => {
    const [paging, setPaging] = useState({
        pageNumber: 0,
        pageSize: 10,
        sort: 'createdOn,desc'
    })

    const [data, setData] = useState({
        "content": [],
        "totalPages": 0
    })

    const [category, setCategory] = useState("");

    const role = getRole()

    const subjectSelections = SUBJECT_SELECTIONS.map((item, index) => { return item.name })

    const [openApplicationForm, setOpenApplicationForm] = useState(false)
    const handleShowApplicationForm = () => setOpenApplicationForm(true)
    const handleCloseApplicationForm = () => setOpenApplicationForm(false)

    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

    const [show2, setShow2] = useState(false)
    const handleShow2 = () => setShow2(true)
    const handleClose2 = () => setShow2(false)

    const [show3, setShow3] = useState(false)
    const handleShow3 = () => setShow3(true)
    const handleClose3 = () => setShow3(false)

    const [show4, setShow4] = useState(false)
    const handleShow4 = () => setShow4(true)
    const handleClose4 = () => setShow4(false)

    const [toDeleteId, setToDeleteId] = useState(-1)

    useEffect(() => {

        getClassData(category)
    }, [paging, category])

    function handleChangePage(pageNumber) {

        setPaging({ ...paging, pageNumber })
    }

    function handleRadioChange(val) {
        let category = SUBJECT_SELECTIONS[val].value

        setCategory(category)
    }

    function getClassData(category) {

        ClassGoalService.getApplications({ category, paging }).then((resp) => {

            if (resp.status === 200) {

                setData({ ...resp.data })
            }
        })
    }

    function handleDeleteConfirm(val) {

        setToDeleteId(val)
        handleShow2()
    }

    function handleDelete() {

        ClassGoalService.deleteApplication(toDeleteId).then((resp) => {

            if (resp.status === 204) {

                getClassData("")
                setToDeleteId(-1)
                handleClose2()
                handleShow1()
            }
        })
    }

    function handleReply(val) {
        let body = {
            "id": val.id,
            "answer": val.message
        }

        ClassGoalService.replyApplication(body).then((resp) => {

            if (resp.status === 204) {

                getClassData("")
                handleShow3()
            }
        })
    }

    function handleApplicationFormFinish(data) {
        handleCloseApplicationForm()

        ClassGoalService.createApplication(data).then((resp) => {

            if (resp.status === 201) {

                handleShow4()
                getClassData("")
            }
        })
    }

    return (
        openApplicationForm === false ?
            <>
                <div className="filter-bottom d-lg-flex justify-content-between align-content-center mb-3">
                    <div className="filter-grade mb-2 mb-lg-0">
                        <RadioFilter
                            source={subjectSelections}
                            onRadioChange={handleRadioChange}
                        />
                    </div>

                    <Button
                        variant="b500"
                        className="btw-290 mr-1"
                        onClick={handleShowApplicationForm}
                        hidden={!(role === UserRole.STUDENT || role === UserRole.PARENT)}
                    >
                        수업 신청하기
                    </Button>
                </div>

                <ConversationBoard
                    source={data}
                    paging={{ ...paging, "totalPage": data.totalPages }}
                    onPageChange={handleChangePage}
                    onDelete={handleDeleteConfirm}
                    onReply={handleReply}
                />

                {/* Modal Yes/No confirm */}
                <Modal
                    show={show2}
                    onHide={handleClose2}
                    dialogClassName="modalw-386 modal-comfirm"
                    centered
                >
                    <Modal.Body scrollable={true}>
                        <div className="modal-body-inner">
                            <p className="mb-0">삭제 하시겠습니까?</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="modal-btn-half">
                        <Button variant="g200" onClick={handleClose2}>
                            취소
                        </Button>
                        <Button variant="g700" onClick={handleDelete}>
                            확인
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal OK confirm */}
                <Modal
                    show={show1}
                    onHide={handleClose1}
                    dialogClassName="modalw-386 modal-comfirm"
                    centered
                >
                    <Modal.Body scrollable={true}>
                        <div className="modal-body-inner flex-column">
                            <i className="lcicon-modalComplete mb-2"></i>
                            <p className="mb-0">삭제가 완료되었습니다.</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="modal-btn-half">
                        <Button variant="g700" onClick={handleClose1}>
                            확인
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal SAVE to send message */}
                <Modal
                    show={show3}
                    onHide={handleClose3}
                    dialogClassName="modalw-386 modal-comfirm"
                    centered
                >
                    <Modal.Body scrollable={true}>
                        <div className="modal-body-inner flex-column">
                            <i className="lcicon-modalComplete mb-2"></i>
                            <p className="mb-0">저장되었습니다.</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="modal-btn-half">
                        <Button variant="g700" onClick={handleClose3}>
                            확인
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal OK register liveclass goal confirm */}
                <Modal
                    show={show4}
                    onHide={handleClose4}
                    dialogClassName="modalw-386 modal-comfirm"
                    centered
                >
                    <Modal.Body scrollable={true}>
                        <div className="modal-body-inner flex-column">
                            <i className="lcicon-modalComplete mb-2"></i>
                            <p className="mb-0">
                                LiveClass 목적 신청이 완료되었습니다.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="modal-btn-half">
                        <Button variant="g700" onClick={handleClose4}>
                            확인
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            :
            <>
                <ApplicationWrite onFinish={handleApplicationFormFinish} />
            </>
    )
}

export default ClassAppList
