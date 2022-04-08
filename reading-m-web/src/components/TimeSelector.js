import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { HOUR_AVAILABLE, MINUTE_AVAILABLE } from 'constants/datetime.constants'

const TimeSelector = ({ selectedTime, onChange }) => {
    const { hour, minute } =
        selectedTime !== undefined ? selectedTime : { hour: null, minute: null }

    function handleHourSelect(val) {
        if (onChange !== undefined) onChange({ ...selectedTime, hour: val })
    }

    function handleMinuteSelect(val) {
        if (onChange !== undefined) onChange({ ...selectedTime, minute: val })
    }

    return (
        <>
            <div className="col-6 col-lg-auto px-1 mb-2">
                <Dropdown
                    className="form-control-dropdown ipw-152"
                    onSelect={(k, e) => handleHourSelect(k)}
                >
                    <Dropdown.Toggle id="dropdown" variant="" size="sm">
                        {hour === null ? '희망 시간 선택' : `${hour}시`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {HOUR_AVAILABLE.map((item, index) => {
                            return (
                                <Dropdown.Item key={index} eventKey={item}>
                                    {item}시
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="col-6 col-lg-auto px-1 mb-2">
                <Dropdown
                    className="form-control-dropdown ipw-152"
                    onSelect={(k, e) => handleMinuteSelect(k)}
                >
                    <Dropdown.Toggle id="dropdown" variant="" size="sm">
                        {minute === null ? '희망 시간 선택' : `${minute}분`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {MINUTE_AVAILABLE.map((item, index) => {
                            return (
                                <Dropdown.Item key={index} eventKey={item}>
                                    {item}분
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    )
}

export default TimeSelector
