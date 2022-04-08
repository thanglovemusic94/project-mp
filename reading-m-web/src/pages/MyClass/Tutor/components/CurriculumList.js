import React from 'react'
import { DAY_OF_WEEK, TIME_OF_DAY } from "constants/datetime.constants";
import { Form, Button } from "react-bootstrap";
import { COMPONENT_MODE } from '../TutorOpenClassBook';
import { ClassType } from 'constants/class.constants';

export default function CurriculumList({ itemType, mode, source, onItemAdded, onItemDeleted, callbacks }) {
    const hideAddCurriculumButton = !(itemType === ClassType.GoalClass.value && mode === COMPONENT_MODE.CREATE);

    function handleDelete(index) {

        if (onItemDeleted)
            onItemDeleted(index)
    }

    function handleAdd() {

        if (onItemAdded)
            onItemAdded()
    }

    return (
        <>
            <section className="box-section border-top-bottom">
                {
                    source.map((item, index) => {
                        const indexNum = item.week ? item.week : index + 1;
                        let formattedDateTimeString = "";
                        
                        const formatter = (raw) => {
                            return raw.toString().padStart(2, '0')
                        }
                        
                        if (item.start && item.end) {
                            const itemStartDate = new Date(item.start);
                            const itemEndDate = new Date(item.end);

                            const date = `${itemStartDate.getFullYear()}.${itemStartDate.getMonth() + 1}.${itemStartDate.getDate()}`

                            const dayOfWeekName = DAY_OF_WEEK[itemStartDate.getDay()].name;
                            const timeOfDayName = itemStartDate.getHours() <= 12 ? TIME_OF_DAY[0].name : TIME_OF_DAY[1].name;

                            const varTime = itemStartDate.getHours() <= 12 ? 0 : 12;
                            
                            const fromHour = formatter(itemStartDate.getHours() - varTime);
                            const toHour = formatter(itemEndDate.getHours() - varTime);
                            const fromMinute = formatter(itemStartDate.getMinutes());
                            const toMinute = formatter(itemEndDate.getMinutes());

                            formattedDateTimeString = 
                                `${date} ${dayOfWeekName} ${timeOfDayName} ${fromHour}시${fromMinute}분 ~ ${toHour}시${toMinute}분`
                        }

                        let bookTitle = "";
                        let bookWriter = "";
                        let bookPublisher = "";

                        if (itemType === ClassType.TextBookClass.value) {
                            bookTitle = item.title ? item.title : item.book.title;
                            bookWriter = item.writer ? item.writer : item.book.author;
                            bookPublisher = item.publisher ? item.publisher : item.book.publisher;
                        }

                        const empty = "";

                        return (
                            <div key={`CurriculumBooks_item_${ index }`} className="box-w612 py-lg-5">
                                <div className="text-right">
                                    <Button
                                        variant="g700"
                                        size="sm"
                                        className="btn-square btw-100 mb-2"
                                        onClick={ (e) => handleDelete(index) }
                                        hidden={ hideAddCurriculumButton === true || index === 0 }
                                    >
                                        삭제
                                    </Button>
                                </div>
                                <div className="d-lg-flex">
                                    <div className="flex-grow-1">
                                        <label className="label-week m500">
                                            {
                                                itemType === ClassType.TextBookClass.value ? 
                                                    `${ indexNum }주차 `
                                                    :
                                                    `${ indexNum }일차`
                                            }
                                        </label>
                                    </div>
                                    <div className="ipw-488">
                                        <Form.Group>
                                            <Form.Label>{ indexNum }주차 수업일시</Form.Label>
                                            <div className="d-flex">
                                                <div className="flex-grow-1 mr-1">
                                                    <div className="input-icon-group">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="수업 일시 선택"
                                                            size="sm"
                                                            value={ formattedDateTimeString }
                                                            onChange={() => {}}
                                                            required
                                                        />
                                                        <i className="lcicon-close-black d-none"></i>
                                                    </div>

                                                    <Form.Control.Feedback type="invalid">
                                                        수업일시를 선택해주세요.
                                                    </Form.Control.Feedback>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="g700"
                                                        size="sm"
                                                        className="btn-square btw-120  d-none d-lg-block"
                                                        onClick={ () => callbacks.handleClassDateTimeOpenModal(index) }
                                                    >
                                                        수업일시 선택
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="g700"
                                                        size="sm"
                                                        className="btn-square btw-120 d-block d-lg-none"
                                                        onClick={ callbacks.showDateTimePopup }
                                                    >
                                                        선택
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form.Group>

                                        {
                                            itemType === ClassType.TextBookClass.value ?
                                            <div className="box-gray mb-3" hidden={ itemType === ClassType.GoalClass.value }>
                                                <ul>
                                                    <li>
                                                        <span>수업도서</span> : { bookTitle }
                                                    </li>
                                                    <li>
                                                        <span>지은이</span> : { bookWriter }
                                                    </li>
                                                    <li>
                                                        <span>출판사</span> : { bookPublisher }
                                                    </li>
                                                </ul>
                                            </div>
                                            :
                                            <Form.Group>
                                                <Form.Label>
                                                    { indexNum }일차 수업명
                                                </Form.Label>
                                                <div className="ipw-488">
                                                    <Form.Control
                                                        name="name"
                                                        type="text"
                                                        placeholder="수업명 입력 "
                                                        value={ item.name }
                                                        onChange={ (e) => callbacks.handleWeekChange(e, index) }
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        수업명을 입력해주세요.
                                                    </Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        }

                                        <Form.Group>
                                            <Form.Label>{ indexNum }주차 수업 내용</Form.Label>
                                            <div className="ipw-488">
                                                <Form.Control
                                                    name="content"
                                                    as="textarea"
                                                    rows={5}
                                                    placeholder="수업 내용 입력"
                                                    value={ item.content }
                                                    onChange={ (e) => callbacks.handleWeekChange(e, index) }
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    수업 내용을 입력해주세요.
                                                </Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>{ indexNum }주차 준비</Form.Label>
                                            <div className="ipw-488">
                                                <Form.Control
                                                    name="material"
                                                    type="text"
                                                    placeholder="준비 내용 입력"
                                                    value={ item.material }
                                                    onChange={ (e) => callbacks.handleWeekChange(e, index) }
                                                    required
                                                    size="sm"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    준비 내용을 입력해주세요.
                                                </Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                        {
                                            item.canReadNewsPaper === true
                                            ?
                                            <Form.Group>
                                                <div className="d-flex">
                                                    <div className="flex-grow-1 mr-1">
                                                        <div className="input-icon-group">
                                                            <Form.Control
                                                                plaintext
                                                                size="sm"
                                                                value={ item.newsPaper ? item.newsPaper.title : empty }
                                                            />
                                                            <i className="lcicon-close-black"
                                                                onClick={ (e) => callbacks.removeSelectedNewspaper(e, index) }
                                                            ></i>
                                                        </div>
                                                    </div>
                                                    <div className="text-right" 
                                                        hidden={ itemType === ClassType.GoalClass.value }>
                                                        <Button
                                                            variant="g700"
                                                            size="sm"
                                                            className="btn-square btw-120"
                                                            onClick={ () => callbacks.handleShowNewspaperPopup(index) }
                                                        >
                                                            신문칼럼 선택
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Form.Group>
                                            : <></>
                                        }
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button
                                        variant="g700"
                                        className="btn-add btw-224"
                                        onClick={ handleAdd }
                                        hidden={ hideAddCurriculumButton === true }
                                    >
                                        <i className="lcicon-plus-alt"></i>
                                        일차 추가
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                }                        
            </section>

            <div className="text-right" hidden={ mode === COMPONENT_MODE.CREATE || hideAddCurriculumButton === true }>
                <Button
                    variant="g700"
                    className="btw-184 btn-icon mt-3"
                    size="sm"
                    onClick={ callbacks.turnCurriculumsRearrangeModeOn }
                >
                    <i className="lcicon-sort"></i> 주차 변경하기
                </Button>
            </div>

            <div className="text-center mt-5">
                <Button
                    variant="p500"
                    className="btw-386"
                    type="submit"
                >
                    개설하기
                </Button>
            </div>
        </>
    )
}