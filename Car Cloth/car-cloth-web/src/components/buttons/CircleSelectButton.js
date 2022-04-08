import { useState } from "react";
import { CircleCheckedIcon, CircleUncheckedIcon } from "../../assets/svgs/Icons";

function CircleSelectButton({ className, checked, onChecked }) {
    const [selfChecked, setSelfChecked] = useState(false);

    function handleCheck() {

        if (onChecked)
            onChecked(!checked);
        else
            setSelfChecked(!selfChecked);
    }

    return (
        <>
            <div className={className} onClick={handleCheck}>
                {
                    (checked ?? selfChecked) === true ? <CircleCheckedIcon /> : <CircleUncheckedIcon />
                }
            </div>
        </>
    );
}

export default CircleSelectButton;