import { useState } from "react";
import { useAccordionButton } from "react-bootstrap";
import { CollapseIcon, ExpandIcon } from "../../assets/svgs/Icons";

function CAccordionToggle({ children, eventKey }) {
    const [toggle, setToggle] = useState(true);

    const decoratedOnClick = useAccordionButton(eventKey, () => {
        setToggle(!toggle);
    });

    return (
        <>
            <div
                className="d-inline-block pe-1 fw-bold fs-12 text-black-600"
                onClick={decoratedOnClick}
            >
                {children}
            </div>
            {
                toggle === true
                    ? <CollapseIcon />
                    : <ExpandIcon />
            }
        </>
    );
}

export default CAccordionToggle;