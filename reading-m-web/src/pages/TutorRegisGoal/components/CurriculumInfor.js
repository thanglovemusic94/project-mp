import RemovableItem from 'components/common/RemovableItem'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const CurriculumInfor = ({ onDataChange, onFinish }) => {
    const [data, setData] = useState({
        curriculum: [],
        materials: null,
        minutesPerDay: null,
        totalDays: null,
    })

    const [curriculumContent, setCurriculumContent] = useState(null)

    const [validated, setValidated] = useState(false)

    function handleCurriculumAdd() {
        let items = [...data.curriculum]

        items.push(curriculumContent)

        setData({ ...data, curriculum: [...items] })
    }

    function handleCurriculumRemove(index) {
        let items = [...data.curriculum]

        items.splice(index, 1)

        setData({ ...data, curriculum: [...items] })
    }

    const handleNext = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const form = event.currentTarget

        if (form.checkValidity() === true) {
            if (onFinish !== undefined) onFinish()

            if (onDataChange !== undefined)
                onDataChange({ curriculumInfo: { ...data } })
        }

        setValidated(true)
    }

    return (
        <>
            <div className="curriculum-infor-section">
                <Form noValidate validated={validated} onSubmit={handleNext}>
                    <section className="box-section">
                        <div className="box-w612">
                            <div className="box-label">
                                LiveClass 목적 지도교사
                            </div>
                            <div className="box-title">
                                <h3>커리큘럼 정보</h3>
                                <p className="mb-0 font-18">
                                    차시별로 수업하실 내용에 대하여
                                    입력해주세요.
                                </p>
                                <p className="text-g500">
                                    커리큘럼은 추후 협의에 따라 얼마든지 수정이
                                    가능하니 편하게 입력해주세요.
                                </p>
                                <p className="text-danger">
                                    *커리큘럼 정보는 필수 입력 사항입니다.
                                </p>
                            </div>
                            <Form.Group className="d-md-flex">
                                <Form.Label>
                                    총 일차{' '}
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <div className="input-btn-group ipw-488">
                                    <div className="d-flex-grow-1">
                                        <Form.Control
                                            className="ipw-240"
                                            type="number"
                                            min={0}
                                            placeholder="총 일차 입력"
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    totalDays: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            총 일차를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                    <label className="mt-3 ml-3">일차</label>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-md-flex">
                                <Form.Label>
                                    일차별 <br /> 소요 시간{' '}
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <div className="input-btn-group ipw-488">
                                    <div className="d-flex-grow-1">
                                        <Form.Control
                                            className="ipw-240"
                                            type="number"
                                            min={0}
                                            placeholder="일차별 소요 시간 입력"
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    minutesPerDay:
                                                        e.target.value,
                                                })
                                            }
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            일차별 소요 시간을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                    <label className="mt-3 ml-3">분</label>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-md-flex">
                                <Form.Label>
                                    커리큘럼{' '}
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <div className="input-btn-group ipw-488">
                                    <div className="flex-grow-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="커리큘럼 입력. 예시) 제 1일차 독서와 토론"
                                            onChange={(e) =>
                                                setCurriculumContent(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            커리큘럼을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="g700"
                                        className="btn-add"
                                        onClick={handleCurriculumAdd}
                                    >
                                        <i className="lcicon-plus-alt"></i>
                                        커리큘럼 추가
                                    </Button>
                                </div>
                            </Form.Group>
                            <div
                                className="datetime-list"
                                hidden={data.curriculum.length === 0}
                            >
                                <ul className="reset-list">
                                    {data.curriculum.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <RemovableItem
                                                    source={item}
                                                    onDelete={() =>
                                                        handleCurriculumRemove(
                                                            index
                                                        )
                                                    }
                                                ></RemovableItem>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <Form.Group className="d-md-flex align-items-start">
                                <Form.Label>
                                    학생 준비물{' '}
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <div>
                                    <Form.Control
                                        className="ipw-488"
                                        as="textarea"
                                        rows={5}
                                        placeholder="학생 준비물 입력 예시) 특별히 필요한 재료 및 구입해야 하는 교재 등"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                materials: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        학생 준비물을 입력해주세요.
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

export default CurriculumInfor
