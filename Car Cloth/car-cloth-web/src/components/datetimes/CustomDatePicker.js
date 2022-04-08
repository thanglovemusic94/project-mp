import { forwardRef, useEffect, useState } from "react";
import { Fade } from "react-bootstrap";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { LeftArrowIcon, RightArrowIcon } from "../../assets/svgs/Icons";

function CustomDatePicker({
  renderCustomHeader,
  customInput,
  calendarContainer,
  ...props
}) {
  const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <div onClick={onClick} ref={ref}>
      {value}
    </div>
  ));

  const CustomContainer = ({ className, children }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      setOpen(!open);
      // eslint-disable-next-line
    }, []);

    return (
      <Fade in={open}>
        <div className="bg-blue-50 p-2 mt-2 rounded shadow-sm">
          <CalendarContainer
            className={`${className} border-0 rounded px-3 py-2`}
          >
            <div style={{ position: "relative" }}>{children}</div>
          </CalendarContainer>
        </div>
      </Fade>
    );
  };

  const customHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="d-flex justify-content-between align-items-center px-3 mb-3 text-black-800">
      <span onClick={decreaseMonth}>
        <LeftArrowIcon />
      </span>
      <span className="font-noto fw-bold fs-17">
        {date.getMonth() + 1}월 {date.getFullYear()}년
      </span>
      <span onClick={increaseMonth}>
        <RightArrowIcon />
      </span>
    </div>
  );

  return (
    <>
      <DatePicker
        renderCustomHeader={
          renderCustomHeader ? renderCustomHeader : customHeader
        }
        customInput={customInput ? customInput : <CustomDatePickerInput />}
        calendarContainer={
          calendarContainer ? calendarContainer : CustomContainer
        }
        minDate={new Date()}
        fixedHeight
        {...props}
      />
    </>
  );
}

export default CustomDatePicker;
