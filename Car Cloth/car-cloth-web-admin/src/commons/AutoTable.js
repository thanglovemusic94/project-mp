import { CButton, CFormCheck, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormattedDateTime from "./FormattedDateTime";
import MaskedPhoneLabel from "./MaskedPhoneLabel";

/*
[AUTO TABLE CONFIGURATION GUIDE]


HOW TO USE:
    1. Import AutoTable component to the component which you want using it.
    2. Add <AutoTable /> tag where you want to using it to display data.
    3. Create an array which is contains of config options.
    4. Pass the config array to your AutoTable component.
    5. Pass the data source to your AutoTable component.


FEATURES:
    INDEX COLUMN:
        - Index column is turn on by default.
        - Turn off by set "indexColumn" attribute to "false".

    CHECKBOX COLUMN:
        - Turn on by set "checkBoxColumn" attribute to "true".
        - Implement "onCheckBoxChange" event attribute to handle value 
        when clicked on check box.

        function "onCheckBoxChange":
        - Return index number when a check box is clicked.
        - Return -1 when the check box in the header is clicked.


CONFIGURATION:

    const tableConfigs = [
        { 
            'header': '{header_name_here}', 'type': AutoTableCellType.Text, 'bindingKey': '{binding_key_here}'
        },
        {
            'header': '{header_name_here}', 
            'type': AutoTableCellType.URL, 
            'bindingKey': '{binding_key_here}', 
            'bindingUrlMask': '{binding_key_for_url_mask}', 
            'baseURL': '{base_url_here}'
        },
        { 
            'header': '{header_name_here}', 'type': AutoTableCellType.DateTime, 'bindingKey': '{binding_key_here}', 'format': '{date_time_format_here}' 
        },
        { 
            'header': '{header_name_here}', 'type': AutoTableCellType.Phone, 'bindingKey': '{binding_key_here}' 
        },
        {
            'header': '{header_name_here}', 
            'type': AutoTableCellType.Button, 
            'bindingKey': '{binding_key_here}',	
            'name': '{button_name_here}​', 			
            'action': () => callback_for_action_here()
        },
        {
            'header': '{header_name_here}',
            'type': AutoTableCellType.Custom,
            'bindingKey': '{binding_key_here}',
            'render': (args) => callback_for_render_here(args)
        }
    ];

    @header:
        Header name.
    @type:
        Type of cell will be used to display data.
        Currently, there are 6 types of cell:
         - Text
         - Url
         - DateTime
         - Phone (will be removed soon)
         - Button
         - Custom
    @bindingKey:
        Name of data's field which this cell bound to.
    @bindingUrlMask:
        In case of the type of the cell is URL, this option is used to provide the url mask using value from another data field.
    @baseURL:
        Base URL for redirecting when user click on. It will find the binding key's value with prefix ":" to replace it with the value of that data field with the binding key name.
        Ex: If @bindingKey = 'id' and the value of it is 1 and @baseURL = '/profile/:id', it will replace the ':id' with the value 1. So in the end it will become '/profile/1'.
    @format:
        Display datetime in defined format.
        YYYY: Year.
        MM: Month.
        DD: Day of the month.
        hh: Hour.
        mm: Minute.
    @name:
        In case of the type of the cell is Button, this option is used to define the name of the button.
    @action:
        In case of the type of the cell is Button, this option is used to define the action when user click on.
    @render:
        In case of the type of the cell is Custom, this option is used to define how the data should be displayed.
*/

export const AutoTableCellType = {
    'Text': 'text',
    'URL': 'url',
    'DateTime': 'datetime',
    'TimeZone': 'timezone',
    'Phone': 'phone',
    'Button': 'button',
    'Custom': 'custom'
};

/* MAIN COMPONENT */
export default function AutoTable({ configs, source, onCheckBoxChange, indexColumn = true, checkBoxColumn = false }) {
    const IndexColumnHeader = () => { return indexColumn === true ? <CTableHeaderCell className="text-center" scope="col">번호</CTableHeaderCell> : <></>; }
    const IndexColumnData = ({ indexNum }) => { return indexColumn === true ? <CTableHeaderCell className="text-center" scope="row">{indexNum}</CTableHeaderCell> : <></>; }

    const CheckBoxColumnHeader = () => {
        return (
            checkBoxColumn === true
                ?
                <CTableHeaderCell className="text-center">
                    <CFormCheck checked={checkBoxAll} onChange={handleCheckAll} />
                </CTableHeaderCell>
                :
                <></>
        );
    }
    const CheckBoxColumnData = ({ index }) => {
        return (
            checkBoxColumn === true
                ?
                <CTableDataCell className="text-center">
                    <CFormCheck onChange={() => handleCheckBoxClick(index)} checked={checkBoxList[index]} />
                </CTableDataCell>
                :
                <></>
        );
    }

    const [checkBoxList, setCheckBoxList] = useState([]);
    const [checkBoxAll, setCheckBoxAll] = useState(false);


    useEffect(() => {

        for (let i = 0; i < source.length; i++) {
            checkBoxList.push(false);
        }
        // eslint-disable-next-line
    }, [source])

    useEffect(() => {

        if (checkBoxList.length > 0) {
            let count = 0;

            for (let i = 0; i < checkBoxList.length; i++) {
                if (checkBoxList[i] === true) {
                    count++;
                }
            }

            if (count === checkBoxList.length) {
                setCheckBoxAll(true);
            } else if (checkBoxAll === true) {
                setCheckBoxAll(false);
            }
        }
        // eslint-disable-next-line
    }, [checkBoxList])


    function isKeyPath(key) {
        return key.indexOf('.') !== -1;
    }

    function getValueFromPath(item, keyPath) {
        const paths = keyPath.split('.');
        let itemValue = item;

        for (const path of paths) {
            itemValue = itemValue[path];
        }

        return itemValue;
    }

    function handleCheckBoxClick(index) {
        let newCheckBoxList = [...checkBoxList];
        newCheckBoxList[index] = !newCheckBoxList[index];

        setCheckBoxList(newCheckBoxList);
        onCheckBoxChange(index);
    }

    function handleCheckAll() {
        let newCheckBoxList = [];

        if (checkBoxAll === true) {
            for (let i = 0; i < checkBoxList.length; i++) {
                newCheckBoxList.push(false);
            }
        } else {
            for (let i = 0; i < checkBoxList.length; i++) {
                newCheckBoxList.push(true);
            }
        }

        setCheckBoxList(newCheckBoxList);
        setCheckBoxAll(!checkBoxAll);
        onCheckBoxChange(-1);
    }

    function handleCell(item) {

        const isText = () => {
            return item;
        }

        const isURL = () => {
            return <Link to={item.url} >{item.name}</Link>;
        }

        const isDateTime = () => {
            return <FormattedDateTime source={item.value} format={item.format ?? "YYYY.MM.DD hh:mm"} />
        }

        const isTimeZone = () => {
            return <FormattedDateTime source={item.value} format={item.format ?? "YYYY.MM.DD hh:mm"} isTimeZone={true} />
        }

        const isPhoneNumber = () => {
            return <MaskedPhoneLabel text={item} />
        }

        const isButton = () => {
            return (
                <CButton
                    className="w-25"
                    color="dark"
                    onClick={() => item.action(item.params)}
                >
                    {item.name}
                </CButton>
            );
        }

        return { isText, isURL, isDateTime, isTimeZone, isPhoneNumber, isButton };
    }

    function getProperty(object, strKey) {
        if (!strKey) return null
        const arrKey = strKey.split('.');
        let value = { ...object }
        for (let i = 0; i < arrKey.length; i++) {
            value = value[arrKey[i]]
        }

        return value
    }


    return (
        <CTable className="mt-4" bordered>
            <CTableHead color="secondary">
                <CTableRow>
                    <IndexColumnHeader />
                    <CheckBoxColumnHeader />
                    {
                        configs.map((item, index) => {

                            return (
                                <CTableHeaderCell className="text-center" key={index} scope="col">{item.header}</CTableHeaderCell>
                            );
                        })
                    }
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {
                    source.map((sourceItem, index) => {
                        const indexNum = index + 1;

                        return (
                            <CTableRow key={index}>
                                <IndexColumnData indexNum={indexNum} />
                                <CheckBoxColumnData index={index} />
                                {
                                    configs.map((configItem, index) => {
                                        let elemnt = '';
                                        let sourceValue = null;

                                        if (isKeyPath(configItem.bindingKey) === true) {
                                            sourceValue = getValueFromPath(sourceItem, configItem.bindingKey);
                                        } else {
                                            sourceValue = sourceItem[configItem.bindingKey];
                                        }

                                        switch (configItem.type) {
                                            case AutoTableCellType.Text:
                                                elemnt = handleCell(sourceValue)['isText']();
                                                break;

                                            case AutoTableCellType.URL:
                                                let targetURL = configItem.baseURL.replace(`:${configItem.bindingKey}`, sourceValue);

                                                elemnt = handleCell({
                                                    "url": targetURL,
                                                    "name": getProperty(sourceItem, configItem.bindingUrlMask) ?? sourceValue
                                                })['isURL']();
                                                break;

                                            case AutoTableCellType.DateTime:
                                                elemnt = handleCell({
                                                    'value': sourceValue,
                                                    'format': configItem.format
                                                })['isDateTime']();
                                                break;
                                            case AutoTableCellType.TimeZone:
                                                elemnt = handleCell({
                                                    'value': sourceValue,
                                                    'format': configItem.format
                                                })['isTimeZone']();
                                                break;

                                            case AutoTableCellType.Phone:
                                                elemnt = handleCell(sourceValue)['isPhoneNumber']();
                                                break;

                                            case AutoTableCellType.Button:
                                                elemnt = handleCell({
                                                    'name': configItem.name,
                                                    'action': configItem.action,
                                                    'params': sourceValue
                                                })['isButton']();
                                                break;

                                            case AutoTableCellType.Custom:
                                                elemnt = configItem.render(sourceValue, sourceItem);
                                                break;

                                            default:
                                                break;
                                        }

                                        return (
                                            <CTableDataCell className="text-center" key={index}>{elemnt}</CTableDataCell>
                                        );
                                    })
                                }
                            </CTableRow>
                        );
                    })
                }
            </CTableBody>
        </CTable>
    );
}
