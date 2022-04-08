import FormattedDateTime from 'components/common/FormattedDateTime';
import LCPagination from 'components/LCPagination'
import SearchNotFound from 'components/SearchNotFound';
import { ClassType } from 'constants/class.constants';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Collapse, Form, Modal } from 'react-bootstrap'
import { ClassQAService } from 'services/ClassQAService'

const TableQAContext = createContext();

function TableQAHeaders({ source }) {
    const [dataHeaders, setDataHeaders] = useState(source);

    useEffect(() => {
        let newHeaders = [...source]
        newHeaders.splice(1, 0, "답변상태");
        setDataHeaders(newHeaders);
    }, [source])

    return (
        <div className="tablelist-header d-flex">
            {
                dataHeaders.map((item, index) => {
                    const clssNm = index === 0 ?
                        "tcol-md-50 tcol-100 text-500 font-weight-lg-bold"
                        :
                        "tcol-15 d-none d-lg-block font-weight-bold"

                    return (
                        <div key={`TableQAHeader_${index}`} className={clssNm}>
                            {item}
                        </div>
                    )
                })
            }
        </div>
    )
}

function TableQAItemReply({ source }) {
    const { onReply } = useContext(TableQAContext);
    const [validAnswer, setValidAnswer] = useState(true)

    const [answer, setAnswer] = useState("");

    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)

    function handleSaveReply() {
        setValidAnswer(answer)
        if (answer && onReply)
            onReply(source.id, answer);
    }

    return (
        <>
            <div
                className="tablelist-row pointer"
                onClick={() => setOpen2(!open2)}
                aria-expanded={open2}
            >
                <div className="tcol-md-50 tcol-100 text-left text-500">
                    {ClassType[source.classInfo.type].label} {source.classInfo.name}
                </div>
                <div className="tcol-25 tcol-md-15 text-g500">
                    답변대기
                </div>
                <div className="tcol-25 tcol-md-15">
                    { source.questioner.name }
                </div>
                <div className="tcol-25 tcol-md-15 text-g500">
                    <FormattedDateTime source={source.createdOn} format="YYYY.MM.DD" />
                </div>
                <span className="toggle-action">
                    <i className="lcicon-dropClose"></i>
                </span>
            </div>
            <div className="tablelist-row-group tablelist-row-collapse">
                <Collapse in={open2}>
                    <div id="answer2">
                        <div className="tablelist-row g100">
                            <div className="tcol-60 text-left">
                                <p className="mb-1">
                                    { source.title }
                                </p>
                            </div>
                            <div className="tcol-40 text-right">
                                <Button
                                    variant="white"
                                    onClick={() =>
                                        setOpen3(!open3)
                                    }
                                    aria-expanded={open3}
                                    className="btn-square btn-reply"
                                    size="sm"
                                >
                                    답변하기
                                </Button>
                            </div>
                        </div>
                        <Collapse in={open3}>
                            <div id="answer3">
                                <div className="tablelist-row g100">
                                    <div className="tcol-60 text-left">
                                        <Form.Control
                                            className="ipw-488"
                                            as="textarea"
                                            rows={3}
                                            value={answer}
                                            onChange={e => {
                                                setAnswer(e.target.value)
                                            }}
                                            placeholder="내용 입력"
                                            required
                                        />

                                        <Form.Control.Feedback 
                                            className={validAnswer ? "d-none" : "d-block"}
                                            type="invalid"
                                        >
                                            내용을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                    <div className="tcol-40 text-right pl-2">
                                        <Button
                                            variant="white"
                                            onClick={handleSaveReply}
                                            className="btn-square btn-reply"
                                            size="sm"
                                        >
                                            저장하기
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </Collapse>
            </div>
        </>
    )
}

