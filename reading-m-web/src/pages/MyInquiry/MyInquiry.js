import LCPagination from 'components/LCPagination'
import SearchNotFound from 'components/SearchNotFound'
import React, { useState, useEffect } from 'react'
import { Button, Collapse, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { checkClassTagRole, getRole } from '../../constants/role.constants'
import { colorByRole } from '../../constants/colorByRole'
import { InquiryService } from 'services/InquiryService'
import { convertInquiryType } from 'constants/inquiry.type.containts'
import { InquiryStatus, convertInquiryStatus } from 'constants/inquiry.status.containts'
import { DateUtils } from 'utils/DateUtils'

export default function MyInquiry() {

    const roleName = getRole().value

    const [deleteId, setDeleteId] = useState(0)
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
        InquiryService.deleteById(deleteId).then((resp) => {
            if (resp.status === 200) {
                setShowNotification(true)
                removeQAId(deleteId)
            }
        })
    }

    const removeQAId = (id) => {
        let qalist = data.content;

        for (var i = 0; i < qalist.length; i++) {
            var obj = qalist[i];

            if (id === obj.id) {
                qalist.splice(i, 1);
            }
        }

        setData({ ...data, content: qalist })
    }

    useEffect(() => {
        InquiryService.findByQuestioner(pageable).then((resp) => {
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
                <div className="myinquiry-body">
                    <h2 className="page-title mb-4">1:1 문의</h2>
                    <div className="text-right">
                        <Button
                            variant={checkClassTagRole(roleName, ...colorByRole)}
                            as={Link}
                            className="btw-184 mb-3"
                            to="/write-inquiry"
                            size="sm"
                        >
                            1:1 문의하기
                        </Button>
                    </div>
                    <div className="tablelist g700">
                        <div className="tablelist-header d-flex">
                            <div className="tcol-100 d-block d-lg-none">
                                1:1 문의 정보
                            </div>
                            <div className="tcol-60 d-none d-lg-block">
                                1:1 문의
                            </div>
                            <div className="tcol-15 d-none d-lg-block">
                                답변 상태
                            </div>
                            <div className="tcol-20 d-none d-lg-block">작성일</div>
                        </div>
                        <div className="tablelist-body">
                            {data.content.map((value, index) => (
                                <InquiryItem
                                    key={index}
                                    value={value}
                                    roleName={roleName}
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
                </div>
                :
                <SearchNotFound content="1:1 문의가 없습니다." />
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

function InquiryItem({ value, roleName, handleShowConfirm }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="tablelist-row-group">
            <div
                className="tablelist-row pointer"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <div className="tcol-md-60 tcol-90 text-left">
                    [{convertInquiryType(value.type)}] {value.title}
                </div>
                <div
                    className={"tcol-md-15 tcol-25" + 
                        (value.status ===  InquiryStatus.ANSWERED.value ?
                            ` text-${checkClassTagRole(
                                roleName,
                                ...colorByRole
                            )}`
                            :
                            ""
                        )}
                >
                    {convertInquiryStatus(value.status)}
                </div>
                <div className="tcol-20 text-g500">
                    {DateUtils.toLocalDate(value.createdOn)}
                </div>
                <span className="toggle-action">
                    <i className="lcicon-dropClose" />
                </span>
            </div>
            <div className="tablelist-row-group tablelist-row-collapse">
                <Collapse in={open}>
                    <div >
                        <div className="tablelist-row g100">
                            <div className="tcol-70 text-left">
                                {value.question}
                            </div>
                            <div className="tcol-30"
                                hidden={value.status === InquiryStatus.ANSWERED.value}>
                                <Button
                                    variant="white"
                                    onClick={() => handleShowConfirm(value.id)}
                                    className="btn-square btn-reply"
                                    size="sm"
                                >
                                    삭제
                                </Button>
                            </div>
                        </div>
                        <div className="tablelist-row g100"
                            hidden={value.status === InquiryStatus.UNANSWERED.value}>
                            <div className="tcol-70 text-left">
                                <span className="answer-closed-label mb-2 ">
                                                    답변
                                </span>
                                {value.answer}
                            </div>
                            <div className="tcol-30 align-items-end possition-date">
                                {DateUtils.toLocalDate(value.updatedOn)}
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}
