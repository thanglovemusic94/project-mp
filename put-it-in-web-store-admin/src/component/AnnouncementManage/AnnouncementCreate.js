import {Button, Col, Form, Row, Table} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {AnnouncementService} from "../../services/AnnouncementService";
import {SwalCommon} from "../../constants/SwalCommon";

const style = {
    title: {verticalAlign: "middle"},
    formGroup: {marginBottom: "0px"},
    formGroupInline: {marginBottom: "0px", display: "flex", alignItems: "center"},
    formControl: {width: "800px"},
    sizeInput: {width: "55px"}
}

export default function AnnouncementCreate(props) {

    const history = useHistory();

    const [isCreateAction, setScreenAction] = useState(true);

    useEffect(() => {
        let {id} = props.match.params
        if (id) {
            setScreenAction(false)
            getAnnouncementInfo()
        }

    }, [props.match.params])



    function saveAnnouncement() {
        let title = document.getElementById("title")
        let contents = document.getElementById("content")
        if (title.value === "" || contents.value === "") {
            alert("please check character length")
            return
        }
        if (isCreateAction) {
            swal(SwalCommon.ALERT_SAVE_COMPLETE).then((willDelete) => {
                if (willDelete) {
                    AnnouncementService.postAnnouncement(contents.value, props.match.params.id, title.value).then((response) => {
                        if (response.status === 201) {
                            history.push("/announcement")
                        } else {
                            alert("Create Fail!")
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            });
        } else {
            swal(SwalCommon.ALERT_SAVE_COMPLETE).then((willDelete) => {
                if (willDelete) {
                    AnnouncementService.updateAnnouncement(contents.value, props.match.params.id, title.value).then((response) => {
                        if (response.status === 204) {
                            history.push("/announcement")
                        } else {
                            alert("Edit Fail!")
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            });
        }
    }

    function getAnnouncementInfo() {
        let title = document.getElementById("title")
        let contents = document.getElementById("content")
        AnnouncementService.getAnnouncementDetail(props.match.params.id).then((response) => {
            let announ = response.data
            title.value = announ.title
            contents.value = announ.contents
        })
    }

    function deleteAnnouncement() {

        swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
            if (willDelete) {
                AnnouncementService.deleteAnnouncement(props.match.params.id).then((response) => {
                    history.push("/announcement/management")
                }).catch((err) => {
                    console.log(err)
                });
            }
        });
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">{(isCreateAction) ? "공지사항 작성" : "공지사항 수정"}</h4>
                <div>
                    <Form noValidate>
                        <div className="table-responsive">
                            <Table bordered>
                                <thead>
                                </thead>
                                <tbody>
                                <tr>
                                    <td width="200px" style={style.title}>제목</td>
                                    <td>
                                        <Form.Group required controlId="title" style={style.formGroup}>
                                            <Form.Control style={style.formControl} type="text"/>
                                            <Form.Control.Feedback>Please enter your title</Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>내용</td>
                                    <td>
                                        <Form.Group controlId="content" style={style.formGroup}>
                                            <Form.Control required style={style.formControl} as="textarea" rows={3}/>
                                            <Form.Control.Feedback>Please enter your content</Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>

                        <Row>
                            <Col>
                                <div class="float-left">
                                    <Link to="/announcement/management"><Button variant="secondary" size="sm">목록으로</Button></Link>
                                </div>
                            </Col>
                            <Col>
                                <div className="float-right">
                                    <Button variant="danger" size="sm"
                                            onClick={() => deleteAnnouncement()}>삭제</Button>
                                    &nbsp;
                                    <Button variant="secondary" size="sm"
                                            onClick={() => saveAnnouncement()}>저장</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </main>
    )
}