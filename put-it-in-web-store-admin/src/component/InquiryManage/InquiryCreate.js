import {Button, Col, Form, Row, Table} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import DateTime from '../common/DateTime';
import moment from 'moment';
import {InquiryService} from "../../services/InquiryService";
import React, {useEffect, useState} from "react";
import {AnnouncementService} from "../../services/AnnouncementService";
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

export default function InquiryCreate(props) {

    const history = useHistory();

    const [inquiry, setInquiry] = useState("")

   useEffect(()=>{
       getInquiryInfo()
   },[])

    function getInquiryInfo() {

        InquiryService.getInquiryDetail(props.match.params.id).then((response) => {
            setInquiry(response.data)
        })
    }

    function saveInquiry() {
        let title = document.getElementById("title")
        let contents = document.getElementById("content")
        if (title.value === "" || contents.value === "") {
            alert("please check character length")
            return
        }
        swal(SwalCommon.ALERT_SAVE_COMPLETE).then((willDelete) => {
            if (willDelete) {
                InquiryService.postInquiryAnswer(contents.value, title.value, props.match.params.id).then((response) => {
                    if (response.status === 201) {
                        history.push("/inquiry")
                    } else {
                        alert("Answer Fail!")
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
        });
    }


    function deleteInquiry() {
        swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
            if (willDelete) {
                InquiryService.deleteInquiry(props.match.params.id).then((response) => {
                    if (response.status === 204) {
                        history.push("/inquiry/management")
                    } else alert("Delete Fail!")
                }).catch((err) => {
                    console.log(err)
                });
            }
        });
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">1:1 문의 답변 작성</h4>
                <div style={style.date}>
                    <p>Date created: <DateTime type="date" date={moment.now()}></DateTime></p>
                </div>
                <div>
                    <Form noValidate>
                        <div className="table-responsive">
                            <Table bordered>
                                <tbody>
                                <tr>
                                    <td colSpan={2} style={style.colSpanCenter}><strong>문의내역</strong></td>
                                </tr>
                                <tr>
                                    <td width="200px" style={style.title}>작성자</td>
                                    <td>{inquiry.writer}</td>
                                </tr>
                                <tr>
                                    <td style={style.title}>작성일</td>
                                    <td>
                                        <DateTime type="date" date={inquiry.dateCreated}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={style.title}>문의 제목</td>
                                    <td>{inquiry.inquiryTitle}</td>
                                </tr>
                                <tr>
                                    <td>문의 내용</td>
                                    <td>{inquiry.inquiryContent}</td>
                                </tr>

                                {/*  Form */}
                                <tr>
                                    <td colSpan={2} style={style.colSpanCenter}><strong>관리자 답변</strong></td>
                                </tr>
                                <tr>
                                    <td style={style.title}>문의 제목</td>
                                    <td>
                                        <Form.Group controlId="title" style={style.formGroup}>
                                            <Form.Control style={style.formControl} type="text"/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>문의 내용</td>
                                    <td>
                                        <Form.Group controlId="content" style={style.formGroup}>
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
                                    <Link to="/inquiry/management"><Button variant="secondary" size="sm">목록으로</Button></Link>
                                </div>
                            </Col>
                            <Col>
                                <div className="float-right">
                                    <Button variant="danger" size="sm" onClick={() => deleteInquiry()}>삭제</Button>
                                    &nbsp;
                                    <Button variant="secondary" size="sm" onClick={() => saveInquiry()}>저장</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </main>
    )
}