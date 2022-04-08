import CustomDropdown from 'components/CustomDropdown'
import LCPagination from 'components/LCPagination'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { NewspaperService } from 'services/NewspaperService'

const SUBJECT_SELECTIONS = [
    { "label": "전체", "value": "ALL" },
    { "label": "인문", "value": "HUMANITY" },
    { "label": "사회", "value": "SOCIETY" },
    { "label": "과학", "value": "SCIENCE" },
    { "label": "기술", "value": "TECHNOLOGY" },
    { "label": "예술", "value": "ART" },
    { "label": "언어", "value": "LANGUAGE" },
    { "label": "생활", "value": "LIFE" },
]


export default function ModalNewspaperColumn(props) {
    const [newspaperData, setNewspaperData] = useState({
        "content": [],
        "totalPages": 0
    })

    const [pageable, setPageable] = useState({
        "page": 0,
        "size": 10
    })

    const [filter, setFilter] = useState({
        "field": "",
        "title": "",
        "author": ""
    })

    useEffect(() => {

        NewspaperService.getNewspapers(pageable).then((resp) => {

            if (resp.status === 200) {
                
                setNewspaperData(resp.data);
            }
        })
    }, [pageable])

    function handleChangePage(newPageNum) {
        
        setPageable({ ...pageable, "page": newPageNum });
    }

    function handleChange(ev, val) {
        const { name, value, text } = ev.target;

        if (name === "field") {
            // Use text value here because the backend directly used the data (in Korean) from RAMS.
            // Need to change later
            setFilter({ ...filter, [name]: text });
        } else {
            setFilter({ ...filter, [name]: value });
        }
    }

    function handleFilter() {
        
        NewspaperService.getNewspapersWithFilter(pageable, filter).then((resp) => {

            if (resp.status === 200) {

                setNewspaperData(resp.data)
            }
        })
    }

    function handleItemSelected(item) {

        if (props.onSelect) {
            props.onSelect(item);
        }

        props.setShow(false);
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => props.setShow(false)}
                dialogClassName="modalh-800"
                size="xl"
                centered
            >
                <Modal.Header className="bg-transparent">
                    <label className="label-header">신문칼럼 선택</label>
                </Modal.Header>
                <Modal.Body scrollable="true">
                    <div className="modal-newpage">
                        <div className="modal-body-inner">
                            <div className="d-lg-flex mb-3">
                                <CustomDropdown
                                    name="field"
                                    className="ipw-184 mr-2 tcol-40 mb-2 mb-lg-0"
                                    items={ SUBJECT_SELECTIONS }
                                    onChange={ handleChange }
                                    sizeToggle="sm"
                                />
                                <div className="input-icon-group ipw-349 mr-3 mb-2 mb-lg-0 w-100">
                                    <Form.Control
                                        name="title"
                                        type="text"
                                        placeholder="표제어를 입력하세요."
                                        size="sm"
                                        onChange={ handleChange }
                                    />
                                    <i className="lcicon-search"></i>
                                </div>
                                <div className="input-icon-group ipw-349 mr-3 mb-2 mb-lg-0 w-100">
                                    <Form.Control
                                        name="author"
                                        type="text"
                                        placeholder="작성자를 입력하세요."
                                        size="sm"
                                        onChange={ handleChange }
                                    />
                                    <i className="lcicon-search"></i>
                                </div>
                                <Button
                                    variant="g700"
                                    size="sm"
                                    className="btn-square flex-grow-1"
                                    onClick={ handleFilter }
                                >
                                    검색
                                </Button>
                            </div>
                            <div className="tablelist tablelist-inpopup g700">
                                <div className="tablelist-header">
                                    <div className="tcol-md-5 tcol-10">
                                        번호
                                    </div>
                                    <div className="tcol-md-95 tcol-90">
                                        <div className="tcol-md-15 tcol-30">
                                            일자
                                        </div>
                                        <div className="tcol-md-15 tcol-20">
                                            신문사
                                        </div>
                                        <div className="tcol-md-10 tcol-20">
                                            주제
                                        </div>
                                        <div className="tcol-md-15 tcol-30">
                                            작성일
                                        </div>
                                        <div className="tcol-30 d-none d-lg-block">
                                            표제
                                        </div>
                                        <div className="tcol-15 d-none d-lg-block">
                                            작성자
                                        </div>
                                    </div>
                                </div>
                                <div className="tablelist-body text-center">
                                    {
                                        newspaperData.content.map((item, index) => {
                                            const indexNum = index + 1;

                                            return (
                                                <div key={`NewspaperData_content_item_${ index }`} 
                                                    className="tablelist-row pointer"
                                                    onClick={() => handleItemSelected(item)}
                                                >
                                                    <div className="tcol-md-5 tcol-10">
                                                        { indexNum }
                                                    </div>
                                                    <div className="tcol-md-95 tcol-90">
                                                        <div className="tcol-md-15 tcol-30">
                                                            { item.date }
                                                        </div>
                                                        <div className="tcol-md-15 tcol-20">
                                                            { item.company }
                                                        </div>
                                                        <div className="tcol-md-10 tcol-20">
                                                            { item.field }
                                                        </div>
                                                        <div className="tcol-md-15 tcol-30">
                                                            { item.createdDate ? item.createdDate : "n/a" }
                                                        </div>
                                                        <div className="tcol-md-30 tcol-70 bd-top-newpage">
                                                            { item.title }
                                                        </div>
                                                        <div className="tcol-md-15 tcol-30 bd-top-newpage">
                                                            { item.author ? item.author : "n/a" }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="pagination-wrapper d-flex justify-content-center my-5">
                                <LCPagination
                                    pageNumber={ pageable.page }
                                    totalPage={ newspaperData.totalPages }
                                    onPageChange={ handleChangePage }
                                />
                            </div>
                            <div className="text-center mt-5">
                                <Button
                                    variant="p500"
                                    className="btw-386"
                                    onClick={() => props.setShow(false)}
                                >
                                    취소
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
