import { SHOW_ERROR_POPUP, CLOSE_ERROR_POPUP } from "./../constants/action.type.constants";

export function error(state = { contents: 'Internal error', show: false }, action) {
    const { contents, type } = action
    switch (type) {
        case SHOW_ERROR_POPUP:
            return {contents: contents, show: true}
        case CLOSE_ERROR_POPUP:
            return {contents: '', show: false}
        default:
            return(state)
    }
}
