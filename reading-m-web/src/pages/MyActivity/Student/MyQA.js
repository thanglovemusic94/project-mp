import React, { useState, useEffect } from 'react'
import LCPagination from 'components/LCPagination'
import SearchNotFound from 'components/SearchNotFound'
import { Button, Collapse, Modal } from 'react-bootstrap'
import { ClassQAService } from 'services/ClassQAService'
import { convertClassType } from 'constants/class.constants'
import { DateUtils } from 'utils/DateUtils'
import { QAStatus } from 'constants/qa.constants'
import { ClassType } from 'constants/class.constants'

export default function MyQA() {

    const [deleteId, setDeleteId] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 0,
    })

    const [pageable, setPageable] = useState({
        page: 0,
        size: 10,
        sort: 'createdOn,desc',
    })

    const handleShowConfirm = (id) => {
        setShowConfirm(true)
        setDeleteId(id)
    }

    const deleteQuestion = () => {
        setShowConfirm(false);
        ClassQAService.deleteClassQA(deleteId).then((resp) => {
            if (resp.status === 204) {
                setShowNotification(true)
                removeQAId(deleteId)
            }
        })
    }

    const removeQAId = (id) => {
        let inquirys = data.content;

        for (var i = 0; i < inquirys.length; i++) {
            var obj = inquirys[i];

            if (id === obj.id) {
                inquirys.splice(i, 1);
            }
        }

        setData({ ...data, content: inquirys })
    }

    useEffect(() => {
        ClassQAService.getClassQAByStudent(pageable).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        })
    }, [pageable])

    const onPageChange = (page) => {
        if (page >= 0) setPageable({ ...pageable, page })
    }

    return (
        <>
            {data.content.length > 0 ?
                <section className="myactivity-section">
                    <div className="tablelist g700">
                        <div className="tablelist-header d-flex">
                            <div className="tcol-md-55 tcol-100 font-weight-bold">
                                수업 정보
                            </div>
                            <div className="tcol-15 d-none d-lg-block font-weight-bold">
                                지도교사
                            </div>
                            <div className="tcol-15 d-none d-lg-block font-weight-bold">
                                답변 상태
                            </div>
                            <div className="tcol-15 d-none d-lg-block font-weight-bold">
                                작성일
                            </div>
                        </div>
                        <div className="tablelist-body">
                            {data.content.map((value, index) => (
                                <QAItem
                                    key={index}
                                    index={index}
                                    value={value}
                                    handleShowConfirm={(id) => handleShowConfirm(id)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="pagination-wrapper d-flex justify-content-center my-5">
                        <LCPagination
                            pageNumber={pageable.page}
                            totalPage={data.totalPages}
                            onPageChange={page => onPageChange(page)}
                        />
                    </div>
                </section>
                :
                <SearchNotFound content="수업 Q&A가 없습니다." />
            }

            {/* Modal Yes/No confirm */}
            <Modal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner">
                        <p className="mb-0">삭제 하시겠습니까?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={() => setShowConfirm(false)}>
                        취소
                    </Button>
                    <Button variant="g700" onClick={deleteQuestion}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Notification */}
            <Modal
                show={showNotification}
                onHide={() => setShowNotification(false)}
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
                    <Button variant="g700" onClick={() => setShowNotification(false)}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function QAItem({ index, value, handleShowConfirm }) {
    const [open, setOpen] = useState(false)
    const status = value.answer ? QAStatus.COMPLETE : QAStatus.WAITING
    const classType = value.classInfo.type;

    return (
        <div id={`qa-information-${index}`} className="tablelist-row-group">
            <div
                className="tablelist-row pointer"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <div className="tcol-md-55 tcol-100 text-left label text-500">
                    [{convertClassType(classType)}] {classType === ClassType.TextBookClass.value ? value.classInfo.name : ""}
                </div>
                <div className="tcol-md-15 tcol-35 text-g500">
                    {value.classInfo.tutor.name}
                </div>
                <div className="tcol-md-15 tcol-35 text-g500">
                    {status}
                </div>
                <div className="tcol-md-15 tcol-35 title-opendate text-g500">
                    {DateUtils.toLocalDate(value.createdOn)}
                </div>
                <span className="toggle-action">
                    <i className="lcicon-dropClose"></i>
                </span>
            </div>
            <div id={`qa-content-${index}`} className="tablelist-row-group">
                <Collapse in={open}>
                    <div>
                        <div id={`question-${index}`}>
                            <div className="tablelist-row g100">
                                <div className="tcol-md-75 text-left mr-3">
                                    {value.content}
                                </div>
                                <div className="tcol-md-20 text-right d-none d-lg-block">
                                    <Button
                                        hidden={status === QAStatus.COMPLETE}
                                        variant="white"
                                        onClick={() => handleShowConfirm(value.id)}
                                        className="btn-square btw-120 btn-sm"
                                    >
                                        삭제
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div id={`answer-${index}`} hidden={status === QAStatus.WAITING}>
                            <div className="tablelist-row g100">
                                <div className="tcol-md-70 text-left mr-3">
                                    <span className="answer-closed-label">답변</span>
                                    {value.answer}
                                </div>
                                <div className="tcol-md-20 text-right d-none d-lg-block">
                                    {DateUtils.toLocalDate(value.createdOn)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}
