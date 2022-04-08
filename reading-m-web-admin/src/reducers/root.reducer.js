import {combineReducers} from "redux"
import {connectRouter} from "connected-react-router"
import {error} from "./error.reducer";

const rootReducer = (history) => combineReducers({
        router: connectRouter(history),
        error,
    }
)

export default rootReducer
