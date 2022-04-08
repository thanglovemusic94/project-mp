import { APPLICATION_CATEGORYS } from 'constants/class.constants'
import React, { useState } from 'react'
import { Button, Dropdown, Form, Table } from 'react-bootstrap'

export default function ApplicationWrite({ onFinish }) {
    // Validate form
    const [isValidCategory, setValidCategory] = useState(true)
    const [isValidTitle, setValidTitle] = useState(true)
    const [isValidContent, setValidContent] = useState(true)

    const [selectedCategory, setSelectedCategory] = useState("")
    const [data, setData] = useState({
        "title": "",
        "content": ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let isValid = true;

        if (selectedCategory === "" || setSelectedCategory === APPLICATION_CATEGORYS[0]) {
            setValidCategory(false)
            isValid = false
        }

        if (!data.title || data.title.trim().length === 0) {
            setValidTitle(false)
            isValid = false
        }

        if (!data.content || data.content.trim().length === 0) {
            setValidContent(false)
            isValid = false
        }

        if (isValid) {
            onFinish({ ...data, "category": selectedCategory.value })
        }
    }

    const onChangeCategory = (i) => {
        setSelectedCategory(APPLICATION_CATEGORYS[i])

        if (i != 0) {
            setValidCategory(true)
        } else {
            setValidCategory(false)
        }
    }

    const onChangeTitle = (e) => {
        let value = e.target.value

        setData({ ...data, "title": value })

        if (value && value.trim().length > 0) {
            setValidTitle(true)
        } else {
            setValidTitle(false)
        }
    }

    const onChangeContent = (e) => {
        let value = e.target.value

        setData({ ...data, "content": value })

        if (value && value.trim().length > 0) {
            setValidContent(true)
        } else {
            setValidContent(false)
        }
    }

    const subjectSelections = APPLICATION_CATEGORYS.map((item) => {

        return item.name
    })

    return (
        <>
            {/* Register Liveclass goal  */}
            <div className="writeqa-body">
                <h2 className="page-title mb-4">LiveClass 목적 신청하기</h2>
                <Form onSubmit={handleSubmit}>
                    <Table className="table-form">
                        <tbody>
                            <tr>
                                <th className="th-285 align-middle">
                                    카테고리
                                </th>
                                <td>
                                    <label className="d-block d-lg-none">
                                        카테고리
                                    </label>
                                    <Dropdown className="form-control-dropdown" onSelect={onChangeCategory}>
                                        <Dropdown.Toggle
                                            id="dropdown"
                                            className="ipw-386"
                                            variant=""
                                        >
                                            {selectedCategory === "" ? "카테고리 선택" : selectedCategory.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                subjectSelections.map((item, index) => {

                                                    return <Dropdown.Item key={index} eventKey={index}>{item}</Dropdown.Item>
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <div hidden={isValidCategory} className="text-danger">
                                        카테고리를 선택해주세요.
                                    </div>
                                    {/* <Form.Control.Feedback type="invalid">
                                        카테고리를 선택해주세요.
                                    </Form.Control.Feedback> */}
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-middle">제목</th>
                                <td className="pr-0">
                                    <label className="d-block d-lg-none">
                                        제목
                                    </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="제목 입력 20자 이내"
                                        maxLength={20}
                                        onChange={onChangeTitle}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                        제목을 입력해주세요.
                                    </Form.Control.Feedback> */}
                                    <div hidden={isValidTitle} className="text-danger">
                                        제목을 입력해주세요.
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-top">내용</th>
                                <td className="pr-0 pb-0">
                                    <label className="d-block d-lg-none">
                                        내용
                                    </label>
                                    <Form.Control
                                        as="textarea"
                                        rows={10}
                                        placeholder="내용 입력"
                                        onChange={onChangeContent}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                        내용을 입력해주세요.
                                    </Form.Control.Feedback> */}
                                    <div hidden={isValidContent} className="text-danger">
                                        내용을 입력해주세요.
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="text-right">
                        <Button
                            type="submit"
                            variant="b400"
                            className="btw-290"
                        >
                            신청하기
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}
