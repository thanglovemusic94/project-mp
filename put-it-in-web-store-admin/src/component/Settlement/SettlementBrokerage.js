import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { SwalCommon } from "../../constants/SwalCommon";
import { SettlementService } from "./../../services/settlement.service";

const style = {
    title: { verticalAlign: "middle" },
    formControlInLine: { display: "flex", marginBottom: "0px", alignItems: "center" },
    formControl: { width: "100px" },
    radioFilter: { minWidth: "80px" },
    button: { marginTop: "1rem" }
}

export default function SettlementBrokerage() {

    const [fee, setFee] = useState(0);

    useEffect(() => {
        SettlementService.getFee().then((response) => {
            console.log(response.data)
            setFee(response.data.fee)
        })
    }, [])

    function handleChange(e) {
        setFee(e.target.value)
    }

    function handleSave() {
        SettlementService.setFee(fee).then(() => {
            swal(SwalCommon.ALERT_SAVE_COMPLETE)
        }).catch((err) => {
            swal(SwalCommon.ALERT_DELETE_FAILED)
            console.log(err)
        })
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">중개수수료 설정</h4>
                <div>
                    <Form>
                        <Row>
                            <Col xs={5}>
                                <Table bordered>
                                    <thead>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={style.title}>수수료</td>
                                            <td>
                                                <Form.Group controlId="formBasicEmail" style={style.formControlInLine}>
                                                    <Form.Control style={style.formControl} type="text" value={fee} onChange={handleChange} />&nbsp;  %
                                                </Form.Group>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs={6}>
                                <Button style={style.button} onClick={handleSave} variant="secondary">저장</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>

            </div>
        </main>
    )
}