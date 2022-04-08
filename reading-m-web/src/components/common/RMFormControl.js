import { useState } from "react";
import { Form } from "react-bootstrap";

const RMFormControl = ({ 
    name,
    value,
    onChange,
    valid,
    invalid,
    pattern,
    placeholder,
    className,
    type,
    maxLength,
    minLength,
    readOnly,
    required,
    validFeedback,
    invalidFeedback,
    invalidPatternFeedback
}) => {
    const [patternCheck, setPatternCheck] = useState(false);

    function handleChange(e) {
        const value = e.target.value;

        if (value.length === 0) {
            setPatternCheck(false)
        } else if (pattern) {
            const regex = new RegExp(pattern, "g");

            if (regex.test(value) === false) {
                setPatternCheck(true)
            }
        }

        if (onChange)
            onChange(e);
    }

    return (
        <>
            <Form.Control
                name={name}
                value={value}
                onChange={handleChange}
                valid={valid}
                invalid={invalid}
                pattern={pattern}
                placeholder={placeholder}
                className={className}
                required={required}
                type={type}
                readOnly={readOnly}
                maxLength={maxLength}
                minLength={minLength}
            >

            </Form.Control>

            <Form.Control.Feedback type="valid">
                {validFeedback}
            </Form.Control.Feedback>
            
            <Form.Control.Feedback type="invalid">
                {patternCheck === true ? invalidPatternFeedback : invalidFeedback}
            </Form.Control.Feedback>
        </>
    )
}

export default RMFormControl;