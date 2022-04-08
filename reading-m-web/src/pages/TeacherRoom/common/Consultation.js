import React, { useEffect, useState } from 'react'
import { Button, Collapse, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TeacherRoomService } from "../../../services/TeacherRoom";
import PaggingUtils from "../../../utils/PagingUtils";
import { DateUtils } from "../../../utils/DateUtils";
import { useSelector } from "react-redux";
import { getRole, UserRole } from "../../../constants/role.constants";
import SearchNotFound from "../../../components/SearchNotFound";

function checkStatus(v) {
    switch (v) {
        case 'WAITING':
            return (
                <>
                    답변 대기
                </>
            )
        case 'ANSWERED':
            return (
                <>
                    답변 완료
                </>
            )
        case 'TextBookClass':
            return (
                <>
                    LiveClass 책글
                </>
            )
        case 'GoalClass':
            return (
                <>
                    LiveClass 목적
                </>
            )
    }
}
function checkRespondentOrQuestioner(data: number, idLogin: number, childrenName: string) {
    if (data.questioner.id === idLogin) {
        return StrByRoleName(data.respondent.name, childrenName)
    }

    if (data.respondent.id === idLogin) {
        return StrByRoleName(data.questioner.name, childrenName)
    }
};

function StrByRoleName(name, childrenName) {
    let str = '';
    const roleName = getRole().value;
    if (roleName === UserRole.PARENT.value) {
        str = name + '\xa0\xa0' + UserRole.TUTOR.label;
        return str
    } else {
        str = name + '\xa0\xa0' + UserRole.PARENT.label + '\xa0\xa0\xa0\xa0' + childrenName + '\xa0\xa0' + UserRole.STUDENT.label;
        return str;
    }
}

