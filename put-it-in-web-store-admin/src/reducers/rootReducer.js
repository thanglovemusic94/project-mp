import { connectRouter } from "connected-react-router"
import { combineReducers } from "redux"
import {authentication} from "./user.reducer"

const rootReducer = (history) => combineReducers({
        router: connectRouter(history),
        authentication
    }
)

export default rootReducer
