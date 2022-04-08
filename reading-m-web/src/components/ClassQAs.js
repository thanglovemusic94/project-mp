import React, { useEffect, useState } from 'react'
import { Button, Collapse, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserStorage } from '../storages/UserStorage'
import { ClassQAService } from '../services/ClassQAService'
import LCPagination from './LCPagination'
import DateTime from './common/DateTime'

const ClassQAs = ({ dataSource, tutorName }) => {
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
    })

    const [userId] = useState(UserStorage.getLocalUserId())
    const [role] = useState(UserStorage.getLocalUserRole())

    const [collapseMarks, setCollapseMarks] = useState([])

    const [show2, setShow2] = useState(false)
    const handleShow2 = () => setShow2(true)
    const handleClose2 = () => setShow2(false)

    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

    const [pageable, setPageable] = useState({
        pageNumber: 0,
        pageSize: 10,
        sort: 'createdOn,DESC',
    })

    const [toDeleteId, setToDeleteId] = useState(-1)

    useEffect(() => {
        refershData()
    }, [pageable])

    const refershData = () => {
        let body = {
            ...pageable,
            id: dataSource.liveClassId,
        }

        ClassQAService.getClassQAs(body).then((resp) => {
            if (resp.status === 200) {
                setData({ ...resp.data })

                createCollapseMakers()
            }
        })
    }

    function createCollapseMakers() {
        let markers = []

        for (let i = 0; i < data.content.length; i++) {
            markers.push(false)
        }

        setCollapseMarks([...markers])
    }

    function handlePageChange(pageNumber) {
        setPageable({ ...pageable, pageNumber })
    }

    function handleCollapseMarkToggled(index) {
        let markers = [...collapseMarks]

        markers[index] = !markers[index]

        setCollapseMarks([...markers])
    }

    function handleConfirmDeleteClassQA(id) {
        setToDeleteId(id)

        handleShow2()
    }

    function handleDeleteClassQA() {
        ClassQAService.deleteClassQA(toDeleteId).then((resp) => {
            if (resp.status === 204) {
                if (toDeleteId !== -1) setToDeleteId(-1)

                handleClose2()
                handleShow1()
                refershData()
            }
        })
    }

    return (
        <>
            <section className="td-qa-list">
                <div className="tablelist">
                    <div className="td-qa-header tablelist-header">
                        <span className="tcol-md-60 tcol-40 qacol-title">
                            제목
                        </span>
                        <span className="tcol-md-10 qacol-status d-none d-lg-block">
                            답변 여부
                        </span>
                        <span className="tcol-md-10 tcol-20 qacol-author">
                            작성자
                        </span>
                        <span className="tcol-15 qacol-date">작성일</span>
                    </div>
                    <div className="td-qa-body tablelist-body">
                        {data.content.map((item, index) => {

                            return (
                                <div
                                    className="qa-question-wrapper"
                                    key={index}
                                >
                                    <div
                                        className="qa-question clearfix"
                                        onClick={() =>
                                            handleCollapseMarkToggled(index)
                                        }
                                        aria-controls={'answer' + index}
                                        aria-expanded={collapseMarks[index]}
                                    >
                                        <span className="tcol-md-60 tcol-100 qacol-title text-left text-500">
                                            {item.isSecret ? (
                                                <i className="lcicon-secret"></i>
                                            ) : (
                                                <></>
                                            )}
                                            {item.title}
                                        </span>
                                        {item.answer === null ? (
                                            <span className="tcol-md-10 tcol-35 qacol-status">
                                                답변대기
                                            </span>
                                        ) : (
                                            <span className="tcol-md-10 tcol-40 qacol-status complete">
                                                답변 완료
                                            </span>
                                        )}
                                        <span className="tcol-md-10 tcol-20 qacol-author">
                                            {item.questioner.name}
                                        </span>
                                        <span className="tcol-md-15 tcol-100 qacol-date text-g500">
                                            <DateTime format="YYYY.MM.DD" date={item.createdOn} />
                                        </span>
                                        <span className="toggle-action">
                                            <i className="lcicon-dropClose"></i>
                                        </span>
                                    </div>
                                    <div className="qa-answers">
                                        <Collapse in={collapseMarks[index]}>
                                            <div id={'answer' + index}>
                                                <div className="answer-row">
                                                    <div className="d-flex mb-2 align-items-center">
                                                        <span className="tcol-md-75 tcol-60 answer-content text-left">
                                                            <p className="mb-1">
                                                                {item.content}
                                                            </p>
                                                        </span>
                                                        <span className="tcol-md-25 tcol-40 answer-action">
                                                            {(userId == item.questioner.id && item.answer === null) ?
                                                                <Button
                                                                    variant="white"
                                                                    onClick={() =>
                                                                        handleConfirmDeleteClassQA(
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    삭제
                                                                </Button>
                                                                :
                                                                <></>
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="answer-row mb-2"
                                                    hidden={
                                                        item.answer === null
                                                    }
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div className="tcol-md-75 tcol-60  answer-content text-left">
                                                            <span className="answer-closed-label">답변</span>
                                                            <div className="answer-closed-content">
                                                                {item.answer}
                                                            </div>
                                                        </div>
                                                        <span className="tcol-md-25 tcol-40 answer-date text-g500 text-center">
                                                            <DateTime format="YYYY.MM.DD" date={item.updatedOn} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <div className="pagination-wrapper d-flex justify-content-center my-5">
                <LCPagination
                    pageNumber={data.pageNumber}
                    totalPage={data.totalPages}
                    onPageChange={(num) => handlePageChange(num)}
                />
            </div>
            {role === "STUDENT" ?
                <div className="text-right mt-4">
                    <Button
                        variant="m500"
                        as={Link}
                        className="btw-290"
                        to={{
                            pathname: '/write-qa',
                            search:
                                '?tutorName=' +
                                tutorName +
                                '&classId=' +
                                dataSource.liveClassId,
                            state: {
                                liveClassInfo: dataSource,
                                activeTab: 'classQAs',
                            },
                        }}
                    >
                        Q&A 작성하기
                    </Button>
                </div>
                :
                <></>
            }

            {/* Modal Yes/No confirm */}
            <Modal
                show={show2}
                onHide={handleClose2}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable>
                    <div className="modal-body-inner">
                        <p className="mb-0">삭제 하시겠습니까?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={handleClose2}>
                        취소
                    </Button>
                    <Button variant="g700" onClick={handleDeleteClassQA}>
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
                <Modal.Body scrollable>
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
        </>
    )
}

export default ClassQAs
