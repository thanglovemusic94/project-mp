import { DAY_OF_WEEK, TIME_OF_DAY } from 'constants/datetime.constants';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function CurriculumListRearrangeMode({ source, onFinish, onCancel }) {
    const [items, setItems] = useState([...source]);
    const [reason, setReason] = useState("");

    const [dragEnable, setDragEnable] = useState(false);
    const [validated, setValidated] = useState(false);

    function handleDrop(ev, index) {
        ev.preventDefault();

        var selectedIndex = ev.dataTransfer.getData("selectedIndex");

        let newItems = [...items]

        const extractMembers = (item) => {
            const { start, end, ...members } = item;

            return members;
        }

        const seletedItemMembers = extractMembers(newItems[selectedIndex]);
        const targetItemMembers = extractMembers(newItems[index]);

        newItems[index] = {
            ...newItems[index],
            ...seletedItemMembers
        }

        newItems[selectedIndex] = {
            ...newItems[selectedIndex],
            ...targetItemMembers
        }

        setItems(newItems);
    }

    function handleDragOver(ev) {
        ev.preventDefault();
    }

    function handleDragEnd() {
        setDragEnable(false);
    }

    function handleDragStart(ev, index) {
        ev.dataTransfer.setData("selectedIndex", index);
    }

    function handleDragToggle() {
        
        setDragEnable(!dragEnable);
    }

    function handleFinish() {

        if (reason.length > 0) {
            const data = {
                "curriculums": items,
                reason
            }
    
            if (onFinish)
                onFinish(data)
        }

        setValidated(true);
    }

    return (
        <>
            {
                items.map((item, index) => {
                    const weekNum = item.week ? item.week : index + 1;

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

                    return (
                        <section 
                            className="box-section boxsort mb-4"
                            draggable={ dragEnable }
                            onDragStart={ (ev) => handleDragStart(ev, index) } 
                            onDrop={ (ev) => handleDrop(ev, index) } 
                            onDragOver={ handleDragOver }
                            onDragEnd={ handleDragEnd }
                        >
                            <span className="btn-boxsort" onMouseDown={ handleDragToggle } onMouseUp={ handleDragToggle }>
                                <i className="lcicon-sort-1"></i>
                            </span>
                            <div className="box-w612">
                                <div className="d-lg-flex">
                                    <div className="flex-grow-1">
                                        <label className="label-week m500">
                                            { weekNum }주차 
                                        </label>
                                    </div>
                                    <div className="ipw-488">
                                        <Form.Group>
                                            <Form.Label>{ weekNum }주차 수업일시</Form.Label>
                                            <Form.Control
                                                plaintext
                                                readOnly
                                                value={ formattedDateTimeString }
                                            />
                                        </Form.Group>
                                        <div className="box-gray mb-3">
                                            <ul>
                                                <li>
                                                    <span>수업도서</span> : { item.book.title }
                                                </li>
                                                <li>
                                                    <span>지은이</span> : { item.book.author }
                                                </li>
                                                <li>
                                                    <span>출판사</span> : { item.book.publisher }
                                                </li>
                                            </ul>
                                        </div>
                                        <Form.Group>
                                            <Form.Label>{ weekNum }주차 수업 내용</Form.Label>
                                            <Form.Control
                                                plaintext
                                                readOnly
                                                value={ item.content }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>{ weekNum }주차 준비</Form.Label>
                                            <Form.Control
                                                plaintext
                                                readOnly
                                                value={ item.material }
                                            />
                                        </Form.Group>
                                        <div className="newspaper-selected">
                                            <span>{ item.newPaper.title }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                })
            }
            
            <div className="box-w590 text-center mt-5">
                <Form.Group>
                    <Form.Label className="mb-4">
                        수정 사유 입력
                    </Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        isValid={ validated === true && reason.length > 0 }
                        isInvalid={ validated === true && reason.length === 0 }
                        value={ reason }
                        onChange={ (ev) => setReason(ev.target.value) }
                        placeholder="수정 사유 입력"
                    />
                    <Form.Control.Feedback type="invalid">
                        수정 사유를 입력해주세요.
                    </Form.Control.Feedback>
                </Form.Group>
            </div>
            <div className="text-center d-flex d-lg-block mt-5">
                <Button 
                    variant="g500" 
                    className="btw-290"
                    onClick={ onCancel }
                >
                    취소
                </Button>
                <Button
                    variant="p500"
                    className="btw-290 ml-1"
                    onClick={ handleFinish }
                >
                    주차 변경완료
                </Button>
            </div>
        </>
    )
}