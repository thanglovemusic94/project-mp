import { useEffect, useRef } from "react";

function SquareButton({ squareClassName, titleClassName, children, icon, ...props }) {
    const selfRef = useRef(0);

    useEffect(() => {

        if (selfRef.current.clientWidth) {
            let clientWidth = selfRef.current.clientWidth;
            let clientHeight = selfRef.current.clientHeight;

            if (clientWidth !== clientHeight) {
                selfRef.current.style.height = clientWidth + "px";
            }
        }
    }, [selfRef.current.clientWidth]);

    return (
        <div {...props} className={`d-flex align-items-center justify-content-center bg-white rounded-18px shadow ${squareClassName}`} ref={selfRef}>
            {icon}
            {/* <div className={`text-center mt-4 ${titleClassName}`}>{children}</div> */}
        </div>
    );
}

export default SquareButton;