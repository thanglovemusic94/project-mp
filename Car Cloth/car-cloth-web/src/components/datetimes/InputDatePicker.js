import CustomDatePicker from "./CustomDatePicker";
import {ExpandIcon} from "../../assets/svgs/Icons";
import {forwardRef} from "react";

const InputDatePicker = (props) => {
    const CustomDatePickerInput =   forwardRef(({value, onClick}, ref) => (
        <div
             onClick={onClick}
             ref={ref}
             className={`${props.className} d-flex justify-content-between align-items-center border border-1 border-black-700 rounded-8px p-12px w-100 text-black-800 lh-21`}>
            <div>{value}</div>
            <ExpandIcon/>
        </div>
    ))

    return (
        <>
           <CustomDatePicker
                dateFormat={props.dateFormat ?? "yyyy-MM-dd"}
                selected={props.selected}
                onChange={props.onChange}
                customInput={<CustomDatePickerInput/>}
                {...props}
           />
        </>
    )
}

export default InputDatePicker
