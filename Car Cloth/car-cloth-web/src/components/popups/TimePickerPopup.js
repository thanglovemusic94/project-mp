import { useState } from "react";
import { Modal } from "react-bootstrap";
import { CollapseIcon, ExpandIcon } from "../../assets/svgs/Icons";
import { Localizations } from "../../texts/Localizations";


function TimePickerPopup({ show, onShow, dateNow, onTimeSelected }) {
    const maxHour = 11;
    const maxMinute = 50;
    const addMinuteAmount = 10;

    let hours = dateNow.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12;

    const [hour, setHour] = useState(hours);
    const [minute, setMinute] = useState(dateNow.getMinutes());
    const [isDay, setIsDay] = useState(dateNow.getHours() < 12 ? true : false);

    function selfToggle() {
        onShow(!show);
    }

    function addHour(amount) {
        const nextHour = hour + amount;

        if (nextHour < 0) {
            setHour(maxHour);
            setIsDay(!isDay)
        } else if (nextHour > maxHour) {
            setHour(0);
            setIsDay(!isDay)
        } else {
            setHour(nextHour);
        }
    }

    function addMinute(amount) {
        const nextMinute = minute + amount;

        if (nextMinute < 0) {
            setMinute(maxMinute);
        } else if (nextMinute > maxMinute) {
            setMinute(0);
        } else {
            setMinute(nextMinute);
        }
    }

    function changeTimePeriod() {
        setIsDay(!isDay);
    }

    function quickTimeFormat(time) {
        return `${time}`.padStart(2, "0");
    }

    function handlePopupExited() {
        let nextDate = new Date();

        nextDate.setHours(hour + (isDay === true ? 0 : 12));
        nextDate.setMinutes(minute);

        if (onTimeSelected) {
            onTimeSelected(nextDate);
        }
    }

    return (
        <Modal
            show={show}
            onHide={selfToggle}
            backdropClassName="bg-transparent"
            contentClassName="border-0 mx-4"
            centered
            onExited={handlePopupExited}
        >
            <Modal.Body className="bg-blue-50 rounded-3 p-2">
                <div className="d-flex bg-white rounded-3 shadow-sm time-picker-popup-content">
                    <div className="d-flex flex-column flex-fill h-100 justify-content-evenly align-items-center">
                        <div onClick={() => addHour(1)}>
                            <CollapseIcon />
                        </div>
                        <span className="fs-30">{quickTimeFormat(hour)}</span>
                        <div onClick={() => addHour(-1)}>
                            <ExpandIcon />
                        </div>
                    </div>
                    <div className="fs-30 align-self-center">:</div>
                    <div className="d-flex flex-column flex-fill h-100 justify-content-evenly align-items-center">
                        <div onClick={() => addMinute(addMinuteAmount)}>
                            <CollapseIcon />
                        </div>
                        <span className="fs-30">{quickTimeFormat(minute)}</span>
                        <div onClick={() => addMinute(-addMinuteAmount)}>
                            <ExpandIcon />
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-fill h-100 justify-content-evenly align-items-center">
                        <div onClick={() => changeTimePeriod()}>
                            <CollapseIcon />
                        </div>
                        <span className="fs-25 text-black-500">
                            {isDay === true ? Localizations.Common.AM : Localizations.Common.PM}
                        </span>
                        <div onClick={() => changeTimePeriod()}>
                            <ExpandIcon />
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default TimePickerPopup