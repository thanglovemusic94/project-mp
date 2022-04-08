import { Button } from "react-bootstrap";

function CButton({ children, className, disabled, variant, ...props }) {
    const bgColorName = disabled ? "btn-black-300" : "btn-blue-500";
    const variantName = variant ? variant : "";

    return (
        <Button
            variant={variantName}
            className={`font-gmarket fw-bold fs-15 py-15px lh-1 ${className} ${bgColorName}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    );
}

export default CButton;
