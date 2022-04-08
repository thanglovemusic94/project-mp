import {combineReducers} from "redux"
import {connectRouter} from "connected-react-router"
import {error} from "./error.reducer";
import user from "./user";

const rootReducer = (history) => combineReducers({
        user,
        router: connectRouter(history),
        error,
    }
)

export default rootReducer
