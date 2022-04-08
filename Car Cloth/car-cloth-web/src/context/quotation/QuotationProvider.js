import React, {useReducer} from "react";
import {QuotationAction} from "./QuotationAction";

export const QuotationContext = React.createContext();

const initState = null
const QuotationProvider = (props) =>{
    //reducer
    const setState =  (state , action) => {
        const {type, payload} = action
        switch (type) {
            case QuotationAction.SET_QUOTATION:
                return payload
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(setState, initState);
    return (
        <QuotationContext.Provider value={{state, dispatch}}>{props.children} </QuotationContext.Provider>
    );
}

export default QuotationProvider
