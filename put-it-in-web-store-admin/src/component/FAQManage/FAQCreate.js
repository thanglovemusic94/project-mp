import {Button, Col, Form, Row, Table} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import DateTime from '../common/DateTime';
import moment from 'moment';
import {useEffect, useState} from "react";
import {FAQService} from "../../services/FAQService";
import {SwalCommon} from "../../constants/SwalCommon";

const style = {
    title: {verticalAlign: "middle"},
    formGroup: {marginBottom: "0px"},
    formGroupInline: {marginBottom: "0px", display: "flex", alignItems: "center"},
    formControl: {width: "800px"}
    ,
    date: {textAlign: 'right'},
    colSpanCenter: {textAlign: 'center'}
}

export default function FAQCreate(props) {

    const history = useHistory();

    const [isCreateAction, setScreenAction] = useState(true);
    useEffect(() => {
        let {id} = props.match.params
        if (id) {
            setScreenAction(false)
            getFAQInfo()
        }
    }, [props.match.params])


    function saveFAQ() {
        let question = document.getElementById("question")
        let answer = document.getElementById("answer")
        if (isCreateAction) {
            if (answer.value === "" || question.value === "") {
                alert("please check character length")
                return
            }
            swal(SwalCommon. ALERT_SAVE_COMPLETE).then((willDelete) => {
                if (willDelete) {
                    FAQService.postFAQ(answer.value, props.match.params.id, question.value).then((response) => {
                        if (response.status === 201) {
                            history.push("/faq")
                        } else {
                            alert("Create Fail!")
                        }
                    })
                }
            })
        } else {
            swal(SwalCommon. ALERT_SAVE_COMPLETE).then((willDelete) => {
                if (willDelete) {
                    FAQService.updateFAQ(answer.value, props.match.params.id, question.value).then((response) => {
                        if (response.status === 204) {
                            history.push("/faq")
                        } else {
                            alert("Edit Fail!")
                        }
                    })
                }
            })
        }
    }

    function getFAQInfo() {
        let question = document.getElementById("question")
        let answer = document.getElementById("answer")
        FAQService.getFAQDetail(props.match.params.id).then((response) => {
            let faq = response.data
            question.value = faq.question
            answer.value = faq.answer
        })
    }

    function deleteFAQ() {
        swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
            if (willDelete) {
                FAQService.deleteFAQ(props.match.params.id).then((response) => {
                    if (response.status === 204) {
                        history.push("/faq/management")
                    } else alert("Delete Fail!")
                })
            }
        })
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">{(isCreateAction) ? "자주 묻는 질문 작성" : "자주 묻는 질문 수정"}</h4>
                <div style={style.date}>
                    <p>Date created: <DateTime type="date" date={moment.now()}></DateTime></p>
                </div>
                <div>
                    <Form noValidate>
                        <div className="table-responsive">
                            <Table bordered>
                                <thead>
                                </thead>
                                <tbody>
                                <tr>
                                    <td width="200px" style={style.title}>질문 내용</td>
                                    <td>
                                        <Form.Group controlId="question" style={style.formGroup}>
                                            <Form.Control style={style.formControl} type="text"/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={style.title}>작성자</td>
                                    <td className="text-left">
                                        관리자
                                    </td>
                                </tr>
                                <tr>
                                    <td>답변 내용</td>
                                    <td>
                                        <Form.Group controlId="answer" style={style.formGroup}>
                                            <Form.Control style={style.formControl} as="textarea" rows={3}/>
                                        </Form.Group>
                                    </td>
                                </tr>

                                </tbody>
                            </Table>
                        </div>

                        <Row>
                            <Col>
                                <div class="float-left">
                                    <Link to="/faq/management"><Button variant="secondary"
                                                                       size="sm">목록으로</Button></Link>
                                </div>
                            </Col>
                            <Col>
                                <div className="float-right">
                                    <Button variant="danger" size="sm" onClick={() => deleteFAQ()}>삭제</Button>
                                    &nbsp;
                                    <Button variant="secondary" size="sm" onClick={() => saveFAQ()}>저장</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </main>
    )
}