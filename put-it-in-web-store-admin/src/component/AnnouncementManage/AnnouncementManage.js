import {Button, Container, Form, Table} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import PaginationSection from '../common/PaginationSection';
import {AnnouncementService} from "../../services/AnnouncementService";
import React, {useEffect, useState} from "react";
import swal from "sweetalert";
import {SwalCommon} from "../../constants/SwalCommon";

const styles = {
    imgCard: {width: "100px"}
}
const initialSelect = new Array(10).fill(false)

export default function AnnouncementManage() {

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

    const history = useHistory();

    function handleCreate() {
        history.push("/announcement/create/")
    }

    useEffect(() => {
       getData()
    }, [data.pageable.pageNumber, data.pageable.pageSize])

    function getData()
    {
        AnnouncementService.getBoardAnnouncement(data.pageable).then((response) => {
            if (response.status === 200) {
                setData(response.data)
            }
        })
    }

    function deleteListAnnouncements() {
        swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
            if (willDelete) {

                let deletedIds = [];

                selected.forEach((select, index) => {
                    if (select === true) deletedIds.push(data.content[index].id);
                })
                let requestBody = {
                    data:deletedIds,
                }
                let lstIds = JSON.stringify(requestBody)
                AnnouncementService.deleteListAnnouncement(lstIds).then(
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
        history.push("/announcement/edit/" + id)
    }

    return (
        <main>
            <Container fluid>
                <h4 className="mt-5 mb-3">공지사항 관리</h4>
                <div>
                    <Form>
                        <div className="table-responsive">
                            <Table bordered>
                                <thead>
                                <tr>
                                    <th className="text-center">
                                        <Form.Check checked={selectAllCheckBox} onChange={handleSelectAll}/>
                                    </th>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성일</th>
                                    <th>조회수</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.content && data.content.length > 0 &&
                                data.content.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="text-center">
                                                <Form.Check onChange={() => handleSelected(index)}
                                                            checked={selected[index]}/>
                                            </td>
                                            <td>{item.id}</td>
                                            <td onClick={() => handleEdit(item.id)}>{item.title}</td>
                                            <td>{item.createdOn}</td>
                                            <td>{item.view}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" size="sm"
                                    onClick={() => deleteListAnnouncements()}>삭제</Button>
                            <PaginationSection
                                size={data.size}
                                number={data.number}
                                totalElements={data.totalElements}
                                handlePaging={handlePaging}/>
                            <Button variant="secondary" size="sm"
                                    onClick={() => handleCreate()}>등록</Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </main>
    )
}