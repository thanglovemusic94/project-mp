import React, {useReducer} from "react";
import {LocalStorageManager} from "../../managers/LocalStorageManager";
import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from "./UserAction";

export const UserContext = React.createContext();

const initState = LocalStorageManager.exitTokenUser() ? {isLogin: true} : {isLogin: false};

export const UserProvider = (props) => {

    //reducer
    const setState = (state, action) => {
        switch (action) {
            case LOGIN_SUCCESS:
                return {isLogin: true};
            case LOGIN_FAIL:
                return {isLogin: false};
            case LOGOUT:
                return {isLogin: false};
            default:
                throw new Error();
                //return state
        }
    }

    const [state, dispatch] = useReducer(setState, initState);

    return (
        <UserContext.Provider value={{state, dispatch}}>{props.children} </UserContext.Provider>
    );
}
