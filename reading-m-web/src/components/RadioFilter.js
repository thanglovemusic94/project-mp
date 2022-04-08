import { Form } from "react-bootstrap"

function RadioFilter({ source, onRadioChange }) {

    return (
        <>
            {
                source.map((item, index) => {

                    return (
                        <Form.Check
                            key={index}
                            label={item}
                            type="radio"
                            id={`grade-${index}`}
                            name="grade"
                            value={index}
                            defaultChecked={index == 0}
                            onChange={(e) => onRadioChange(e.target.value)}
                        />
                    )
                })
            }
        </>
    )
}

export default RadioFilter