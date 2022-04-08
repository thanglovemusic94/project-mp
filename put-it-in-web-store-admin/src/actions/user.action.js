import { userService } from "../services/user.service.js";
import { userConstants } from "../constants/user.constants";
import { push } from "connected-react-router"

export const userActions = {
    login,
    logout
}

function login(email, password) {
    return dispatch => {
        userService.login(email, password).then(token => {
            dispatch(success(token))
            localStorage.setItem('token', JSON.stringify(token))
            dispatch(push("/"))
        }).catch((error) => {
            dispatch(failure(error.toString()));
        })

    }

    // function request(email) { return { type: userConstants.LOGIN_REQUEST, email } }
    function success(token) { return { type: userConstants.LOGIN_SUCCESS, token } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}

function logout() {
    return dispatch => {
        userService.logout().finally(() => {
            dispatch({ type: userConstants.LOGOUT })
            localStorage.removeItem('token')
        })
    }
}
