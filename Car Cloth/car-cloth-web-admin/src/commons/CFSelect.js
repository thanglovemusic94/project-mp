import { CFormSelect } from "@coreui/react";

function CFSelect({ options, ...props}) {
    /**
     * @example options = [1, 2, 3, 4]
     */

    if (options instanceof Array && options){
        return (
            <CFormSelect {...props}>
                {
                    options.map((item, index) => {
                        return (
                            <option key={`cf-select-${index}`} value={index}>{item}</option>
                        );
                    })
                }
            </CFormSelect>
        );
    }
        
    /**
     * @example options = {name1: value1, name2: value2} 
     * name1, name2 : text display option
     * value1, value2: value option
     */
    if (options instanceof Object && options){
        return (
            <CFormSelect {...props}>
                {
                    Object.keys(options).map((key, index) => {
                        return (
                            <option key={`cf-select-${index}`} value={key}>{options[key]}</option>
                        );
                    })
                }
            </CFormSelect>
        );
    }
       
}

export default CFSelect;
