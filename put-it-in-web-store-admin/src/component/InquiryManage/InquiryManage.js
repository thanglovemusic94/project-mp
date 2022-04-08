import {Button, Col, Form, Row, Table} from 'react-bootstrap';
import PaginationSection from '../common/PaginationSection';
import {Link, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import {InquiryService} from "../../services/InquiryService";
import swal from "sweetalert";
import {SwalCommon} from "../../constants/SwalCommon";
import {AnnouncementService} from "../../services/AnnouncementService";

const initialSelect = new Array(10).fill(false)

export default function InquiryManage() {

    const history = useHistory();

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
    }, [data.pageable.pageNumber, data.pageable.pageSize])

    function getData()
    {
        InquiryService.getBoardInquiry(data.pageable).then((response) => {
            if (response.status === 200) {
                setData(response.data)
            }
        })
    }

    function deleteListInquirys() {
        swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
            if (willDelete) {
                let deletedIds = [];
                selected.forEach((select, index) => {
                    if (select === true) deletedIds.push(data.content[index].id);
                })
                let requestBody = {
                    data:deletedIds,
                }
                InquiryService.deleteListInquiry(deletedIds).then(
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

    function handleEdit(id) {
        history.push("/inquiry/answer/" + id)
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">1:1 문의 관리</h4>
                <div>
                    <Form>
                        <div className="table-responsive">
                            <Table bordered>
                                <thead>
                                <tr>
                                    <th className="text-center"><Form.Check
                                        checked={selectAllCheckBox} onChange={handleSelectAll}/></th>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성일</th>
                                    <th>작성자</th>
                                    <th>답변 여부</th>
                                </tr>
                                </thead>
                                <tbody>
                                {(data.content && data.content.length > 0) &&
                                data.content.map((item, index) => {
                                    return (
                                        <tr>
                                            <td className="text-center">
                                                <Form.Check onChange={() => handleSelected(index)}
                                                            checked={selected[index]}/></td>
                                            <td>{item.id}</td>
                                            <td onClick={() => handleEdit(item.id)}>{item.title}</td>
                                            <td>{item.createdOn}</td>
                                            <td>{item.writer}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="text-left">
                                <Button variant="secondary" size="sm"
                                        onClick={() => deleteListInquirys()}>삭제</Button>
                            </div>

                            <PaginationSection
                                size={data.size}
                                number={data.number}
                                totalElements={data.totalElements}
                                handlePaging={handlePaging}/>
                            <div></div>

                        </div>
                    </Form>
                </div>

            </div>
        </main>
    )
}

function InquiryItem(props) {

    const history = useHistory();

    function handleEdit(item) {
        history.push({pathname: `/inquiry/answer/${item.id}`, state: {inquiry: item}})
    }

    return (
        <tr>
            <td className="text-center"><Form.Check
                aria-label="Checkbox for following text input"/></td>
            <td>{props.inquiry.id}</td>
            <td onClick={() => handleEdit(props.inquiry)}>{props.inquiry.title}</td>
            <td>{props.inquiry.createdOn}</td>
            <td>{props.inquiry.writer}</td>
            <td>{props.inquiry.status}</td>
        </tr>
    )
}