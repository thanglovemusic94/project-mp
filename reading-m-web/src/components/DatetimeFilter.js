import React from 'react'
import { TIME_OF_DAY } from 'constants/datetime.constants'
import { Dropdown } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import TimeSelector from './TimeSelector'

function DatetimeFilter({ selectedDatetime, onChange }) {
    const { selectedDate, selectedTime, selectedTimeOfDay } =
        selectedDatetime !== undefined ? selectedDatetime : {}

    function handleDateChange(val) {
        handleChange({ selectedDate: val })
    }

    function handleTimeChange(val) {
        handleChange({ selectedTime: val })
    }

    function handleTimeOfDayChange(val) {
        handleChange({ selectedTimeOfDay: TIME_OF_DAY[val] })
    }

    function handleChange(val) {
        if (onChange !== undefined) onChange({ ...selectedDatetime, ...val })
    }

    return (
        <>
            <div className="col-6 col-lg-auto px-1 mb-2">
                <ReactDatePicker
                    selected={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                    className="datepicker-dark ipw-152 w-100"
                    placeholderText="YYYY.MM.DD"
                />
            </div>
            <div className="col-6 col-lg-auto px-1 mb-2">
                <Dropdown
                    className="form-control-dropdown ipw-100"
                    onSelect={(k, e) => handleTimeOfDayChange(k)}
                >
                    <Dropdown.Toggle id="dropdown" variant="" size="sm">
                        {selectedTimeOfDay !== null
                            ? selectedTimeOfDay.name
                            : '오전'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {TIME_OF_DAY.map((item, index) => {
                            return (
                                <Dropdown.Item key={index} eventKey={index}>
                                    {item.name}
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <TimeSelector
                selectedTime={selectedTime}
                onChange={handleTimeChange}
            />
        </>
    )
}

export default DatetimeFilter
