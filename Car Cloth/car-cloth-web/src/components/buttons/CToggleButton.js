import Button from "@restart/ui/esm/Button";
import { useState } from "react";

function CToggleButton({ children, checked, value, onChange, className }) {
    const [innerChecked, setInnerChecked] = useState(false);

    function selfToggle() {
        setInnerChecked(!innerChecked);
    }

    function handleToggle() {
        if (checked === undefined || checked === null) selfToggle();

        if (onChange)
            onChange(!(checked ?? innerChecked), value);
    }

    return (
        <Button
            className={`btn-toggle ${(checked ?? innerChecked) === true ? "toggled" : ""} py-1 ${className}`}
            onClick={handleToggle}
        >
            {children}
        </Button>
    );
}

export default CToggleButton;