export default function Consultation() {
    const [validAnswer, setValidAnswer] = useState(false)
    const user = useSelector((state) => state.user)
    const [idCl, setIdCl] = useState(0)
    const [indexDelete, setIndexDelete] = useState(0)
    const [show, setShow] = useState({
        showDelete: false,
        showConfirmDelete: false,
        showSave: false,
    })

    const [answer, setAnswer] = useState('')
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: ['id,DESC', 'status,DESC'],
    })

    const [open, setOpen] = useState(new Array(params.size).fill(false))
    const [openContent, setOpenContent] = useState(new Array(params.size).fill(false))

    function handlePageChange(e) {
        setParams({ ...params, page: e - 1 })
    }

    const handleChangeOpen = (event, index) => {
        setOpen(open.map((item, idx) => {
            return (idx === index) ? !item : item
        }));
    };

    const handleChangeOpenContent = (event, index) => {
        setOpenContent(openContent.map((item, idx) => {
            return (idx === index) ? !item : item
        }));
    };

    function consultation() {
        TeacherRoomService.getConsultation(params).then(res => {
            setData({
                content: res.data.content,
                totalPages: res.data.totalPages,
                number: res.data.totalElements,
                size: res.data.size
            })
        }).catch(e => console.log(e))
    }

    const handleChangeInput = (e) => {
        const { value } = e.target;
        if (value.trim().length === 0) {
            setValidAnswer(true)
        } else {
            setValidAnswer(false)
        }
        setAnswer(value)
    }


    const handleShow = (e) => {
        const { id } = e.target;
        if (id === 'delete') {
            TeacherRoomService.removeConsultation(idCl).then(res => {
                setShow({ ...show, showDelete: false, showConfirmDelete: true })
                setOpen(open.map((item, idx) => {
                    return (idx === indexDelete && open[idx + 1] === false) ? !item : item
                }));
            }).catch(e => console.log(e))
        }
        if (id === 'save') {
            if (answer.trim().length === 0) {
                setValidAnswer(true)
            } else {
                TeacherRoomService.replyConsultation(answer, idCl).then(res => {
                    console.log("status save: " + res.data)
                    setShow({ ...show, showSave: true })
                })
            }
        }
    }

    useEffect(() => {
        consultation()
    }, [params, show.showConfirmDelete, show.showSave])


    return (
        <>
            <section className="consultation-section">
                <div className="text-right mb-3">
                    <Button
                        variant="b500"
                        as={Link}
                        className="btw-290"
                        to="/write-consult"
                    >
                        상담 작성하기
                    </Button>
                </div>
                {
                    data.content.length > 0 ?
                        <>
                            <div className="tablelist g700">
                                <div className="tablelist-header d-flex">
                                    <div className="tcol-md-60 tcol-100">수업 정보</div>
                                    <div className="tcol-15 d-none d-lg-block">
                                        답변 상태
                                    </div>
                                    <div className="tcol-20 d-none d-lg-block">작성일</div>
                                </div>
                                <div className="tablelist-body">
                                    {
                                        data.content.map((v, i) => {
                                            return (
                                                <div key={i} className="tablelist-row-group">
                                                    <div
                                                        className="tablelist-row pointer"
                                                        onClick={(e) => handleChangeOpen(e, i)}
                                                        aria-controls={`example-collapse-text ${i}`}
                                                        aria-expanded={open[i]}
                                                    >
                                                        <div className="tcol-md-60 tcol-100 text-left">
                                                            [{checkStatus(v.classInfo.type)}] {v.classInfo.name}
                                                        </div>
                                                        <div
                                                            className={`tcol-md-15 tcol-25 ${v.status === 'ANSWERED' ? "text-b500" : ""}`}>
                                                            {checkStatus(v.status)}
                                                        </div>
                                                        <div className="tcol-20">{DateUtils.toLocalDate(v.createdOn)}</div>
                                                        <span className="toggle-action">
                                                            <i className="lcicon-dropClose"></i>
                                                        </span>
                                                    </div>


                                                    <div className="tablelist-row-group tablelist-row-collapse">
                                                        <Collapse in={open[i]} id={`example-collapse-text ${i}`}>
                                                            <div id="answer1">
                                                                <div className="tablelist-row g100">
                                                                    <div className="tcol-60 text-left">
                                                                        <p className="mb-1">
                                                                            {checkRespondentOrQuestioner(v, user.id, v.student.name)}
                                                                        </p>
                                                                        <p className="mb-1">
                                                                            {v.question}
                                                                        </p>
                                                                    </div>

                                                                    {
                                                                        (user.id === v.questioner.id && v.status === 'WAITING') &&
                                                                        <div className="tcol-40 text-right">
                                                                            <Button
                                                                                variant="white"
                                                                                onClick={() => {
                                                                                    setShow({ ...show, showDelete: !show.showDelete })
                                                                                    setIdCl(v.id)
                                                                                    setIndexDelete(i)
                                                                                }}
                                                                                className="btn-square btw-120 btn-reply"
                                                                                size="sm"
                                                                            >
                                                                                삭제
                                                                            </Button>
                                                                        </div>
                                                                    }

                                                                    {
                                                                        (user.id === v.respondent.id && v.status === 'WAITING') &&
                                                                        <div className="tcol-40 text-right">
                                                                            <Button
                                                                                variant="white"
                                                                                onClick={(e) => {
                                                                                    handleChangeOpenContent(e, i)
                                                                                    setIdCl(v.id)
                                                                                }}
                                                                                aria-expanded={openContent}
                                                                                className="btn-square btw-120 btn-reply"
                                                                                size="sm"
                                                                            >
                                                                                답변하기
                                                                            </Button>
                                                                        </div>
                                                                    }

                                                                </div>

                                                                {
                                                                    (user.id === v.respondent.id && v.status === 'WAITING') &&
                                                                    <Collapse in={openContent[i]}>
                                                                        <div id="answer3">
                                                                            <div className="tablelist-row g100">
                                                                                <div className="tcol-60 text-left">
                                                                                    <Form.Control
                                                                                        className="ipw-488"
                                                                                        as="textarea"
                                                                                        rows={3}
                                                                                        placeholder="이름 입력"
                                                                                        name={`answer`}
                                                                                        onChange={handleChangeInput}
                                                                                    />
                                                                                    <Form.Control.Feedback
                                                                                        className={validAnswer ? "d-block" : "d-none"}
                                                                                        type="invalid">
                                                                                        내용을 입력해주세요.
                                                                                    </Form.Control.Feedback>
                                                                                </div>
                                                                                <div className="tcol-40 text-right">
                                                                                    <Button
                                                                                        variant="white"
                                                                                        id={`save`}
                                                                                        onClick={handleShow}
                                                                                        className="btn-square btw-120 btn-reply"
                                                                                        size="sm"
                                                                                    >
                                                                                        저장하기
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Collapse>
                                                                }

                                                                {
                                                                    (v.status === 'ANSWERED') &&
                                                                    <div className="tablelist-row g100">
                                                                        <div className="tcol-md-60  text-left d-none d-lg-block">
                                                                            <span className="answer-closed-label">
                                                                                답변
                                                                            </span>
                                                                            <div className="answer-closed-content">
                                                                                {v.answer}
                                                                            </div>
                                                                        </div>
                                                                        <div className="tcol-md-20 application-tutorname">

                                                                        </div>

                                                                        <div className="tcol-20">
                                                                            {DateUtils.toLocalDate(v.updatedOn)}
                                                                        </div>
                                                                        <div className="tcol-100 text-left d-block d-lg-none">
                                                                            <div className="answer-closed-content">
                                                                                LiveClass 목적 페이지에
                                                                                상담에 관한 수업
                                                                                개설했습니다. 검색창에
                                                                                김철수라고 입력하면 확인 할
                                                                                수 있어요~ 수업 들으러
                                                                                오세요~
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }

                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <PaggingUtils
                                page={params.page + 1}
                                size={params.size}
                                totalPages={data.totalPages}
                                onClick={handlePageChange}
                            />
                        </>
                        :
                        <SearchNotFound content={'자녀 수업이 없습니다.'} />
                }
            </section>


            <Modal  // modal delete
                show={show.showDelete}
                onHide={() => setShow({ ...show, showDelete: !show.showDelete })}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner">
                        <p className="mb-0">삭제 하시겠습니까?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={() => setShow({ ...show, showDelete: !show.showDelete })}>
                        취소
                    </Button>
                    <Button variant="g700" id={'delete'} onClick={handleShow}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal //modal confirm delete
                show={show.showConfirmDelete}
                onHide={() => setShow({ ...show, showConfirmDelete: !show.showConfirmDelete })}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">삭제가 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700"
                        onClick={() => setShow({ ...show, showConfirmDelete: !show.showConfirmDelete })}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal //modal answer
                show={show.showSave}
                onHide={() => setShow({ ...show, showSave: !show.showSave })}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">저장되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={() => setShow({ ...show, showSave: !show.showSave })}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
