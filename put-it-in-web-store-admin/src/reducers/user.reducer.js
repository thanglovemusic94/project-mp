import {userConstants} from "../constants/user.constants"

let token = JSON.parse(localStorage.getItem('token'))
const initialState = token ? { loggedIn: false, token } : {}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return { loggedIn: true }
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                token: action.token
            }
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                error: action.error
            }
        case userConstants.LOGOUT:
            return {
                loggedIn: false,
                loggedOut: true
            }
        default:
            return state
    }
}