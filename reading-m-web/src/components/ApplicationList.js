import React, { useEffect, useState } from 'react'
import { Button, Collapse, Modal } from 'react-bootstrap'
import { ClassGoalService } from "../services/ClassGoalService";
import { DateUtils } from "../utils/DateUtils";
import PagingUtils from "../utils/PagingUtils";
import { convertCategory } from "../constants/class.constants";
import SearchNotFound from "./SearchNotFound";

export default function ApplicationList() {
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [idDel, setIdDel] = useState(null)
    const [indexDelete, setIndexDelete] = useState(null)
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: ['id,DESC']
    })

    function handlePageChange(e) {
        setParams({ ...params, page: e - 1 })
    }

    const [open, setOpen] = useState(new Array(params.size).fill(false))
    const handleChangeOpen = (event, index) => {
        setOpen(open.map((item, idx) => {
            return (idx === index) ? !item : item
        }));
    };
    function handleDelete() {
        ClassGoalService.deleteApplication(idDel).then((res) => {
            setShow2(!show2)
            setOpen(open.map((item, idx) => {
                return (idx === indexDelete && open[idx + 1] === false) ? !item : item
            }));
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        ClassGoalService.getUserApplication(params).then(res => {
            setData(res.data)
        }).catch(e => console.log(e))
    }, [params, show2])
    return (
        <>
            {
                data.content.length > 0 ?
                    <>
                        <section className="applicationlist-section">
                            <div className="tablelist g700">
                                <div className="tablelist-header d-flex">
                                    <div className="tcol-20 d-none d-lg-block font-weight-bold">
                                        카테고리
                                    </div>
                                    <div className="tcol-80 d-none d-lg-block font-weight-bold">
                                        제목
                                    </div>
                                    <div className="tcol-20 d-none d-lg-block font-weight-bold">
                                        신청일
                                    </div>
                                    <div className="tcol-100 d-block d-lg-none font-weight-bold">
                                        신청 리스트 정보
                                    </div>
                                </div>
                                <div className="tablelist-body">

                                    {data.content.map((value, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <div className="tablelist-row-group">
                                                    <div
                                                        className="tablelist-row pointer"
                                                        onClick={(e) => handleChangeOpen(e, index)}
                                                        aria-controls={`example-collapse-text ${index}`}
                                                        aria-expanded={open[index]}
                                                    >
                                                        <div className="tcol-md-20 tcol-25 application-cate text-500">
                                                            {convertCategory(value.category)}
                                                        </div>
                                                        <div className="tcol-md-80 tcol-80 application-title text-left">
                                                            {value.title}
                                                        </div>
                                                        <div className="tcol-md-20 tcol-25 text-g500">
                                                            {DateUtils.toLocalDate(value.createdOn)}
                                                        </div>
                                                        <span className="toggle-action">
                                                            <i className="lcicon-dropClose"></i>
                                                        </span>
                                                    </div>
                                                    <div className="tablelist-row-group tablelist-row-collapse">
                                                        <Collapse in={open[index]}>
                                                            <div id="answer1">
                                                                <div className="tablelist-row g100">
                                                                    <div className="tcol-60 text-left">
                                                                        <p className="mb-1">
                                                                            {value.request}
                                                                        </p>
                                                                    </div>
                                                                    {value.status === 'WAITING' &&
                                                                        <div className="tcol-40 text-right pl-2">
                                                                            <Button
                                                                                variant="white"
                                                                                onClick={() => {
                                                                                    setShow1(!show1)
                                                                                    setIdDel(value.id)
                                                                                    setIndexDelete(index)
                                                                                }}
                                                                                className="btn-square btn-reply"
                                                                                size="sm"
                                                                            >
                                                                                삭제
                                                                            </Button>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                {
                                                                    value.status === 'ANSWERED' &&
                                                                    <div className="tablelist-row g100">
                                                                        <div
                                                                            className="tcol-md-60  text-left d-none d-lg-block">
                                                                            <span className="answer-closed-label">답변</span>
                                                                            <div className="answer-closed-content">
                                                                                {value.answer}
                                                                            </div>
                                                                        </div>
                                                                        <div className="tcol-md-20 application-tutorname">
                                                                            {'지도교사' + '\xa0\xa0\xa0\xa0' + value.respondent.name}
                                                                        </div>
                                                                        <div className="tcol-md-15">{DateUtils.toLocalDate(value.updatedOn)}</div>
                                                                        <div
                                                                            className="tcol-100 text-left d-block d-lg-none">
                                                                            <span className="answer-closed-label">답변</span>
                                                                            <div className="answer-closed-content">
                                                                                {value.answer}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })}

                                </div>
                            </div>
                        </section>
                        <PagingUtils
                            page={params.page + 1}
                            size={params.size}
                            totalPages={data.totalPages}
                            onClick={handlePageChange}
                        />
                    </>
                    :
                    <SearchNotFound content={'수업 신청 리스트가 없습니다.'} />
            }
            {/* Modal Yes/No confirm */}
            <Modal
                show={show1}
                onHide={() => setShow1(!show1)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner">
                        <p className="mb-0">삭제 하시겠습니까?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={() => setShow1(!show1)}>
                        취소
                    </Button>
                    <Button variant="g700"
                        onClick={() => {
                            handleDelete()
                            setShow1(!show1)
                        }}
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal OK confirm */}
            <Modal
                show={show2}
                onHide={() => setShow2(!show2)}
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
                    <Button variant="g700" onClick={() => setShow2(!show2)}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
