import {Button, Col, Form, Row, Table} from 'react-bootstrap';
import PaginationSection from '../common/PaginationSection';
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FAQService} from "../../services/FAQService";
import swal from "sweetalert";
import {SwalCommon} from "../../constants/SwalCommon";

const initialSelect = new Array(10).fill(false)

export default function FAQManage() {

    const history = useHistory();

    function handleCreate() {
        history.push("/faq/create/")
    }

    function handleEdit(id) {
        history.push("/faq/edit/" + id)
    }

    const [data, setData] = useState({
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 10,
        },
        totalElements: 0,
        number: 0,
        size: 0,
    })

    function handlePaging(number) {
        setData({...data, pageable: {...data.pageable, pageNumber: --number}})
    }

    useEffect(() => {
      getData()
    }, [data.content.number, data.content.size])

    function getData()
    {
        FAQService.getBoardFAQ(data.pageable).then((response) => {
            if (response.status === 200) {
                setData(response.data)
            }
        })
    }

    function deleteListFAQs() {
        swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
            if (willDelete) {
                let deletedIds = [];
                selected.forEach((select, index) => {
                    if (select === true) deletedIds.push(data.content[index].id);
                })
                let requestBody = {
                    data:deletedIds,
                }
                FAQService.deleteListFAQ(requestBody).then(
                    (response) => {
                        getData()
                        setSelected(initialSelect)
                    }
                ).catch((err) => {
                    console.log(err)
                });
            }
        });
    }

    const [selected, setSelected] = useState(initialSelect);
    const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);

    function handleSelected(index) {
        setSelected(selected.map((item, idx) => {
            return (idx === index) ? !item : item
        }));
    }

    function handleSelectAll(e) {
        const checked = e.target.checked;
        setSelectAllCheckBox(checked)
        if (checked) {
            setSelected(data.content.map(() => true));
        } else {
            setSelected(data.content.map(() => false));
        }
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">자주 묻는 질문 관리</h4>
                <div>
                    <Form>
                        <div className="table-responsive">
                            <Table bordered>
                                <thead>
                                <tr>
                                    <th className="text-center"><Form.Check
                                        checked={selectAllCheckBox} onChange={handleSelectAll}/></th>
                                    <th>번호</th>
                                    <th>질문 내용</th>
                                    <th>작성일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {(data.content && data.content.length > 0) &&
                                data.content.map((item, index) => {
                                    return (
                                        <tr>
                                            <td className="text-center"><Form.Check
                                                onChange={() => handleSelected(index)} checked={selected[index]}/></td>
                                            <td>{item.id}</td>
                                            <td onClick={() => handleEdit(item.id)}>{item.question}</td>
                                            <td>{item.createdOn}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </div>

                        <div className="d-flex justify-content-between">

                            <div class="float-left">
                                <Button variant="secondary" size="sm" onClick={() => deleteListFAQs()}>삭제</Button>
                            </div>
                            <PaginationSection
                                size={data.size}
                                number={data.number}
                                totalElements={data.totalElements}
                                handlePaging={handlePaging}/>
                            <div className="float-right">
                                <Button variant="secondary" size="sm" onClick={handleCreate}>작성</Button>
                            </div>

                        </div>
                    </Form>
                </div>

            </div>
        </main>
    )
}

function FAQItem(props) {

    const history = useHistory();

    function handleEdit(id) {
        history.push("/faq/edit/" + id)
    }

    return (
        <tr>
            <td className="text-center"><Form.Check
                aria-label="Checkbox for following text input"/></td>
            <td>{props.faq.id}</td>
            <td onClick={() => handleEdit(props.faq.id)}>{props.faq.question}</td>
            <td>{props.faq.createdOn}</td>
        </tr>
    )
}