import { Dropdown, Form } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'

export default function CustomDropdown({
    className,
    name,
    onChange,
    items,
    index,
    defaultValue,
    selectedValue,
    classNameToggle,
    sizeToggle,
    mapping,
    defaultToggleLabel,
    defaultToggleValue,
    required,
    invalidFeedback
}) {
    const [dropdown, setDropdown] = useState({ label: '', value: '' })
    const [sourceItems, setSourceItems] = useState([...items])

    useEffect(() => {

        if (selectedValue !== undefined && selectedValue !== null) {
            let check = null;

            if (Object.keys(selectedValue).indexOf("value") !== -1) {

                check = sourceItems.filter((item) => `${item.value}` === `${selectedValue.value}`);
            } else {

                check = sourceItems.filter((item) => `${item.value}` === `${selectedValue}`);
            }

            if (check.length > 0)
                setDropdown(check[0]);
            else
                setDropdown(sourceItems[0]);
        } else {

            if (sourceItems.length > 0) {
                setDropdown(sourceItems[0])
            }
        }
    }, [selectedValue])

    useEffect(() => {
        let tempSourceItems = []

        if (defaultToggleLabel) {
            tempSourceItems.push({ "label": `${defaultToggleLabel}`, "value": '' });

            if (defaultToggleValue)
                tempSourceItems[0].value = defaultToggleValue;
        }

        if (items.length > 0) {

            if (mapping) {
                const labelName = mapping[0];
                const valueName = mapping[1];

                for (const item of items) {
                    const newItem = {
                        "label": item[labelName],
                        "value": item[valueName]
                    }

                    tempSourceItems.push(newItem);
                }

                setSourceItems(tempSourceItems);
            } else {
                tempSourceItems = [...tempSourceItems, ...sourceItems];
                setSourceItems(tempSourceItems);
            }

            if (selectedValue === undefined || selectedValue === null) {
                if (defaultValue !== undefined && defaultValue !== null) {
                    let check = null;

                    if (Object.keys(defaultValue).indexOf("value") !== -1) {

                        check = tempSourceItems.filter((item) => `${item.value}` === `${defaultValue.value}`);
                    } else {

                        check = tempSourceItems.filter((item) => `${item.value}` === `${defaultValue}`);
                    }

                    if (check) {
                        setDropdown(check[0]);
                    }
                    else {
                        setDropdown(tempSourceItems[0]);
                    }
                } else {
                    setDropdown(tempSourceItems[0])
                }
            }
        } else {
            setSourceItems([]);
            setDropdown(tempSourceItems[0])
        }
    }, [items])

    return (
        <>
            <Dropdown
                className={`form-control-dropdown ${className ?? ''}`}
                onSelect={(k, event) => {
                    setDropdown({ label: event.target.innerText, value: k })
                    if (onChange) {
                        if (isNaN(index)) {
                            onChange(event, k)
                        } else {
                            onChange(index, event, k)
                        }
                    }
                }}
            >
                <Dropdown.Toggle
                    className={`form-control-dropdown ${classNameToggle ?? ''}`}
                    variant=""
                    size={sizeToggle ? sizeToggle : ""}
                >
                    {dropdown.label}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {sourceItems.map((dropdown, index) => (
                        <Dropdown.Item
                            key={index}
                            eventKey={dropdown.value}
                            name={name}
                        >
                            {dropdown.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <div>
                <Form.Control 
                    className="d-none"
                    required={required}
                    value={dropdown.value}
                />
                <Form.Control.Feedback type="invalid">
                    {invalidFeedback}
                </Form.Control.Feedback>
            </div>
        </>
    )
}
