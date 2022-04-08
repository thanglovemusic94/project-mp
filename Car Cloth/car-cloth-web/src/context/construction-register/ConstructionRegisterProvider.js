import React, {useReducer} from "react";
import {CONSTRUCTION_REGISTER_TYPE as CONSTRUCTION_REGISTER_ACTION,} from "./ConstructionRegisterType";


export const ConstructionRegisterContext = React.createContext();

const initState = {
    data: {
        "completedDate": null,
        "content": null,
        "images": [],
        "quoteId": 1
    },
    attachedImages: []
}

const ConstructionRegisterProvider = (props) => {

//reducer
    const setState = (state, action) => {
        const {type, payload} = action
        switch (type) {
            case CONSTRUCTION_REGISTER_ACTION.GET_CONSTRUCTION:
                return {...state}
            case CONSTRUCTION_REGISTER_ACTION.SET_CONSTRUCTION:
                return payload
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(setState, initState);
    return (
        <ConstructionRegisterContext.Provider
            value={{state, dispatch}}>{props.children} </ConstructionRegisterContext.Provider>
    );
}

export default ConstructionRegisterProvider
