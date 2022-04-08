import React, { useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'

const CLASS_CATEGORY = [
    { name: '카테고리 선택', value: null },
    { name: '국어 독서 논술', value: 'ESSAY' },
    { name: '영수사과', value: 'SUBJECT' },
    { name: '학교수행', value: 'SCHOOL_EXEC' },
    { name: '상담기타', value: 'CONSUL_N_OTHERS' },
]

const CLASS_LEVEL = [
    { name: '수준 선택', value: null },
    { name: '최상', value: 'TOP' },
    { name: '중상', value: 'ADVANCED' },
    { name: '중하', value: 'INTERMEDIATE' },
    { name: '최하', value: 'LOW' },
    { name: '무관', value: 'NONE' },
]

const ClassInfor = ({ onDataChange, onFinish }) => {
    const [selectedCategory, setSelectedCategory] = useState(CLASS_CATEGORY[0])
    const [selectedLevel, setSelectedLevel] = useState(CLASS_LEVEL[0])

    const [validated, setValidated] = useState(false)

    function handleCategorySelect(val) {
        setSelectedCategory(CLASS_CATEGORY[val])
        onDataChange({ category: CLASS_CATEGORY[val].value })
    }
    console.log(selectedCategory)
    function handleLevelSelect(val) {
        setSelectedLevel(CLASS_LEVEL[val])
        onDataChange({ level: CLASS_LEVEL[val].value })
    }
    console.log(selectedLevel)
    const handleNext = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const form = event.currentTarget

        if (form.checkValidity() === true && selectedCategory.value !== null && selectedLevel.value !== null) {
            if (onFinish !== undefined) onFinish()
        }

        setValidated(true)
    }

    return (
        <>
            <div className="classinfor-section">
                <Form noValidate validated={validated} onSubmit={handleNext}>
                    <section className="box-section">
                        <div className="box-w612">
                            <div className="box-label">
                                LiveClass 목적 지도교사
                            </div>
                            <div className="box-title">
                                <h3>수업 기본 정보</h3>
                                <p className="mb-0 font-18">
                                    간단하게 개설하고자 하는 수업에 대해
                                    알려주세요.
                                </p>
                                <p className="text-g500">
                                    입력하신 정보는 선생님께서 할 수업을 정성
                                    들여 서포트 할 수 있도록 도움이 됩니다.
                                </p>
                                <p className="text-danger">
                                    *수업 기본 정보는 필수 입력 사항입니다.
                                </p>
                            </div>

                            <Form.Group className="d-lg-flex">
                                <Form.Label>
                                    카테고리{' '}
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <div className="ipw-488">
                                    <Dropdown
                                        className="form-control-dropdown"
                                        onSelect={(k, e) =>
                                            handleCategorySelect(k)
                                        }
                                    >
                                        <Dropdown.Toggle
                                            id="dropdown"
                                            className=""
                                            variant=""
                                        >
                                            {selectedCategory.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {CLASS_CATEGORY.map(
                                                (item, index) => {
                                                    return (
                                                        <Dropdown.Item
                                                            key={index}
                                                            eventKey={index}
                                                        >
                                                            {item.name}
                                                        </Dropdown.Item>
                                                    )
                                                }
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Form.Control.Feedback type={"invalid"} className={(validated === false || selectedCategory.value !== null) ? 'd-none': 'd-block'}>
                                        카테고리를 선택해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>
                                    수준 <span className="text-danger">*</span>
                                </Form.Label>
                                <div className="ipw-488">
                                    <Dropdown
                                        className="form-control-dropdown"
                                        onSelect={(k, e) =>
                                            handleLevelSelect(k)
                                        }
                                    >
                                        <Dropdown.Toggle
                                            id="dropdown"
                                            className=""
                                            variant=""
                                        >
                                            {selectedLevel.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {CLASS_LEVEL.map((item, index) => {
                                                return (
                                                    <Dropdown.Item
                                                        key={index}
                                                        eventKey={index}
                                                    >
                                                        {item.name}
                                                    </Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Form.Control.Feedback type={"invalid"} className={(validated === false || selectedLevel.value !== null) ? 'd-none': 'd-block'}>
                                        수준을 선택해주세요.
                                    </Form.Control.Feedback>

                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>
                                    제목 <span className="text-danger">*</span>
                                </Form.Label>
                                <div>
                                    <Form.Control
                                        className="ipw-488"
                                        type="text"
                                        placeholder="제목 입력. 20자 이내"
                                        onChange={(e) =>
                                            onDataChange({
                                                title: e.target.value,
                                            })
                                        }
                                        maxLength="20"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        제목을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>
                                    주제 <span className="text-danger">*</span>
                                </Form.Label>
                                <div>
                                    <Form.Control
                                        className="ipw-488"
                                        as="textarea"
                                        rows={5}
                                        placeholder="수업의 컨셉과 주요 내용 입력. 100자 이내 예시) 자신만의 공부 방법을 만드는 훈련 과정"
                                        onChange={(e) =>
                                            onDataChange({
                                                topic: e.target.value,
                                            })
                                        }
                                        maxLength="100"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        주제를 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </div>
                    </section>
                    <div className="text-center">
                        <Button
                            type="submit"
                            variant="p500"
                            className="btw-386 mt-5"
                        >
                            다음
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default ClassInfor
