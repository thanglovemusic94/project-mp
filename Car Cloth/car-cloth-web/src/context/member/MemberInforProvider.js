import React, {useReducer} from "react";
import {MEMBER_ACTION} from "./MemberActionType";
import {checkIsCompany} from "../../constants/CompanyStatus";
import {SessionStorageManager} from "../../managers/SessionStorageManager";


export const MemberInfoContext = React.createContext();

const initState = null
const MemberInfoProvider = (props) => {
    //reducer
    const setState =  (state , action) => {
        const {type, payload} = action
        switch (type) {
            case MEMBER_ACTION.GET_MEMBER:
                SessionStorageManager.saveMemberInfo({...payload, isCompany: checkIsCompany(payload)})
                return {...payload, isCompany: checkIsCompany(payload)}
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(setState, initState);
    return (
        <MemberInfoContext.Provider value={{state, dispatch}}>{props.children} </MemberInfoContext.Provider>
    );
}

export default MemberInfoProvider
