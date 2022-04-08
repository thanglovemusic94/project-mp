import React, { useEffect, useReducer, useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import CustomDropdown from 'components/CustomDropdown'
import { HOUR_AVAILABLE, MINUTE_AVAILABLE, TIME_OF_DAY } from 'constants/datetime.constants'

const HANDLE_CHANGE_SET_DATE = "ModalClassDateTime_HANDLE_CHANGE_SET_DATE";
const HANDLE_CHANGE_SET_TIME = "ModalClassDateTime_HANDLE_CHANGE_SET_TIME";
const HANDLE_CHANGE_RESET = "ModalClassDateTime_HANDLE_CHANGE_RESET";

const initialData = {
    "date": new Date(),
    "timeOfDay": TIME_OF_DAY[0].value,
    "fromHour": "",
    "toHour": "",
    "fromMinute": "",
    "toMinute": ""
}

const modalClassDateTimeReducer = (state, action) => {
    let newState = { }

    switch(action.type) {
        case HANDLE_CHANGE_SET_DATE:
            newState = { ...state, "date": action.value }

            return newState;

        case HANDLE_CHANGE_SET_TIME:
            newState = { ...state, [action.name]: action.value }

            return newState;

        case HANDLE_CHANGE_RESET:

            return initialData;

        default:
            throw new Error();
    }
}

export default function ModalClassDateTime(props) {
    const [data, setData] = useReducer(modalClassDateTimeReducer, initialData);

    const [validated, setValidated] = useState(false);

    useEffect(() => {

        if (props.selectedClassDateTime) {
            const propsSelectedClassDateTime = props.selectedClassDateTime;
            
            if (Object.keys(propsSelectedClassDateTime).indexOf("start") !== -1) {
                let startDateTime = new Date(propsSelectedClassDateTime.start);
                let endDateTime = new Date(propsSelectedClassDateTime.end);
                
                const varTime = startDateTime.getHours() > 12 ? 12 : 0;
        
                startDateTime.setHours(startDateTime.getHours() - varTime);
                endDateTime.setHours(endDateTime.getHours() - varTime);
        
                setData({ "type": HANDLE_CHANGE_SET_DATE, "value": startDateTime });
                setData({ 
                    "type": HANDLE_CHANGE_SET_TIME, 
                    "name": "timeOfDay", 
                    "value": varTime > 0 ? getTimeOfDaySelections()[1].value : getTimeOfDaySelections()[0].value
                });
                setData({ "type": HANDLE_CHANGE_SET_TIME, "name": "fromHour", "value": startDateTime.getHours() })
                setData({ "type": HANDLE_CHANGE_SET_TIME, "name": "toHour", "value": endDateTime.getHours() })
                setData({ "type": HANDLE_CHANGE_SET_TIME, "name": "fromMinute", "value": startDateTime.getMinutes() })
                setData({ "type": HANDLE_CHANGE_SET_TIME, "name": "toMinute", "value": endDateTime.getMinutes() })
            }
        }
    }, [props.selectedClassDateTime])

    function getTimeOfDaySelections() {
        let options = []
    
        for (const item of TIME_OF_DAY) {
            let option = { "label": item.name, "value": item.value }
    
            options.push(option);
        }
        
        return options;
    }

    function getHourAvailableSelections() {
        let options = []
    
        options.push({ "label": "희망 시간 선택", "value": "" })

        for (const item of HOUR_AVAILABLE) {
            let option = { "label": `${item}시`, "value": item }
    
            options.push(option);
        }
        
        return options;
    }

    function getMinuteAvailableSelections() {
        let options = []
    
        options.push({ "label": "희망 시간 선택", "value": "" })

        for (const item of MINUTE_AVAILABLE) {
            let option = { "label": `${item}분`, "value": item }
    
            options.push(option);
        }
        
        return options;
    }

    function validateData() {

        if (data.fromHour === "") return false;
        if (data.toHour === "") return false;
        if (data.fromMinute === "") return false;
        if (data.toMinute === "") return false;

        return true;
    }

    function handleSelect() {

        if (validateData() === true) {

            setValidated(false);
            
            props.setShow(false);

            if (props.onSelect)
                props.onSelect(data);
        } else {
            setValidated(true);
        }
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={ () => props.setShow(false) }
                dialogClassName="modalw-386"
                centered
            >
                <Modal.Header className="justify-content-center">
                    <Modal.Title>LiveClass 책글 개설하기 </Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner bg-g100">
                        <Form
                        // validated={validated}
                        // onSubmit={handleSubmit}
                        // className="was-validated"
                        >
                            <ReactDatePicker
                                selected={data.date}
                                onChange={(date) => setData( { "type": HANDLE_CHANGE_SET_DATE, "value": date } )}
                                calendarClassName="calendar-inline"
                                inline
                            />

                            <CustomDropdown
                                name="timeOfDay"
                                className="ipw-100 mb-1 mt-3 tcol-45"
                                items={ getTimeOfDaySelections() }
                                onChange={(e, k) => setData( { "type": HANDLE_CHANGE_SET_TIME, "name": e.target.name, "value": k } )}
                                sizeToggle="sm"
                                selectedValue={ data.timeOfDay } 
                            />
                    
                            <div className="d-flex">
                                <CustomDropdown
                                    name="fromHour"
                                    className="ipw-152 mr-1 mb-1 tcol-45"
                                    items={ getHourAvailableSelections() }
                                    onChange={(e, k) => setData( { "type": HANDLE_CHANGE_SET_TIME, "name": e.target.name, "value": k } )}
                                    sizeToggle="sm"
                                    selectedValue={ data.fromHour }
                                />

                                <CustomDropdown
                                    name="fromMinute"
                                    className="ipw-152 mr-1 mb-1 tcol-45"
                                    items={ getMinuteAvailableSelections() }
                                    onChange={(e, k) => setData( { "type": HANDLE_CHANGE_SET_TIME, "name": e.target.name, "value": k } )}
                                    sizeToggle="sm"
                                    selectedValue={ data.fromMinute }
                                />
                                
                                <span className="date-divider">~</span>
                            </div>
                            <div className="d-flex">
                                <CustomDropdown
                                    name="toHour"
                                    className="ipw-152 mr-1 mb-1 tcol-45"
                                    items={ getHourAvailableSelections() }
                                    onChange={(e, k) => setData( { "type": HANDLE_CHANGE_SET_TIME, "name": e.target.name, "value": k } )}
                                    sizeToggle="sm"
                                    selectedValue={ data.toHour }
                                />

                                <CustomDropdown
                                    name="toMinute"
                                    className="ipw-152 mr-1 mb-1 tcol-45"
                                    items={ getMinuteAvailableSelections() }
                                    onChange={(e, k) => setData( { "type": HANDLE_CHANGE_SET_TIME, "name": e.target.name, "value": k } )}
                                    sizeToggle="sm"
                                    selectedValue={ data.toMinute }
                                />    
                            </div>
                            <p hidden={validated === false} >Please choose preferred time</p>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={() => props.setShow(false)}>
                        취소
                    </Button>
                    <Button variant="b500" onClick={ handleSelect }>
                        선택
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
