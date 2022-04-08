
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CToggleButton from "../buttons/CToggleButton";


function CarPartController({ layout, selectedParts, onPartSelected }) {
    const [buttonLayout, setButtonLayout] = useState(layout ?? []);

    function handleSelect(checked, val) {

        if (onPartSelected)
            onPartSelected(checked, val);
    }

    useEffect(() => {

        if (buttonLayout.length > 0) {
            let temp = [...buttonLayout]

            for (let group of temp) {
                for (let item of group) {

                    if (selectedParts.indexOf(item.value) !== -1) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                }
            }

            setButtonLayout(temp);
        }
        // eslint-disable-next-line
    }, [selectedParts])

    return (
        <>
            <div className="carpartcontroller-section">
                {
                    buttonLayout.map((buttonGroup, grIndex) => {

                        return (
                            <Row className="gx-2 mb-2" key={`btn_group_${grIndex}`} xs={{ cols: "3" }}>
                                {
                                    buttonGroup.map((button, btIndex) => {

                                        return (
                                            <Col key={`btn_${btIndex}`}>
                                                <CToggleButton
                                                    className="w-100 text-nowrap fs-7 px-0"
                                                    value={button.value}
                                                    onChange={handleSelect}
                                                    checked={button.checked}
                                                >
                                                    {button.title}
                                                </CToggleButton>
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        );
                    })
                }
            </div>
        </>
    );
}

export default CarPartController;