function TableQAItemComplete({ source }) {
    const [open4, setOpen4] = useState(false);

    return (
        <>
            <div
                className="tablelist-row pointer"
                onClick={() => setOpen4(!open4)}
                aria-expanded={open4}
            >
                <div className="tcol-md-50 tcol-100 text-left text-500">
                    {ClassType[source.classInfo.type].label} {source.classInfo.name}
                </div>
                <div className="tcol-25 tcol-md-15 text-p500">
                    답변완료
                </div>
                <div className="tcol-25 tcol-md-15">
                    {source.questioner.name}
                </div>
                <div className="tcol-25 tcol-md-15 text-g500">
                    <FormattedDateTime source={source.createdOn} format="YYYY.MM.DD" />
                </div>
                <span className="toggle-action">
                    <i className="lcicon-dropClose"></i>
                </span>
            </div>
            <div className="tablelist-row-group tablelist-row-collapse">
                <Collapse in={open4}>
                    <div id="answer4">
                        <div className="tablelist-row g100">
                            <div className="tcol-80 text-left">
                                <p className="mb-1">
                                    {source.content}
                                </p>
                            </div>
                            <div className="tcol-20 text-right"></div>
                        </div>
                        <div className="tablelist-row g100">
                            <div className="tcol-md-80 text-left ">
                                <span className="answer-closed-label">
                                    답변
                                </span>
                                <div className="answer-closed-content d-none d-lg-block">
                                    {source.answer}
                                </div>
                            </div>
                            <div className="tcol-md-15">
                                <FormattedDateTime source={source.updatedOn} format="YYYY.MM.DD" />
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </>
    )
}

function TableQAItem({ source }) {

    return (
        <>
            {
                source.answer === null ?
                    <TableQAItemReply source={source} />
                    :
                    <TableQAItemComplete source={source} />
            }
        </>
    )
}

function TableQAList({ source }) {

    return (
        <div className="tablelist-body">
            {
                source.map((item, index) => {

                    return (
                        <div key={`TableQAItem_${index}`} className="tablelist-row-group">
                            <TableQAItem source={ item } />
                        </div>
                    )
                })
            }
        </div>
    )
}

function TableQA({ headers, source, onReply }) {

    return (
        <TableQAContext.Provider value={ { onReply } }>
            <div className="tablelist g700">
                <TableQAHeaders source={headers} />
                <TableQAList source={source} />
            </div>
        </TableQAContext.Provider>
    )
}

export default function TutorQA() {
    const [data, setData] = useState({
        "content": [],
        "totalPages": 0
    })

    const [show3, setShow3] = useState(false)
    const handleShow3 = () => setShow3(true)
    const handleClose3 = () => setShow3(false)

    const [pageable, setPageable] = useState({
        "page": 0,
        "size": 10
    })

    const tableHeaders = ["수업 정보", "작성자", "작성일"];

    useEffect(() => {

        ClassQAService.getClassQAsTutor(pageable).then((resp) => {

            if (resp.status === 200) {

                setData(resp.data);
            }
        })
    }, [pageable])

    function updateAnswer(id, answer) {
        const newData = { ...data }
        const newDataContent = [...newData.content]
                
        for (let item of newDataContent) {
            if (item.id === id) {
                item.answer = answer;
                break;
            }
        }

        newData.content = newDataContent;

        setData(newData);
    }

    function handlePageChange(newPage) {
        setPageable({ ...pageable, page: newPage });
    }

    function handleReply(id, answer) {
        
        ClassQAService.replyQA(id, answer).then((resp) => {

            if (resp.status === 200) {

                updateAnswer(id, answer);

                handleShow3();
            }
        })
    }

    return (
        <>
            {
                data.content.length === 0 ?
                    <SearchNotFound content="수업 Q&A가 없습니다."/>
                    :
                    <>
                        <section className="tutorqa-section">
                            <TableQA 
                                source={data.content} 
                                headers={tableHeaders} 
                                onReply={handleReply}
                            />
                        </section>

                        <div className="pagination-wrapper d-flex justify-content-center my-5">
                            <LCPagination
                                pageNumber={data.number}
                                totalPage={data.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>

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
                    </>
            }
        </>
    )
}
