import React, { useReducer } from "react";
import { REFRESH } from "./RefreshAction";

export const RefreshContext = React.createContext();
const initState = false
const RefreshProvider = (props) =>{

    //reducer
    const setState = (state, action) => {
        switch (action) {
            case REFRESH:
                return !state;
            default:
                throw new Error();
            //return state
        }
    }

    const [state, dispatch] = useReducer(setState, initState);

    return (
        <RefreshContext.Provider value={{state, dispatch}}>{props.children} </RefreshContext.Provider>
    );
}

export default RefreshProvider
